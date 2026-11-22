import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getOwnedKRLogo } from "@/lib/kr-logo-library";
import sharp from "sharp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: Request, ctx: {params:Promise<{id:string}>}) {
  try {
    const user = await requireUser();
    const logo = await getOwnedKRLogo(user.id,(await ctx.params).id);
    if (!logo) return new NextResponse(null,{status:404});
    const [header,encoded] = logo.dataUrl.split(",");
    const thumbnail = new URL(req.url).searchParams.get("thumb") === "1";
    const original = Buffer.from(encoded,"base64");
    const bytes = thumbnail ? await sharp(original,{limitInputPixels:20_000_000}).resize(160,160,{fit:"inside",withoutEnlargement:true}).png().toBuffer() : original;
    return new NextResponse(new Uint8Array(bytes),{headers:{"Content-Type":thumbnail ? "image/png" : header.slice(5,-7),"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
  } catch (error) {
    const unauthenticated = error && typeof error === "object" && "digest" in error && String(error.digest).startsWith("NEXT_REDIRECT");
    return new NextResponse(null,{status:unauthenticated ? 401 : 500});
  }
}
