-- Store: Stripe Connect on workspaces, products and orders.
ALTER TABLE "Workspace" ADD COLUMN "stripeConnectAccountId" TEXT;
ALTER TABLE "Workspace" ADD COLUMN "connectChargesEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Workspace" ADD COLUMN "connectDetailsSubmitted" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Workspace" ADD COLUMN "storeCurrency" TEXT NOT NULL DEFAULT 'gbp';
CREATE UNIQUE INDEX "Workspace_stripeConnectAccountId_key" ON "Workspace"("stripeConnectAccountId");

CREATE TYPE "ProductType" AS ENUM ('DOWNLOAD', 'LEAD_MAGNET', 'BOOKING', 'PAID_LINK', 'TIP');
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'FREE', 'REFUNDED', 'CANCELLED');

CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "ProductType" NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "coverImage" TEXT,
    "priceCents" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'gbp',
    "payWhatYouWant" BOOLEAN NOT NULL DEFAULT false,
    "minPriceCents" INTEGER,
    "buttonLabel" TEXT,
    "fileUrl" TEXT,
    "fileName" TEXT,
    "fileSize" INTEGER,
    "accessUrl" TEXT,
    "durationMin" INTEGER,
    "booking" JSONB,
    "thankYouNote" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Product_workspaceId_slug_key" ON "Product"("workspaceId", "slug");
CREATE INDEX "Product_workspaceId_status_idx" ON "Product"("workspaceId", "status");
ALTER TABLE "Product" ADD CONSTRAINT "Product_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "buyerEmail" TEXT,
    "buyerName" TEXT,
    "buyerNote" TEXT,
    "amountCents" INTEGER NOT NULL DEFAULT 0,
    "feeCents" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT NOT NULL DEFAULT 'gbp',
    "stripeAccountId" TEXT,
    "stripeCheckoutSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "accessToken" TEXT NOT NULL,
    "bookingStart" TIMESTAMP(3),
    "bookingEnd" TIMESTAMP(3),
    "emailedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Order_stripeCheckoutSessionId_key" ON "Order"("stripeCheckoutSessionId");
CREATE UNIQUE INDEX "Order_accessToken_key" ON "Order"("accessToken");
CREATE INDEX "Order_workspaceId_createdAt_idx" ON "Order"("workspaceId", "createdAt");
CREATE INDEX "Order_productId_bookingStart_idx" ON "Order"("productId", "bookingStart");
CREATE INDEX "Order_status_createdAt_idx" ON "Order"("status", "createdAt");
-- One live booking per slot: a held (pending) or confirmed order blocks the time.
CREATE UNIQUE INDEX "Order_booking_slot_live_key" ON "Order"("productId", "bookingStart") WHERE "bookingStart" IS NOT NULL AND "status" IN ('PENDING', 'PAID', 'FREE');
ALTER TABLE "Order" ADD CONSTRAINT "Order_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
