import { body } from 'express-validator';

export const updateProfileValidator = [
  body('bio')
    .optional()
    .trim()
    .isString().withMessage('Bio must be a string')
    .isLength({ max: 500 }).withMessage('Bio must be at most 500 characters'),
  body('location')
    .optional()
    .trim()
    .isString().withMessage('Location must be a string')
    .isLength({ max: 100 }).withMessage('Location must be at most 100 characters'),
  body('website')
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: true }).withMessage('Website must be a valid URL with protocol (https://)'),
  body('avatarUrl')
    .optional({ checkFalsy: true })
    .isURL({ require_protocol: true }).withMessage('Avatar URL must be a valid URL with protocol (https://)'),
];
