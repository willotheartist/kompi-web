import sharp from "sharp";
import { savedKRSvg } from "../qr-helpers";
export const runtime = "nodejs";
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const bytes = await sharp(Buffer.from(await savedKRSvg(id, req, true))).png().toBuffer();
    return new Response(new Uint8Array(bytes), { headers: { "Content-Type": "image/png", "Cache-Control": "private, no-cache" }});
  } catch { return new Response("Code not found or sign-in required", { status: 404 }); }
}
