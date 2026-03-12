import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params;

    const widget = await prisma.chatWidget.findUnique({
      where: { publicToken: token },
      select: {
        id: true,
        name: true,
        siteName: true,
        siteUrl: true,
        status: true,
        welcomeMessage: true,
        placeholder: true,
        tone: true,
        primaryColor: true,
        accentColor: true,
        allowedDomains: true,
      },
    });

    if (!widget || widget.status !== "ACTIVE") {
      return NextResponse.json({ error: "Widget not available." }, { status: 404 });
    }

    return NextResponse.json({
      widget: {
        id: widget.id,
        name: widget.name,
        siteName: widget.siteName,
        siteUrl: widget.siteUrl,
        welcomeMessage: widget.welcomeMessage || "Hi — how can I help you today?",
        placeholder: widget.placeholder || "Ask a question…",
        tone: widget.tone || "helpful",
        primaryColor: widget.primaryColor || "#C4C8FF",
        accentColor: widget.accentColor || "#111111",
        allowedDomains: widget.allowedDomains,
      },
    });
  } catch (error) {
    console.error("GET /api/chat/public/[token] error", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
