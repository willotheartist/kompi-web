import { createHash } from "node:crypto";
import { prisma } from "./prisma";
import { ApiError } from "./api-errors";
export function requestIp(req: Request) { return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"; }
export async function rateLimit(scope: string, identifier: string, max: number, seconds = 900) {
  const key = createHash("sha256").update(`${scope}:${identifier}`).digest("hex");
  const expires = new Date(Date.now() + seconds * 1000);
  const rows = await prisma.$queryRaw<Array<{ count: number }>>`INSERT INTO "RateLimit" ("key", "count", "expiresAt") VALUES (${key}, 1, ${expires}) ON CONFLICT ("key") DO UPDATE SET "count" = CASE WHEN "RateLimit"."expiresAt" <= NOW() THEN 1 ELSE "RateLimit"."count" + 1 END, "expiresAt" = CASE WHEN "RateLimit"."expiresAt" <= NOW() THEN ${expires} ELSE "RateLimit"."expiresAt" END RETURNING "count"`;
  if (rows[0].count > max) throw new ApiError("Too many attempts. Please try again later.", 429);
}
