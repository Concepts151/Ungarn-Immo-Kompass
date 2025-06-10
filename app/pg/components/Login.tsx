"use client";
import React, { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { setOpenLoginModal } from "./gobalActions";

interface Prop {
  user: any;
}

const Login = ({ user }: Prop) => {
  const openModal = () => {
    if (!user) {
      setOpenLoginModal(true);
      return;
    }
    // alert("session in session :)");
  };

  useEffect(() => {
    if (!user) {
      setOpenLoginModal(true);
      return;
    }
  }, []);
  return (
    <div>
      <button onClick={openModal} className="login-open-button container">
        Login
      </button>
      <LoginModal />
    </div>
  );
};

export default Login;
