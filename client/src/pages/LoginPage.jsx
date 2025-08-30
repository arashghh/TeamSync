// src/pages/LoginPage.js
import React, { useState } from "react";
import { AppLogo } from "../components/ui/Icons";

function LoginPage({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
      setName("");
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-xl transition-all">
        <div className="text-center">
          <AppLogo className="w-12 h-12 mx-auto text-teal-500" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
            Monthly Challenge
          </h2>
          <p className="mt-2 text-slate-500">
            Enter your name to join the competition.
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="sr-only">
              {" "}
              Your Name{" "}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="relative block w-full px-4 py-3 text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm transition-all"
              placeholder="Your Name"
            />
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-teal-600 border border-transparent rounded-lg group hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform hover:scale-105"
            >
              Sign Up & Participate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
