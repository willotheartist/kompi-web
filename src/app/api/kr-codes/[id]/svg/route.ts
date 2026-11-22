import { savedKRSvg } from "../qr-helpers";
export const runtime = "nodejs";
export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const svg = await savedKRSvg(id, req);
    return new Response(svg, { headers: {
      "Content-Type": "image/svg+xml", "Cache-Control": "private, no-cache",
      "Content-Disposition": `attachment; filename="kompi-${id.replace(/[^a-z0-9_-]/gi, "")}.svg"`,
    }});
  } catch { return new Response("Code not found or sign-in required", { status: 404 }); }
}
