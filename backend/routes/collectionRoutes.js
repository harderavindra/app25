import express from 'express';
import { createCollection, listCollections } from '../controllers/collectionController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import { enforceTenant } from '../middlewares/enforceTenant.js';

const router = express.Router();

router.post('/', authenticateToken, enforceTenant(), authorizeRoles('admin'), createCollection);
router.get('/', authenticateToken, enforceTenant(), authorizeRoles('admin'), listCollections);

export default router;
