import React, { createContext, useContext, useState, useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  useNavigate,
} from "react-router-dom";

// --- Mock Data ---
const MOCK_QUESTIONS = [
  {
    question: "پایتخت ایران کدام شهر است؟",
    options: ["اصفهان", "شیراز", "تهران", "مشهد"],
    answer: "تهران",
  },
  {
    question: "کدام سیاره به 'سیاره سرخ' معروف است؟",
    options: ["مریخ", "زهره", "مشتری", "زمین"],
    answer: "مریخ",
  },
  {
    question: "بزرگترین اقیانوس جهان کدام است؟",
    options: [
      "اقیانوس اطلس",
      "اقیانوس هند",
      "اقیانوس آرام",
      "اقیانوس منجمد شمالی",
    ],
    answer: "اقیانوس آرام",
  },
];
const TEAM_NAMES_POOL = ["شیرها", "عقاب‌ها", "ببرها", "گرگ‌ها", "پلنگ‌ها"];
const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
];

// --- 1. App Context ---
const AppContext = createContext(null);

// --- 2. App Provider Component ---
function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleLogin = (name) => {
    if (name && !users.some((user) => user.name === name)) {
      const color = AVATAR_COLORS[users.length % AVATAR_COLORS.length];
      setUsers((prev) => [...prev, { name, color }]);
    }
    setCurrentUser(name);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // Optional: reset all state on logout
    // setUsers([]);
    // setTeams([]);
    // setCurrentQuestionIndex(0);
  };

  const handleCreateTeams = () => {
    const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
    const numTeams = Math.floor(shuffledUsers.length / 2) || 1;
    const teamSize = Math.ceil(shuffledUsers.length / numTeams);
    const newTeams = [];
    const availableNames = [...TEAM_NAMES_POOL].sort(() => 0.5 - Math.random());

    for (let i = 0; i < numTeams; i++) {
      const teamMembers = shuffledUsers.slice(i * teamSize, (i + 1) * teamSize);
      if (teamMembers.length > 0) {
        newTeams.push({
          name: availableNames.pop() || `Team ${i + 1}`,
          members: teamMembers.map((u) => u.name),
          score: 0,
          avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
        });
      }
    }
    setTeams(newTeams);
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (selectedOption) => {
    const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
    if (!currentQuestion) return;

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
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const userTeam = useMemo(
    () => teams.find((team) => team.members.includes(currentUser)),
    [teams, currentUser]
  );

  const isQuizFinished = currentQuestionIndex >= MOCK_QUESTIONS.length;

  const value = {
    currentUser,
    users,
    teams,
    currentQuestionIndex,
    handleLogin,
    handleLogout,
    handleCreateTeams,
    handleAnswer,
    userTeam,
    question: MOCK_QUESTIONS[currentQuestionIndex],
    totalQuestions: MOCK_QUESTIONS.length,
    isQuizFinished,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// --- 3. Custom Hook for Context ---
const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};

// --- UI Components ---
const HomeIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    />
  </svg>
);
const TrophyIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 18.75h-9a9.75 9.75 0 0 1 9 0Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.375 10.5c.75.025 1.5.075 2.25.15a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75c.75-.075 1.5-.125 2.25-.15m10.5 0a9.75 9.75 0 0 0-10.5 0"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3Z"
    />
  </svg>
);
const CalendarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18"
    />
  </svg>
);
const AppLogo = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.4-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.4-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.4 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.745 3.745 0 0 1 12 3c1.268 0 2.4.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
    />
  </svg>
);
const LogoutIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
    />
  </svg>
);

function Sidebar() {
  const { currentUser, handleLogout } = useAppContext();
  const navItems = [
    { path: "/", label: "Dashboard", icon: HomeIcon },
    { path: "/competition", label: "Competition", icon: TrophyIcon },
    { path: "/schedule", label: "Schedule", icon: CalendarIcon },
  ];
  const linkClasses =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-semibold";
  const activeClasses = "bg-teal-50 text-teal-600";
  const inactiveClasses =
    "text-slate-500 hover:bg-slate-100 hover:text-slate-800";

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-sm border-r border-slate-200 h-screen p-6 flex flex-col flex-shrink-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
          <AppLogo className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-800">TeamSync</h1>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${linkClasses} ${isActive ? activeClasses : inactiveClasses}`
                }
                end
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`w-5 h-5 ${isActive ? "text-teal-500" : ""}`}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="p-4 bg-slate-100 rounded-lg text-center mb-4">
          <p className="text-sm font-semibold text-slate-700">Signed in as</p>
          <p className="text-teal-600 font-bold truncate">{currentUser}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          <LogoutIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

// --- Page Components ---

