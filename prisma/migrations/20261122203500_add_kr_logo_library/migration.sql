CREATE TABLE "KRLogo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dataUrl" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "KRLogo_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "KRLogo_userId_hash_key" ON "KRLogo"("userId", "hash");
CREATE INDEX "KRLogo_userId_updatedAt_idx" ON "KRLogo"("userId", "updatedAt");
ALTER TABLE "KRLogo" ADD CONSTRAINT "KRLogo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
