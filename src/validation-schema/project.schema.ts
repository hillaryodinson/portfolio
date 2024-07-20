import { z } from "zod";

const ACCEPTED_FILE_TYPES = [".png", ".jpg", ".jpeg"];
const MAX_UPLOAD_SIZE = 3 * 1024 * 1024;

export const ProjectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().optional(),
  summary: z.string().optional(),
  categoryId: z.string().optional(),
  images: z
    .array(
      z
        .instanceof(File)
        .refine((file) => {
          return !file || file.size <= MAX_UPLOAD_SIZE;
        }, "File size must be less than 3MB")
        .refine((file) => {
          if (file) return ACCEPTED_FILE_TYPES.includes(file.type);
        }, "File must be a PNG"),
    )
    .optional(),
});
