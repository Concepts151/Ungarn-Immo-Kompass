// ProfileImageUpload.tsx
import { Image } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { setAvatarUrl, setOpenAvatarModal } from "./gobalActions";

export default function ProfileImageUpload() {
  const supabase = createClient();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };

  const handleUplaodImage = async () => {
    const { data, error } = await supabase.from("user").select("*").single();

    if (error) {
      setError("Failed to fetch user data");
      return;
    }

    console.log("User id:", data.id);
    console.log("Preview:", preview);
    console.log("img:", imageFile?.name);

    const fileExt = imageFile?.name.split(".")[1];
    const fileName = `${data.id}.${fileExt}`;

    console.log("File name:", fileName);

    // load the file path
    // upload the file
    if (!imageFile) {
      setError("No image file selected");
      return;
    }

    const { data: imageData, error: imageError } = await supabase.storage
      .from("avatars")
      .upload(`${fileName}`, imageFile);

    if (imageError) {
      setError("Failed to upload image");
      console.error("Upload error:", imageError);
      return;
    }
    // update user table with the image path
    const { data: imgPathdata, error: imgPathError } = await supabase
      .from("user")
      .update({
        avatarUrl: `/${fileName}`,
      })
      .eq("id", data.id)
      .select();

    // setAvatarUrl(`/${fileName}`);
    console.log(imgPathdata![0].avatarUrl);

    

    setOpenAvatarModal(false);
  };

  //   https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars//572ccae5-4a48-41ba-b726-a78904f349fe.png
  return (
    <>
      <div className="profile-upload">
        <div className="avatar-preview">
          {preview ? (
            <img src={preview} alt="Profile" />
          ) : (
            <span className="">
              <Image color="#aaa" />
            </span>
          )}
        </div>

        <label className="upload-button">
          Change
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>
      <button
        type="button"
        className="button-submit"
        disabled={loading}
        onClick={handleUplaodImage}
      >
        {loading ? "Setting up..." : "Done"}
      </button>
      <button
        type="button"
        className="button-skip"
        disabled={loading}
        onClick={() => setPreview(null)}
      >
        {loading ? "Setting up..." : "skip"}
      </button>
    </>
  );
}
