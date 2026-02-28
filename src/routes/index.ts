import { Router } from "express";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
