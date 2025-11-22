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

    // Generate PNG for the tracked URL
    const buffer = await QRCode.toBuffer(qrUrl, {
      type: "png",
      margin: 2,
      width: 1024,
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
