import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail, emailConfigured } from "@/lib/email";
import { newToken, hashToken } from "@/lib/auth-tokens";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { apiError, ApiError } from "@/lib/api-errors";
export async function POST(req: Request) {
  try {
    await rateLimit("reset-ip", requestIp(req), 10, 3600);
    const { email } = z.object({ email: z.string().trim().email().max(254).transform(v => v.toLowerCase()) }).parse(await req.json());
    await rateLimit("reset-email", email, 3, 3600);
    if (!emailConfigured()) throw new ApiError("Email recovery is temporarily unavailable. Please try again later or contact support.", 503);
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, bannedAt: true } });
    if (user && !user.bannedAt) {
      const token = newToken();
      await prisma.$transaction([prisma.passwordResetToken.deleteMany({ where: { email } }), prisma.passwordResetToken.create({ data: { email, token: hashToken(token), expiresAt: new Date(Date.now() + 3600000) } })]);
      await sendPasswordResetEmail(email, token);
    }
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}
