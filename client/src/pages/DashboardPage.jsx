// src/pages/DashboardPage.js
import React from "react";

function DashboardPage({
  users,
  teams,
  handleCreateTeams,
  setCurrentPage,
  currentUser,
}) {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const userTeam = teams.find((team) => team.members.includes(currentUser));
  const competitionStarted = teams.length > 0;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-slate-500 mt-1">
            Welcome back,{" "}
            <span className="font-semibold text-teal-600">{currentUser}</span>!
          </p>
        </div>
        <div className="flex items-center gap-4">
          {!competitionStarted && (
            <button
              onClick={handleCreateTeams}
              className="bg-green-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 disabled:bg-slate-400 disabled:transform-none"
              disabled={users.length < 2}
            >
              Create Teams
            </button>
          )}
          {competitionStarted && userTeam && (
            <button
              onClick={() => setCurrentPage("competition")}
              className="bg-teal-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-teal-600 transition-all transform hover:scale-105"
            >
              Go to Quiz!
            </button>
          )}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {!competitionStarted ? (
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">
              Registered Users ({users.length})
            </h3>
            <div className="flex flex-wrap gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              {users.map((user) => (
                <span
                  key={user}
                  className="bg-slate-200 text-slate-800 text-sm font-medium px-3 py-1.5 rounded-full"
                >
                  {user}
                </span>
              ))}
            </div>
            {users.length < 2 && (
              <p className="text-sm text-red-500 mt-4">
                You need at least 2 users to create teams and start the
                competition.
              </p>
            )}
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Leaderboard
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      Team
                    </th>
                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      Members
                    </th>
                    <th className="p-4 text-sm font-semibold text-slate-500 uppercase tracking-wider text-right">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTeams.map((team, index) => (
                    <tr
                      key={index}
                      className={`border-b border-slate-100 transition-colors ${
                        index === 0 ? "bg-amber-50" : "hover:bg-slate-50"
                      } ${team.name === userTeam?.name ? "bg-teal-50" : ""}`}
                    >
                      <td className="p-4 font-bold text-lg text-slate-700 text-center w-16">
                        {index === 0 ? "🏆" : index + 1}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 ${team.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                          >
                            {team.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {team.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-500">
                        {team.members.join(", ")}
                      </td>
                      <td className="p-4 font-bold text-slate-800 text-lg text-right">
                        {team.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
