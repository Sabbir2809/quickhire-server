import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  jobId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  resumeLink: string;
  coverNote?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    resumeLink: { type: String, required: true },
    coverNote: { type: String },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>(
  "Application",
  ApplicationSchema
);
