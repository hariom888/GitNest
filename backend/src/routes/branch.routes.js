import express from 'express';

import { protect } from '../middleware/authMiddleware.js';

import {
  fetchBranches,
  createRepositoryBranch,
  checkoutRepositoryBranch,
  deleteRepositoryBranch,
} from '../controllers/branch.controller.js';

const router = express.Router();

router.get(
  '/:repoName/branches',
  protect,
  fetchBranches
);

router.post(
  '/:repoName/branches',
  protect,
  createRepositoryBranch
);

router.post(
  '/:repoName/branches/checkout',
  protect,
  checkoutRepositoryBranch
);

router.delete(
  '/:repoName/branches/:branchName',
  protect,
  deleteRepositoryBranch
);

export default router;
