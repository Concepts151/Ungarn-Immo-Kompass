import React, { useEffect, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";
import { uploadImage } from "@/utils/supabase/storage/client";

type ImageUpdaterProps = {
  listingImages: any;
  listingId: any;
  fetchListings: () => void;
};

const ImageUpdater = ({
  listingImages,
  listingId,
  fetchListings,
}: ImageUpdaterProps) => {
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  // upload images
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      if (listingImages.length + imageUrls.length + newImageUrls.length > 10) {
        toast.error("You can only upload up to 10 images in total.");
        return;
      }
      setImageUrls([...imageUrls, ...newImageUrls]);
    }
  };

  const handleClickUploadImageButton = () => {
    startTransition(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("You must be logged in to upload images.");
        return;
      }

      for (const url of imageUrls) {
        const imageFile = await convertBlobUrlToFile(url);

        const { imageUrl, error } = await uploadImage({
          file: imageFile,
          bucket: "listings",
          folder: listingId!,
        });

        if (error) {
          toast.error("Failed to upload image.");
          return;
        }

        await addRecordToMediaTable(imageUrl);
      }

      setImages((prev) => [...prev, ...imageUrls]);
      toast.success("Images uploaded successfully!");
      setImageUrls([]); // Clear the image URLs after upload
    });
  };

  async function convertBlobUrlToFile(blobUrl: string): Promise<File> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const fileName = Math.random().toString(36).slice(2, 9); // Generate a random file name
    const mineType = blob.type || "application/octet-stream"; // Default to jpeg if type is not available
    const file = new File([blob], `${fileName}.${mineType.split("/")[1]}`, {
      type: mineType,
    });
    return file;
  }

  async function addRecordToMediaTable(url: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not authenticated");
      toast.error("You must be logged in to upload images.");
      return;
    }

    if (!listingId) {
      console.error("Listing ID is not set");
      toast.error("Listing ID is required to upload images.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("expose_media")
        .insert([
          {
            expose_id: listingId, // Assuming `listingId` is the ID of the property
            url: url, // Add the URL to the `imageUrl` column
            media_type: "image", // Assuming the media type is an image
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting media data:", error);
        toast.error("Failed to add image to media table.");
        return;
      }

      console.log("Media Insert Data:", data);
    } catch (error) {
      console.error("Error inserting media data:", error);
      toast.error("An error occurred while adding image to media table.");
    }
  }

  const deleteImageFromUrl = async (publicUrl: string) => {
    console.log(publicUrl);
    const isBlob = publicUrl.includes("blob:");
    if (isBlob) {
      setImages((prev) => prev.filter((img) => img !== publicUrl));
      return;
    }

    try {
      // Step 1: Strip the base URL and extract bucket + path
      const baseUrl =
        "https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/";
      if (!publicUrl.startsWith(baseUrl)) {
        throw new Error("URL is not from expected Supabase Storage base.");
      }

      const relativePath = publicUrl.replace(baseUrl, ""); // listings/.../image.jpeg

      const bucketName = relativePath.split("/")[0]; // "listings"
      const filePath = relativePath.substring(bucketName.length + 1); // everything after "listings/"

      // Step 2: Delete the file
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (error) {
        console.error("Failed to delete image:", error.message);
        return false;
      }

      console.log("Image deleted successfully");
      return true;
    } catch (err) {
      console.error("Invalid or unexpected Supabase URL:", err);
      return false;
    }
  };

  const handleDeleteFetchedImage = async (url: string) => {
    if (!listingId) {
      toast.error("Listing ID is required to delete images.");
      return;
    }

    try {
      const { error } = await supabase
        .from("expose_media")
        .delete()
        .eq("expose_id", listingId)
        .eq("url", url);

      if (error) {
        toast.error("Failed to delete image.");
        return;
      }

      deleteImageFromUrl(url);
      setImages((prev) => prev.filter((img) => img !== url));
      toast.success("Image deleted successfully.");
    } catch {
      toast.error("An error occurred while deleting the image.");
    }
  };

  useEffect(() => {
    setImages(listingImages);
  }, []);
  return (
    <>
      {JSON.stringify(listingId)}
      {JSON.stringify(imageUrls)}
      <div className="tab-content">
        <div className="img_container">
          {Array.isArray(images) && images.length > 0 ? (
            images.map((image: string, index: number) => (
              <div className="img-wrapper" key={index}>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteFetchedImage(image)} // you can define this function
                  type="button"
                >
                  &times;
                </button>
                <img src={image} alt={`Listing Image ${index + 1}`} />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="space10"></div>
        <div className="">
          <p className="" style={{ fontWeight: "bold" }}>
            upload
          </p>
          <div className="">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="mt-4">
              <button
                className="px-4 py-1 rounded btn btn-secondary"
                onClick={handleClickUploadImageButton}
              >
                upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpdater;
