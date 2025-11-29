// src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";

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
        ? ["error", "warn"] // add "query", "info" if you *intentionally* want more logs
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
