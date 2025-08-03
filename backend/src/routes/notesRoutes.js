// backend/src/routes/notesRoutes.js
import express from "express";
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { verifyToken } from "../middleware/verifyToken.js"; // ✅ correct

const router = express.Router();

// ✅ Protect all routes with verifyToken
router.post("/", verifyToken, createNote);
router.get("/", verifyToken, getAllNotes);
router.get("/:id", verifyToken, getNoteById);
router.put("/:id", verifyToken, updateNote);
router.delete("/:id", verifyToken, deleteNote);

export default router;
