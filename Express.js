// Import required modules
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

// Create an Express application
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from different domains
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Create a MySQL connection (not a pool, but a single connection)
const db = mysql.createConnection({
  host: process.env.DB_HOST,   // Database host
  user: process.env.DB_USER,   // Database user
  password: process.env.DB_PASS, // Database password
  database: process.env.DB_NAME, // Database name
});

// Establish database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err); // Log error if connection fails
  } else {
    console.log("Connected to MySQL Database"); // Success message
  }
});

// Example API Route: Fetch all destinations from the database
app.get("/api/destinations", (req, res) => {
  db.query("SELECT * FROM destinations", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" }); // Return error response
    }
    res.json(results); // Return database query results as JSON
  });
});

// Define the port for the server, using environment variable or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
