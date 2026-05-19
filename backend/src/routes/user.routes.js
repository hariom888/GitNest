import express from 'express';
import { getUserProfile, updateProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validateRequest.js';
import { updateProfileValidator } from '../validators/user.validators.js';

const router = express.Router();

// Public route to view any user's profile
router.get('/:username', getUserProfile);

// Protected route to update current user's profile with validation
router.put('/profile', protect, updateProfileValidator, validateRequest, updateProfile);

export default router;
