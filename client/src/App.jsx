// src/App.js
import React, { useState } from "react";

// Import Data
import {
  MOCK_QUESTIONS,
  TEAM_NAMES_POOL,
  AVATAR_COLORS,
} from "./data/mockData";

// Import Layouts
import Sidebar from "./components/layout/Sidebar";

// Import Pages
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import QuizPage from "./pages/QuizPage";
import SchedulePage from "./pages/SchedulePage";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleLogin = (name) => {
    if (!users.includes(name)) {
      setUsers((prevUsers) => [...prevUsers, name]);
    }
    setCurrentUser(name);
    setCurrentPage("dashboard");
  };

  const handleCreateTeams = () => {
    const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
    const teamSize = Math.ceil(
      shuffledUsers.length / Math.floor(shuffledUsers.length / 2)
    );
    const newTeams = [];
    const availableNames = [...TEAM_NAMES_POOL].sort(() => 0.5 - Math.random());
    const availableColors = [...AVATAR_COLORS].sort(() => 0.5 - Math.random());

    for (let i = 0; i < shuffledUsers.length; i += teamSize) {
      const teamMembers = shuffledUsers.slice(i, i + teamSize);
      if (teamMembers.length > 0) {
        newTeams.push({
          name: availableNames.pop() || `Team ${i / teamSize + 1}`,
          members: teamMembers,
          score: 0,
          avatarColor: availableColors.pop() || "bg-gray-500",
        });
      }
    }
    setTeams(newTeams);
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
    const userTeam = teams.find((team) => team.members.includes(currentUser));

    if (userTeam && selectedOption === currentQuestion.answer) {
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.name === userTeam.name
            ? { ...team, score: team.score + 10 }
            : team
        )
      );
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const renderContent = () => {
    if (currentPage === "login") {
      return <LoginPage onLogin={handleLogin} />;
    }

    const userTeam = teams.find((team) => team.members.includes(currentUser));

    switch (currentPage) {
      case "dashboard":
        return (
          <DashboardPage
            users={users}
            teams={teams}
            handleCreateTeams={handleCreateTeams}
            setCurrentPage={setCurrentPage}
            currentUser={currentUser}
          />
        );
      case "competition":
        return (
          <QuizPage
            question={MOCK_QUESTIONS[currentQuestionIndex]}
            onAnswer={handleAnswer}
            teamName={userTeam ? userTeam.name : "N/A"}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={MOCK_QUESTIONS.length}
          />
        );
      case "schedule":
        return <SchedulePage />;
      default:
        return (
          <DashboardPage
            users={users}
            teams={teams}
            handleCreateTeams={handleCreateTeams}
            setCurrentPage={setCurrentPage}
            currentUser={currentUser}
          />
        );
    }
  };

  return (
    <div className="bg-slate-100 font-sans flex min-h-screen">
      {currentPage !== "login" && (
        <Sidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
        />
      )}
      <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
