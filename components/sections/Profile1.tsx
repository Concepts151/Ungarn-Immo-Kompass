"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { uploadImage } from "@/utils/supabase/storage/client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSessionStore } from "@/app/store"; // Import Zustand store

export default function Profile1() {
  const supabase = createClient();

  // Zustand actions
  const setName = useSessionStore((state) => state.setName);
  const setAvatarUrl = useSessionStore((state) => state.setAvatarUrl);

  // create necessary hooks and states
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarUrl, setAvatarUrlState] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // fetch user details from supabase
  const fetchUserDetails = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching user details:", error);
      return;
    }

    console.log("User details fetched successfully:", data.session?.user.id);
    const userId = data.session?.user.id;
    const { data: userData, error: userError } = await supabase
      .from("user")
      .select("*")
      .eq("id", userId)
      .single(); // Fetch a single user record

    console.log(userData);
    if (userError) {
      console.error("Error fetching user data:", userError);
      return;
    }
    setUser(userData);
    setAvatarUrlState(userData.avatarUrl || null);
    setEmail(userData.email);
    setPhone(userData.phone || ""); // Set phone if available, else empty string
    setFirstName(userData.firstName || ""); // Set first name if available, else empty string
    setLastName(userData.lastName || ""); // Set last name if available, else empty string
  };

  // Handle image input change and preview
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarUrlState(url);
      setAvatarFile(file);
    }
  };

  // Delete old avatar from bucket
  const deleteOldAvatar = async (avatarPath: string) => {
    if (!avatarPath) return;
    console.log("Deleting old avatar:", avatarPath);

    const { error } = await supabase.storage
      .from("avatars")
      .remove([avatarPath]);
    if (error) {
      console.error("Error deleting old avatar:", error);
    }
  };

  // Upload new avatar to bucket and update user table
  const handleUpdateProfile = async () => {
    setLoading(true);
    let newAvatarUrl = user?.avatarUrl || null;

    // Handle avatar upload if a new file is selected
    if (avatarFile) {
      // Delete old avatar if exists and is not a blob url
      if (user?.avatarUrl && !avatarUrl?.startsWith("blob:")) {
        await deleteOldAvatar(user.avatarUrl);
      }
      // Upload new avatar
      const fileExt = avatarFile.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, { upsert: true });
      if (uploadError) {
        toast.error("Failed to upload new avatar.");
        setLoading(false);
        return;
      }
      newAvatarUrl = filePath;
    }

    // Update user table
    const { error: updateError } = await supabase
      .from("user")
      .update({
        firstName,
        lastName,
        phone,
        avatarUrl: newAvatarUrl,
      })
      .eq("id", user.id);

    if (updateError) {
      toast.error("Failed to update profile.");
      setLoading(false);
      return;
    }

    // Update Zustand state
    setName(firstName);
    setAvatarUrl(
      `${newAvatarUrl}`
    );

    // Update local state
    setUser({ ...user, firstName, lastName, phone, avatarUrl: newAvatarUrl });
    setAvatarFile(null);
    // If a new avatar was uploaded, show the new image from Supabase, not the blob
    if (avatarFile) {
      setAvatarUrlState(
        `${newAvatarUrl}`
      );
    }
    toast.success("Profile updated successfully!");
    setLoading(false);
  };

  useEffect(() => {
    fetchUserDetails();

    // console.log(user);
  }, []);
  return (
    <>
      {/*===== DASHBOARD AREA STARTS =======*/}
      <div className="profile-section-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4">
              <div className="heading1">
                <h2>My Profile</h2>
                <div className="space32" />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="account-details-boxarea">
                <h4>Upload Profile Photo</h4>
                <div className="space24" />
                <div className="box-agent-avt">
                  <div className="img-poster">
                    <img
                      src={
                        avatarUrl && avatarUrl.startsWith("blob:")
                          ? avatarUrl
                          : user?.avatarUrl
                          ? `https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${user.avatarUrl}`
                          : "/assets/img/all-images/others/others-img1.png"
                      }
                      className="img-fluid"
                      alt="avatar"
                      loading="lazy"
                      style={{
                        width: "auto",
                        height: "200px",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                  <div className="content uploadfile">
                    <p>Upload a new poster</p>
                    <div className="space16" />
                    <div className="box-ip">
                      <input
                        type="file"
                        className="ip-file"
                        onChange={handleAvatarChange}
                        accept="image/png, image/jpeg"
                      />
                    </div>
                    <div className="space16" />
                    <span>PNG/JPEG (100/100)</span>
                  </div>
                </div>
                <div className="space30" />
                <div className="personal-info-area">
                  <h3>Upload Profile Photo</h3>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="space28" />
                      <div className="input-area">
                        <h5>First Name*</h5>
                        <div className="space16" />
                        <input
                          type="text"
                          value={firstName!}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="space28" />
                      <div className="input-area">
                        <h5>Last Name*</h5>
                        <div className="space16" />
                        <input
                          type="text"
                          value={lastName!}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="space28" />
                      <div className="input-area">
                        <h5>Email*</h5>
                        <div className="space16" />
                        <input
                          type="email"
                          value={email!}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email*"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="space28" />
                      <div className="input-area">
                        <h5>Phone*</h5>
                        <div className="space16" />
                        <input
                          type="number"
                          value={phone!}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Phone*"
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="space32" />
                      <div className="btn-area1 text-end">
                        <button
                          onClick={handleUpdateProfile}
                          className="vl-btn1"
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Update Profile"}
                          <span className="arrow1 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                          </span>
                          <span className="arrow2 ms-2">
                            <i className="fa-solid fa-arrow-right" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space30" />
            </div>
          </div>
        </div>
      </div>
      {/*===== DASHBOARD AREA ENDS =======*/}
    </>
  );
}
