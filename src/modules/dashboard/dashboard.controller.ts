import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { dashboardService } from "./dashboard.service";

export const dashboardController = {
  getStats: catchAsync(async (req: Request, res: Response) => {
    const stats = await dashboardService.getDashboardStats();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: stats,
    });
  }),
};
