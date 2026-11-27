import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookingIcs } from "@/lib/store-server";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await prisma.order.findUnique({ where: { accessToken: token }, include: { product: true, workspace: { select: { ownerId: true } } } });
  if (!order || !["PAID", "FREE"].includes(order.status)) return new NextResponse("Not found", { status: 404 });
  const owner = await prisma.user.findUnique({ where: { id: order.workspace.ownerId }, select: { name: true } });
  const ics = bookingIcs(order, owner?.name || "your host");
  if (!ics) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(ics, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="booking.ics"`, "Cache-Control": "no-store" } });
}
