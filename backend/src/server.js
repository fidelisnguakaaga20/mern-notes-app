import express from "express";
import cors from "cors"; // make sure this is at the top if not already there

const app = express(); // ✅ You were missing this line

const allowedOrigins = [
  "https://mern-notes-app-beta.vercel.app", // ✅ Your Vercel frontend
  "http://localhost:5173", // ✅ Local dev
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
