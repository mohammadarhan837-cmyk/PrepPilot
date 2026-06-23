import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Note
router.post("/", protect, createNote);

// Get All Notes
router.get("/", protect, getNotes);

// Update Note
router.put("/:id", protect, updateNote);

// Delete Note
router.delete("/:id", protect, deleteNote);

export default router;