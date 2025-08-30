const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Only for local development

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- CORRECTED ROUTES ---
// The "/api" prefix is removed because vercel.json handles it.
app.get("/hello", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

app.get("/secret", (req, res) => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return res.status(500).json({ error: "Database URL not configured." });
  }
  res.json({
    message: `Successfully connected to DB at: ${dbUrl.substring(0, 20)}...`,
  });
});

// This block is for local development only. Vercel ignores it.
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export for Vercel serverless functions
module.exports = app;
