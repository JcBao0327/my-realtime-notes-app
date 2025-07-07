import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';


// 获取当前用户信息
export const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// 更新用户信息（如邮箱、用户名）
export const updateUserProfile = async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        if (username) user.username = username;
        if (email) user.email = email;
        await user.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// 修改密码
export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = newPassword; // 会触发模型中的加密逻辑
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // 上传函数封装为 Promise
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'avatars' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                streamifier.createReadStream(buffer).pipe(stream);
            });
        };

        // 执行上传
        const result = await streamUpload(req.file.buffer);

        // 更新数据库中的头像字段
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { avatar: result.secure_url },
            { new: true }
        );

        res.status(200).json({
            message: 'Avatar updated successfully',
            avatar: user.avatar,
        });
    } catch (err) {
        console.error('Avatar upload error:', err);
        res.status(500).json({ message: 'Upload failed' });
    }
};
