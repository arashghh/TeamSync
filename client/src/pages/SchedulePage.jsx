// src/pages/SchedulePage.js
import React from "react";
import { CalendarIcon } from "../components/ui/Icons";

function SchedulePage() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl text-center">
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
}

export default SchedulePage;
