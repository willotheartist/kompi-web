import { z } from "zod";

export const KRLogoUploadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  dataUrl: z.string().max(700_000).regex(/^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i),
});
export type ReusableKRLogo = {
  id: string;
  name: string;
  dataUrl: string;
  source: "account" | "code" | "device";
};
export const KR_LOGO_STORAGE_KEY = "kompi-qr-logos-v1";

export function mergeKRLogos(...groups: ReusableKRLogo[][]): ReusableKRLogo[] {
  const seen = new Set<string>();
  const ids = new Set<string>();
  return groups.flat().filter(logo => {
    if (seen.has(logo.dataUrl) || ids.has(logo.id)) return false;
    seen.add(logo.dataUrl);
    ids.add(logo.id);
    return true;
  });
}

/** Validate local data too: this store never accepts SVG, URLs or active content. */
export function readDeviceLogos(raw: string | null): ReusableKRLogo[] {
  try {
    const entries: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(entries)) return [];
    return entries.slice(0,12).flatMap(entry => {
      const parsed = KRLogoUploadSchema.safeParse(entry);
      return parsed.success ? [{...parsed.data,id:typeof entry.id === "string" ? entry.id : `device-${parsed.data.name}`,source:"device" as const}] : [];
    });
  } catch { return []; }
}

/** Keep a bounded recent library; a large image must not evict every other logo. */
export function recentDeviceLogos(logos: ReusableKRLogo[]): ReusableKRLogo[] {
  let bytes = 0;
  return mergeKRLogos(logos).filter(logo => {
    bytes += logo.dataUrl.length;
    return bytes <= 2_000_000;
  }).slice(0,12).map(logo => ({...logo,source:"device"}));
}
