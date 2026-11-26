function origin(value: string | undefined, fallback: string) {
  try { const url = new URL(value || fallback); return url.origin; } catch { return fallback; }
}
const previewHost = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ? process.env.NEXT_PUBLIC_VERCEL_URL : undefined;
export const PUBLIC_SITE_URL = previewHost ? `https://${previewHost}` : origin(process.env.NEXT_PUBLIC_SITE_URL, "https://kompi.app");
export const PUBLIC_PROFILE_URL = previewHost ? `https://${previewHost}` : origin(process.env.NEXT_PUBLIC_PROFILE_URL, PUBLIC_SITE_URL);
export const SHORT_LINK_BASE_URL = previewHost ? `https://${previewHost}` : origin(process.env.NEXT_PUBLIC_SHORT_LINK_URL, PUBLIC_SITE_URL);
export const APP_URL = previewHost ? `https://${previewHost}` : origin(process.env.NEXT_PUBLIC_APP_URL, "https://kompi.app");
export const appUrl = (path = "/dashboard") => `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
export function safeReturnPath(value: string | null | undefined, fallback = "/dashboard") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\r\n]/.test(value)) return fallback;
  return value;
}
