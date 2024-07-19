import { db } from "@/server/db";
import { type CategoryDTO, type Category } from "@/types";

export const getAll = async (): Promise<Category[]> => {
  const categories = await db.category.findMany();
  return categories;
};

export const getSingleById = async (id: string): Promise<Category | null> => {
  return await db.category.findFirst({
    where: {
      id,
    },
  });
};

export const create = async (values: CategoryDTO): Promise<Category> => {
  const { name } = values;
  return await db.category.create({
    data: {
      name,
    },
  });
};

export const remove = async (id: string): Promise<Category> => {
  return await db.category.delete({
    where: {
      id,
    },
  });
};

export const update = async (
  id: string,
  values: CategoryDTO,
): Promise<Category> => {
  return await db.category.update({
    where: {
      id,
    },
    data: {
      name: values.name,
    },
  });
};
