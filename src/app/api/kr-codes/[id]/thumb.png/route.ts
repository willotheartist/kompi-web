// src/app/api/kr-codes/[id]/thumb.png/route.ts
import QRCode from "qrcode";
import sharp from "sharp";
import { getKrCodeLinkAndUrl } from "../qr-helpers";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function bufferToFreshArrayBuffer(buf: Buffer): ArrayBuffer {
  // Create a *new* ArrayBuffer so TS never sees SharedArrayBuffer,
  // and so the buffer is exactly sized.
  const u8 = new Uint8Array(buf.byteLength);
  u8.set(buf);
  return u8.buffer; // <-- always ArrayBuffer
}

export async function GET(req: Request, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    if (!id) return new Response("Missing id", { status: 400 });

    const { qrUrl, style } = await getKrCodeLinkAndUrl(id, req);

    const size = 192; // generate slightly larger then downscale for crispness
    const fg = style.fg ?? "#000000";
    const bgRaw =
      typeof style.bg === "string" && style.bg.length > 0 ? style.bg : "transparent";
    const bg = bgRaw.toLowerCase() === "transparent" ? "#FFFFFF" : bgRaw;

    const qr = await QRCode.toBuffer(qrUrl, {
      type: "png",
      margin: typeof style.margin === "number" ? style.margin : 2,
      width: size,
      color: { dark: fg, light: bg },
      errorCorrectionLevel: style.ecLevel ?? "M",
    });

    const thumbBuf = await sharp(qr).resize(128, 128).png().toBuffer();

    // Use a fresh ArrayBuffer as the response body (max compatibility)
    const body = bufferToFreshArrayBuffer(thumbBuf) as unknown as BodyInit;

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err) {
    console.error("KR Code thumb error", err);
    return new Response("Not found", { status: 404 });
  }
}
