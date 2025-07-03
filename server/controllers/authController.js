import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// 注册控制器
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 检查是否已注册
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already in use' });
        }

        // 创建用户（触发 password 加密）
        const newUser = new User({ username, email, password });
        await newUser.save();

        // 创建 token
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
        });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// 登录控制器（后面再填）
export const loginUser = async (req, res) => {
    res.send('login logic here');
};