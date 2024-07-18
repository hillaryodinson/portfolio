import { db } from "@/server/db";
import { type Project } from "@/types";

export const getAll = async (): Promise<Project[] | null> => {
  return await db.project.findMany();
};
