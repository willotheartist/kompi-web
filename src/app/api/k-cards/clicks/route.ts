// src/app/api/k-cards/clicks/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST  /api/k-cards/clicks
// Body: { slug: string; linkId: string; url: string }
export async function POST(req: NextRequest) {
  try {
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
      where: { slug, isPublic: true },
      select: { id: true },
    });

    if (!kcard) {
      return NextResponse.json(
        { error: "K-Card not found" },
        { status: 404 }
      );
    }

    const referer = req.headers.get("referer");
    const userAgent = req.headers.get("user-agent");

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
    console.error("Error recording K-Card link click", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET  /api/k-cards/clicks?slug=your-slug
// Response: { data: { linkId: string; totalClicks: number }[] }
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug query parameter" },
        { status: 400 }
      );
    }

    const kcard = await prisma.kCard.findFirst({
      where: { slug },
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
    console.error("Error loading K-Card click stats", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
