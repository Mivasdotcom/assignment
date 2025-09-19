import express from "express";
import {
  getAllStreamings,
  getStreamingById,
  createStreaming,
  updateStreaming,
  deleteStreaming,
} from "../controllers/streamingController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 🔒 All routes require JWT authentication
router.use(authenticate);

// GET /api/streaming - list all streaming content
router.get("/", getAllStreamings);

// GET /api/streaming/:id - get a single streaming by ID
router.get("/:id", getStreamingById);

// POST /api/streaming - create new streaming content
router.post("/", createStreaming);

// PUT /api/streaming/:id - update streaming content (only author)
router.put("/:id", updateStreaming);

// DELETE /api/streaming/:id - delete streaming content (only author)
router.delete("/:id", deleteStreaming);

export default router;
