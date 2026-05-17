"use client";
import React, { useState, useEffect } from "react";
import { useGetAuthUserQuery, useUpdateUserMutation, useUploadAvatarMutation, useRemoveAvatarMutation } from "@/state/api";
import { useSession } from "next-auth/react";
import { useSessionStore } from "@/app/store";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function Profile1() {
  const t = useTranslations("ProfilePage");
  const { data: session } = useSession();
  const { data: authData, isLoading: isAuthLoading } = useGetAuthUserQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [uploadAvatar, { isLoading: isUploadingAvatar }] = useUploadAvatarMutation();
  const [removeAvatar, { isLoading: isRemovingAvatar }] = useRemoveAvatarMutation();

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

  const handleRemoveAvatar = async () => {
    if (!authData?.user?.id) return;
    
    try {
      await removeAvatar({
        userId: authData.user.id,
        role: authData.userRole,
      }).unwrap();
      
      setAvatarUrlState(null);
      setAvatarFile(null);
      setAvatarUrl(""); // Reset global Zustand state
      toast.success(t("success") || "Avatar removed successfully");
    } catch (err) {
      toast.error(t("error") || "Failed to remove avatar");
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

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        
        const avatarResult = await uploadAvatar({
          userId: authData.user.id,
          role: authData.userRole,
          data: formData
        }).unwrap();
        
        setAvatarUrl(avatarResult.avatarUrl);
      }

      setName(firstName);
      toast.success(t("success"));
    } catch (err) {
      toast.error(t("error"));
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
                <h2>{t("title")}</h2>
                <div className="space32" />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="account-details-boxarea">
                <h4>{t("upload_photo")}</h4>
                <div className="space24" />
                <div className="box-agent-avt">
                  <div className="img-poster">
                    <img
                      src={
                        avatarUrl && avatarUrl.startsWith("blob:")
                          ? avatarUrl
                          : authData?.user?.avatarUrl
                          ? authData.user.avatarUrl.startsWith("http")
                            ? authData.user.avatarUrl
                            : `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads/${authData.user.avatarUrl}`
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
                    <p>{t("upload_new_poster")}</p>
                    <div className="space16" />
                    <div className="space16" />
                    <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                      <div className="box-ip" style={{ marginBottom: 0, width: "auto" }}>
                        <input
                          type="file"
                          className="ip-file"
                          onChange={handleAvatarChange}
                          accept="image/png, image/jpeg"
                        />
                      </div>
                      {(avatarUrl || authData?.user?.avatarUrl) && (
                        <button
                          type="button"
                          style={{ padding: "12px 24px", backgroundColor: "#dc3545", color: "white", fontSize: "16px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}
                          onClick={handleRemoveAvatar}
                          disabled={isRemovingAvatar || isUploadingAvatar}
                        >
                          {isRemovingAvatar ? t("updating") : "Remove"}
                        </button>
                      )}
                    </div>
                    <div className="space16" />
                    <span>{t("png_jpeg")}</span>
                  </div>
                </div>
                <div className="space30" />
                <div className="personal-info-area">
                  <h3>{t("upload_photo")}</h3>
                  <div className="row">
                    <div className="col-lg-4 col-md-6">
                      <div className="space28" />
                      <div className="input-area">
                        <h5>{t("first_name")}</h5>
                        <div className="space16" />
                        <input
                          type="text"
                          value={firstName!}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={t("first_name")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="space28" />
                      <div className="input-area">
                        <h5>{t("last_name")}</h5>
                        <div className="space16" />
                        <input
                          type="text"
                          value={lastName!}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={t("last_name")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="space28" />
                      <div className="input-area">
                        <h5>{t("email")}</h5>
                        <div className="space16" />
                        <input
                          type="email"
                          value={email!}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t("email")}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                      <div className="space28" />
                      <div className="input-area">
                        <h5>{t("phone")}</h5>
                        <div className="space16" />
                        <input
                          type="number"
                          value={phone!}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t("phone")}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="space32" />
                      <div className="btn-area1 text-end">
                        <button
                          onClick={handleUpdateProfile}
                          className="vl-btn1"
                          disabled={isUpdating || isUploadingAvatar}
                        >
                          {isUpdating || isUploadingAvatar ? t("updating") : t("update_profile")}
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
