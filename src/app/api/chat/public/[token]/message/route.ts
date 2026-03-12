import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeHost(input: string | null) {
  if (!input) return null;
  try {
    const url = input.startsWith("http") ? new URL(input) : new URL(`https://${input}`);
    return url.hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return input
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "")
      .toLowerCase();
  }
}

function detectHost(req: NextRequest) {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  return normalizeHost(origin || referer);
}

function isAllowedHost(host: string | null, allowed: string[]) {
  if (!allowed.length) return true;
  if (!host) return false;

  return allowed.some((item) => {
    const normalized = normalizeHost(item);
    return normalized === host;
  });
}

function buildAssistantReply(
  input: string,
  widgetName: string,
  fallbackReply?: string | null
) {
  const q = input.toLowerCase();

  if (q.includes("price") || q.includes("pricing") || q.includes("cost")) {
    return `I can help with pricing questions. If you'd like, leave your email and ${widgetName} can follow up with the right details.`;
  }

  if (q.includes("book") || q.includes("call") || q.includes("demo")) {
    return `I can help point you to the best next step. Leave your details and someone can follow up, or continue here with what you need.`;
  }

  if (q.includes("service") || q.includes("product") || q.includes("offer")) {
    return `I can help explain what's available and guide you to the right option. Tell me a bit more about what you're looking for.`;
  }

  return (
    fallbackReply ||
    `Thanks — I’ve noted that. I can help answer common questions, guide visitors, and collect details for follow-up.`
  );
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params;
    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const widget = await prisma.chatWidget.findUnique({
      where: { publicToken: token },
      select: {
        id: true,
        name: true,
        status: true,
        allowedDomains: true,
        fallbackReply: true,
      },
    });

    if (!widget || widget.status !== "ACTIVE") {
      return NextResponse.json({ error: "Widget not available." }, { status: 404 });
    }

    const host = detectHost(req);
    if (!isAllowedHost(host, widget.allowedDomains)) {
      return NextResponse.json({ error: "Domain not allowed." }, { status: 403 });
    }

    const visitorToken =
      typeof body.visitorToken === "string" && body.visitorToken.trim()
        ? body.visitorToken.trim()
        : null;

    const content =
      typeof body.message === "string" && body.message.trim()
        ? body.message.trim()
        : "";

    const name =
      typeof body.name === "string" && body.name.trim() ? body.name.trim() : null;
    const email =
      typeof body.email === "string" && body.email.trim() ? body.email.trim() : null;
    const phone =
      typeof body.phone === "string" && body.phone.trim() ? body.phone.trim() : null;

    if (!visitorToken || !content) {
      return NextResponse.json(
        { error: "visitorToken and message are required." },
        { status: 400 }
      );
    }

    const userAgent = req.headers.get("user-agent") || null;

    const conversation = await prisma.chatConversation.upsert({
      where: {
        widgetId_visitorToken: {
          widgetId: widget.id,
          visitorToken,
        },
      },
      update: {
        visitorName: name,
        visitorEmail: email,
        visitorPhone: phone,
        domain: host,
        userAgent,
        leadCaptured: Boolean(email || phone),
        status: email || phone ? "LEAD" : "OPEN",
      },
      create: {
        widgetId: widget.id,
        visitorToken,
        visitorName: name,
        visitorEmail: email,
        visitorPhone: phone,
        domain: host,
        userAgent,
        leadCaptured: Boolean(email || phone),
        status: email || phone ? "LEAD" : "OPEN",
      },
    });

    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "USER",
        content,
        meta: {
          source: "embed_widget",
        },
      },
    });

    const assistantReply = buildAssistantReply(
      content,
      widget.name,
      widget.fallbackReply
    );

    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "ASSISTANT",
        content: assistantReply,
      },
    });

    if (email || phone || name) {
      await prisma.chatLead.create({
        data: {
          widgetId: widget.id,
          conversationId: conversation.id,
          name,
          email,
          phone,
          message: content,
          source: host || "widget",
        },
      });
    }

    return NextResponse.json({
      ok: true,
      conversationId: conversation.id,
      reply: assistantReply,
    });
  } catch (error) {
    console.error("POST /api/chat/public/[token]/message error", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
