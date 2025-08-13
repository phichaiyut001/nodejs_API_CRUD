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

//GET /user สำหรับดึง user ทั้งหมเ
app.get("/users", async (req, res) => {
  const result = await conn.query("SELECT * FROM users");
  res.json(result[0]);
});
// POST /users สำหรับเพิ่มข้อมูลไปยัง db
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

// GET /users/:id สำหรับดึง users รายคนออกมา
app.get("/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await conn.query("SELECT * FROM users WHERE id = ?", id);

    if (result[0].length == 0) {
      throw { statusCode: 404, message: "หาไม่เจอ" };
    }
    res.json(result[0][0]);
  } catch (error) {
    console.log("error message", error.message);
    let statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: "someting wrong",
      errorMessage: error.message,
    });
  }
});

// PUT /users/:id สำหรับการแก้ไข user รายคน (ตาม id)
app.put("/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updateUser = req.body;

    const result = await conn.query("UPDATE users SET ? WHERE id = ?", [
      updateUser,
      id,
    ]);

    if (result[0].affectedRows === 0) {
      throw { statusCode: 404, message: "หาไม่เจอ" };
    }
    res.json({
      message: "update ok",
      data: result[0],
    });
  } catch (error) {
    console.log("error message", error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: "someting wrong",
      errorMessage: error.message,
    });
  }
});

// DELETE /users/:id  สำหรับการลบข้อมูล user รายคน (ตาม id)
app.delete("/users/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await conn.query("DELETE From users WHERE id = ?", id);

    if (result[0].affectedRows === 0) {
      throw { statusCode: 404, message: "หาไม่เจอ" };
    }
    res.json({
      message: "delete ok",
      data: result[0],
    });
  } catch (error) {
    console.log("error message", error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: "someting wrong",
      errorMessage: error.message,
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
