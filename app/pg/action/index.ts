"use server";

import { createClient } from "@/utils/supabase/server";

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
      const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3005';
      const response = await fetch(`${backendUrl}/auth/login-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

export async function signup(formData: {
  email: string;
  password: string;
  role: string;
}) {
  const supabase = await createClient();

  console.log("role:", formData.role);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const form = {
  //   email: formData.email,
  //   password: formData.password,
  //   option: {
  //     data: { role: formData.role },
  //   },
  // };

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: { data: { role: formData.role } },
  });
  if (error) console.error("Error signing up:", error);

  return { data, error };
}

export async function updateDetails(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const form = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: formData.get("phone") as string,
    userid: formData.get("userId") as string,
  };
  // update th .eq to fetch the correct user id

  const { data, error } = await supabase
    .from("user")
    .update({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      iscomplete: true,
    })
    .eq("id", form.userid)
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