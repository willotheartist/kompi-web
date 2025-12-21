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

    // respect workspaceId from querystring
    const url = new URL(req.url);
    const workspaceId = url.searchParams.get("workspaceId");

    const workspace = await getActiveWorkspace(user.id, workspaceId);
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

    // ✅ tiny cache so sidebar/nav isn't paying a full roundtrip every nav
    const res = NextResponse.json({ toolIds: tools.map((t) => t.toolId) });
    res.headers.set("Cache-Control", "private, max-age=30");
    return res;
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
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
