import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getKrCodeLinkAndUrl } from "../qr-helpers";
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

    const bg =
      bgRaw.toLowerCase() === "transparent" ? "#FFFFFF" : bgRaw;

    const margin = style.margin ?? 2;
    const baseSize = style.size ?? 240;
    const width = Math.max(512, baseSize * 2);

    let svg = await QRCode.toString(qrUrl, {
      type: "svg",
      margin,
      width,
      color: {
        dark: fg,
        light: bg,
      },
    });

    // Optional embedded logo
    if (style.logoUrl) {
      try {
        const logoUrl = style.logoUrl;
        let logoDataUri: string | null = null;

        if (logoUrl.startsWith("data:")) {
          // already a data URL
          logoDataUri = logoUrl;
        } else if (logoUrl.startsWith("/")) {
          const logoPath = path.join(
            process.cwd(),
            "public",
            logoUrl.replace(/^\/+/, ""),
          );
          const logoBuffer = await fs.readFile(logoPath);
          const base64 = logoBuffer.toString("base64");
          const lower = logoPath.toLowerCase();
          const mime = lower.endsWith(".jpg") || lower.endsWith(".jpeg")
            ? "image/jpeg"
            : "image/png";
          logoDataUri = `data:${mime};base64,${base64}`;
        }

        if (logoDataUri) {
          const insertion = `<image href="${logoDataUri}" x="30%" y="30%" width="40%" height="40%" preserveAspectRatio="xMidYMid meet" />`;
          svg = svg.replace("</svg>", `${insertion}</svg>`);
        }
      } catch (e) {
        console.error("KR Code SVG logo embed failed", e);
      }
    }

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Disposition": `attachment; filename="krcode-${id}.svg"`,
      },
    });
  } catch (err) {
    console.error("KR Code SVG error", err);
    return new NextResponse("Not found", { status: 404 });
  }
}
