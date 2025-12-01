// src/app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const RESET_EXPIRY_HOURS = 1;

export async function POST(req: Request) {
  try {
    const { email: rawEmail } = await req.json();
    const email =
      typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

    if (!email) {
      return NextResponse.json({ ok: true });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true },
    });

    // Always respond 200 to avoid leaking which emails exist
    if (!user) {
      return NextResponse.json({ ok: true });
    }

    // Clean up old tokens for this email
    await prisma.passwordResetToken.deleteMany({ where: { email } });

    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + RESET_EXPIRY_HOURS * 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL ?? "http://localhost:3000";

    const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(
      token,
    )}&email=${encodeURIComponent(email)}`;

    if (resend) {
      await resend.emails.send({
        from: "Kompi <hello@mail.kompi.app>",
        to: email,
        subject: "Reset your Kompi password",
        html: `
          <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height:1.5; color:#111827;">
            <p>We received a request to reset your Kompi password.</p>
            <p><a href="${resetUrl}" style="display:inline-block;padding:10px 16px;border-radius:999px;background:#000;color:#fff;text-decoration:none;">Reset password</a></p>
            <p style="font-size:12px;color:#6b7280;margin-top:16px;">
              If you didn't request this, you can ignore this email.
            </p>
          </div>
        `,
      });
    } else {
      console.log("[forgot-password] reset link:", resetUrl);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Forgot password error", err);
    return NextResponse.json({ ok: true });
  }
}
