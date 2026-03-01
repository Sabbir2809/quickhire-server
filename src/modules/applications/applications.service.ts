import { Application } from "../../models/Application.model";
import { Job } from "../../models/Job.model";
import { NotFoundError, ValidationError } from "../../utils/appError";

const createApplication = async (data: any) => {
  const job = await Job.findById(data.jobId);
  if (!job) throw new NotFoundError("Job not found!");

  const existing = await Application.findOne({
    jobId: data.jobId,
    email: data.email,
  });
  if (existing)
    throw new ValidationError("You have already applied to this job.");

  const application = await Application.create(data);
  return application;
};

const getAllApplications = async (query: any) => {
  const { jobId, page = 1, limit = 10 } = query;
  const filter: any = {};
  if (jobId) filter.jobId = jobId;

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Application.countDocuments(filter);
  const applications = await Application.find(filter)
    .populate("jobId", "title company")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return { applications, total, page: Number(page), limit: Number(limit) };
};

const getApplicationById = async (id: string) => {
  const application = await Application.findById(id).populate(
    "jobId",
    "title company location"
  );
  if (!application) throw new NotFoundError("Application not found!");
  return application;
};

const updateApplicationStatus = async (id: string, status: string) => {
  const application = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!application) throw new NotFoundError("Application not found!");
  return application;
};

const deleteApplication = async (id: string) => {
  const application = await Application.findByIdAndDelete(id);
  if (!application) throw new NotFoundError("Application not found!");
  return application;
};

export const applicationsService = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