function LoginPage() {
  const [name, setName] = useState("");
  const { handleLogin } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      handleLogin(name.trim());
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
      <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <AppLogo className="w-9 h-9 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        Welcome to TeamSync
      </h1>
      <p className="text-slate-500 mb-8">Enter your name to join the session</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Join
        </button>
      </form>
    </div>
  );
}

function DashboardPage() {
  const { users, teams, handleCreateTeams, currentUser } = useAppContext();
  const sortedTeams = useMemo(
    () => [...teams].sort((a, b) => b.score - a.score),
    [teams]
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-slate-700 mb-4">
            Participants ({users.length})
          </h2>
          <ul className="space-y-3">
            {users.map((user, index) => (
              <li key={index} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className={`font-semibold ${
                    user.name === currentUser
                      ? "text-teal-600"
                      : "text-slate-600"
                  }`}
                >
                  {user.name} {user.name === currentUser && "(You)"}
                </span>
              </li>
            ))}
          </ul>
          {users.length >= 2 && teams.length === 0 && (
            <button
              onClick={handleCreateTeams}
              className="w-full mt-6 bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Create Teams
            </button>
          )}
        </div>
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-slate-700 mb-4">Teams</h2>
          {teams.length > 0 ? (
            <ul className="space-y-4">
              {sortedTeams.map((team, index) => (
                <li
                  key={team.name}
                  className="p-4 border border-slate-200 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${team.avatarColor} flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {index + 1}
                      </div>
                      <span className="font-bold text-slate-800">
                        {team.name}
                      </span>
                    </div>
                    <span className="font-bold text-teal-600 text-lg">
                      {team.score} pts
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 ml-11">
                    Members: {team.members.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-500">
                No teams created yet. <br /> Need at least 2 participants.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuizPage() {
  const {
    question,
    handleAnswer,
    userTeam,
    currentQuestionIndex,
    totalQuestions,
    isQuizFinished,
  } = useAppContext();
  const navigate = useNavigate();

  if (isQuizFinished) {
    return <Navigate to="/competition/results" replace />;
  }

  if (!userTeam) {
    return (
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Waiting for Teams
        </h2>
        <p className="text-slate-500">
          Teams haven't been created yet. Please go back to the dashboard.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm font-semibold text-slate-500">
          Team: <span className="text-teal-600 font-bold">{userTeam.name}</span>
        </div>
        <div className="text-sm font-semibold text-slate-500">
          Question{" "}
          <span className="text-teal-600 font-bold">
            {currentQuestionIndex + 1}
          </span>{" "}
          of {totalQuestions}
        </div>
      </div>
      <div className="bg-slate-100 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-bold text-center text-slate-800">
          {question.question}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="w-full p-4 text-left font-semibold text-slate-700 bg-slate-50 border-2 border-transparent rounded-lg hover:bg-teal-50 hover:border-teal-500 transition-all duration-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuizResultPage() {
  const { teams } = useAppContext();
  const navigate = useNavigate();
  const sortedTeams = useMemo(
    () => [...teams].sort((a, b) => b.score - a.score),
    [teams]
  );
  const winner = sortedTeams[0];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
      <TrophyIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Quiz Finished!</h1>
      {winner && (
        <p className="text-xl text-slate-600 mb-6">
          Winner: <span className="font-bold text-teal-600">{winner.name}</span>
        </p>
      )}
      <div className="space-y-4 mb-8">
        {sortedTeams.map((team, index) => (
          <div
            key={team.name}
            className="flex justify-between items-center p-4 bg-slate-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span
                className={`font-bold text-lg ${
                  index === 0 ? "text-yellow-500" : "text-slate-400"
                }`}
              >
                #{index + 1}
              </span>
              <span className="font-semibold text-slate-700">{team.name}</span>
            </div>
            <span className="font-bold text-teal-600">{team.score} pts</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-teal-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-600 transition-colors"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

function SchedulePage() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
      <CalendarIcon className="w-16 h-16 text-teal-500 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-slate-800">Schedule</h1>
      <p className="mt-4 text-slate-500">
        This page is a placeholder for future features.
      </p>
    </div>
  );
}

// --- App Structure & Routing ---

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAppContext();
  return currentUser ? children : <Navigate to="/login" replace />;
};

function AppLayout() {
  const { currentUser } = useAppContext();
  return (
    <div className="bg-slate-50 font-sans flex min-h-screen">
      {currentUser && <Sidebar />}
      <main className="flex-grow p-4 md:p-8 flex items-center justify-center">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/competition"
            element={
              <PrivateRoute>
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/competition/results"
            element={
              <PrivateRoute>
                <QuizResultPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <SchedulePage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={currentUser ? "/" : "/login"} replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

// --- Main App Component ---
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
