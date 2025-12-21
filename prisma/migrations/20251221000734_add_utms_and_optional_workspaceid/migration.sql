-- AlterTable
ALTER TABLE "ClickEvent" ADD COLUMN     "utmCampaign" TEXT,
ADD COLUMN     "utmContent" TEXT,
ADD COLUMN     "utmMedium" TEXT,
ADD COLUMN     "utmSource" TEXT,
ADD COLUMN     "utmTerm" TEXT;

-- AlterTable
ALTER TABLE "KCardMessage" ADD COLUMN     "workspaceId" TEXT;

-- CreateIndex
CREATE INDEX "ClickEvent_utmCampaign_idx" ON "ClickEvent"("utmCampaign");

-- CreateIndex
CREATE INDEX "ClickEvent_utmSource_idx" ON "ClickEvent"("utmSource");

-- CreateIndex
CREATE INDEX "ClickEvent_utmMedium_idx" ON "ClickEvent"("utmMedium");

-- CreateIndex
CREATE INDEX "KCardMessage_workspaceId_createdAt_idx" ON "KCardMessage"("workspaceId", "createdAt");
