import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import { AppError } from "../utils/appError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const isDevelopment = config.node_environment === "development";

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      ...(isDevelopment && err.details && { details: err.details }),
    });
  }

  if (err instanceof ZodError) {
    const formattedErrors = err.issues
      .map((item) => `${item.path.join(".")} - ${item.message}`)
      .join(", ");

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation Error!",
      errors: formattedErrors,
    });
  }

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: isDevelopment
      ? err.message
      : "Something went wrong. Please try again later.",
  });
};

export default globalErrorHandler;
