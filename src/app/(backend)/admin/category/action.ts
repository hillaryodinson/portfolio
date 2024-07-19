"use server";
import { ValidationError } from "@/lib/validation-error";
import { getAll, create } from "@/repositories/category.repository";
import { type CategoryDTO, type Category } from "@/types";
import { CategorySchema } from "@/validation-schema/category.schema";
import { NextResponse } from "next/server";

export const getAllCategories = async (): Promise<Category[]> => {
  return await getAll();
  // return new Promise((resolve) => setTimeout(resolve, 60000));
};

export const createCategory = async (values: CategoryDTO) => {
  try {
    const validatedData = CategorySchema.safeParse(values);
    if (validatedData.error) {
      throw new ValidationError(validatedData.error.message);
    }
    await create(validatedData.data);
    return {
      success: true,
      message: "Category was created successfully",
    };
  } catch (error) {
    console.log(error);
    let message;
    let statusCode = 400;
    if (error instanceof ValidationError) {
      message = error.message;
    } else {
      message =
        "An error just occured please try again or contact administrator";
      statusCode = 500;
    }

    return {
      success: false,
      message: message,
      statusCode,
    };
  }
};
