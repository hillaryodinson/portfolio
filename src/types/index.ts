import { type Prisma } from "@prisma/client";

export type Category = Prisma.CategoryGetPayload<Prisma.CategoryDefaultArgs>;
export type Project = Prisma.ProjectGetPayload<Prisma.ProjectDefaultArgs>;
