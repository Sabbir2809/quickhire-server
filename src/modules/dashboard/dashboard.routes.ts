import express from "express";
import authGuard from "../../middlewares/authGuard";
import { dashboardController } from "./dashboard.controller";

const router = express.Router();

router.get("/", authGuard("admin"), dashboardController.getStats);

export const dashboardRoutes = router;
