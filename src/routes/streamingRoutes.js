import express from "express";
import {
  getAllStreamings,
  getStreamingById,
  createStreaming,
  updateStreaming,
  deleteStreaming,
  playStreaming,
} from "../controllers/streamingController.js";

import { authenticate } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Public for all authenticated users
router.get("/", getAllStreamings);
router.get("/:id", getStreamingById);
router.get("/:id/play", playStreaming);

// Admin only
router.post("/", isAdmin, createStreaming);
router.put("/:id", isAdmin, updateStreaming);
router.delete("/:id", isAdmin, deleteStreaming);


export default router;
