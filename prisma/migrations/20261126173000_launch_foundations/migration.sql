ALTER TABLE "User" ADD COLUMN "emailVerifiedAt" TIMESTAMP(3), ADD COLUMN "sessionVersion" INTEGER NOT NULL DEFAULT 0;
-- Existing accounts retain access. New password accounts verify their email.
UPDATE "User" SET "emailVerifiedAt" = CURRENT_TIMESTAMP;
ALTER TABLE "Workspace" ADD COLUMN "billingStatus" TEXT, ADD COLUMN "billingPeriodEnd" TIMESTAMP(3), ADD COLUMN "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "KCard" ADD COLUMN "workspaceId" TEXT;
UPDATE "KCard" c SET "workspaceId" = (SELECT w.id FROM "Workspace" w WHERE w."ownerId" = c."userId" ORDER BY w."createdAt", w.id LIMIT 1);
ALTER TABLE "KCard" ADD CONSTRAINT "KCard_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE TABLE "RateLimit" ("key" TEXT NOT NULL PRIMARY KEY, "count" INTEGER NOT NULL DEFAULT 1, "expiresAt" TIMESTAMP(3) NOT NULL);
CREATE INDEX "RateLimit_expiresAt_idx" ON "RateLimit"("expiresAt");
CREATE TABLE "BillingEvent" ("id" TEXT NOT NULL PRIMARY KEY, "type" TEXT NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP);
