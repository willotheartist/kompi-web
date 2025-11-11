import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

const FREE_LINK_LIMIT = 50;

function generateCode(len = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function normalizeTargetUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const workspace = await getActiveWorkspace(user.id, workspaceId);
    if (!workspace) return NextResponse.json({ workspace: null, links: [] });

    const links = await prisma.link.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ workspace, links });
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => ({}))) as {
      targetUrl?: string;
      code?: string;
      workspaceId?: string;
    };

    const rawUrl = (body.targetUrl ?? "").toString();
    const targetUrl = normalizeTargetUrl(rawUrl);

    if (!targetUrl) {
      return new NextResponse("Target URL is required", { status: 400 });
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

    const count = await prisma.link.count({
      where: { workspaceId: workspace.id },
    });
    if (count >= FREE_LINK_LIMIT) {
      return new NextResponse("Link limit reached", { status: 402 });
    }

    let code = (body.code ?? "").toString().trim();

    if (code) {
      const exists = await prisma.link.findFirst({
        where: { code, workspaceId: workspace.id },
      });
      if (exists) {
        return new NextResponse("Custom code already in use", {
          status: 409,
        });
      }
    } else {
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
    }

    const link = await prisma.link.create({
      data: {
        workspaceId: workspace.id,
        code,
        targetUrl,
        isActive: true,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
