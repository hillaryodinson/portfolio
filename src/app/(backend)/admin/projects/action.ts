"use server";

import { ValidationError } from "@/lib/validation-error";
import {
  create,
  getAll,
  getSingleById,
  update,
} from "@/repositories/project.repository";
import { type ProjectDTO } from "@/types";
import { ProjectSchema } from "@/validation-schema/project.schema";

//fetch all projects
export const getAllProjects = async () => {
  return await getAll();
};

export const createProject = async (values: ProjectDTO) => {
  const validated = ProjectSchema.safeParse(values);

  if (!validated.success) {
    throw new ValidationError(validated.error.message);
  }

  //upload images here if any

  //create the project
  return await create(validated.data);
};

export const updateProject = async (projectId: string, values: ProjectDTO) => {
  const validated = ProjectSchema.safeParse(values);

  if (!validated.success) {
    throw new ValidationError(validated.error.message);
  }

  const project = await getSingleById(projectId);
  if (!project) {
    throw new ValidationError("Project was not found");
  }

  return await update(project.id, validated.data);
};
