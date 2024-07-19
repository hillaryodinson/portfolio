import { db } from "@/server/db";
import { type CategoryDTO, type Category } from "@/types";

export const getAll = async (): Promise<Category[]> => {
  const categories = await db.category.findMany();
  return categories;
};

export const create = async (values: CategoryDTO) => {
  const { name } = values;
  return await db.category.create({
    data: {
      name,
    },
  });
};
