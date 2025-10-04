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
  if (error) console.error("Error logging in:", error);

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

export const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
