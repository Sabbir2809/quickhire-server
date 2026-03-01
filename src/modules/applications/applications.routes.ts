import express from "express";
import authGuard from "../../middlewares/authGuard";
import validateRequest from "../../middlewares/validateRequest";
import { applicationsController } from "./applications.controller";
import { createApplicationSchema } from "./applications.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(createApplicationSchema),
  applicationsController.createApplication
);
router.get("/", authGuard("admin"), applicationsController.getAllApplications);
router.get(
  "/:id",
  authGuard("admin"),
  applicationsController.getApplicationById
);
router.patch(
  "/:id/status",
  authGuard("admin"),
  applicationsController.updateApplicationStatus
);
router.delete(
  "/:id",
  authGuard("admin"),
  applicationsController.deleteApplication
);

export default router;
