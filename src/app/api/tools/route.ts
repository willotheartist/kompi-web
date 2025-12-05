import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

// GET /api/tools
// Returns enabled toolIds for the active workspace.
export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    const workspace = await getActiveWorkspace(user.id, workspaceId);
    if (!workspace) {
      return NextResponse.json({ toolIds: [] });
    }

    const rows = await prisma.workspaceTool.findMany({
      where: {
        workspaceId: workspace.id,
        enabled: true,
      },
      select: { toolId: true },
    });

    return NextResponse.json({
      toolIds: rows.map((r) => r.toolId),
    });
  } catch (error) {
    console.error("TOOLS_GET_ERROR", error);
    return new NextResponse("Error fetching tools", { status: 500 });
  }
}
