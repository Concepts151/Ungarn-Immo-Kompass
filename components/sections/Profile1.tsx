"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { uploadImage } from "@/utils/supabase/storage/client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Profile1() {
  // fetch user from supabase
  const supabase = createClient();
  //   create necessary hooks and states
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  //   fetch user details from supabase
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
    setAvatarUrl(userData.avatarUrl || null);
    setEmail(userData.email);
    setPhone(userData.phone || ""); // Set phone if available, else empty string
    setFirstName(userData.firstName || ""); // Set first name if available, else empty string
    setLastName(userData.lastName || ""); // Set last name if available, else empty string
  };

  // Handle image input change and preview
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  // Upload avatar to Supabase, delete old, update user table
  const handleAvatarUpload = async () => {
    if (!avatarFile || !user) return;
    try {
      // Delete old avatar if exists
      if (user.avatarUrl) {
        const { error: delError } = await supabase.storage
          .from("avatars")
          .remove([user.avatarUrl]);
        if (delError) {
          // Not fatal, just log
          console.warn("Failed to delete old avatar:", delError);
        }
      }
      // Upload new avatar
      const fileExt = avatarFile.name.split(".").pop();
      const filePath = `${user.id}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, { upsert: true });
      if (uploadError) {
        toast.error("Failed to upload new avatar.");
        return;
      }
      // Update user table
      const { error: updateError } = await supabase
        .from("user")
        .update({ avatarUrl: filePath })
        .eq("id", user.id);
      if (updateError) {
        toast.error("Failed to update user avatar.");
        return;
      }
      setUser({ ...user, avatarUrl: filePath });
      setAvatarUrl(
        `https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${filePath}`
      );
      setAvatarFile(null);
      toast.success("Profile photo updated!");
    } catch (err) {
      toast.error("Unexpected error updating avatar.");
    }
  };

  // Handle profile update (fields)
  const handleProfileUpdate = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const { error: updateError } = await supabase
        .from("user")
        .update({
          firstName,
          lastName,
          phone,
        })
        .eq("id", user.id);
      if (updateError) {
        setError("Failed to update profile.");
        toast.error("Failed to update profile.");
      } else {
        setUser({ ...user, firstName, lastName, phone });
        toast.success("Profile updated!");
      }
    } catch (err) {
      setError("Unexpected error updating profile.");
      toast.error("Unexpected error updating profile.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserDetails();
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
                        accept="image/*"
                      />
                    </div>
                    <div className="space16" />
                    <button
                      className="vl-btn1"
                      style={{ marginTop: 8 }}
                      disabled={!avatarFile}
                      onClick={handleAvatarUpload}
                    >
                      Save Photo
                    </button>
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
                          onClick={handleProfileUpdate}
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
