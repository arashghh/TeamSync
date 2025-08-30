import { supabase } from "../lib/supabaseClient.js";

/**
 * Get all questions for a specific week and month.
 * @param {string} roundMonth The month to filter by (e.g., '2025-08-01').
 * @param {number} week The week number to filter by.
 * @returns {Promise<{data: Array, error: object}>} A list of questions.
 */
export const getQuestionsForWeek = async (roundMonth, week) => {
  const { data, error } = await supabase
    .from("questions")
    .select("id, content, week")
    .eq("round_month", roundMonth)
    .eq("week", week);

  return { data, error };
};
