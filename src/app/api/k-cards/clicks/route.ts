// src/app/api/k-cards/clicks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { apiError } from "@/lib/api-errors";
import { prisma } from "@/lib/prisma";

// POST  /api/k-cards/clicks
// Body: { slug: string; linkId: string; url: string }
export async function POST(req: NextRequest) {
  try {
    await rateLimit("card-click", requestIp(req), 120, 3600);
    const { slug, linkId, url } = (await req.json()) as {
      slug?: string;
      linkId?: string;
      url?: string;
    };

    if (!slug || !linkId || !url) {
      return NextResponse.json(
        { error: "Missing required fields (slug, linkId, url)" },
        { status: 400 }
      );
    }

    const kcard = await prisma.kCard.findFirst({
      where: { slug, isPublic: true, user: { bannedAt: null } },
      select: { id: true, data: true },
    });

    if (!kcard) {
      return NextResponse.json(
        { error: "K-Card not found" },
        { status: 404 }
      );
    }

    const content = kcard.data as { links?: Array<{ id: string; url: string; enabled: boolean }> };
    if (!Array.isArray(content.links) || !content.links.some(l => l.id === linkId && l.url === url && l.enabled)) return NextResponse.json({ error: "Link not found" }, { status: 404 });
    const referer = null;
    const userAgent = null;

    await prisma.kCardLinkClick.create({
      data: {
        kcardId: kcard.id,
        linkId,
        url,
        referer,
        userAgent,
      },
    });

    // best-effort – nothing for client to do
    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiError(err);
  }
}

// GET  /api/k-cards/clicks?slug=your-slug
// Response: { data: { linkId: string; totalClicks: number }[] }
export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug query parameter" },
        { status: 400 }
      );
    }

    const kcard = await prisma.kCard.findFirst({
      where: { slug, userId: user.id },
      select: { id: true },
    });

    if (!kcard) {
      return NextResponse.json(
        { error: "K-Card not found" },
        { status: 404 }
      );
    }

    const grouped = await prisma.kCardLinkClick.groupBy({
      by: ["linkId"],
      where: {
        kcardId: kcard.id,
      },
      _count: { linkId: true },
    });

    const data = grouped.map((g) => ({
      linkId: g.linkId,
      totalClicks: g._count.linkId,
    }));

    return NextResponse.json({ data });
  } catch (err) {
    return apiError(err);
  }
}
