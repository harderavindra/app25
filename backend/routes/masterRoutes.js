// routes/master.js
import express from 'express';
import {
  createCategoryNode,
  getCategoryNodes,
  createCollection,
  getCollections,
  getCategoryTree
} from '../controllers/masterController.js';

const router = express.Router();

router.post('/category', createCategoryNode);
router.get('/categories', getCategoryNodes);

router.post('/collection', createCollection);
router.get('/collections', getCollections);
router.get('/categories/tree', getCategoryTree);



export default router;
