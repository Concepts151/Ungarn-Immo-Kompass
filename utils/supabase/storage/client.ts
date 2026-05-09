import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { createClient } from "../client";

function getStorage() {
  const { storage } = createClient();

  return storage;
}

type UploadProps = {
  file: File;
  bucket?: string;
  folder?: string;
};

export async function uploadImage({ file }: UploadProps) {
  try {
    file = await imageCompression(file, { maxSizeMB: 1 });
  } catch (error) {
    console.log("Error compressing image:", error);
    return { imageUrl: "", error: "Image compression failed" };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
    const response = await fetch(`${baseUrl}/properties/upload-media`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    const data = await response.json();
    const imageUrl = data.url.startsWith("http") ? data.url : `${baseUrl}${data.url}`;
    
    return { imageUrl, error: null };
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return { imageUrl: "", error: error.message || "Upload failed" };
  }
}

export async function uploadVideo({ file }: UploadProps) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
    const response = await fetch(`${baseUrl}/properties/upload-media`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Upload failed");
    }

    const data = await response.json();
    const videoUrl = data.url.startsWith("http") ? data.url : `${baseUrl}${data.url}`;
    
    return { videoUrl, error: null };
  } catch (error: any) {
    console.error("Error uploading video:", error);
    return { videoUrl: "", error: error.message || "Upload failed" };
  }
}
