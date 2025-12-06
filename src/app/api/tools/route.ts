// src/app/api/tools/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

function isRedirectError(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "digest" in error &&
    typeof (error as { digest: string }).digest === "string" &&
    (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

// GET /api/tools
// Returns: { toolIds: string[] }
export async function GET(req: Request) {
  try {
    const user = await requireUser();

    const workspace = await getActiveWorkspace(user.id, null);
    if (!workspace) {
      return NextResponse.json(
        { error: "WORKSPACE_NOT_FOUND", message: "Workspace not found" },
        { status: 404 },
      );
    }

    const tools = await prisma.workspaceTool.findMany({
      where: { workspaceId: workspace.id, enabled: true },
      select: { toolId: true },
    });

    return NextResponse.json({ toolIds: tools.map((t) => t.toolId) });
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error; // let Next redirect to /signin for unauthenticated users
    }

    console.error("TOOLS_GET_ERROR", error);

    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message: unknown }).message)
        : "Unknown error";

    return NextResponse.json(
      { error: "TOOLS_GET_ERROR", message },
      { status: 500 },
    );
  }
}
