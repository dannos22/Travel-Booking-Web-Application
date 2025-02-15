const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");
const admin = require("./firebase");
const db = require("./db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Middleware: Verify Firebase Auth Token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token" });
  }
};

// Route: Fetch Destinations API
app.get("/destinations", verifyToken, async (req, res) => {
  try {
    const response = await axios.get(process.env.DESTINATIONS_API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch destinations" });
  }
});

// Route: Fetch Users from MySQL
app.get("/users", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
