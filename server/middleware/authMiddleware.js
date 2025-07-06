import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // 检查 Authorization 头是否存在且格式正确
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 验证 token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // 把用户信息挂在 req.user 上供后续使用
        next(); // 放行请求
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default verifyToken;