// src/pages/QuizPage.js
import React, { useState } from "react";
import { TrophyIcon } from "../components/ui/Icons";

function QuizPage({
  question,
  onAnswer,
  teamName,
  questionNumber,
  totalQuestions,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
      setSelectedOption(null);
    }
  };

  const progressPercentage =
    totalQuestions > 0 ? (questionNumber / totalQuestions) * 100 : 0;

  if (!question) {
    return (
      <div className="text-center bg-white p-12 rounded-2xl shadow-lg transition-all transform hover:scale-105">
        <TrophyIcon className="w-16 h-16 mx-auto text-yellow-500" />
        <h2 className="mt-4 text-3xl font-bold text-slate-800">
          Competition Over!
        </h2>
        <p className="text-slate-600 mt-2">
          Great job! Check the leaderboard for the final results.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl w-full mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-teal-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-slate-500">
            Team: {teamName}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
          <div
            className="bg-teal-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
          {question.question}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`p-4 rounded-lg border-2 text-left font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 ${
              selectedOption === option
                ? "bg-teal-500 border-teal-500 text-white shadow-lg scale-105"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-teal-100 hover:border-teal-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className="w-full px-4 py-3 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none transition-all transform hover:scale-105"
      >
        Submit Answer
      </button>
    </div>
  );
}

export default QuizPage;
