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

// POST /api/tools/toggle
// Body: { toolId: string; enabled?: boolean }
// NOTE: workspaceId is intentionally ignored in single-workspace mode.
export async function POST(req: Request) {
  try {
    const user = await requireUser();

    const body = (await req.json().catch(() => ({}))) as {
      toolId?: string;
      enabled?: boolean;
      workspaceId?: string | null; // ignored
    };

    const toolId = (body.toolId ?? "").toString().trim();
    if (!toolId) {
      return new NextResponse("toolId is required", { status: 400 });
    }

    // ✅ single-workspace mode: always resolve (and auto-create) the user's default workspace
    const workspace = await getActiveWorkspace(user.id, null);
    if (!workspace) {
      return NextResponse.json(
        { error: "WORKSPACE_NOT_FOUND", message: "Workspace not found" },
        { status: 404 },
      );
    }

    const desiredEnabled = typeof body.enabled === "boolean" ? body.enabled : true;

    const record = await prisma.workspaceTool.upsert({
      where: {
        workspaceId_toolId: {
          workspaceId: workspace.id,
          toolId,
        },
      },
      create: {
        workspaceId: workspace.id,
        toolId,
        enabled: desiredEnabled,
      },
      update: {
        enabled: desiredEnabled,
      },
    });

    return NextResponse.json({ workspace, tool: record });
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error; // let Next.js handle /signin redirect properly
    }

    console.error("TOOLS_TOGGLE_POST_ERROR", error);

    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message: unknown }).message)
        : "Unknown error";

    return NextResponse.json(
      { error: "TOOLS_TOGGLE_POST_ERROR", message },
      { status: 500 },
    );
  }
}
