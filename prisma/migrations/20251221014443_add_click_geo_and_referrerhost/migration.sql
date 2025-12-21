-- AlterTable
ALTER TABLE "ClickEvent" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "referrerHost" TEXT,
ADD COLUMN     "region" TEXT;

-- CreateIndex
CREATE INDEX "ClickEvent_referrerHost_idx" ON "ClickEvent"("referrerHost");

-- CreateIndex
CREATE INDEX "ClickEvent_country_idx" ON "ClickEvent"("country");
