import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiError, ApiError } from "@/lib/api-errors";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { discountAmount, discountLabel } from "@/lib/store";
import { findDiscount } from "@/lib/store-server";

export const dynamic = "force-dynamic";

/** Checks a discount code for a product (public, rate limited). */
export async function GET(req: NextRequest) {
  try {
    await rateLimit("store-discount", requestIp(req), 30, 600);
    const productId = req.nextUrl.searchParams.get("productId") ?? "";
    const code = req.nextUrl.searchParams.get("code") ?? "";
    const product = await prisma.product.findFirst({ where: { id: productId, status: "PUBLISHED" } });
    if (!product) throw new ApiError("This product isn't available.", 404);
    const d = await findDiscount(product.workspaceId, product, code);
    const off = discountAmount(product.priceCents, d);
    return NextResponse.json({ code: d.code, label: discountLabel(d, product.currency), discountCents: off, totalCents: product.priceCents - off }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    return apiError(e);
  }
}
