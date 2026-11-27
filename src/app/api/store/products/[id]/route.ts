import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api-errors";
import { safePublicHref } from "@/lib/card-content";
import { CURRENCIES, PRODUCT_TYPES, productSetupIssues, readBookingRules, slugify, type ProductTypeId } from "@/lib/store";

export const dynamic = "force-dynamic";

async function owned(id: string) {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  if (!workspace) throw new ApiError("Workspace not found", 404);
  const product = await prisma.product.findFirst({ where: { id, workspaceId: workspace.id } });
  if (!product) throw new ApiError("Product not found", 404);
  return { workspace, product };
}

const link = z.string().max(2048).refine((v) => !v || !!safePublicHref(v), "Use a full web link (https://…).");
const patchSchema = z.object({
  title: z.string().trim().min(1, "Add a title").max(120).optional(),
  subtitle: z.string().max(200).nullable().optional(),
  description: z.string().max(5000).nullable().optional(),
  coverImage: z
    .string()
    .max(1_500_000)
    .refine((v) => /^data:image\/(png|jpeg|jpg|webp|gif);base64,/.test(v) || /^https:\/\//.test(v), "Use a JPG, PNG, WebP or GIF image.")
    .nullable()
    .optional(),
  slug: z.string().max(60).optional(),
  priceCents: z.number().int().min(0).max(10_000_000).optional(),
  currency: z.enum(CURRENCIES).optional(),
  payWhatYouWant: z.boolean().optional(),
  minPriceCents: z.number().int().min(0).max(10_000_000).nullable().optional(),
  buttonLabel: z.string().max(40).nullable().optional(),
  fileUrl: link.nullable().optional(),
  fileName: z.string().max(200).nullable().optional(),
  fileSize: z.number().int().min(0).nullable().optional(),
  accessUrl: link.nullable().optional(),
  durationMin: z.number().int().min(5).max(480).nullable().optional(),
  booking: z.unknown().optional(),
  thankYouNote: z.string().max(2000).nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { product } = await owned((await params).id);
    return NextResponse.json({ product });
  } catch (e) {
    return apiError(e);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { workspace, product } = await owned((await params).id);
    const body = patchSchema.parse(await req.json());
    const data: Prisma.ProductUpdateInput = { ...body, booking: undefined, slug: undefined };
    if (body.booking !== undefined) data.booking = readBookingRules(body.booking) as unknown as Prisma.InputJsonValue;
    if (body.fileUrl) data.fileUrl = safePublicHref(body.fileUrl);
    if (body.accessUrl) data.accessUrl = safePublicHref(body.accessUrl);
    // Drafts still on their starter address follow the title until someone edits the address.
    const starter = slugify(PRODUCT_TYPES[product.type as ProductTypeId].defaultTitle);
    if (body.title && body.slug === undefined && product.status === "DRAFT" && (product.slug === starter || product.slug.startsWith(`${starter}-`))) {
      const base = slugify(body.title);
      let slug = base;
      for (let i = 2; await prisma.product.findFirst({ where: { workspaceId: workspace.id, slug, id: { not: product.id } }, select: { id: true } }); i++) slug = `${base}-${i}`;
      data.slug = slug;
    }
    if (body.slug !== undefined) {
      const slug = slugify(body.slug);
      const clash = await prisma.product.findFirst({ where: { workspaceId: workspace.id, slug, id: { not: product.id } }, select: { id: true } });
      if (clash) throw new ApiError("Another product already uses that address.", 409);
      data.slug = slug;
    }
    const next = { ...product, ...body, booking: body.booking !== undefined ? data.booking : product.booking } as typeof product;
    if (body.status === "PUBLISHED") {
      const issues = productSetupIssues({ ...next, type: next.type as ProductTypeId }, workspace.connectChargesEnabled);
      if (issues.length) throw new ApiError(`Before publishing: ${issues.join(", ").toLowerCase()}.`, 400);
    }
    const updated = await prisma.product.update({ where: { id: product.id }, data });
    return NextResponse.json({ product: updated });
  } catch (e) {
    return apiError(e);
  }
}

/** Products with orders are archived rather than deleted, so sales history stays intact. */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { product } = await owned((await params).id);
    const orders = await prisma.order.count({ where: { productId: product.id } });
    if (orders) await prisma.product.update({ where: { id: product.id }, data: { status: "ARCHIVED" } });
    else await prisma.product.delete({ where: { id: product.id } });
    return NextResponse.json({ ok: true, archived: orders > 0 });
  } catch (e) {
    return apiError(e);
  }
}
