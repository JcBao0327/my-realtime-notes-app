import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';  // 路径别忘了改对

const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data!` });
});

export default router;