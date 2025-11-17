import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { createClient } from "../client";

function getStorage() {
  const { storage } = createClient();

  return storage;
}

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
};
export async function uploadImage({ file, bucket, folder }: UploadProps) {
  const filename = file.name;
  const fileExtension = filename.slice(filename.lastIndexOf(".") + 1);
  const path = `${folder ? `${folder}/` : ""}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, { maxSizeMB: 1 });
  } catch (error) {
    console.log("Error compressing image:", error);
    return { imageUrl: "", error: "Image compression failed" };
  }

  const storage = getStorage(); 
  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    console.error("Error uploading image:", error);
    return { imageUrl: "", error: error.message || "Upload failed" };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`;
  return { imageUrl, error: null };
}

export async function uploadVideo({file, bucket, folder}: UploadProps) {
  const filename = file.name;
  const fileExtension = filename.slice(filename.lastIndexOf(".") + 1);
  const path = `${folder ? `${folder}/` : ""}${uuidv4()}.${fileExtension}`;

  const storage = getStorage();
  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    console.error("Error uploading video:", error);
    return { videoUrl: "", error: error.message || "Upload failed" };
  }

  const videoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${data?.path}`;
  return { videoUrl, error: null };
}
