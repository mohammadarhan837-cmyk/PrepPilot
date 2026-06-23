import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import problemRoutes from './routes/problemRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.send("PrepPilot API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});