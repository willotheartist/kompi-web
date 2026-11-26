import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { newToken, hashToken } from "@/lib/auth-tokens";
import { sendVerificationEmail } from "@/lib/email";
import { rateLimit, requestIp } from "@/lib/rate-limit";
import { apiError, ApiError } from "@/lib/api-errors";
export async function POST(req: Request) {
  try {
    await rateLimit("verify-email", requestIp(req), 10, 3600);
    const body = z.object({ email: z.string().trim().email().transform(v => v.toLowerCase()), token: z.string().min(20).max(128).optional() }).parse(await req.json());
    const identifier = `verify:${body.email}`;
    if (body.token) {
      await prisma.$transaction(async tx => {
        const used = await tx.verificationToken.deleteMany({ where: { identifier, token: hashToken(body.token!), expires: { gt: new Date() } } });
        if (!used.count) throw new ApiError("This confirmation link is invalid or has expired.");
        await tx.user.update({ where: { email: body.email }, data: { emailVerifiedAt: new Date() } });
      });
    } else {
      await rateLimit("verify-resend", body.email, 3, 3600);
      const user = await prisma.user.findUnique({ where: { email: body.email } });
      if (user && !user.emailVerifiedAt && !user.bannedAt) {
        const token = newToken();
        await prisma.$transaction([prisma.verificationToken.deleteMany({ where: { identifier } }), prisma.verificationToken.create({ data: { identifier, token: hashToken(token), expires: new Date(Date.now() + 86400000) } })]);
        await sendVerificationEmail(body.email, token);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (error) { return apiError(error); }
}
