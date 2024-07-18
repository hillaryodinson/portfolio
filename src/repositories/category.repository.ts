import { db } from "@/server/db";
import { type Category } from "@/types";

export const getAll = async (): Promise<Category[] | null> => {
  const categories = await db.category.findMany();
  return categories;
};
