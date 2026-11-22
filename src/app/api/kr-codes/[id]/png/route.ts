import sharp from "sharp";
import { savedKRSvg } from "../qr-helpers";
import { KR_EXPORT_DPI } from "@/lib/kr-export";
export const runtime = "nodejs";
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const thumb = new URL(req.url).searchParams.get("thumb") === "1";
    const svg = await savedKRSvg(id, req, thumb);
    const bytes = await sharp(Buffer.from(svg)).withMetadata({ density: KR_EXPORT_DPI }).png().toBuffer();
    return new Response(new Uint8Array(bytes), { headers: {
      "Content-Type": "image/png", "Cache-Control": "private, no-cache",
      ...(thumb ? {} : { "Content-Disposition": `attachment; filename="kompi-${id.replace(/[^a-z0-9_-]/gi, "")}.png"` }),
    }});
  } catch { return new Response("Code not found or sign-in required", { status: 404 }); }
}
