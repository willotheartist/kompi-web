// src/app/api/kr-codes/[id]/png/route.ts
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import sharp from "sharp";
import { getKrCodeLinkAndUrl } from "../qr-helpers";

export const runtime = "nodejs";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const url = new URL(req.url);
  const isThumb = url.searchParams.get("thumb") === "1";

  const { qrUrl, style } = await getKrCodeLinkAndUrl(id, req);

  const size = isThumb ? 128 : Math.max(512, (style.size ?? 240) * 2);

  const qr = await QRCode.toBuffer(qrUrl, {
    width: size,
    margin: style.margin ?? 2,
    color: {
      dark: style.fg ?? "#000",
      light:
        style.bg === "transparent" ? "#FFFFFF" : (style.bg ?? "#FFF"),
    },
    errorCorrectionLevel: style.ecLevel ?? "M",
  });

  const buffer = isThumb
    ? await sharp(qr).resize(128, 128).png().toBuffer()
    : qr;

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
