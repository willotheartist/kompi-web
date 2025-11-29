// src/app/api/qr-menus/[id]/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  _req: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { id } = await context.params;

    if (!id || typeof id !== "string") {
      return new NextResponse("Missing id", { status: 400 });
    }

    await prisma.menu.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (err: unknown) {
    console.error("Failed to delete menu", err);
    return new NextResponse("Failed to delete menu", { status: 500 });
  }
}
