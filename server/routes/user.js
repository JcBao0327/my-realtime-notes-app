import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import {
    getCurrentUser,
    updateUserProfile,
    changePassword,
    updateAvatar // ✅ 新增导入
} from '../controllers/userController.js';
import multer from 'multer';

const storage = multer.memoryStorage(); // 使用内存存储，适合配合 Cloudinary
const upload = multer({ storage });
const router = express.Router();

router.get('/me', verifyToken, getCurrentUser);
router.put('/me', verifyToken, updateUserProfile);
router.put('/change-password', verifyToken, changePassword);
router.post('/avatar', verifyToken, upload.single('avatar'), updateAvatar);

export default router;