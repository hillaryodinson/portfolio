"use server";
import { ValidationError } from "@/lib/validation-error";
import {
  getAll,
  create,
  remove,
  getSingleById,
  update,
} from "@/repositories/category.repository";
import { type CategoryDTO, type Category } from "@/types";
import { CategorySchema } from "@/validation-schema/category.schema";

export const getAllCategories = async (): Promise<Category[]> => {
  return await getAll();
  // return new Promise((resolve) => setTimeout(resolve, 60000));
};

export const createCategory = async (values: CategoryDTO) => {
  const validatedData = CategorySchema.safeParse(values);
  if (validatedData.error) {
    throw new ValidationError(validatedData.error.message);
  }
  return await create(validatedData.data);
};

export const deleteCategory = async (category: Category) => {
  const { id } = category;
  return await remove(id);
};

export const updateCategory = async (
  categoryId: string,
  values: CategoryDTO,
) => {
  const validatedData = CategorySchema.safeParse(values);
  if (validatedData.error) {
    throw new ValidationError(validatedData.error.message);
  }

  //get category by id
  const existingCategory = await getSingleById(categoryId);
  //if category is not found throw error
  if (!existingCategory) throw new Error("No category was found");

  //update category
  return await update(existingCategory.id, validatedData.data);
  //show success message
};
