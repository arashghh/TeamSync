import { supabase } from "../lib/supabaseClient.js";

/**
 * Get all teams for a specific month.
 * @param {string} roundMonth The month to filter teams by (e.g., '2025-08-01').
 * @returns {Promise<{data: Array, error: object}>} A list of teams.
 */
export const getTeamsByMonth = async (roundMonth) => {
  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("round_month", roundMonth);

  return { data, error };
};

/**
 * Get the members of a specific team.
 * It also fetches the profile name for each member.
 * @param {string} teamId The ID of the team.
 * @returns {Promise<{data: Array, error: object}>} A list of team members with their profiles.
 */
export const getTeamMembers = async (teamId) => {
  const { data, error } = await supabase
    .from("team_members")
    .select(
      `
      user_id,
      profiles ( name )
    `
    )
    .eq("team_id", teamId);

  return { data, error };
};

/**
 * Find the team a user belongs to for a specific month.
 * @param {string} userId The ID of the user.
 * @param {string} roundMonth The month to check (e.g., '2025-08-01').
 * @returns {Promise<{data: object, error: object}>} The team data.
 */
export const getUserTeamForMonth = async (userId, roundMonth) => {
  const { data, error } = await supabase
    .from("team_members")
    .select(
      `
            teams ( * )
        `
    )
    .eq("user_id", userId)
    .eq("teams.round_month", roundMonth)
    .single();

  // The result is nested, so we return the inner team object
  return { data: data?.teams, error };
};
