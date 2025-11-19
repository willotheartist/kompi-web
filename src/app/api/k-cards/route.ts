
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { Prisma } from "@prisma/client";

// Store arbitrary K-Card editor state as JSON
type KCardPayload = Prisma.InputJsonObject;

export async function GET(_req: NextRequest) {
  try {
    const user = await requireUser();

    const kcard = await prisma.kCard.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ kcard });
  } catch (err) {
    console.error("GET /api/k-cards error", err);
    return NextResponse.json(
      { error: "Failed to load K-Card" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = await requireUser();

    const raw = (await req.json()) as unknown;

    if (!raw || typeof raw !== "object") {
      return NextResponse.json(
        { error: "Invalid K-Card payload" },
        { status: 400 }
      );
    }

    const payload = raw as KCardPayload;

    const existing = await prisma.kCard.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    let kcard;

    if (existing) {
      kcard = await prisma.kCard.update({
        where: { id: existing.id },
        data: { data: payload },
      });
    } else {
      kcard = await prisma.kCard.create({
        data: {
          userId: user.id,
          data: payload,
        },
      });
    }

    return NextResponse.json({ ok: true, kcard });
  } catch (err) {
    console.error("PUT /api/k-cards error", err);
    return NextResponse.json(
      { error: "Failed to save K-Card" },
      { status: 500 }
    );
  }
}
