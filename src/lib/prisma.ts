// src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// Optional: in dev, log which DATABASE_URL Prisma sees.
// Comment this out once everything is stable.
if (process.env.NODE_ENV === "development") {
  // This will show in your terminal when the server boots.
  console.log(">>> Prisma DATABASE_URL:", process.env.DATABASE_URL);
  console.log(">>> Prisma DIRECT_URL:", process.env.DIRECT_URL);
}

// In Node.js (Next.js app router on the server), we want a single PrismaClient
// instance across hot reloads to avoid "Too many connections" errors.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"] // you can add "query", "info" if you want more noise
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
