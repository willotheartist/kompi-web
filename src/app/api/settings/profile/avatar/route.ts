import { NextResponse } from "next/server";
import sharp from "sharp";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ApiError, apiError } from "@/lib/api-errors";
import { rateLimit } from "@/lib/rate-limit";
export const runtime = "nodejs";
export async function POST(req: Request) {
 try { const user=await requireUser(); await rateLimit("avatar",user.id,20,3600); const form=await req.formData();const file=form.get("file");
 if(!(file instanceof File) || !["image/png","image/jpeg","image/webp","image/gif"].includes(file.type)) throw new ApiError("Choose a PNG, JPG, WebP or GIF image.",400);
 if(file.size>3*1024*1024) throw new ApiError("Choose an image smaller than 3 MB.",400);
 const bytes=await sharp(Buffer.from(await file.arrayBuffer()),{limitInputPixels:40000000}).rotate().resize(256,256,{fit:"cover"}).webp({quality:85}).toBuffer();
 const image=`data:image/webp;base64,${bytes.toString("base64")}`;
 await prisma.user.update({where:{id:user.id},data:{image}});return NextResponse.json({image});
 } catch(error){return apiError(error);}
}
