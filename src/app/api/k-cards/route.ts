import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { Prisma } from "@prisma/client";

// Store arbitrary K-Card editor state as JSON
type KCardPayload = Prisma.InputJsonObject;

const KCARD_FREE_LIMIT = 0;
const KCARD_CREATOR_LIMIT = 1;

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
      // Editing an existing K-Card is always allowed (no limit check).
      kcard = await prisma.kCard.update({
        where: { id: existing.id },
        data: { data: payload },
      });
    } else {
      // Creating the first K-Card – enforce plan and limits.

      const workspaces = await prisma.workspace.findMany({
        where: { ownerId: user.id },
      });

      const hasCreator = workspaces.some((ws) => ws.plan === "CREATOR");
      const limit = hasCreator ? KCARD_CREATOR_LIMIT : KCARD_FREE_LIMIT;

      if (limit <= 0) {
        return NextResponse.json(
          {
            error:
              "K-Card editor is part of the Creator plan. Upgrade to create your first K-Card.",
          },
          { status: 402 }
        );
      }

      const count = await prisma.kCard.count({
        where: { userId: user.id },
      });

      if (count >= limit) {
        return NextResponse.json(
          {
            error: `Creator plan limit reached: you can create up to ${limit} Kompi K-Card${limit === 1 ? "" : "s"}.`,
          },
          { status: 402 }
        );
      }

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
