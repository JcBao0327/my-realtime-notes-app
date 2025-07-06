
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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