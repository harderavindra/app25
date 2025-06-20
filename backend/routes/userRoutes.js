import express from 'express';
import { createUser, getUsers } from '../controllers/userController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
const router = express.Router();

// Create new user (admin only)
router.post('/', authenticateToken, authorizeRoles('admin'), createUser);
router.get('/', authenticateToken, authorizeRoles('admin'), getUsers);


export default router;