// src/app.js
import express from "express";
import streamingRoutes from "./routes/streamingRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/streaming", streamingRoutes);

export default app;
