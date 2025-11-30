import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getKrCodeLinkAndUrl } from "../qr-helpers";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type RouteContext = {
  params: { id: string } | Promise<{ id: string }>;
};

async function resolveParams(params: RouteContext["params"]) {
  return params instanceof Promise ? await params : params;
}

export async function GET(req: Request, ctx: RouteContext) {
  try {
    const { id } = await resolveParams(ctx.params);

    if (!id) {
      return new NextResponse("Missing id", { status: 400 });
    }

    const { qrUrl, style } = await getKrCodeLinkAndUrl(id, req);

    const fg = style.fg ?? "#000000";

    const bgRaw =
      typeof style.bg === "string" && style.bg.length > 0
        ? style.bg
        : "transparent";

    // qrcode lib wants real colors, not "transparent"
    const bg =
      bgRaw.toLowerCase() === "transparent" ? "#FFFFFF" : bgRaw;

    const margin = typeof style.margin === "number" ? style.margin : 2;
    const baseSize = typeof style.size === "number" ? style.size : 240;

    // Keep exports fairly large for print
    const width = Math.max(512, baseSize * 2);

    // Base QR code
    const qrBuffer = await QRCode.toBuffer(qrUrl, {
      type: "png",
      margin,
      width,
      color: {
        dark: fg,
        light: bg,
      },
    });

    let outputBuffer = qrBuffer;

    // Optional center logo
    if (style.logoUrl) {
      try {
        const logoUrl = style.logoUrl;
        let logoBuffer: Buffer | null = null;

        if (logoUrl.startsWith("data:")) {
          // data URL from client
          const commaIndex = logoUrl.indexOf(",");
          if (commaIndex !== -1) {
            const base64 = logoUrl.slice(commaIndex + 1);
            logoBuffer = Buffer.from(base64, "base64");
          }
        } else if (logoUrl.startsWith("/")) {
          // local file served from /public (e.g. /uploads/krcodes/...)
          const logoPath = path.join(
            process.cwd(),
            "public",
            logoUrl.replace(/^\/+/, ""),
          );
          logoBuffer = await fs.readFile(logoPath);
        }

        if (logoBuffer) {
          const qrImage = sharp(qrBuffer);
          const meta = await qrImage.metadata();
          const qrWidth = meta.width ?? width;
          const logoSize = Math.round(qrWidth * 0.3); // ~30% of QR width

          const resizedLogo = await sharp(logoBuffer)
            .resize(logoSize, logoSize, { fit: "contain" })
            .png()
            .toBuffer();

          outputBuffer = await qrImage
            .composite([{ input: resizedLogo, gravity: "centre" }])
            .png()
            .toBuffer();
        }
      } catch (e) {
        console.error("KR Code PNG logo composite failed", e);
      }
    }

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="krcode-${id}.png"`,
      },
    });
  } catch (err) {
    console.error("KR Code PNG error", err);
    return new NextResponse("Not found", { status: 404 });
  }
}
