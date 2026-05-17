"use server";

import { headers } from "next/headers";
import { detailsSchema, signupSchema } from "../schema";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";

export async function login(formData: FormData) {
  // Login should be handled on the client using next-auth/react signIn()
  throw new Error("Use signIn('credentials') from next-auth/react on the client");
}

export async function signup(formData: {
  email: string;
  password: string;
  role: string;
}) {
  const validation = signupSchema.safeParse(formData);
  if (!validation.success) {
    console.error("Validation error:", validation.error.format());
    return { data: null, error: { message: validation.error.issues[0].message } };
  }

  const { email, password, role } = validation.data;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    const data = await res.json();
    if (!res.ok) {
      return { data: null, error: { message: data.error || "Signup failed" } };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error("Error signing up:", err);
    return { data: null, error: { message: err.message } };
  }
}

export async function updateDetails(formData: FormData) {
  // To be refactored to hit the backend directly instead of Supabase
  console.log("Refactoring needed here for updateDetails!");
  return { data: null, error: null };
}

export const logout = async () => {
  // Use signOut() from next-auth/react on the client
  throw new Error("Use signOut() from next-auth/react on the client");
};

export async function verifyOtp(formData: { email: string; otp: string }) {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) {
      return { data: null, error: { message: data.error || "Verification failed" } };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error("Error verifying OTP:", err);
    return { data: null, error: { message: err.message } };
  }
}

export async function resendOtp(formData: { email: string }) {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) {
      return { data: null, error: { message: data.error || "Failed to resend OTP" } };
    }

    return { data, error: null };
  } catch (err: any) {
    console.error("Error resending OTP:", err);
    return { data: null, error: { message: err.message } };
  }
}