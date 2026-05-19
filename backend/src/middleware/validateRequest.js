import { validationResult } from 'express-validator';
import AppError from '../utils/AppError.js';

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extracted = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));
    const appErr = new AppError('Validation failed', 400);
    appErr.errors = extracted;
    return next(appErr);
  }
  next();
};

export default validateRequest;
