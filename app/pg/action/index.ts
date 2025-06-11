"use server"

import { createClient } from "@/utils/supabase/server"

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const form = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { data, error } = await supabase.auth.signInWithPassword(form)
  if (error) console.error("Error logging in:", error)

  return { data, error }
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const form = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        name: formData.get("name") as string,
      },
    },
  }

  const { data, error } = await supabase.auth.signUp(form)
  if (error) console.error("Error signing up:", error)

  return { data, error }
}

export const logout = async () => {
  const supabase = await createClient()
  supabase.auth.signOut()
}
