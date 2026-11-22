import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getOwnedKRLogo } from "@/lib/kr-logo-library";

export const dynamic = "force-dynamic";
export async function GET(_req: Request, ctx: {params:Promise<{id:string}>}) {
  try {
    const user = await requireUser();
    const logo = await getOwnedKRLogo(user.id,(await ctx.params).id);
    if (!logo) return new NextResponse(null,{status:404});
    const [header,encoded] = logo.dataUrl.split(",");
    return new NextResponse(Buffer.from(encoded,"base64"),{headers:{"Content-Type":header.slice(5,-7),"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
  } catch (error) {
    const unauthenticated = error && typeof error === "object" && "digest" in error && String(error.digest).startsWith("NEXT_REDIRECT");
    return new NextResponse(null,{status:unauthenticated ? 401 : 500});
  }
}
