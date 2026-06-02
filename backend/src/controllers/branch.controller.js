import Repository from '../models/Repository.model.js';

import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/AppError.js';
import { sendSuccess } from '../utils/responseHandlers.js';

import {
  getBranches,
  createBranch,
  checkoutBranch,
  deleteBranch,
} from '../services/branch.service.js';

const getRepository = async (userId, repoName) => {
  return Repository.findOne({
    owner: userId,
    name: repoName,
  });
};

export const fetchBranches = asyncHandler(
  async (req, res, next) => {
    const { repoName } = req.params;

    const repository = await getRepository(
      req.user.id,
      repoName
    );

    if (!repository) {
      return next(new AppError('Repository not found', 404));
    }

    const branchData = await getBranches(
      req.user.id,
      repository.name
    );

    sendSuccess(
      res,
      200,
      branchData,
      'Branches fetched successfully'
    );
  }
);

export const createRepositoryBranch = asyncHandler(
  async (req, res, next) => {
    const { repoName } = req.params;
    const { branchName } = req.body;

    if (!branchName) {
      return next(new AppError('Branch name is required', 400));
    }

    const repository = await getRepository(
      req.user.id,
      repoName
    );

    if (!repository) {
      return next(new AppError('Repository not found', 404));
    }

    await createBranch(
      req.user.id,
      repository.name,
      branchName
    );

    sendSuccess(
      res,
      201,
      null,
      'Branch created successfully'
    );
  }
);

export const checkoutRepositoryBranch = asyncHandler(
  async (req, res, next) => {
    const { repoName } = req.params;
    const { branchName } = req.body;

    if (!branchName) {
      return next(new AppError('Branch name is required', 400));
    }

    const repository = await getRepository(
      req.user.id,
      repoName
    );

    if (!repository) {
      return next(new AppError('Repository not found', 404));
    }

    await checkoutBranch(
      req.user.id,
      repository.name,
      branchName
    );

    sendSuccess(
      res,
      200,
      null,
      'Branch checked out successfully'
    );
  }
);

export const deleteRepositoryBranch = asyncHandler(
  async (req, res, next) => {
    const { repoName, branchName } = req.params;

    const repository = await getRepository(
      req.user.id,
      repoName
    );

    if (!repository) {
      return next(new AppError('Repository not found', 404));
    }

    try {
      await deleteBranch(
        req.user.id,
        repository.name,
        branchName
      );
    } catch (error) {
      return next(new AppError(error.message, 400));
    }

    sendSuccess(
      res,
      200,
      null,
      'Branch deleted successfully'
    );
  }
);
