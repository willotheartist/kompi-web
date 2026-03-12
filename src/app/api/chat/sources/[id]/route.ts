import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    const workspace = await getActiveWorkspace(user.id, null);

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found." }, { status: 404 });
    }

    const widget = await prisma.chatWidget.findFirst({
      where: { workspaceId: workspace.id },
      select: { id: true },
    });

    if (!widget) {
      return NextResponse.json({ error: "Widget not found." }, { status: 404 });
    }

    const source = await prisma.chatSource.findFirst({
      where: {
        id,
        widgetId: widget.id,
      },
      select: { id: true },
    });

    if (!source) {
      return NextResponse.json({ error: "Source not found." }, { status: 404 });
    }

    await prisma.chatSource.delete({
      where: { id: source.id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/chat/sources/[id] error", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}