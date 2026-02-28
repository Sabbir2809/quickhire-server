import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  category: string;
  type: string;
  description: string;
  requirements?: string[];
  salary?: string;
  tags?: string[];
  isFeatured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    companyLogo: { type: String },
    location: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Design",
        "Sales",
        "Marketing",
        "Finance",
        "Technology",
        "Engineering",
        "Business",
        "Human Resource",
        "Other",
      ],
    },
    type: {
      type: String,
      required: true,
      enum: ["Full Time", "Part Time", "Remote", "Contract", "Internship"],
      default: "Full Time",
    },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: { type: String },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for search
JobSchema.index({
  title: "text",
  company: "text",
  description: "text",
  location: "text",
});

export const Job = mongoose.model<IJob>("Job", JobSchema);
