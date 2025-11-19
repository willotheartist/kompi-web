/*
  Warnings:

  - You are about to drop the column `description` on the `BioPage` table. All the data in the column will be lost.
  - You are about to drop the column `utmCampaign` on the `ClickEvent` table. All the data in the column will be lost.
  - You are about to drop the column `utmMedium` on the `ClickEvent` table. All the data in the column will be lost.
  - You are about to drop the column `utmSource` on the `ClickEvent` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BioLink` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `BioPage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "BioLink" DROP CONSTRAINT "BioLink_bioPageId_fkey";

-- DropForeignKey
ALTER TABLE "BioPage" DROP CONSTRAINT "BioPage_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "ClickEvent" DROP CONSTRAINT "ClickEvent_linkId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_ownerId_fkey";

-- DropIndex
DROP INDEX "BioPage_workspaceId_slug_key";

-- DropIndex
DROP INDEX "Link_workspaceId_code_key";

-- AlterTable
ALTER TABLE "BioPage" DROP COLUMN "description",
ADD COLUMN     "theme" JSONB,
ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ClickEvent" DROP COLUMN "utmCampaign",
DROP COLUMN "utmMedium",
DROP COLUMN "utmSource";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified";

-- DropTable
DROP TABLE "BioLink";

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "KRCode" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "destination" TEXT NOT NULL,
    "shortCodeId" TEXT,
    "style" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KRCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KRCode_workspaceId_idx" ON "KRCode"("workspaceId");

-- CreateIndex
CREATE INDEX "KRCode_userId_idx" ON "KRCode"("userId");

-- CreateIndex
CREATE INDEX "KCard_userId_idx" ON "KCard"("userId");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BioPage_slug_key" ON "BioPage"("slug");

-- CreateIndex
CREATE INDEX "BioPage_workspaceId_idx" ON "BioPage"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_code_key" ON "Link"("code");

-- CreateIndex
CREATE INDEX "Link_workspaceId_idx" ON "Link"("workspaceId");

-- CreateIndex
CREATE INDEX "Link_code_idx" ON "Link"("code");

-- CreateIndex
CREATE INDEX "Link_createdAt_idx" ON "Link"("createdAt");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Workspace_ownerId_idx" ON "Workspace"("ownerId");

-- CreateIndex
CREATE INDEX "Workspace_slug_idx" ON "Workspace"("slug");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClickEvent" ADD CONSTRAINT "ClickEvent_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BioPage" ADD CONSTRAINT "BioPage_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KRCode" ADD CONSTRAINT "KRCode_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KRCode" ADD CONSTRAINT "KRCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KCard" ADD CONSTRAINT "KCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
