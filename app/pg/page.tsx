"use client";
import { readUser, readUserSession } from "@/utils/action";
import Login from "./components/Login";
import Register from "./components/Register";
import Signout from "./components/Signout";
import { useSessionStore } from "../store";
import SessionClient from "./components/SessionClient";
import { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "@/state/api";

export default function LoginPage() {
  const [data, setData] = useState(null);

  const { data: authUser } = useGetAuthUserQuery();

  async function fetchSessionData() {
    const { data } = await readUserSession();

    if (data.session) {
      console.log("session availabel:", data.session);
    }
    const userName = data.session?.user?.name;
    const userProfile = await readUser();

    console.log(userProfile!, userName);
  }

  useEffect(()=>{
    if(authUser){
      console.log("authUser:", authUser);
      
    }
  },[authUser])

  return (
    <div className="p-4">yo</div>
  );
}
