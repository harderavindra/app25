// routes/categoryRoutes.js
import express from 'express';
import { assignCollectionsToCategory, createCategoryNode, deleteCategoryNode, listCategoryTree, updateCategoryNode } from '../controllers/categoryController.js';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware.js';
import { enforceTenant } from '../middlewares/enforceTenant.js';

const router = express.Router();
router.post('/',authenticateToken, enforceTenant(), authorizeRoles('admin'), createCategoryNode);
router.get('/',authenticateToken, enforceTenant(), authorizeRoles('admin'), listCategoryTree);
router.put('/:id/collections',authenticateToken, enforceTenant(), authorizeRoles('admin'), assignCollectionsToCategory);
router.put('/:id',authenticateToken, enforceTenant(), authorizeRoles('admin'),  updateCategoryNode);
router.delete('/:id',authenticateToken, enforceTenant(), authorizeRoles('admin'),  deleteCategoryNode);


export default router;
