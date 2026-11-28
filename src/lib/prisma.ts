// src/lib/prisma.ts
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/*
 * Prisma talks to Postgres through node-postgres (driver adapter) instead of the
 * Rust query engine. Serverless functions start much faster without the engine
 * binary, and connections open quicker.
 *
 * The `schema` URL parameter (e.g. ?schema=kompi) is passed to the adapter so model
 * queries hit the right schema. Raw SQL must name its tables with `rawTable()`,
 * because the adapter doesn't change the connection's search_path.
 */
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
function adapter() {
  const raw = process.env.DATABASE_URL;
  // Connections open lazily, so builds and tests without a database still load.
  if (!raw) return new PrismaPg({ max: 5 });
  const url = new URL(raw);
  const schema = url.searchParams.get("schema") || undefined;
  url.searchParams.delete("schema");
  return new PrismaPg(
    {
      connectionString: url.toString(),
      // A few connections per instance is plenty; Neon's pooler handles the rest.
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 15_000,
    },
    schema ? { schema } : undefined,
  );
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: adapter(),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

// Reuse one client per instance (dev hot reloads and warm serverless invocations).
globalForPrisma.prisma = prisma;
