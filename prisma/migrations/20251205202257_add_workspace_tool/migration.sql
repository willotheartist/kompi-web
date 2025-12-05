-- CreateTable
CREATE TABLE "WorkspaceTool" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkspaceTool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WorkspaceTool_workspaceId_idx" ON "WorkspaceTool"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceTool_workspaceId_toolId_key" ON "WorkspaceTool"("workspaceId", "toolId");

-- AddForeignKey
ALTER TABLE "WorkspaceTool" ADD CONSTRAINT "WorkspaceTool_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
