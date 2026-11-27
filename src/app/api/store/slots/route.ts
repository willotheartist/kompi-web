import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, ApiError } from "@/lib/api-errors";
import { bookingSlots, readBookingRules } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("productId") ?? "";
    const product = await prisma.product.findFirst({ where: { id, status: "PUBLISHED", type: "BOOKING" } });
    if (!product) throw new ApiError("Not found", 404);
    const rules = readBookingRules(product.booking);
    const live = await prisma.order.findMany({
      where: { productId: product.id, bookingStart: { gte: new Date(Date.now() - 86_400_000) }, OR: [{ status: { in: ["PAID", "FREE"] } }, { status: "PENDING", createdAt: { gte: new Date(Date.now() - 35 * 60_000) } }] },
      select: { bookingStart: true, bookingEnd: true },
    });
    const taken = live.filter((o) => o.bookingStart).map((o) => ({ start: o.bookingStart!.getTime(), end: (o.bookingEnd ?? o.bookingStart!).getTime() }));
    return NextResponse.json({ timezone: rules.timezone, days: bookingSlots(rules, product.durationMin ?? 30, taken) }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return apiError(e);
  }
}
