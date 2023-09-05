import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

process.on("exit", () => {
  prisma.$disconnect();
});

// Listen for other signals that might indicate the application is shutting down
process.on("SIGINT", () => {
  prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", () => {
  prisma.$disconnect();
  process.exit(0);
});
