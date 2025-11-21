import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET(_req: NextRequest) {
  try {
    const user = await requireUser();

    const kcard = await prisma.kCard.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      slug: kcard?.slug ?? null,
      isPublic: kcard?.isPublic ?? true,
    });
  } catch (err) {
    console.error("GET /api/k-cards/share error", err);
    return NextResponse.json(
      { error: "Failed to load K-Card share settings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = (await req.json()) as {
      slug?: string | null;
      isPublic?: boolean;
    };

    let { slug, isPublic } = body;

    slug = (slug ?? "").trim().toLowerCase();

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        { error: "Slug can only contain letters, numbers and hyphens" },
        { status: 400 }
      );
    }

    if (typeof isPublic !== "boolean") {
      isPublic = true;
    }

    const existing = await prisma.kCard.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    let kcard;

    if (existing) {
      const usedByAnother = await prisma.kCard.findFirst({
        where: {
          slug,
          NOT: { id: existing.id },
        },
      });
      if (usedByAnother) {
        return NextResponse.json(
          { error: "That URL is already taken" },
          { status: 400 }
        );
      }

      kcard = await prisma.kCard.update({
        where: { id: existing.id },
        data: {
          slug,
          isPublic,
        },
      });
    } else {
      const used = await prisma.kCard.findFirst({ where: { slug } });
      if (used) {
        return NextResponse.json(
          { error: "That URL is already taken" },
          { status: 400 }
        );
      }

      kcard = await prisma.kCard.create({
        data: {
          userId: user.id,
          slug,
          isPublic,
          data: {}, // empty JSON; editor will fill
        },
      });
    }

    return NextResponse.json({
      ok: true,
      slug: kcard.slug,
      isPublic: kcard.isPublic,
    });
  } catch (err) {
    console.error("POST /api/k-cards/share error", err);
    return NextResponse.json(
      { error: "Failed to update K-Card share settings" },
      { status: 500 }
    );
  }
}
