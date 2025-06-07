"use client";
import React, { useEffect, useState } from "react";
import LoginModal from "./LoginModal";

interface Prop {
  user: any;
}

const Login = ({ user }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    if (!user) {
      setIsOpen(true);
      return;
    }
    alert("session in session :)");

    closeModal();
  };
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (!user) {
      setIsOpen(true);
      return;
    }
  }, []);
  return (
    <div>
      {JSON.stringify(user, null, 2)}
      <button onClick={openModal} className="login-open-button container">
        Login
      </button>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Login;
