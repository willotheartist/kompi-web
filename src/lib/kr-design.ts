import { z } from "zod";

const color = z.string().regex(/^#[0-9a-f]{6}$/i);
const logo = z.string().max(700_000).refine((v) =>
  /^data:image\/(png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(v) ||
  /^\/uploads\/krcodes\/[a-z0-9_-]+\.(png|jpg|jpeg|webp)$/i.test(v),
  "Upload a PNG, JPG or WebP logo.");

/** One schema for create, edit, preview and export. Existing styles remain readable. */
export const KRStyleSchema = z.object({
  fg: color.optional(), bg: z.union([color, z.literal("transparent")]).optional(),
  size: z.number().int().min(120).max(4096).optional(),
  margin: z.number().int().min(0).max(16).optional(),
  ecLevel: z.enum(["L", "M", "Q", "H"]).optional(),
  logoUrl: logo.nullable().optional(), logoEnabled: z.boolean().optional(),
  logoBgTransparent: z.boolean().optional(),
  logoSize: z.number().min(0.12).max(0.22).optional(),
  dotsType: z.enum(["square", "dots", "rounded", "extra-rounded", "classy", "classy-rounded"]).optional(),
  cornersSquareType: z.enum(["square", "extra-rounded", "dot"]).optional(),
  cornersDotType: z.enum(["square", "dot", "rounded"]).optional(),
  eyeColor: color.optional(),
  frameVariant: z.enum(["none", "label-bottom", "label-top", "outline", "ticket"]).optional(),
  frameLabel: z.string().max(40).optional(), frameColor: color.optional(),
  cornerRadius: z.number().int().min(0).max(40).optional(),
});
export type KRStyle = Required<z.infer<typeof KRStyleSchema>>;
export const DEFAULT_KR_STYLE: KRStyle = {
  fg: "#111111", bg: "#FFFFFF", size: 1024, margin: 4, ecLevel: "Q",
  logoUrl: null, logoEnabled: false, logoBgTransparent: true, logoSize: 0.18,
  dotsType: "rounded", cornersSquareType: "extra-rounded", cornersDotType: "rounded",
  eyeColor: "#111111", frameVariant: "none", frameLabel: "SCAN ME",
  frameColor: "#111111", cornerRadius: 0,
};

export function normalizeKRStyle(raw: unknown): KRStyle {
  const input = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const valid: Record<string, unknown> = {};
  // Read legacy records defensively without dropping every field if one is invalid.
  for (const [key, schema] of Object.entries(KRStyleSchema.shape)) {
    const parsed = schema.safeParse(input[key]);
    if (parsed.success && parsed.data !== undefined) valid[key] = parsed.data;
  }
  return { ...DEFAULT_KR_STYLE, ...valid,
    eyeColor: (valid.eyeColor ?? valid.fg ?? DEFAULT_KR_STYLE.fg) as string,
    frameColor: (valid.frameColor ?? valid.fg ?? DEFAULT_KR_STYLE.fg) as string,
    logoEnabled: (valid.logoEnabled ?? Boolean(valid.logoUrl)) as boolean,
  };
}

export const KR_PRESETS = [
  { id: "signature", name: "Signature", category: "Minimal", fg: "#111111", bg: "#FFFFFF", dotsType: "rounded", cornersSquareType: "extra-rounded", cornersDotType: "rounded", frameVariant: "none" },
  { id: "carbon", name: "Carbon", category: "Minimal", fg: "#111111", bg: "#F0F1F2", dotsType: "extra-rounded", cornersSquareType: "extra-rounded", cornersDotType: "rounded", frameVariant: "none" },
  { id: "studio", name: "Studio", category: "Minimal", fg: "#202020", bg: "#FFFFFF", dotsType: "square", cornersSquareType: "square", cornersDotType: "square", frameVariant: "none" },
  { id: "cobalt", name: "Cobalt", category: "Branded", fg: "#2545AD", bg: "#EEF2FF", dotsType: "extra-rounded", cornersSquareType: "dot", cornersDotType: "dot", frameVariant: "none" },
  { id: "olive", name: "Olive", category: "Branded", fg: "#354B36", bg: "#F0F3E9", dotsType: "classy-rounded", cornersSquareType: "extra-rounded", cornersDotType: "rounded", frameVariant: "none" },
  { id: "dots", name: "Dotwork", category: "Minimal", fg: "#242424", bg: "#FFFFFF", dotsType: "dots", cornersSquareType: "dot", cornersDotType: "dot", frameVariant: "none" },
  { id: "label", name: "Label", category: "Print", fg: "#111111", bg: "#FFFFFF", dotsType: "rounded", cornersSquareType: "extra-rounded", cornersDotType: "rounded", frameVariant: "label-bottom" },
  { id: "terracotta", name: "Terracotta", category: "Branded", fg: "#793A2B", bg: "#FFF0E7", dotsType: "classy", cornersSquareType: "square", cornersDotType: "rounded", frameVariant: "none" },
  { id: "ticket", name: "Ticket", category: "Print", fg: "#17181A", bg: "#FFFFFF", dotsType: "extra-rounded", cornersSquareType: "extra-rounded", cornersDotType: "dot", frameVariant: "ticket" },
  { id: "outline", name: "Outline", category: "Print", fg: "#222222", bg: "#FFFFFF", dotsType: "square", cornersSquareType: "square", cornersDotType: "square", frameVariant: "outline" },
  { id: "ocean", name: "Ocean", category: "Branded", fg: "#15565B", bg: "#E9F6F3", dotsType: "classy-rounded", cornersSquareType: "dot", cornersDotType: "dot", frameVariant: "none" },
  { id: "headline", name: "Headline", category: "Print", fg: "#212326", bg: "#FFFFFF", dotsType: "rounded", cornersSquareType: "extra-rounded", cornersDotType: "rounded", frameVariant: "label-top" },
] as const;
export function presetStyle(preset: typeof KR_PRESETS[number], current = DEFAULT_KR_STYLE): KRStyle {
  return { ...current, ...preset, eyeColor: preset.fg, frameColor: preset.fg };
}

function luminance(hex: string) {
  const parts = (hex === "transparent" ? "ffffff" : hex.slice(1)).match(/../g) ?? ["ff", "ff", "ff"];
  const rgb = parts.map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2];
}
export function designChecks(style: KRStyle) {
  const bg = luminance(style.bg);
  const ratio = (fg: string) => { const l = luminance(fg); return (Math.max(bg,l)+.05)/(Math.min(bg,l)+.05); };
  const contrast = Math.min(ratio(style.fg), ratio(style.eyeColor));
  const warnings = [];
  if (contrast < 4.5) warnings.push("Use darker code and eye colours for stronger contrast.");
  if (luminance(style.fg) > bg || luminance(style.eyeColor) > bg) warnings.push("Dark shapes on a light background scan more reliably.");
  if (style.bg === "transparent") warnings.push("Print on a plain, light background and test before use.");
  return { contrast, warnings };
}
