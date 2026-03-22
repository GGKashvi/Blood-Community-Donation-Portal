const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blood_portal"
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Database connected");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Blood Donation Portal Server Running");
});

// Register User API
app.post("/register", (req, res) => {
  const { name, email, password, role, city } = req.body;

  const sql = "INSERT INTO users (name, email, password, role, city) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, password, role, city], (err, result) => {
    if (err) {
      console.log(err);
      return res.json("Error");
    }
    res.json("User Registered Successfully");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});