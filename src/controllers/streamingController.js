import { PrismaClient } from "../../generated/prisma/index.js";
import { createStreamingSchema, updateStreamingSchema } from "../validators/streamingValidators.js";


const prisma = new PrismaClient();


  
// GET /api/streaming
export const getAllStreamings = async (req, res) => {
    try {
        const streamings = await prisma.streaming.findMany({
        include: { author: true },
        });
        res.json(streamings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch streaming content" });
    }
};

// GET /api/streaming/:id
export const getStreamingById = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    try {
        const streaming = await prisma.streaming.findUnique({
        where: { id: parseInt(id) },
        include: { author: true },
        });
        if (!streaming) return res.status(404).json({ error: "Streaming not found" });
        res.json(streaming);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch streaming content" });
    }
};

// POST /api/streaming
export const createStreaming = async (req, res) => {
    const { error, value } = createStreamingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const authorId = req.userId;

    try {
        const streaming = await prisma.streaming.create({
        data: { ...value, authorId },
        include: { author: true },
        });
        res.status(201).json(streaming);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create streaming content" });
    }
};

// PUT /api/streaming/:id
export const updateStreaming = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    const { error, value } = updateStreamingSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const streaming = await prisma.streaming.findUnique({ where: { id: parseInt(id) } });
        if (!streaming) return res.status(404).json({ error: "Streaming not found" });
        if (streaming.authorId !== req.userId) return res.status(403).json({ error: "Unauthorized" });

        const updatedStreaming = await prisma.streaming.update({
        where: { id: parseInt(id) },
        data: value,
        include: { author: true },
        });
        res.json(updatedStreaming);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update streaming content" });
    }
};

// DELETE /api/streaming/:id
export const deleteStreaming = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

    try {
        const streaming = await prisma.streaming.findUnique({ where: { id: parseInt(id) } });
        if (!streaming) return res.status(404).json({ error: "Streaming not found" });
        if (streaming.authorId !== req.userId) return res.status(403).json({ error: "Unauthorized" });

        await prisma.streaming.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Streaming deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete streaming content" });
}
};
