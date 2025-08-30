import { supabase } from "../lib/supabaseClient.js";

/**
 * Get a user's profile.
 * @param {string} userId The ID of the user.
 * @returns {Promise<{data: object, error: object}>} The user's profile data.
 */
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, name")
    .eq("id", userId)
    .single(); // .single() returns one object instead of an array

  return { data, error };
};

/**
 * Create a profile for a new user.
 * This is often called after a user signs up.
 * @param {string} userId The ID of the new user.
 * @param {string} name The name of the user.
 * @returns {Promise<{data: object, error: object}>} The created profile data.
 */
export const createProfile = async (userId, name) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert([{ id: userId, name: name }])
    .select()
    .single();

  return { data, error };
};
