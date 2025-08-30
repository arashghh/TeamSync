import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import { getUserTeamForMonth } from "../services/teams.js";
import { getQuestionsForWeek } from "../services/questions.js";
import { submitAnswer } from "../services/answers.js";

const DashboardPage = () => {
  const { user, profile, signOut } = useAuth();
  const [team, setTeam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Stores answer text, e.g., { questionId: 'My answer' }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Helper function to get the current week number
  const getCurrentWeek = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const offsetDate = today.getDate() + dayOfWeek - 1;
    return Math.floor(offsetDate / 7) + 1;
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      setError("");

      const currentMonth = new Date().toISOString().slice(0, 7) + "-01"; // Format: YYYY-MM-01
      const currentWeek = getCurrentWeek();

      // Fetch both team and questions data
      Promise.all([
        getUserTeamForMonth(user.id, currentMonth),
        getQuestionsForWeek(currentMonth, currentWeek),
      ])
        .then(([teamResult, questionsResult]) => {
          if (teamResult.error) {
            setError(teamResult.error.message);
          } else {
            setTeam(teamResult.data);
          }

          if (questionsResult.error) {
            setError(questionsResult.error.message);
          } else {
            setQuestions(questionsResult.data);
          }
        })
        .catch((err) => {
          setError("An unexpected error occurred.");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const handleAnswerChange = (questionId, text) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: text,
    }));
  };

  const handleAnswerSubmit = async (questionId) => {
    const content = answers[questionId];
    if (!content || !content.trim()) {
      setError("Answer cannot be empty.");
      return;
    }

    setMessage("");
    setError("");

    const { error } = await submitAnswer(questionId, user.id, content);
    if (error) {
      setError(error.message);
    } else {
      setMessage(
        `Answer to question "${
          questions.find((q) => q.id === questionId).content
        }" submitted successfully!`
      );
      // Optionally, disable the input for the submitted answer
    }
  };

  if (loading) {
    return <div>Loading your dashboard...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Dashboard</h2>
        <button onClick={signOut}>Sign Out</button>
      </div>

      <p>Welcome, {profile ? profile.name : user?.email}!</p>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid #ccc",
          paddingTop: "20px",
        }}
      >
        <h3>Your Team</h3>
        {team ? (
          <p>
            This month's team: <strong>{team.name}</strong>
          </p>
        ) : (
          <p>You have not been assigned to a team for this month yet.</p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>This Week's Questions</h3>
        {questions.length > 0 ? (
          questions.map((question) => (
            <div
              key={question.id}
              style={{
                border: "1px solid #eee",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "5px",
              }}
            >
              <p>
                <strong>{question.content}</strong>
              </p>
              <textarea
                style={{
                  width: "100%",
                  minHeight: "80px",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
                placeholder="Type your answer here..."
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
              />
              <button
                style={{ marginTop: "10px" }}
                onClick={() => handleAnswerSubmit(question.id)}
              >
                Submit Answer
              </button>
            </div>
          ))
        ) : (
          <p>There are no questions for this week.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
