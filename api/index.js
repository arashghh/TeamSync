// api/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // To use .env variables locally

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// A simple test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

// Example route using an environment variable
app.get("/api/secret", (req, res) => {
  // This variable will be set in Vercel's UI for production
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return res.status(500).json({ error: "Database URL not configured." });
  }
  res.json({
    message: `Successfully connected to DB at: ${dbUrl.substring(0, 20)}...`,
  });
});

// Vercel handles the listening part, but for local dev we need this:
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export the app for Vercel's serverless environment
module.exports = app;
