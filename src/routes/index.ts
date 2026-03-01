import { Router } from "express";
import applicationsRoutes from "../modules/applications/applications.routes";
import authRoutes from "../modules/auth/auth.routes";
import jobsRoutes from "../modules/jobs/jobs.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/jobs",
    route: jobsRoutes,
  },
  {
    path: "/applications",
    route: applicationsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
