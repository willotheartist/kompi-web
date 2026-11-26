import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/auth-tokens";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { apiError, ApiError } from "@/lib/api-errors";
export async function POST(req: Request) {
  try {
    await rateLimit("reset-submit", requestIp(req), 10, 3600);
    const body = z.object({ email: z.string().trim().email().transform(v => v.toLowerCase()), token: z.string().min(20).max(128), password: z.string().min(8).max(128) }).parse(await req.json());
    const passwordHash = await bcrypt.hash(body.password, 12);
    await prisma.$transaction(async tx => {
      const used = await tx.passwordResetToken.deleteMany({ where: { email: body.email, token: { in: [hashToken(body.token), body.token] }, expiresAt: { gt: new Date() } } });
      if (!used.count) throw new ApiError("This reset link is invalid or has expired.");
      await tx.user.update({ where: { email: body.email }, data: { passwordHash, emailVerifiedAt: new Date(), sessionVersion: { increment: 1 } } });
    });
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}
