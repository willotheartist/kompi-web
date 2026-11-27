import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit, requestIp } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

/** Counts product clicks from a Card (best effort). */
export async function POST(req: NextRequest) {
  try {
    const { productId } = z.object({ productId: z.string().max(64) }).parse(await req.json());
    await rateLimit("store-track", `${requestIp(req)}:${productId}`, 10, 600);
    await prisma.product.updateMany({ where: { id: productId, status: "PUBLISHED" }, data: { clicks: { increment: 1 } } });
  } catch {}
  return NextResponse.json({ ok: true });
}
