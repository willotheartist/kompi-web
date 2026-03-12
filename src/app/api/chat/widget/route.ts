import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { auth, getActiveWorkspace } from "@/lib/auth";

function makePublicToken() {
  return crypto.randomBytes(18).toString("hex");
}

function normalizeUrl(value: string | null | undefined) {
  const raw = (value ?? "").trim();
  if (!raw) return null;
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
}

function parseDomains(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input
      .map((v) => String(v).trim().toLowerCase())
      .filter(Boolean)
      .map((v) =>
        v.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "")
      );
  }

  if (typeof input === "string") {
    return input
      .split(",")
      .map((v) => v.trim().toLowerCase())
      .filter(Boolean)
      .map((v) =>
        v.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/.*$/, "")
      );
  }

  return [];
}

async function getApiUser() {
  const session = await auth();
  const emailFromSession = session?.user?.email?.trim().toLowerCase();

  if (emailFromSession) {
    const user = await prisma.user.findUnique({
      where: { email: emailFromSession },
      select: { id: true, email: true, name: true },
    });

    if (user) return user;
  }

  if (process.env.NODE_ENV === "development" && process.env.DEV_EMAIL) {
    const email = process.env.DEV_EMAIL.trim().toLowerCase();

    let user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: { email },
        select: { id: true, email: true, name: true },
      });
    }

    return user;
  }

  return null;
}

export async function GET(req: NextRequest) {
  try {
    const user = await getApiUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const workspaceId = req.nextUrl.searchParams.get("workspaceId");
    const workspace = await getActiveWorkspace(user.id, workspaceId);

    if (!workspace) {
      return NextResponse.json({ widget: null }, { status: 200 });
    }

    const widget = await prisma.chatWidget.findFirst({
      where: { workspaceId: workspace.id },
      include: {
        _count: {
          select: {
            sources: true,
            conversations: true,
            leads: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ widget, workspace });
  } catch (error) {
    console.error("GET /api/chat/widget error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await getApiUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

    const workspace = await getActiveWorkspace(
      user.id,
      typeof body.workspaceId === "string" ? body.workspaceId : null
    );

    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found." }, { status: 404 });
    }

    const payload = {
      name:
        typeof body.name === "string" && body.name.trim()
          ? body.name.trim()
          : "Kompi Chat",
      siteName:
        typeof body.siteName === "string" ? body.siteName.trim() || null : null,
      siteUrl: normalizeUrl(typeof body.siteUrl === "string" ? body.siteUrl : null),
      welcomeMessage:
        typeof body.welcomeMessage === "string"
          ? body.welcomeMessage.trim() || null
          : null,
      placeholder:
        typeof body.placeholder === "string"
          ? body.placeholder.trim() || null
          : null,
      fallbackReply:
        typeof body.fallbackReply === "string"
          ? body.fallbackReply.trim() || null
          : null,
      tone: typeof body.tone === "string" ? body.tone.trim() || null : null,
      primaryColor:
        typeof body.primaryColor === "string"
          ? body.primaryColor.trim() || null
          : null,
      accentColor:
        typeof body.accentColor === "string"
          ? body.accentColor.trim() || null
          : null,
      allowedDomains: parseDomains(body.allowedDomains),
      status:
        body.status === "ACTIVE" || body.status === "PAUSED" || body.status === "DRAFT"
          ? body.status
          : "DRAFT",
    } as const;

    const existing = await prisma.chatWidget.findFirst({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: "asc" },
    });

    let widget;

    if (existing) {
      widget = await prisma.chatWidget.update({
        where: { id: existing.id },
        data: payload,
      });
    } else {
      let token = makePublicToken();

      while (await prisma.chatWidget.findUnique({ where: { publicToken: token } })) {
        token = makePublicToken();
      }

      widget = await prisma.chatWidget.create({
        data: {
          workspaceId: workspace.id,
          publicToken: token,
          ...payload,
        },
      });
    }

    return NextResponse.json({ ok: true, widget });
  } catch (error) {
    console.error("PUT /api/chat/widget error", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}