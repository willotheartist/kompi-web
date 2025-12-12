-- CreateTable
CREATE TABLE "KCardMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kcardId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "intentKey" TEXT,
    "intentLabel" TEXT,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "message" TEXT,
    "isSpam" BOOLEAN NOT NULL DEFAULT false,
    "ipHash" TEXT,
    "userAgent" TEXT,
    "meta" JSONB,

    CONSTRAINT "KCardMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KCardMessage_kcardId_createdAt_idx" ON "KCardMessage"("kcardId", "createdAt");

-- CreateIndex
CREATE INDEX "KCardMessage_ownerId_createdAt_idx" ON "KCardMessage"("ownerId", "createdAt");
