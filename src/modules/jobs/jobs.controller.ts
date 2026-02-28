import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { jobsService } from "./jobs.service";

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  const result = await jobsService.getAllJobs(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Jobs retrieved successfully",
    meta: { total: result.total, page: result.page, limit: result.limit },
    data: result.jobs,
  });
});

const getJobById = catchAsync(async (req: Request, res: Response) => {
  const job = await jobsService.getJobById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job retrieved successfully",
    data: job,
  });
});

const createJob = catchAsync(async (req: Request, res: Response) => {
  const job = await jobsService.createJob(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Job created successfully",
    data: job,
  });
});

const updateJob = catchAsync(async (req: Request, res: Response) => {
  const job = await jobsService.updateJob(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job updated successfully",
    data: job,
  });
});

const deleteJob = catchAsync(async (req: Request, res: Response) => {
  await jobsService.deleteJob(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job deleted successfully",
  });
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await jobsService.getCategories();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categories retrieved successfully",
    data: categories,
  });
});

export const jobsController = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getCategories,
};
