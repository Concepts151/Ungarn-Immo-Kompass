"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
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
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      // Optionally: handle upload to supabase here
    }
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
                        <button onClick={() => {}} className="vl-btn1">
                          Update Profile
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
