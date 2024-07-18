import { type CategorySchema } from "@/validation-schema/category.schema";
import { type Prisma } from "@prisma/client";
import { type z } from "zod";

export type Category = Prisma.CategoryGetPayload<Prisma.CategoryDefaultArgs>;
export type CategoryDTO = z.infer<typeof CategorySchema>;
export type Project = Prisma.ProjectGetPayload<Prisma.ProjectDefaultArgs>;
