const express = require("express");
const cors = require("cors");
require("dotenv").config(); // فقط برای توسعه محلی

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the Express server!" });
});

app.get("/api/secret", (req, res) => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return res.status(500).json({ error: "Database URL not configured." });
  }
  res.json({
    message: `Successfully connected to DB at: ${dbUrl.substring(0, 20)}...`,
  });
});

// فقط برای توسعه محلی
if (process.env.NODE_ENV === "development") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Export برای Vercel serverless
module.exports = app;
