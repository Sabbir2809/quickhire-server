import { z } from "zod";

export const createJobSchema = z.object({
  body: z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    company: z.string().min(2, "Company must be at least 2 characters"),
    companyLogo: z.string().url().optional(),
    location: z.string().min(2, "Location is required"),
    category: z.enum([
      "Design",
      "Sales",
      "Marketing",
      "Finance",
      "Technology",
      "Engineering",
      "Business",
      "Human Resource",
      "Other",
    ]),
    type: z
      .enum(["Full Time", "Part Time", "Remote", "Contract", "Internship"])
      .optional(),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    requirements: z.array(z.string()).optional(),
    salary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
  }),
});

export const updateJobSchema = z.object({
  body: z.object({
    title: z.string().min(2).optional(),
    company: z.string().min(2).optional(),
    companyLogo: z.string().url().optional(),
    location: z.string().min(2).optional(),
    category: z
      .enum([
        "Design",
        "Sales",
        "Marketing",
        "Finance",
        "Technology",
        "Engineering",
        "Business",
        "Human Resource",
        "Other",
      ])
      .optional(),
    type: z
      .enum(["Full Time", "Part Time", "Remote", "Contract", "Internship"])
      .optional(),
    description: z.string().min(20).optional(),
    requirements: z.array(z.string()).optional(),
    salary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
  }),
  params: z.object({ id: z.string() }),
});
