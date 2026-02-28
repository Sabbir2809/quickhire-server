import express from "express";
import authGuard from "../../middlewares/authGuard";
import validateRequest from "../../middlewares/validateRequest";
import { jobsController } from "./jobs.controller";
import { createJobSchema, updateJobSchema } from "./jobs.validation";

const router = express.Router();

router.get("/", jobsController.getAllJobs);
router.get("/categories", jobsController.getCategories);
router.get("/:id", jobsController.getJobById);
router.post(
  "/",
  authGuard("admin"),
  validateRequest(createJobSchema),
  jobsController.createJob
);
router.patch(
  "/:id",
  authGuard("admin"),
  validateRequest(updateJobSchema),
  jobsController.updateJob
);
router.delete("/:id", authGuard("admin"), jobsController.deleteJob);

export default router;
