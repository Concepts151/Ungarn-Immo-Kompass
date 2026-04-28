"use client";
import React, { useState, useEffect } from "react";
import { useGetAuthUserQuery, useUpdateUserMutation } from "@/state/api";
import { useSession } from "next-auth/react";
import { useSessionStore } from "@/app/store";
import toast from "react-hot-toast";

export default function Profile1() {
  const { data: session } = useSession();
  const { data: authData, isLoading: isAuthLoading } = useGetAuthUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const setName = useSessionStore((state) => state.setName);
  const setAvatarUrl = useSessionStore((state) => state.setAvatarUrl);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarUrl, setAvatarUrlState] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (authData?.user) {
      const userData = authData.user;
      setAvatarUrlState(userData.avatarUrl || null);
      setEmail(userData.email);
      setPhone(userData.phone || "");
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
    }
  }, [authData]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarUrlState(url);
      setAvatarFile(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!authData?.user?.id) return;

    try {
      const updateData = {
        firstName,
        lastName,
        phone,
        // TODO: Handle avatar upload to backend
      };

      await updateUser({
        userId: authData.user.id,
        role: authData.userRole,
        data: updateData
      }).unwrap();

      setName(firstName);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile.");
    }
  };

  if (isAuthLoading) return <div>Loading...</div>;
  
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
                          : authData?.user?.avatarUrl
                          ? `https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${authData.user.avatarUrl}`
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
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Update Profile"}
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
