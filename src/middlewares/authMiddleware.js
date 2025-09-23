import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;

    // Fetch user role from DB
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) return res.status(401).json({ error: "User not found" });

    req.userRole = user.role; // attach role
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
