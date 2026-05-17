// ProfileImageUpload.tsx
import { Image } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { setAvatarUrl, setOpenAvatarModal } from "./gobalActions";
import { useSession } from "next-auth/react";
import { useUploadAvatarMutation, useRemoveAvatarMutation } from "@/state/api";
import { useSessionStore } from "@/app/store";

export default function ProfileImageUpload() {
  const supabase = createClient();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [removeAvatar] = useRemoveAvatarMutation();
  const currentAvatarUrl = useSessionStore((state) => state.avatarUrl);

  const displayAvatar = preview || (currentAvatarUrl ? (currentAvatarUrl.startsWith("http") || currentAvatarUrl.startsWith("blob:") ? currentAvatarUrl : `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads/${currentAvatarUrl}`) : null);

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

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", imageFile);
      
      const user = session.user as any;
      const result = await uploadAvatar({
        userId: user.id,
        role: user.role,
        data: formData
      }).unwrap();
      
      if (result && result.avatarUrl) {
        setAvatarUrl(result.avatarUrl);
      }
      
      setOpenAvatarModal(false);
    } catch (err) {
      setError("Failed to upload avatar");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!session?.user) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      const user = session.user as any;
      await removeAvatar({
        userId: user.id,
        role: user.role
      }).unwrap();
      
      setAvatarUrl(""); // Reset global state (or you can use null if your store allows it, assuming string here since setAvatarUrl takes a string)
      setPreview(null);
      setImageFile(undefined);
      setOpenAvatarModal(false);
    } catch (err) {
      setError("Failed to remove avatar");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //   https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars//572ccae5-4a48-41ba-b726-a78904f349fe.png
  return (
    <>
      <div className="profile-upload">
        <div className="avatar-preview">
          {displayAvatar ? (
            <img src={displayAvatar} alt="Profile" />
          ) : (
            <span className="">
              <Image color="#aaa" />
            </span>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px", justifyContent: "center" }}>
          <label className="upload-button" style={{ margin: 0 }}>
            Change
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
          {(currentAvatarUrl || preview) && (
            <button 
              type="button" 
              className="button-skip" 
              style={{ margin: 0, padding: "8px 16px", color: "red" }}
              onClick={handleRemoveAvatar}
              disabled={loading}
            >
              Remove
            </button>
          )}
        </div>
      </div>
      {error && <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>{error}</p>}
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
