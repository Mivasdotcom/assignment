// src/app.js
import express from "express";

import streamingRoutes from "./routes/streamingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import rateLimit from "express-rate-limit";

const app = express();
app.use(express.json());

const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // allow 30 POST requests per IP per 15 mins
    message: { error: "Too many POST requests, please try again later." },
  });
  

app.use("/api/auth", postLimiter, authRoutes);
app.use("/api/streaming", postLimiter, streamingRoutes);
app.use("/api/users", postLimiter, userRoutes);

export default app;
