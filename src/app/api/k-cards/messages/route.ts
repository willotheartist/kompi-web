import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

function hashIp(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

export async function POST(req: NextRequest) {
  try {
    const raw: unknown = await req.json();

    if (!raw || typeof raw !== "object") {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const body = raw as Record<string, unknown>;

    // Honeypot (optional)
    if (body?.companyWebsite) {
      return NextResponse.json({ ok: true });
    }

    const slug = typeof body?.slug === "string" ? body.slug.trim() : "";
    const kcardId = typeof body?.kcardId === "string" ? body.kcardId.trim() : "";

    if (!slug && !kcardId) {
      return NextResponse.json({ error: "Missing slug or kcardId." }, { status: 400 });
    }

    const kcard = await prisma.kCard.findFirst({
      where: slug ? { slug, isPublic: true } : { id: kcardId, isPublic: true },
      select: { id: true, userId: true },
    });

    if (!kcard) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const name = typeof body?.name === "string" ? body.name.trim() : null;
    const email = typeof body?.email === "string" ? body.email.trim() : null;
    const phone = typeof body?.phone === "string" ? body.phone.trim() : null;
    const message = typeof body?.message === "string" ? body.message.trim() : null;

    const intentKey = typeof body?.intentKey === "string" ? body.intentKey.trim() : null;
    const intentLabel = typeof body?.intentLabel === "string" ? body.intentLabel.trim() : null;

    if (!message && !email && !phone) {
      return NextResponse.json(
        { error: "Please add a message, email, or phone." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const ipHash = ip === "unknown" ? null : hashIp(ip);

    // Basic rate limit: 3 per hour per IP per card
    if (ipHash) {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const recentCount = await prisma.kCardMessage.count({
        where: { kcardId: kcard.id, ipHash, createdAt: { gte: oneHourAgo } },
      });
      if (recentCount >= 3) {
        return NextResponse.json(
          { error: "Too many messages. Try again later." },
          { status: 429 }
        );
      }
    }

    const userAgent = req.headers.get("user-agent") || null;

    await prisma.kCardMessage.create({
      data: {
        kcardId: kcard.id,
        ownerId: kcard.userId,
        intentKey,
        intentLabel,
        name,
        email,
        phone,
        message,
        ipHash,
        userAgent,
        meta: { source: "kcard_contact_button" },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/k-cards/messages error", e);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
