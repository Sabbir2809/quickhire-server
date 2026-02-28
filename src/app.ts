import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import rateLimiter from "./middlewares/rateLimiter";
import routers from "./routes";

const app: Application = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: config.cors_origin ?? "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.use("/api/v1", routers);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "🚀 QuickHire API is up and running!",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
