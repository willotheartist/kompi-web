import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

const FREE_LINK_LIMIT = 20;
const CREATOR_LINK_LIMIT = 1000000; // effectively unlimited for Creator

function generateCode(len = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();

    const body = (await req.json().catch(() => ({}))) as {
      targetUrl?: string;
      workspaceId?: string;
      title?: string;
      sourceTool?: string;
      config?: Record<string, unknown>;
    };

    const rawTarget = (body.targetUrl ?? "").toString().trim();

    // IMPORTANT: for contact links we assume targetUrl is already fully formed
    // (wa.me/..., tel:..., sms:...). We do NOT prepend https:// like the
    // generic /api/links endpoint.
    if (!rawTarget) {
      return new NextResponse("targetUrl is required", { status: 400 });
    }

    const workspace =
      (await getActiveWorkspace(user.id, body.workspaceId ?? null)) ??
      (await prisma.workspace.create({
        data: {
          name: "My workspace",
          slug: `ws-${user.id.slice(0, 6)}`,
          ownerId: user.id,
        },
      }));

    const limit =
      workspace.plan === "CREATOR" ? CREATOR_LINK_LIMIT : FREE_LINK_LIMIT;

    const count = await prisma.link.count({
      where: { workspaceId: workspace.id },
    });

    if (count >= limit) {
      return new NextResponse(
        `You’ve reached your limit on the Free plan. You can create up to ${limit} links per workspace on the Free plan. Upgrade to the Creator plan to create more links and unlock full access to Kompi tools.`,
        { status: 402 },
      );
    }

    let code = "";

    // generate globally unique code
    while (true) {
      const generated = generateCode();
      const exists = await prisma.link.findFirst({
        where: { code: generated },
      });
      if (!exists) {
        code = generated;
        break;
      }
    }

    const rawTitle = (body.title ?? "").toString().trim();
    const title = rawTitle || undefined;

    const config = {
      ...(body.config ?? {}),
      sourceTool: body.sourceTool ?? "whatsapp-link-generator",
    };

    const link = await prisma.link.create({
      data: {
        workspaceId: workspace.id,
        code,
        targetUrl: rawTarget,
        isActive: true,
        title,
        config,
      },
    });

    const base =
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const shortUrl = link.code ? `${base}/r/${link.code}` : null;

    return NextResponse.json(
      {
        id: link.id,
        code: link.code,
        shortUrl,
        targetUrl: link.targetUrl,
        title: link.title,
        workspaceId: link.workspaceId,
        createdAt: link.createdAt,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CONTACT_LINKS_POST_ERROR", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
