import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { ApiError, apiError } from "@/lib/api-errors";
const schema = z.object({ slug: z.string().max(100).optional(), kcardId: z.string().max(100).optional(), name: z.string().trim().max(120).optional(), email: z.union([z.string().trim().email().max(254), z.literal("")]).optional(), phone: z.string().trim().max(50).optional(), message: z.string().trim().max(5000).optional(), intentKey: z.string().max(80).optional(), intentLabel: z.string().max(120).optional(), companyWebsite: z.string().optional() });
export async function POST(req: NextRequest) {
  try {
    await rateLimit("card-message-ip", requestIp(req), 20, 3600);
    const body = schema.parse(await req.json());
    if (body.companyWebsite) return NextResponse.json({ ok: true });
    if (!body.slug && !body.kcardId) throw new ApiError("Card is required.", 400);
    const card = await prisma.kCard.findFirst({ where: { ...(body.slug ? { slug: body.slug } : { id: body.kcardId }), isPublic: true, user: { bannedAt: null } }, select: { id: true, userId: true, data: true } });
    if (!card) throw new ApiError("Card not found.", 404);
    const content = card.data as { contact?: { enabled?: boolean; emailOnly?: boolean } } | null;
    if (!content?.contact?.enabled) throw new ApiError("This card is not accepting messages.", 400);
    if (!body.message && !body.email && !body.phone) throw new ApiError("Add a message or contact details.", 400);
    if (content.contact.emailOnly && !body.email) throw new ApiError("Add an email address.", 400);
    await rateLimit("card-message", `${card.id}:${requestIp(req)}`, 3, 3600);
    await prisma.kCardMessage.create({ data: { kcardId: card.id, ownerId: card.userId, name: body.name || null, email: body.email || null, phone: body.phone || null, message: body.message || null, intentKey: body.intentKey || null, intentLabel: body.intentLabel || null } });
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}
export async function GET() {
  try {
    const user = await requireUser();
    const items = await prisma.kCardMessage.findMany({ where: { ownerId: user.id }, orderBy: { createdAt: "desc" }, take: 200, select: { id: true, name: true, email: true, phone: true, message: true, intentLabel: true, createdAt: true } });
    return NextResponse.json({ ok: true, items });
  } catch (error) { return apiError(error); }
}
