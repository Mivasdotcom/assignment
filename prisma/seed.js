import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email } });

  if (existingAdmin) {
    console.log("Admin user already exists:", existingAdmin.email);
    return;
  }

  const hashedPassword = await bcrypt.hash("AdminPassword123!", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email,
      password: hashedPassword,
      role: "admin", 
    },
  });

  console.log("Admin user created:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
