"use server";

import { createClient } from "../supabase/server";

export async function readUserSession() {
  const supabase = await createClient();
  return supabase.auth.getSession();
}

export async function readUser() {
  const supabase = await createClient();

  const { data } = await supabase.from("user").select("*").single();

  return data;
}
