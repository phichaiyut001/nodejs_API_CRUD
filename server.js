import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";

const app = express();

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));

let conn = null;

const initMysql = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "camp",
  });
};

app.get("/testdb", async (req, res) => {
  try {
    const result = await conn.query("SELECT * FROM users");
    res.json(result[0]);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.get("/api", (req, res) => {
  res.json({ car: ["mercedes", "BMV", "Tesla"] });
});

const PORT = 8080;

app.listen(PORT, async () => {
  await initMysql();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
