import { prisma } from "@/lib/prisma";
import { KRLogoUploadSchema } from "./kr-logos";
import { normalizeKRStyle } from "./kr-design";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Every lookup includes the authenticated owner; IDs never grant access. */
export async function getOwnedKRLogo(userId: string, id: string) {
  if (id.startsWith("code-")) {
    const code = await prisma.kRCode.findFirst({where:{id:id.slice(5),userId},select:{title:true,style:true}});
    if (!code) return null;
    let dataUrl = normalizeKRStyle(code.style).logoUrl;
    if(dataUrl?.startsWith("/uploads/krcodes/")) {
      try {
        const bytes=await readFile(path.join(process.cwd(),"public",dataUrl));
        const mime=/\.jpe?g$/i.test(dataUrl)?"jpeg":/\.webp$/i.test(dataUrl)?"webp":"png";
        dataUrl=`data:image/${mime};base64,${bytes.toString("base64")}`;
      } catch {return null;}
    }
    const parsed = KRLogoUploadSchema.safeParse({name:code.title || "Saved QR logo",dataUrl});
    return parsed.success ? {id,...parsed.data,source:"code" as const} : null;
  }
  const logo = await prisma.kRLogo.findFirst({where:{id,userId},select:{id:true,name:true,dataUrl:true}});
  return logo ? {...logo,source:"account" as const} : null;
}
