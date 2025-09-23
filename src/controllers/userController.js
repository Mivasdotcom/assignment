import { PrismaClient } from "../../generated/prisma/index.js";
import { updateUserSchema } from "../validators/userValidators.js";

const prisma = new PrismaClient();


// GET /api/users  (admin only)
export const getAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          streamings: true, 
        },
      });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };

// PUT /api/users/:id (admin only)
export const updateUser = async (req, res) => {
    const { id } = req.params;
  
    if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });
  
    // Only admin can update users
    if (req.userRole !== "admin") return res.status(403).json({ error: "Unauthorized" });
  
    // Validate request body
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
  
    try {
      const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // If password is being updated, hash it
      if (value.password) {
        const bcrypt = await import("bcrypt");
        value.password = await bcrypt.hash(value.password, 10);
      }
  
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: value,
        select: { id: true, name: true, email: true, role: true },
      });
  
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update user" });
    }
  };

// DELETE /api/users/:id (admin only)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) return res.status(400).json({ error: "Invalid user ID" });

  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Delete all streamings by this user
    await prisma.streaming.deleteMany({
      where: { authorId: parseInt(id) },
    });

    
    await prisma.user.delete({ where: { id: parseInt(id) } });

    res.json({ message: "User and their streamings deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  }
};