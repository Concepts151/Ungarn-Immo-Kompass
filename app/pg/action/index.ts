"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const form = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data, error } = await supabase.auth.signInWithPassword(form);
  if (error) {
    console.error("Error logging in:", error);
    return { data, error };
  }

  // Send login notification and enforce single-device login
  if (data?.user?.id && data?.session) {
    try {
      // Get user's IP and user agent from request headers
      const headersList = await headers();
      const userAgent = headersList.get("user-agent") || undefined;
      const forwardedFor = headersList.get("x-forwarded-for");
      const realIp = headersList.get("x-real-ip");

      // Use forwarded IP if available, otherwise use real IP
      const ipAddress = forwardedFor || realIp || undefined;

      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005';
      const response = await fetch(`${backendUrl}/auth/login-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Forward the user's headers to the backend
          ...(userAgent && { 'X-User-Agent': userAgent }),
          ...(ipAddress && { 'X-Forwarded-For': ipAddress }),
        },
        body: JSON.stringify({
          userId: data.user.id,
          sessionId: data.session.access_token, // Use access token as session identifier
        }),
      });

      const result = await response.json();

      if (result.terminatedSessions > 0) {
        console.log(`🔒 [Single-Device] Terminated ${result.terminatedSessions} other device(s)`);
      }
    } catch (emailError) {
      // Login still succeeds even if session tracking fails
      console.error("Failed to trigger login notification:", emailError);
    }
  }

  return { data, error };
}

import { detailsSchema, signupSchema } from "../schema";

export async function signup(formData: {
  email: string;
  password: string;
  role: string;
}) {
  const supabase = await createClient();

  // Validate input with Zod
  const validation = signupSchema.safeParse(formData);
  if (!validation.success) {
    console.error("Validation error:", validation.error.format());
    return { data: null, error: { message: validation.error.issues[0].message } };
  }

  const { email, password, role } = validation.data;

  console.log("role:", role);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role } },
  });
  if (error) console.error("Error signing up:", error);

  return { data, error };
}

export async function updateDetails(formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: formData.get("phone") as string,
    userid: formData.get("userId") as string,
  };

  // Validate input with Zod (excluding userid as it's not in the details schema)
  const validation = detailsSchema.safeParse({
    firstName: rawData.firstName,
    lastName: rawData.lastName,
    phone: rawData.phone,
  });

  if (!validation.success) {
    console.error("Validation error:", validation.error.format());
    return { data: null, error: { message: validation.error.issues[0].message } };
  }

  const { firstName, lastName, phone } = validation.data;

  const { data, error } = await supabase
    .from("user")
    .update({
      firstName,
      lastName,
      phone,
      iscomplete: true,
    })
    .eq("id", rawData.userid)
    .select();

  if (error) console.error("Error updating user details:", error);

  return { data, error };
}

// export const logout = async () => {
//   const supabase = await createClient();
//   await supabase.auth.signOut();
// };

export const logout = async () => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error logging out:", error);
  return { error };
};