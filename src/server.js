
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "movie_booking_cineverse",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
async function testDatabaseConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Connected to MySQL successfully!");
    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
  }
}

testDatabaseConnection();

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Backend server is running!",
    status: 200,
  });
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    // Do not expose password hashes through this endpoint
    const [users] = await db.query(
      `SELECT id, name, email, phone, role, status, created_at
       FROM users
       ORDER BY id DESC`
    );

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("User query error:", error.message);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
});

// Get all movies
app.get("/api/movies", async (req, res) => {
  try {
    const [movies] = await db.query(
      "SELECT * FROM movies ORDER BY id DESC"
    );

    res.json(movies);
  } catch (error) {
    console.error("Movie query error:", error.message);

    res.status(500).json({
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
});

// Start server
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
