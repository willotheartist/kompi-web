// src/app/api/kr-codes/[id]/qr-helpers.ts
import { prisma } from "@/lib/prisma";

type StyleObject = {
  fg?: string;
  bg?: string;
  size?: number;
  margin?: number;
  logoUrl?: string | null;
  logoEnabled?: boolean;         // 👈 NEW
  logoBgTransparent?: boolean;   // 👈 NEW
  cornerRadius?: number;
  ecLevel?: "L" | "M" | "Q" | "H";
  [key: string]: unknown;
};

type NormalizedStyle = Required<
  Pick<
    StyleObject,
    "fg" | "bg" | "size" | "margin" | "ecLevel" | "logoEnabled" | "logoBgTransparent"
  >
> & { logoUrl: string | null };

const DEFAULT_STYLE: NormalizedStyle = {
  fg: "#0EA5E9",
  bg: "transparent",
  size: 240,
  margin: 2,
  ecLevel: "M",
  logoUrl: null,
  logoEnabled: false,
  logoBgTransparent: true, // 👈 matches frontend default
};

export async function getKrCodeLinkAndUrl(id: string, req: Request) {
  const krcode = await prisma.kRCode.findUnique({
    where: { id },
  });

  if (!krcode || !krcode.shortCodeId) {
    throw new Error("KR Code or short link not found");
  }

  const link = await prisma.link.findUnique({
    where: { id: krcode.shortCodeId },
  });

  if (!link || !link.code) {
    throw new Error("Linked short code not found");
  }

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;

  const qrUrl = `${origin}/r/${link.code}`;

  const rawStyle = (krcode.style ?? {}) as StyleObject;

  const style: NormalizedStyle = {
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
    logoEnabled:
      typeof rawStyle.logoEnabled === "boolean"
        ? rawStyle.logoEnabled
        : DEFAULT_STYLE.logoEnabled,
    logoBgTransparent:
      typeof rawStyle.logoBgTransparent === "boolean"
        ? rawStyle.logoBgTransparent
        : DEFAULT_STYLE.logoBgTransparent,
  };

  return { krcode, link, qrUrl, style };
}
