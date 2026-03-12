-- CreateEnum
CREATE TYPE "ChatWidgetStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED');

-- CreateEnum
CREATE TYPE "ChatSourceType" AS ENUM ('URL', 'TEXT', 'FAQ');

-- CreateEnum
CREATE TYPE "ChatConversationStatus" AS ENUM ('OPEN', 'CLOSED', 'LEAD');

-- CreateEnum
CREATE TYPE "ChatMessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- CreateTable
CREATE TABLE "ChatWidget" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Kompi Chat',
    "siteName" TEXT,
    "siteUrl" TEXT,
    "publicToken" TEXT NOT NULL,
    "status" "ChatWidgetStatus" NOT NULL DEFAULT 'DRAFT',
    "welcomeMessage" TEXT,
    "placeholder" TEXT,
    "fallbackReply" TEXT,
    "tone" TEXT,
    "primaryColor" TEXT,
    "accentColor" TEXT,
    "allowedDomains" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "installVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatWidget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatSource" (
    "id" TEXT NOT NULL,
    "widgetId" TEXT NOT NULL,
    "type" "ChatSourceType" NOT NULL DEFAULT 'URL',
    "label" TEXT,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatConversation" (
    "id" TEXT NOT NULL,
    "widgetId" TEXT NOT NULL,
    "visitorToken" TEXT NOT NULL,
    "visitorName" TEXT,
    "visitorEmail" TEXT,
    "visitorPhone" TEXT,
    "leadCaptured" BOOLEAN NOT NULL DEFAULT false,
    "domain" TEXT,
    "userAgent" TEXT,
    "status" "ChatConversationStatus" NOT NULL DEFAULT 'OPEN',
    "meta" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "ChatMessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatLead" (
    "id" TEXT NOT NULL,
    "widgetId" TEXT NOT NULL,
    "conversationId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "message" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatWidget_publicToken_key" ON "ChatWidget"("publicToken");

-- CreateIndex
CREATE INDEX "ChatWidget_workspaceId_idx" ON "ChatWidget"("workspaceId");

-- CreateIndex
CREATE INDEX "ChatWidget_status_idx" ON "ChatWidget"("status");

-- CreateIndex
CREATE INDEX "ChatWidget_createdAt_idx" ON "ChatWidget"("createdAt");

-- CreateIndex
CREATE INDEX "ChatSource_widgetId_idx" ON "ChatSource"("widgetId");

-- CreateIndex
CREATE INDEX "ChatSource_type_idx" ON "ChatSource"("type");

-- CreateIndex
CREATE INDEX "ChatConversation_widgetId_updatedAt_idx" ON "ChatConversation"("widgetId", "updatedAt");

-- CreateIndex
CREATE INDEX "ChatConversation_visitorEmail_idx" ON "ChatConversation"("visitorEmail");

-- CreateIndex
CREATE INDEX "ChatConversation_visitorPhone_idx" ON "ChatConversation"("visitorPhone");

-- CreateIndex
CREATE UNIQUE INDEX "ChatConversation_widgetId_visitorToken_key" ON "ChatConversation"("widgetId", "visitorToken");

-- CreateIndex
CREATE INDEX "ChatMessage_conversationId_createdAt_idx" ON "ChatMessage"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "ChatLead_widgetId_createdAt_idx" ON "ChatLead"("widgetId", "createdAt");

-- CreateIndex
CREATE INDEX "ChatLead_conversationId_idx" ON "ChatLead"("conversationId");

-- CreateIndex
CREATE INDEX "ChatLead_email_idx" ON "ChatLead"("email");

-- AddForeignKey
ALTER TABLE "ChatWidget" ADD CONSTRAINT "ChatWidget_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatSource" ADD CONSTRAINT "ChatSource_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "ChatWidget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatConversation" ADD CONSTRAINT "ChatConversation_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "ChatWidget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatLead" ADD CONSTRAINT "ChatLead_widgetId_fkey" FOREIGN KEY ("widgetId") REFERENCES "ChatWidget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatLead" ADD CONSTRAINT "ChatLead_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatConversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
