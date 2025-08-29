// client/src/App.jsx
import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // The Vite proxy will redirect this to http://localhost:3001/api/hello
    // In production, Vercel rewrites will handle this.
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Frontend says:</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
