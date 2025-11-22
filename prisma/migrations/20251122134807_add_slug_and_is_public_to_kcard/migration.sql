/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `KCard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "KCard" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "KCard_slug_key" ON "KCard"("slug");
