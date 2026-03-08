import { Application } from "../../models/Application.model";
import { Job } from "../../models/Job.model";

export const dashboardService = {
  getDashboardStats: async () => {
    // Total jobs
    const totalJobs = await Job.countDocuments();

    // Featured jobs
    const featuredJobs = await Job.countDocuments({ isFeatured: true });

    // Total applications
    const totalApplications = await Application.countDocuments();

    // Applications grouped by status
    const applicationStatusCounts = await Application.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Convert aggregation result to key-value object
    const applicationsByStatus: Record<string, number> = {
      pending: 0,
      reviewed: 0,
      accepted: 0,
      rejected: 0,
    };

    applicationStatusCounts.forEach((item) => {
      applicationsByStatus[item._id] = item.count;
    });

    return {
      totalJobs,
      featuredJobs,
      totalApplications,
      applicationsByStatus,
    };
  },
};
