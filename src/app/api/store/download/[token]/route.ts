import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { safePublicHref } from "@/lib/card-content";

export const dynamic = "force-dynamic";

/** Sends buyers with a completed order to the product file. */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const order = await prisma.order.findUnique({ where: { accessToken: token }, include: { product: { select: { fileUrl: true, accessUrl: true } } } });
  if (!order || !["PAID", "FREE"].includes(order.status)) return new NextResponse("This download isn't available.", { status: 404 });
  const target = safePublicHref(order.product.fileUrl || order.product.accessUrl);
  if (!target) return new NextResponse("This download isn't available.", { status: 404 });
  return NextResponse.redirect(target, { status: 302, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}
