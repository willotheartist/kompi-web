import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

// POST /api/tools/toggle
// Body: { toolId: string; enabled?: boolean; workspaceId?: string }
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => ({}))) as {
      toolId?: string;
      enabled?: boolean;
      workspaceId?: string | null;
    };

    const toolId = (body.toolId ?? "").toString().trim();
    if (!toolId) {
      return new NextResponse("toolId is required", { status: 400 });
    }

    const workspace = await getActiveWorkspace(user.id, body.workspaceId ?? null);
    if (!workspace) {
      return new NextResponse("Workspace not found", { status: 404 });
    }

    const desiredEnabled =
      typeof body.enabled === "boolean" ? body.enabled : true;

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
    console.error("TOOLS_TOGGLE_POST_ERROR", error);

    // Return a 500 with the error message so you can see it in the Network tab
    const message =
      error && typeof error === "object" && "message" in error
        ? String(error.message)
        : "Unknown error";

    return NextResponse.json(
      { error: "TOOLS_TOGGLE_POST_ERROR", message },
      { status: 500 },
    );
  }
}
