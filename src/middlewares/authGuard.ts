import { NextFunction, Request, Response } from "express";
import config from "../config";
import { AuthError, ForbiddenError } from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { verifyJWT } from "../utils/generateToken";

const authGuard = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw new AuthError("Unauthorized! Please Login...");
    }

    let decodedToken;
    try {
      decodedToken = verifyJWT(token, config.jwt_access_secret_key);
    } catch (error) {
      throw new AuthError("Invalid or expired token.");
    }

    const { role } = decodedToken;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new ForbiddenError();
    }

    req.user = decodedToken;
    next();
  });
};

export default authGuard;
