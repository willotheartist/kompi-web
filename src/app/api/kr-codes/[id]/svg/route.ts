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

    const { qrUrl } = await getKrCodeLinkAndUrl(id, req);

    // Generate SVG for the tracked URL
    const svg = await QRCode.toString(qrUrl, {
      type: "svg",
      margin: 2,
      width: 1024,
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
