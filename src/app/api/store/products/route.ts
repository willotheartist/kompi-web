import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api-errors";
import { DEFAULT_BOOKING, PRODUCT_TYPES, slugify, type ProductTypeId } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id);
    if (!workspace) throw new ApiError("Workspace not found", 404);
    const products = await prisma.product.findMany({
      where: { workspaceId: workspace.id, status: { not: "ARCHIVED" } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: { id: true, slug: true, type: true, status: true, title: true, subtitle: true, coverImage: true, priceCents: true, currency: true, payWhatYouWant: true, buttonLabel: true, durationMin: true },
    });
    return NextResponse.json({ products });
  } catch (e) {
    return apiError(e);
  }
}

const createSchema = z.object({ type: z.enum(["DOWNLOAD", "LEAD_MAGNET", "BOOKING", "PAID_LINK", "TIP"]) });

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const workspace = await getActiveWorkspace(user.id);
    if (!workspace) throw new ApiError("Workspace not found", 404);
    const { type } = createSchema.parse(await req.json());
    const count = await prisma.product.count({ where: { workspaceId: workspace.id } });
    if (count >= 200) throw new ApiError("You've reached the product limit for a workspace.", 403);
    const meta = PRODUCT_TYPES[type as ProductTypeId];
    const base = slugify(meta.defaultTitle);
    let slug = base;
    for (let i = 2; await prisma.product.findUnique({ where: { workspaceId_slug: { workspaceId: workspace.id, slug } } }); i++) slug = `${base}-${i}`;
    const product = await prisma.product.create({
      data: {
        workspaceId: workspace.id,
        type,
        slug,
        title: meta.defaultTitle,
        currency: workspace.storeCurrency,
        priceCents: type === "LEAD_MAGNET" ? 0 : type === "TIP" ? 500 : type === "BOOKING" ? 5000 : 1500,
        payWhatYouWant: type === "TIP",
        minPriceCents: type === "TIP" ? 100 : null,
        durationMin: type === "BOOKING" ? 30 : null,
        booking: type === "BOOKING" ? DEFAULT_BOOKING : undefined,
        buttonLabel: meta.defaultButton,
      },
      select: { id: true },
    });
    return NextResponse.json({ id: product.id }, { status: 201 });
  } catch (e) {
    return apiError(e);
  }
}
