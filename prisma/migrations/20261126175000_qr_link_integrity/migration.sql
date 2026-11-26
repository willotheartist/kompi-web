ALTER TABLE "KRCode" ADD CONSTRAINT "KRCode_shortCodeId_fkey" FOREIGN KEY ("shortCodeId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
CREATE INDEX "KRCode_shortCodeId_idx" ON "KRCode"("shortCodeId");
