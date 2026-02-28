import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const { email, password, adminSecret } = req.body;
  const admin = await authService.registerAdmin(email, password, adminSecret);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin registered successfully",
    data: { id: (admin as any)._id, email: admin.email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.loginAdmin(email, password);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const authController = {
  register,
  login,
};
