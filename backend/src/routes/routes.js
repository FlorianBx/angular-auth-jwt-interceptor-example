import { Router } from 'express';
import {
  register,
  login,
  logout,
  isAuthenticated
} from '../controllers/authController.js';
import { getUsers } from '../controllers/userController.js';
import { authenticateAndRefreshToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateAndRefreshToken,logout);
router.get('/users', authenticateAndRefreshToken, getUsers);
router.get('/isAuthenticated', isAuthenticated);

export default router;
