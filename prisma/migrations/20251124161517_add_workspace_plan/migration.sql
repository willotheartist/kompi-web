-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'CREATOR');

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'FREE';
