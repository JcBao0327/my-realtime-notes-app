import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// 注册接口
router.post('/register', registerUser);

// 登录接口（后面会用到）
router.post('/login', loginUser);

export default router;