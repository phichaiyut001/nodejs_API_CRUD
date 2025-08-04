import express from "express";
import cors from "cors";
const app = express();
const corsOption = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOption));

app.get("/api", (req, res) => {
  res.json({ car: ["mercedes", "BMV", "Tesla"] });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
