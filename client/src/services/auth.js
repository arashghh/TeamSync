import { supabase } from "../lib/supabaseClient";

// ثبت نام
export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) throw error;

  // پروفایل بساز
  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      name,
    });
  }

  return data;
}

// ورود
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// خروج
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
