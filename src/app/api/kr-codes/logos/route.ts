import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { KRLogoUploadSchema, mergeKRLogos, type ReusableKRLogo } from "@/lib/kr-logos";
import { normalizeKRStyle } from "@/lib/kr-design";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const privateHeaders = { "Cache-Control":"private, no-store" };
function unauthorized(error: unknown) {
  return error && typeof error === "object" && "digest" in error && String(error.digest).startsWith("NEXT_REDIRECT");
}

export async function GET() {
  try {
    const user = await requireUser();
    const [assets,codes] = await Promise.all([
      prisma.kRLogo.findMany({where:{userId:user.id},orderBy:{updatedAt:"desc"},take:100,select:{id:true,name:true,hash:true}}),
      prisma.kRCode.findMany({where:{userId:user.id,OR:[{style:{path:["logoUrl"],string_starts_with:"data:image/"}},{style:{path:["logoUrl"],string_starts_with:"/uploads/krcodes/"}}]},orderBy:{updatedAt:"desc"},take:100,select:{id:true,title:true,style:true}}),
    ]);
    const hashes = new Set(assets.map(asset=>asset.hash));
    const previous: ReusableKRLogo[] = codes.flatMap(code => {
      const dataUrl = normalizeKRStyle(code.style).logoUrl;
      if (!dataUrl) return [];
      const hash = createHash("sha256").update(dataUrl.startsWith("data:") ? Buffer.from(dataUrl.split(",")[1],"base64") : dataUrl).digest("hex");
      if (hashes.has(hash)) return [];
      hashes.add(hash);
      return [{id:`code-${code.id}`,name:code.title || "Saved QR logo",dataUrl:`/api/kr-codes/logos/code-${code.id}/image`,source:"code" as const}];
    });
    return NextResponse.json({logos:mergeKRLogos(assets.map(asset=>({id:asset.id,name:asset.name,dataUrl:`/api/kr-codes/logos/${asset.id}/image`,source:"account"})),previous)}, {headers:privateHeaders});
  } catch (error) {
    if (unauthorized(error)) return NextResponse.json({error:"Sign in to see your saved logos."},{status:401,headers:privateHeaders});
    console.error("Could not load QR logos",error);
    return NextResponse.json({error:"Your saved logos could not be loaded. Try again."},{status:500,headers:privateHeaders});
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    if (Number(req.headers.get("content-length")) > 750_000) return NextResponse.json({error:"Try a smaller logo."},{status:413});
    const body = KRLogoUploadSchema.parse(await req.json());
    const input = Buffer.from(body.dataUrl.split(",")[1],"base64");
    const image = sharp(input,{limitInputPixels:20_000_000});
    const metadata = await image.metadata();
    if (!metadata.format || !["png","jpeg","webp"].includes(metadata.format)) return NextResponse.json({error:"Use a PNG, JPG or WebP logo."},{status:400});
    const bytes = await image.rotate().resize(384,384,{fit:"inside",withoutEnlargement:true}).png().toBuffer();
    const dataUrl = `data:image/png;base64,${bytes.toString("base64")}`;
    if (dataUrl.length > 700_000) return NextResponse.json({error:"Try a simpler or smaller logo."},{status:400});
    const hash = createHash("sha256").update(bytes).digest("hex");
    const existing = await prisma.kRLogo.findUnique({where:{userId_hash:{userId:user.id,hash}}});
    if (!existing && await prisma.kRLogo.count({where:{userId:user.id}}) >= 100) return NextResponse.json({error:"Your library has reached 100 logos. This logo can still be used in your current design."},{status:409});
    const logo = await prisma.kRLogo.upsert({
      where:{userId_hash:{userId:user.id,hash}},
      create:{userId:user.id,name:body.name,dataUrl,hash},
      update:{updatedAt:new Date()},
      select:{id:true,name:true,dataUrl:true},
    });
    return NextResponse.json({logo:{...logo,source:"account"}},{status:existing ? 200 : 201,headers:privateHeaders});
  } catch (error) {
    if (unauthorized(error)) return NextResponse.json({error:"Sign in to save logos to your account."},{status:401});
    if (error instanceof z.ZodError) return NextResponse.json({error:"Use a PNG, JPG or WebP logo."},{status:400});
    console.error("Could not save QR logo",error);
    return NextResponse.json({error:"This logo could not be saved to your library. Try again."},{status:400});
  }
}
