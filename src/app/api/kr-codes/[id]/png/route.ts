// src/app/api/kr-codes/[id]/png/route.ts
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getKrCodeLinkAndUrl } from "../qr-helpers";
import sharp from "sharp";

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

    const margin =
      typeof style.margin === "number" ? style.margin : 2;
    const baseSize =
      typeof style.size === "number" ? style.size : 240;

    // Keep exports fairly large for print
    const width = Math.max(512, baseSize * 2);

    const hasLogo =
      !!style.logoUrl && style.logoEnabled !== false;

    const ecLevel =
      hasLogo && style.ecLevel !== "H" ? "H" : style.ecLevel ?? "M";

    // Base QR code
    const qrBuffer = await QRCode.toBuffer(qrUrl, {
      type: "png",
      margin,
      width,
      color: {
        dark: fg,
        light: bg,
      },
      errorCorrectionLevel: ecLevel,
    });

    let outputBuffer = qrBuffer;

    if (hasLogo) {
      try {
        const logoUrl = style.logoUrl as string;
        let logoBuffer: Buffer | null = null;

        if (logoUrl.startsWith("data:")) {
          const commaIndex = logoUrl.indexOf(",");
          if (commaIndex !== -1) {
            const base64 = logoUrl.slice(commaIndex + 1);
            logoBuffer = Buffer.from(base64, "base64");
          }
        } else if (logoUrl.startsWith("/")) {
          const origin = new URL(req.url).origin;
          const res = await fetch(origin + logoUrl, { cache: "force-cache" });
          if (res.ok) {
            logoBuffer = Buffer.from(await res.arrayBuffer());
          }
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

          const composites: sharp.OverlayOptions[] = [];

          // If logoBgTransparent is true, paint a solid bg square behind the logo area
          if (style.logoBgTransparent) {
            const bgSquare = await sharp({
              create: {
                width: logoSize,
                height: logoSize,
                channels: 4,
                background: bg,
              },
            })
              .png()
              .toBuffer();

            composites.push({
              input: bgSquare,
              gravity: "centre",
            });
          }

          // Then place the logo itself on top
          composites.push({
            input: resizedLogo,
            gravity: "centre",
          });

          outputBuffer = await qrImage
            .composite(composites)
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
