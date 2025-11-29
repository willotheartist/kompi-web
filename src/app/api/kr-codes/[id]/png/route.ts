import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { getKrCodeLinkAndUrl } from "../qr-helpers";

export const runtime = "nodejs";

type RouteContext = {
  params: { id: string } | Promise<{ id: string }>;
};

type KrCodeHelperResult = {
  qrUrl: string;
  style?: {
    fg?: string;
    bg?: string;
    size?: number;
    margin?: number;
  } | null;
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

    // Whatever qr-helpers returns, we grab qrUrl and (optionally) style
    const result = (await getKrCodeLinkAndUrl(id, req)) as KrCodeHelperResult;
    const qrUrl: string = result.qrUrl;

    // style might be missing (old helper) – so we default safely
    const rawStyle = (result.style ?? {}) as {
      fg?: string;
      bg?: string;
      size?: number;
      margin?: number;
    };

    const fg =
      typeof rawStyle.fg === "string" ? rawStyle.fg : "#000000";

    const bgRaw =
      typeof rawStyle.bg === "string" && rawStyle.bg.length > 0
        ? rawStyle.bg
        : "transparent";

    // qrcode lib wants real colors, not "transparent"
    const bg =
      bgRaw.toLowerCase() === "transparent" ? "#FFFFFF" : bgRaw;

    const margin =
      typeof rawStyle.margin === "number" ? rawStyle.margin : 2;

    const baseSize =
      typeof rawStyle.size === "number" ? rawStyle.size : 240;

    const width = Math.max(512, baseSize * 2);

    const buffer = await QRCode.toBuffer(qrUrl, {
      type: "png",
      margin,
      width,
      color: {
        dark: fg,
        light: bg,
      },
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="krcode-${id}.png"`,
      },
    });
  } catch (err) {
    console.error("KR Code PNG error", err);
    return new NextResponse("Not found", { status: 404 });
  }
}
