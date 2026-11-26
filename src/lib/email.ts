import { Resend } from "resend";
import { APP_URL } from "./urls";
export function emailConfigured() { return !!process.env.RESEND_API_KEY; }
export function escapeHtml(value: string) { return value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;", "'": "&#39;" }[c] || c)); }
export async function sendEmail(options: { to: string; subject: string; html: string; text?: string }) {
  if (!process.env.RESEND_API_KEY) throw new Error("Transactional email is not configured");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL || "Kompi <hello@mail.kompi.app>", ...options });
  if (result.error) throw new Error(`Email delivery rejected: ${result.error.name}`);
  return result.data;
}
export async function sendWelcomeEmail(to: string) {
  return sendEmail({ to, subject: "Welcome to Kompi", html: `<p>Your Kompi is ready.</p><p>Create a Card, design a QR code or shorten a link.</p><p><a href="${APP_URL}/dashboard">Open your workspace</a></p>` });
}
export async function sendPasswordResetEmail(to: string, token: string) {
  const url = `${APP_URL}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(to)}`;
  return sendEmail({ to, subject: "Reset your Kompi password", html: `<p>Use the link below to choose a new password. It expires in one hour and can be used once.</p><p><a href="${escapeHtml(url)}">Reset password</a></p><p>If you did not request this, you can ignore this email.</p>` });
}
export async function sendVerificationEmail(to: string, token: string) {
  const url = `${APP_URL}/verify-email?token=${encodeURIComponent(token)}&email=${encodeURIComponent(to)}`;
  return sendEmail({ to, subject: "Confirm your Kompi email", html: `<p>Confirm your email to start using your Kompi workspace.</p><p><a href="${escapeHtml(url)}">Confirm email</a></p><p>This link expires in 24 hours.</p>` });
}
