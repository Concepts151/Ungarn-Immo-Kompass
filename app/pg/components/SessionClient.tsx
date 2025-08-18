"use client";
import { useSessionStore } from "@/app/store";
import React, { useEffect } from "react";

const SessionClient = ({ session }: { session: any }) => {
  const setSession = useSessionStore((state) => state.setSession);
  useEffect(() => {
    if (session) setSession(session);
    // alert("session")
  }, [session, setSession]);

  return <div></div>;
};

export default SessionClient;
