import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const workspaceId = req.nextUrl.searchParams.get("workspaceId");
    const workspace = await getActiveWorkspace(user.id, workspaceId);

    if (!workspace) {
      return NextResponse.json({ sources: [] });
    }

    const widget = await prisma.chatWidget.findFirst({
      where: { workspaceId: workspace.id },
      select: { id: true },
    });

    if (!widget) {
      return NextResponse.json({ sources: [] });
    }

    const sources = await prisma.chatSource.findMany({
      where: { widgetId: widget.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ sources });
  } catch (error) {
    console.error("GET /api/chat/sources error", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const workspace = await getActiveWorkspace(
      user.id,
      typeof body.workspaceId === "string" ? body.workspaceId : null
    );

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found." }, { status: 404 });
    }

    const widget = await prisma.chatWidget.findFirst({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: "asc" },
    });

    if (!widget) {
      return NextResponse.json(
        { error: "Create your widget first before adding sources." },
        { status: 400 }
      );
    }

    const value = typeof body.value === "string" ? body.value.trim() : "";
    const label = typeof body.label === "string" ? body.label.trim() : "";
    const type =
      body.type === "TEXT" || body.type === "FAQ" || body.type === "URL" ? body.type : "URL";

    if (!value) {
      return NextResponse.json({ error: "Source value is required." }, { status: 400 });
    }

    const source = await prisma.chatSource.create({
      data: {
        widgetId: widget.id,
        type,
        label: label || null,
        value,
      },
    });

    return NextResponse.json({ ok: true, source }, { status: 201 });
  } catch (error) {
    console.error("POST /api/chat/sources error", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
