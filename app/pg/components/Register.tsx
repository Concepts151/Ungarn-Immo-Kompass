"use client";
import React, { useState } from "react";
import RegisterModal from "./RegisterModal";
import { useToggleModal } from "@/app/store";
import { setOpenSignupModal } from "./gobalActions";

const Register = () => {
  return (
    <div>
      register
      <button
        onClick={() => setOpenSignupModal(true)}
        className="login-open-button container"
      >
        Sign up
      </button>
      <RegisterModal />
    </div>
  );
};

export default Register;
