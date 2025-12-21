// src/app/api/links/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

const FREE_LINK_LIMIT = 20;
const CREATOR_LINK_LIMIT = 1_000_000;

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

function clampInt(value: string | null, def: number, min: number, max: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return def;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);

    const workspaceId = searchParams.get("workspaceId");
    const workspace = await getActiveWorkspace(user.id, workspaceId);

    if (!workspace) {
      return NextResponse.json(
        { workspace: null, links: [], nextCursor: null },
        {
          headers: {
            // 👇 don’t cache per-user data
            "Cache-Control": "private, no-store, max-age=0",
          },
        }
      );
    }

    const limit = clampInt(searchParams.get("limit"), 50, 1, 200);
    const before = searchParams.get("before");
    const beforeId = searchParams.get("beforeId");

    const whereBase = { workspaceId: workspace.id };

    const where =
      before && beforeId
        ? {
            ...whereBase,
            OR: [
              { createdAt: { lt: new Date(before) } },
              {
                AND: [
                  { createdAt: { equals: new Date(before) } },
                  { id: { lt: beforeId } },
                ],
              },
            ],
          }
        : whereBase;

    const links = await prisma.link.findMany({
      where,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: limit,
      select: {
        id: true,
        code: true,
        targetUrl: true,
        clicks: true,
        createdAt: true,
        isActive: true,
        title: true,
      },
    });

    const last = links[links.length - 1] ?? null;
    const nextCursor =
      links.length === limit && last
        ? { before: last.createdAt.toISOString(), beforeId: last.id }
        : null;

    return NextResponse.json(
      {
        workspace: { id: workspace.id, name: workspace.name, slug: workspace.slug },
        links: links.map((l) => ({
          ...l,
          createdAt: l.createdAt.toISOString(),
        })),
        nextCursor,
      },
      {
        headers: {
          "Cache-Control": "private, no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("LINKS_GET_ERROR", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => ({}))) as {
      targetUrl?: string;
      url?: string;
      code?: string;
      workspaceId?: string;
      title?: string;
    };

    const rawUrl = (body.targetUrl ?? body.url ?? "").toString();
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

    const limit =
      workspace.plan === "CREATOR" ? CREATOR_LINK_LIMIT : FREE_LINK_LIMIT;

    const count = await prisma.link.count({
      where: { workspaceId: workspace.id },
    });

    if (count >= limit) {
      return new NextResponse(
        `You’ve reached your limit on the Free plan. You can create up to ${limit} links per workspace on the Free plan. Upgrade to the Creator plan (£9.99/mo) to create more links and unlock full access to Kompi tools.`,
        { status: 402 }
      );
    }

    let code = (body.code ?? "").toString().trim();

    if (code) {
      const exists = await prisma.link.findFirst({
        where: { code, workspaceId: workspace.id },
      });
      if (exists) {
        return new NextResponse("Custom code already in use", { status: 409 });
      }
    } else {
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

    const rawTitle = (body.title ?? "").toString().trim();
    const title = rawTitle || undefined;

    const link = await prisma.link.create({
      data: {
        workspaceId: workspace.id,
        code,
        targetUrl,
        isActive: true,
        title,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("LINKS_POST_ERROR", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
