import { Job } from "../../models/Job.model";
import { NotFoundError } from "../../utils/appError";

const getAllJobs = async (query: any) => {
  const {
    search,
    category,
    location,
    type,
    page = 1,
    limit = 10,
    featured,
  } = query;

  const filter: any = {};

  if (search) {
    filter.$text = { $search: search };
  }
  if (category) filter.category = category;
  if (location) filter.location = { $regex: location, $options: "i" };
  if (type) filter.type = type;
  if (featured === "true") filter.isFeatured = true;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Job.countDocuments(filter);
  const jobs = await Job.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return { jobs, total, page: Number(page), limit: Number(limit) };
};

const getJobById = async (id: string) => {
  const job = await Job.findById(id);
  if (!job) throw new NotFoundError("Job not found!");
  return job;
};

const createJob = async (data: any) => {
  const job = await Job.create(data);
  return job;
};

const updateJob = async (id: string, data: any) => {
  const job = await Job.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!job) throw new NotFoundError("Job not found!");
  return job;
};

const deleteJob = async (id: string) => {
  const job = await Job.findByIdAndDelete(id);
  if (!job) throw new NotFoundError("Job not found!");
  return job;
};

const getCategories = async () => {
  const categories = await Job.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  return categories;
};

export const jobsService = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getCategories,
};
