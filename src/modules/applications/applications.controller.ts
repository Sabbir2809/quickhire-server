import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { applicationsService } from "./applications.service";

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const application = await applicationsService.createApplication(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Application submitted successfully",
    data: application,
  });
});

const getAllApplications = catchAsync(async (req: Request, res: Response) => {
  const result = await applicationsService.getAllApplications(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Applications retrieved successfully",
    meta: { total: result.total, page: result.page, limit: result.limit },
    data: result.applications,
  });
});

const getApplicationById = catchAsync(async (req: Request, res: Response) => {
  const application = await applicationsService.getApplicationById(
    req.params.id
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application retrieved successfully",
    data: application,
  });
});

const updateApplicationStatus = catchAsync(
  async (req: Request, res: Response) => {
    const application = await applicationsService.updateApplicationStatus(
      req.params.id,
      req.body.status
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  }
);

const deleteApplication = catchAsync(async (req: Request, res: Response) => {
  await applicationsService.deleteApplication(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application deleted successfully",
  });
});

export const applicationsController = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
