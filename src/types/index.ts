import { type CategorySchema } from "@/validation-schema/category.schema";
import { type ProjectSchema } from "@/validation-schema/project.schema";
import { Prisma } from "@prisma/client";
import { type z } from "zod";

export type Category = Prisma.CategoryGetPayload<Prisma.CategoryDefaultArgs>;
export type CategoryDTO = z.infer<typeof CategorySchema>;
const ProjectWithCategories = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: { category: true },
});
export type Project = Prisma.ProjectGetPayload<typeof ProjectWithCategories>;
export type ProjectDTO = z.infer<typeof ProjectSchema>;
