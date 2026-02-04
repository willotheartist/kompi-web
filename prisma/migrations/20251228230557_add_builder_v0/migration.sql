-- CreateEnum
CREATE TYPE "BuilderPageType" AS ENUM ('HOME', 'PRODUCT', 'PRICING', 'WAITLIST', 'ABOUT', 'CONTACT');

-- CreateEnum
CREATE TYPE "BuilderSectionType" AS ENUM ('NAVBAR', 'HERO', 'SOCIAL_PROOF', 'FEATURES', 'BENEFITS', 'HOW_IT_WORKS', 'USE_CASES', 'TESTIMONIALS', 'PRICING', 'FAQ', 'WAITLIST', 'ABOUT', 'CONTACT', 'FOOTER');

-- CreateTable
CREATE TABLE "BuilderSite" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brand" JSONB,
    "navigation" JSONB,
    "globalCta" JSONB,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "BuilderSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuilderPage" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "type" "BuilderPageType" NOT NULL,
    "title" TEXT,
    "path" TEXT,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuilderPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuilderSection" (
    "id" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "type" "BuilderSectionType" NOT NULL,
    "variant" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuilderSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuilderPublishedSnapshot" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "BuilderPublishedSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BuilderSite_slug_key" ON "BuilderSite"("slug");

-- CreateIndex
CREATE INDEX "BuilderSite_workspaceId_idx" ON "BuilderSite"("workspaceId");

-- CreateIndex
CREATE INDEX "BuilderSite_slug_idx" ON "BuilderSite"("slug");

-- CreateIndex
CREATE INDEX "BuilderSite_createdAt_idx" ON "BuilderSite"("createdAt");

-- CreateIndex
CREATE INDEX "BuilderPage_siteId_order_idx" ON "BuilderPage"("siteId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "BuilderPage_siteId_type_key" ON "BuilderPage"("siteId", "type");

-- CreateIndex
CREATE INDEX "BuilderSection_pageId_order_idx" ON "BuilderSection"("pageId", "order");

-- CreateIndex
CREATE INDEX "BuilderSection_type_idx" ON "BuilderSection"("type");

-- CreateIndex
CREATE INDEX "BuilderPublishedSnapshot_siteId_createdAt_idx" ON "BuilderPublishedSnapshot"("siteId", "createdAt");

-- CreateIndex
CREATE INDEX "BuilderPublishedSnapshot_siteId_version_idx" ON "BuilderPublishedSnapshot"("siteId", "version");

-- AddForeignKey
ALTER TABLE "BuilderSite" ADD CONSTRAINT "BuilderSite_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuilderPage" ADD CONSTRAINT "BuilderPage_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "BuilderSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuilderSection" ADD CONSTRAINT "BuilderSection_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "BuilderPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuilderPublishedSnapshot" ADD CONSTRAINT "BuilderPublishedSnapshot_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "BuilderSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
