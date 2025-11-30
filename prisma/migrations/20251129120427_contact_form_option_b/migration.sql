-- AlterTable
ALTER TABLE "ContactForm" ADD COLUMN     "accentHex" TEXT,
ADD COLUMN     "autoReplyBody" TEXT,
ADD COLUMN     "autoReplySubject" TEXT,
ADD COLUMN     "buttonLabel" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "includeMessage" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "includeName" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "includePhone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "includeSubject" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationsEmail" TEXT,
ADD COLUMN     "spamHoneypotEnabled" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "subjectOptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "successMessage" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "themeCorners" TEXT,
ADD COLUMN     "themeFont" TEXT,
ADD COLUMN     "themeLayout" TEXT;

-- AlterTable
ALTER TABLE "ContactSubmission" ADD COLUMN     "isSpam" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "subject" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
