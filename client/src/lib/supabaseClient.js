import { createClient } from "@supabase/supabase-js";

// Correct way to access environment variables in a Vite project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Error handling for missing variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase URL and Anon Key are required. Make sure they are set in your .env.local file with VITE_ prefix."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
