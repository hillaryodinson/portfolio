import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

export const uploadFile = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const filePath = `./public/uploads/${file.name}`;

  await fs.writeFile(filePath, buffer);

  revalidatePath("/");
  return filePath;
};

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  const uploadedImages: string[] = [];
  files.map((file) => {
    uploadFile(file)
      .then((response) => {
        uploadedImages.push(response);
      })
      .catch((err) => console.log(err));
  });
  return uploadedImages;
};
