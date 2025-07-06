import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import {
    getCurrentUser,
    updateUserProfile,
    changePassword
} from '../controllers/userController.js';

const router = express.Router();

router.get('/me', verifyToken, getCurrentUser);
router.put('/me', verifyToken, updateUserProfile);
router.put('/change-password', verifyToken, changePassword);

export default router;