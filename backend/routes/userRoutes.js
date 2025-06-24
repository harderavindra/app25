import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
const router = express.Router();

// Create new user (admin only)
router.post('/', authenticateToken, authorizeRoles('admin'), createUser);
router.get('/', authenticateToken, authorizeRoles('admin'), getUsers);
router.put('/:id', authenticateToken, authorizeRoles('admin'), updateUser);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteUser);


export default router;