"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function readUserSession() {
  const session = await getServerSession(authOptions);
  return { data: { session } };
}

export async function readUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
  try {
    const res = await fetch(`${backendUrl}/buyer/${session.user.id}`, {
      headers: { "Authorization": `Bearer ${(session as any).accessToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch(e) {
    console.error(e);
  }
  return session.user;
}
