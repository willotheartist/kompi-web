import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing KR Code id" },
        { status: 400 }
      );
    }

    // Ensure the KR Code belongs to the current user
    const existing = await prisma.kRCode.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "KR Code not found" },
        { status: 404 }
      );
    }

    await prisma.kRCode.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/kr-codes/[id] error", err);
    return NextResponse.json(
      { error: "Failed to delete KR Code" },
      { status: 500 }
    );
  }
}
