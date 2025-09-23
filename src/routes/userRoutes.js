// src/routes/userRoutes.js
import express from "express";
import { getAllUsers, deleteUser, updateUser } from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Only admins can delete/view users
router.get("/", authenticate, isAdmin, getAllUsers);
router.delete("/:id", authenticate, isAdmin, deleteUser);
router.put("/:id", authenticate, isAdmin, updateUser);


export default router;
