import { prisma } from "@/lib/prisma";

type StyleObject = {
  fg?: string;
  bg?: string;
  size?: number;
  margin?: number;
  logoUrl?: string | null;
  cornerRadius?: number;
  ecLevel?: "L" | "M" | "Q" | "H";
  [key: string]: unknown;
};

const DEFAULT_STYLE: Required<
  Pick<StyleObject, "fg" | "bg" | "size" | "margin" | "ecLevel">
> & { logoUrl: string | null } = {
  fg: "#0EA5E9",
  bg: "transparent",
  size: 240,
  margin: 2,
  ecLevel: "M",
  logoUrl: null,
};

export async function getKrCodeLinkAndUrl(id: string, req: Request) {
  // Look up the KR Code
  const krcode = await prisma.kRCode.findUnique({
    where: { id },
  });

  if (!krcode || !krcode.shortCodeId) {
    throw new Error("KR Code or short link not found");
  }

  // Look up the linked short URL
  const link = await prisma.link.findUnique({
    where: { id: krcode.shortCodeId },
  });

  if (!link || !link.code) {
    throw new Error("Linked short code not found");
  }

  // Determine app origin (use NEXT_PUBLIC_APP_URL if set, otherwise infer)
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;

  // URL that will hit /r/[code] and create ClickEvent rows
  const qrUrl = `${origin}/r/${link.code}`;

  // ---- NEW: normalize style for exports ----
  const rawStyle = (krcode.style ?? {}) as StyleObject;

  const style = {
    fg:
      typeof rawStyle.fg === "string"
        ? rawStyle.fg
        : DEFAULT_STYLE.fg,
    bg:
      typeof rawStyle.bg === "string"
        ? rawStyle.bg
        : DEFAULT_STYLE.bg,
    size:
      typeof rawStyle.size === "number"
        ? rawStyle.size
        : DEFAULT_STYLE.size,
    margin:
      typeof rawStyle.margin === "number"
        ? rawStyle.margin
        : DEFAULT_STYLE.margin,
    ecLevel:
      (rawStyle.ecLevel as StyleObject["ecLevel"]) ??
      DEFAULT_STYLE.ecLevel,
    logoUrl:
      typeof rawStyle.logoUrl === "string"
        ? rawStyle.logoUrl
        : DEFAULT_STYLE.logoUrl,
  };

  return { krcode, link, qrUrl, style };
}
