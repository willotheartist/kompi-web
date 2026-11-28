import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api-errors";
import { normalizeCode } from "@/lib/store";

export const dynamic = "force-dynamic";

async function ws() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  if (!workspace) throw new ApiError("Workspace not found", 404);
  return workspace;
}

export async function GET() {
  try {
    const workspace = await ws();
    const discounts = await prisma.storeDiscount.findMany({ where: { workspaceId: workspace.id }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ discounts });
  } catch (e) {
    return apiError(e);
  }
}

const schema = z
  .object({
    code: z.string().min(1).max(40),
    percentOff: z.number().int().min(1).max(100).nullable().optional(),
    amountOffCents: z.number().int().min(1).max(10_000_000).nullable().optional(),
    productIds: z.array(z.string().max(64)).max(200).optional(),
    maxUses: z.number().int().min(1).max(1_000_000).nullable().optional(),
    expiresAt: z.string().datetime().nullable().optional(),
  })
  .refine((v) => Boolean(v.percentOff) !== Boolean(v.amountOffCents), "Choose a percentage or an amount off.");

export async function POST(req: NextRequest) {
  try {
    const workspace = await ws();
    const body = schema.parse(await req.json());
    const code = normalizeCode(body.code);
    if (code.length < 3) throw new ApiError("Codes need at least 3 letters or numbers.");
    const count = await prisma.storeDiscount.count({ where: { workspaceId: workspace.id } });
    if (count >= 500) throw new ApiError("You've reached the discount code limit.", 403);
    const productIds = body.productIds?.length
      ? (await prisma.product.findMany({ where: { workspaceId: workspace.id, id: { in: body.productIds } }, select: { id: true } })).map((p) => p.id)
      : [];
    try {
      const discount = await prisma.storeDiscount.create({
        data: {
          workspaceId: workspace.id,
          code,
          percentOff: body.percentOff ?? null,
          amountOffCents: body.amountOffCents ?? null,
          productIds,
          maxUses: body.maxUses ?? null,
          expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        },
      });
      return NextResponse.json({ discount }, { status: 201 });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") throw new ApiError("You already have a code with that name.", 409);
      throw e;
    }
  } catch (e) {
    return apiError(e);
  }
}
