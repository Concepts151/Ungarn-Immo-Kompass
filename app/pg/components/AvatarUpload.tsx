// ProfileImageUpload.tsx
import { Image } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { setAvatarUrl, setOpenAvatarModal } from "./gobalActions";
import { useSession } from "next-auth/react";

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

  const { data: session } = useSession();

  const handleUplaodImage = async () => {
    if (!session?.user) {
      setError("User not authenticated");
      return;
    }

    if (!imageFile) {
      setError("No image file selected");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", imageFile);

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
      const userRole = session.user.role === "SELLER" ? "seller" : "buyer";
      const response = await fetch(`${baseUrl}/${userRole}/${session.user.id}/avatar`, {
        method: "POST",
        body: formData,
        // Assuming we might need Authorization header if protected route
        headers: {
          "Authorization": `Bearer ${session.accessToken || session.user.id}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to upload avatar");
      }

      const data = await response.json();
      setAvatarUrl(data.avatarUrl);
      setOpenAvatarModal(false);
    } catch (err: any) {
      setError(err.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  //   ${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads//572ccae5-4a48-41ba-b726-a78904f349fe.png
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
        onClick={() => setOpenAvatarModal(false)}
      >
        {loading ? "Setting up..." : "Skip"}
      </button>
    </>
  );
}
