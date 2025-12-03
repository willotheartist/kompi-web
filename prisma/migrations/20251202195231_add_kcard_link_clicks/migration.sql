-- CreateTable
CREATE TABLE "KCardLinkClick" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kcardId" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "referer" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "KCardLinkClick_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KCardLinkClick_kcardId_createdAt_idx" ON "KCardLinkClick"("kcardId", "createdAt");

-- CreateIndex
CREATE INDEX "KCardLinkClick_linkId_createdAt_idx" ON "KCardLinkClick"("linkId", "createdAt");
