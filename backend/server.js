import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js"; // make sure this path is correct
import noteRoutes from "./routes/noteRoutes.js"; // make sure this path is correct

dotenv.config();

const app = express();

// // ✅ DO NOT fallback to 8000, Render assigns a port in process.env.PORT
const PORT = process.env.PORT; 

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/notes", noteRoutes);

// Connect DB and start server
connectDB().then(() => {
  // // ✅ This makes sure Render detects and binds the correct port
  app.listen(PORT, () => {
    console.log(`Server is running o
