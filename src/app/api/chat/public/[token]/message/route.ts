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

function normalizeText(input: string) {
  return input.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

function splitWords(input: string) {
  return normalizeText(input)
    .split(" ")
    .map((part) => part.trim())
    .filter((part) => part.length > 2);
}

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

type SourceLite = {
  id: string;
  type: "URL" | "TEXT" | "FAQ";
  label: string | null;
  value: string;
};

function scoreSource(source: SourceLite, queryWords: string[]) {
  const haystack = normalizeText([source.label || "", source.value].join(" "));
  let score = 0;

  for (const word of queryWords) {
    if (haystack.includes(word)) {
      score += source.type === "FAQ" ? 4 : source.type === "TEXT" ? 3 : 2;
    }
  }

  if (source.type === "URL") {
    const labelWords = splitWords(source.label || "");
    for (const word of queryWords) {
      if (labelWords.includes(word)) score += 2;
    }
  }

  return score;
}

function compactText(input: string, max = 220) {
  const clean = input.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trim()}…`;
}

function buildSourceAwareReply(params: {
  input: string;
  widgetName: string;
  fallbackReply?: string | null;
  sources: SourceLite[];
}) {
  const { input, widgetName, fallbackReply, sources } = params;
  const q = normalizeText(input);
  const queryWords = unique(splitWords(input));

  const matched = sources
    .map((source) => ({
      source,
      score: scoreSource(source, queryWords),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const top = matched.map((item) => item.source);

  const pricingIntent =
    q.includes("price") ||
    q.includes("pricing") ||
    q.includes("cost") ||
    q.includes("how much");
  const bookingIntent =
    q.includes("book") ||
    q.includes("call") ||
    q.includes("demo") ||
    q.includes("appointment");
  const serviceIntent =
    q.includes("service") ||
    q.includes("product") ||
    q.includes("offer") ||
    q.includes("what do you do");

  if (top.length > 0) {
    const faq = top.find((item) => item.type === "FAQ");
    const text = top.find((item) => item.type === "TEXT");
    const url = top.find((item) => item.type === "URL");

    if (faq) {
      return {
        reply: faq.value,
        sourceIds: top.map((item) => item.id),
      };
    }

    if (pricingIntent && text) {
      return {
        reply: `Here’s the most relevant context I found: ${compactText(
          text.value,
          240
        )}${bookingIntent ? ` If you'd like, leave your details and ${widgetName} can follow up.` : ""}`,
        sourceIds: top.map((item) => item.id),
      };
    }

    if (serviceIntent && text) {
      return {
        reply: `Based on the information connected to this chat: ${compactText(
          text.value,
          240
        )}`,
        sourceIds: top.map((item) => item.id),
      };
    }

    if (url && url.label) {
      return {
        reply: `The most relevant source I found is "${url.label}". ${
          text
            ? compactText(text.value, 190)
            : "You can keep asking and I’ll guide you based on the connected business context."
        }`,
        sourceIds: top.map((item) => item.id),
      };
    }

    if (text) {
      return {
        reply: compactText(text.value, 240),
        sourceIds: top.map((item) => item.id),
      };
    }
  }

  if (pricingIntent) {
    return {
      reply: `I can help with pricing questions. If you'd like, leave your email and ${widgetName} can follow up with the right details.`,
      sourceIds: [],
    };
  }

  if (bookingIntent) {
    return {
      reply: `I can help point you to the best next step. Leave your details and someone can follow up, or continue here with what you need.`,
      sourceIds: [],
    };
  }

  if (serviceIntent) {
    return {
      reply: `I can help explain what's available and guide you to the right option. Tell me a bit more about what you're looking for.`,
      sourceIds: [],
    };
  }

  return {
    reply:
      fallbackReply ||
      `Thanks — I’ve noted that. I can help answer common questions, guide visitors, and collect details for follow-up.`,
    sourceIds: [],
  };
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
        sources: {
          select: {
            id: true,
            type: true,
            label: true,
            value: true,
          },
          orderBy: { createdAt: "asc" },
        },
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

    const assistant = buildSourceAwareReply({
      input: content,
      widgetName: widget.name,
      fallbackReply: widget.fallbackReply,
      sources: widget.sources as SourceLite[],
    });

    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: "ASSISTANT",
        content: assistant.reply,
        meta: {
          matchedSourceIds: assistant.sourceIds,
        },
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
      reply: assistant.reply,
      matchedSourceIds: assistant.sourceIds,
    });
  } catch (error) {
    console.error("POST /api/chat/public/[token]/message error", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}