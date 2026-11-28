// src/lib/prisma.ts
import { Prisma, PrismaClient } from "@prisma/client";

// One PrismaClient per instance (dev hot reloads and warm serverless invocations).
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

globalForPrisma.prisma = prisma;

function schemaFromUrl() {
  try {
    return new URL(process.env.DATABASE_URL ?? "").searchParams.get("schema") || "public";
  } catch {
    return "public";
  }
}

export const DB_SCHEMA = schemaFromUrl();

/** A schema-qualified table name for raw SQL, e.g. rawTable("RateLimit") → "kompi"."RateLimit". */
export function rawTable(name: string) {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) throw new Error("Invalid table name");
  return Prisma.raw(`"${DB_SCHEMA.replace(/"/g, "")}"."${name}"`);
}
