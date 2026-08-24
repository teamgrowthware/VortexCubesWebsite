import express from 'express';
import {
  createBenchResource,
  deleteBenchResource,
  getAdminBenchResources,
  getPublicBenchResources,
  updateBenchResource,
} from '../controllers/benchResourceController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/bench-resources', getPublicBenchResources);
router.get('/admin/bench-resources', requireAdmin, getAdminBenchResources);
router.post('/admin/bench-resources', requireAdmin, createBenchResource);
router.put('/admin/bench-resources/:id', requireAdmin, updateBenchResource);
router.delete('/admin/bench-resources/:id', requireAdmin, deleteBenchResource);

export default router;
