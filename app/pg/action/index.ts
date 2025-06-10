"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: logindata, error } = await supabase.auth.signInWithPassword(
    data
  );

  console.log(logindata);

  return { error, logindata };
  //   if (error) {
  //     redirect('/error')
  //   }

  //   revalidatePath('/', 'layout')
  //   redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  console.log(formData);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
      },
    },
  };

  //   const { error } = await supabase.auth.signUp(data);
  const result = await supabase.auth.signUp(data);
  const error = result.error;
  console.log(result.data.user);
  const user = result.data.user;

  if (error) {
    console.error("Error signing up:", error);

    return;
  }
  //   else {
  //     const { data: userdata, error: profileError } = await supabase
  //       .from("user")
  //       .update({ firstName: formData.get("name") as string })
  //       .eq("id", user?.id)
  //       .select();

  //     if (profileError) {
  //       console.error("Error inserting profile:", profileError);
  //     } else {
  //       console.log("User signed up and profile created successfully!");
  //       console.log(userdata);
  //     }

  //     return error;
  //   }

  //   if (error) {
  //     redirect('/error')
  //   }

  //   revalidatePath('/', 'layout')
  //   redirect('/')
}

export const logout = async () => {
  const supabase = await createClient();
  supabase.auth.signOut();
  //redirect and all
};
