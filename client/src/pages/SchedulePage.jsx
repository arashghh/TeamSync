import React from "react";

// A simple component for the Calendar Icon
const CalendarIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const SchedulePage = ({ setCurrentPage }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl text-center mx-auto"
      style={{ fontFamily: "sans-serif" }}
    >
      <button
        onClick={() => setCurrentPage("dashboard")}
        className="text-teal-600 hover:underline mb-4"
      >
        &larr; Back to Dashboard
      </button>
      <CalendarIcon className="w-12 h-12 mx-auto text-teal-500" />
      <h2 className="text-3xl font-bold text-gray-800 mt-4">
        Monthly Schedule
      </h2>
      <p className="text-gray-500 mt-2 max-w-md mx-auto">
        Team formations and competitions are held during the first week of every
        month. Get ready for the next challenge!
      </p>
    </div>
  );
};

export default SchedulePage;
