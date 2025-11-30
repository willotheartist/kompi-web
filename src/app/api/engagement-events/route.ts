// FILE: src/app/api/engagement-events/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      workspaceId,
      type,
      value,
      context,
    }: {
      workspaceId?: string;
      type?: string;
      value?: string | null;
      context?: unknown;
    } = body || {};

    if (!workspaceId || !type) {
      return new NextResponse("workspaceId and type are required", {
        status: 400,
      });
    }

    const event = await prisma.engagementEvent.create({
      data: {
        workspaceId,
        type,
        value: value ?? null,
        context: context ?? undefined,
      },
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (err) {
    console.error("Error in POST /api/engagement-events", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
