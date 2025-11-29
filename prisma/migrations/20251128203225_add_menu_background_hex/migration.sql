-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "backgroundHex" TEXT,
ADD COLUMN     "scanCount" INTEGER NOT NULL DEFAULT 0;
