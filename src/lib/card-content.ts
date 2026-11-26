import { z } from "zod";
export function safePublicHref(raw: string | null | undefined) {
  const value = typeof raw === "string" ? raw.trim() : ""; if (!value) return null;
  try { const url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`); return ["https:", "http:", "mailto:", "tel:"].includes(url.protocol) ? url.href : null; } catch { return null; }
}
const href = z.string().max(4096).refine(v => !v || !!safePublicHref(v), "Use a website, email or phone link.");
export const cardContentSchema = z.object({
 title: z.string().max(120).optional(), subtitle: z.string().max(500).optional(),
 profileLayout: z.enum(["classic", "hero"]).optional(), titleSize: z.enum(["small", "large"]).optional(),
 theme: z.record(z.string(), z.unknown()).optional(), links: z.array(z.object({ id: z.string().max(128), title: z.string().max(200), url: href, enabled: z.boolean() })).max(100).optional(),
 socials: z.array(z.string().max(40)).max(30).optional(), socialUrls: z.record(z.string(), href).optional(),
 avatarDataUrl: z.string().max(2500000).refine(v => /^data:image\/(png|jpeg|jpg|webp|gif);base64,/.test(v) || /^https:\/\//.test(v), "Use a supported profile image.").nullable().optional(),
 avatarSize: z.enum(["small", "medium", "large"]).optional(), headerTextSize: z.enum(["small", "medium", "large"]).optional(), avatarShadow: z.enum(["shadow", "flat"]).optional(),
 contact: z.object({ enabled: z.boolean(), buttonLabel: z.string().max(80), emailOnly: z.boolean().optional(), intents: z.array(z.object({ key: z.string().max(80), label: z.string().max(120), enabled: z.boolean().optional() })).max(20).optional() }).optional(),
 contactDetails: z.object({ email: z.union([z.string().email().max(254), z.literal("")]), phone: z.string().max(40), company: z.string().max(120).optional() }).optional(),
});
export function vcardEscape(value: string) { return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,"); }
