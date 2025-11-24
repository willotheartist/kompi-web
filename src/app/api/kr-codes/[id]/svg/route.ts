import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getKrCodeLinkAndUrl } from "../qr-helpers";

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
    // qrcode lib expects a solid background color; treat "transparent" as white
    const bg =
      !style.bg || style.bg.toLowerCase() === "transparent"
        ? "#FFFFFF"
        : style.bg;
    const margin = style.margin ?? 2;

    // For print we keep the export fairly large; you can tune this later
    const width = Math.max(512, (style.size ?? 240) * 2);

    const svg = await QRCode.toString(qrUrl, {
      type: "svg",
      margin,
      width,
      color: {
        dark: fg,
        light: bg,
      },
    });

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Disposition": `inline; filename="krcode-${id}.svg"`,
      },
    });
  } catch (err) {
    console.error("KR Code SVG error", err);
    return new NextResponse("Not found", { status: 404 });
  }
}
