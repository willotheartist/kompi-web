import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { emailConfigured, sendVerificationEmail } from "@/lib/email";
import { newToken, hashToken } from "@/lib/auth-tokens";
import { validateHandle, assertHandleAvailable } from "@/lib/handles";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { ApiError, apiError } from "@/lib/api-errors";
const schema = z.object({ email: z.string().trim().email().max(254).transform(v => v.toLowerCase()), password: z.string().min(8).max(128), handle: z.string(), name: z.string().trim().max(100).optional(), marketingOptIn: z.boolean().optional() });
export async function POST(req: Request) {
  try {
    await rateLimit("signup-ip", requestIp(req), 5, 3600);
    const body = schema.parse(await req.json());
    if (!emailConfigured()) throw new ApiError("Email signup is temporarily unavailable. Please continue with Google or try again later.", 503);
    const handle = validateHandle(body.handle);
    const token = newToken(); const passwordHash = await bcrypt.hash(body.password, 12);
    await prisma.$transaction(async tx => {
      await assertHandleAvailable(tx, handle);
      if (await tx.user.findUnique({ where: { email: body.email } })) throw new ApiError("An account already uses these details. Sign in or reset your password.", 409);
      const user = await tx.user.create({ data: { email: body.email, passwordHash, name: body.name || null, marketingOptIn: body.marketingOptIn || false } });
      const workspace = await tx.workspace.create({ data: { name: "My workspace", slug: `ws-${user.id}`, ownerId: user.id } });
      await tx.kCard.create({ data: { userId: user.id, workspaceId: workspace.id, slug: handle, isPublic: false, data: { title: body.name || handle, subtitle: "", links: [], socials: [], contact: { enabled: true, buttonLabel: "Get in touch" } } } });
      await tx.verificationToken.create({ data: { identifier: `verify:${body.email}`, token: hashToken(token), expires: new Date(Date.now() + 86400000) } });
    });
    try { await sendVerificationEmail(body.email, token); } catch { return NextResponse.json({ ok: true, requiresVerification: true, deliveryPending: true }, { status: 201 }); }
    return NextResponse.json({ ok: true, requiresVerification: true }, { status: 201 });
  } catch (error) { return apiError(error); }
}
