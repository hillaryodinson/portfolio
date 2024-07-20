import { db } from "@/server/db";
import { type ProjectDTO, type Project } from "@/types";

export const getAll = async (): Promise<Project[] | null> => {
  return await db.project.findMany({
    include: { category: true },
  });
};

export const getSingleById = async (id: string): Promise<Project | null> => {
  return await db.project.findFirst({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

export const create = async (values: ProjectDTO): Promise<Project> => {
  const { title, description, categoryId, summary } = values;
  return await db.project.create({
    data: {
      title,
      description,
      categoryId,
      summary,
    },
    include: {
      category: true,
    },
  });
};

export const remove = async (id: string): Promise<Project> => {
  return await db.project.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

export const update = async (
  id: string,
  values: ProjectDTO,
): Promise<Project> => {
  const { title, description, categoryId, summary } = values;
  return await db.project.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      categoryId,
      summary,
    },
    include: {
      category: true,
    },
  });
};
