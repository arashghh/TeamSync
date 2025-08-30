import { supabase } from "../lib/supabaseClient.js";

/**
 * Submit an answer for a question.
 * @param {string} questionId The ID of the question being answered.
 * @param {string} userId The ID of the user submitting the answer.
 * @param {string} content The content of the answer.
 * @returns {Promise<{data: object, error: object}>} The submitted answer.
 */
export const submitAnswer = async (questionId, userId, content) => {
  const { data, error } = await supabase
    .from("answers")
    .insert([{ question_id: questionId, user_id: userId, content: content }])
    .select()
    .single();

  return { data, error };
};

/**
 * Get all answers for a specific question.
 * This can be used to evaluate answers.
 * @param {string} questionId The ID of the question.
 * @returns {Promise<{data: Array, error: object}>} A list of answers with user profiles.
 */
export const getAnswersForQuestion = async (questionId) => {
  const { data, error } = await supabase
    .from("answers")
    .select(
      `
            content,
            created_at,
            profiles ( name )
        `
    )
    .eq("question_id", questionId);

  return { data, error };
};
