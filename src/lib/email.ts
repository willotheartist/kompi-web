// src/lib/email.ts
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL || "Kompi <onboarding@resend.dev>";
const appUrl = process.env.APP_URL || "http://localhost:3000";

if (!resendApiKey) {
  console.warn("[email] RESEND_API_KEY is not set – emails will not be sent.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text?: string;
};

/**
 * Low-level helper – you can reuse for any email in the app.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  if (!resend) {
    console.warn("[email] Resend client not initialized, skipping send.");
    return;
  }

  await resend.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
    text,
  });
}

/**
 * Welcome email after signup.
 */
export async function sendWelcomeEmail(to: string) {
  const dashboardUrl = `${appUrl}/dashboard`;

  const subject = "Welcome to Kompi 🎉";
  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a;">
      <h1 style="font-size: 24px; margin-bottom: 8px;">Welcome to Kompi 👋</h1>
      <p style="margin: 0 0 12px;">You’re in. Your Kompi account is ready.</p>
      <p style="margin: 0 0 16px;">
        Head over to your dashboard to create links, K-Cards, QR menus and more.
      </p>
      <a
        href="${dashboardUrl}"
        style="display: inline-block; padding: 10px 18px; border-radius: 999px; background: #020617; color: #f9fafb; text-decoration: none; font-weight: 600; margin-top: 8px;"
      >
        Go to your dashboard
      </a>
      <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">
        If you didn’t sign up for Kompi, you can ignore this email.
      </p>
    </div>
  `;

  const text = `Welcome to Kompi!

You’re in. Your Kompi account is ready.

Open your dashboard: ${dashboardUrl}

If you didn’t sign up for Kompi, you can ignore this email.`;

  await sendEmail({ to, subject, html, text });
}

/**
 * Forgot password email – pass in the raw token, we’ll build the link.
 */
export async function sendPasswordResetEmail(to: string, token: string) {
  const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(token)}`;

  const subject = "Reset your Kompi password";
  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a;">
      <h1 style="font-size: 22px; margin-bottom: 8px;">Reset your password</h1>
      <p style="margin: 0 0 12px;">We received a request to reset your Kompi password.</p>
      <p style="margin: 0 0 16px;">
        Click the button below to choose a new password. This link will expire soon.
      </p>
      <a
        href="${resetUrl}"
        style="display: inline-block; padding: 10px 18px; border-radius: 999px; background: #020617; color: #f9fafb; text-decoration: none; font-weight: 600; margin-top: 8px;"
      >
        Reset password
      </a>
      <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">
        If you didn’t request this, you can safely ignore this email.
      </p>
    </div>
  `;

  const text = `Reset your Kompi password

We received a request to reset your password.

Reset link: ${resetUrl}

If you didn’t request this, you can ignore this email.`;

  await sendEmail({ to, subject, html, text });
}
