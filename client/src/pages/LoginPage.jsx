import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import { createProfile } from "../services/profiles.js";

// A simple component for the App Logo
const AppLogo = (props) => (
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
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState(null);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSigningUp) {
        if (!name.trim()) {
          throw new Error("Name is required for sign up.");
        }
        const { data, error: signUpError } = await signUp(email, password);
        if (signUpError) throw signUpError;
        if (data.user) {
          const { error: profileError } = await createProfile(
            data.user.id,
            name
          );
          if (profileError) throw profileError;
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center w-full h-full bg-slate-100"
      style={{ minHeight: "100vh", fontFamily: "sans-serif" }}
    >
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <AppLogo className="w-12 h-12 mx-auto text-teal-500" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-800">
            Monthly Challenge
          </h2>
          <p className="mt-2 text-slate-500">
            {isSigningUp ? "Create an account to join." : "Login to continue."}
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {isSigningUp && (
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="relative block w-full px-4 py-3 text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Your Name"
              />
            </div>
          )}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative block w-full px-4 py-3 text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Email address"
            />
          </div>
          <div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full px-4 py-3 text-slate-900 placeholder-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Password"
            />
          </div>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-teal-600 border rounded-lg hover:bg-teal-700 focus:outline-none"
            >
              {isSigningUp ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="text-sm text-teal-600 hover:underline"
          >
            {isSigningUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
