import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";

const app = express();

const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));
app.use(bodyParser.json());
let conn = null;

const initMysql = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "camp",
  });
};

app.get("/users", async (req, res) => {
  const result = await conn.query("SELECT * FROM users");
  res.json(result[0]);
});

app.post("/users", async (req, res) => {
  try {
    let user = req.body;
    const result = await conn.query("INSERT INTO users SET ?", user);

    res.json({
      message: "insert ok",
      data: result[0],
    });
  } catch (error) {
    console.log("error message", error.message);

    res.status(500).json({
      message: "someting wrong",
    });
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
