import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getOwnedKRLogo } from "@/lib/kr-logo-library";

export const dynamic = "force-dynamic";
export async function GET(_req: Request, ctx: {params:Promise<{id:string}>}) {
  try {
    const user = await requireUser();
    const logo = await getOwnedKRLogo(user.id,(await ctx.params).id);
    return NextResponse.json(logo ? {logo} : {error:"Logo not found."},{status:logo ? 200 : 404,headers:{"Cache-Control":"private, no-store"}});
  } catch (error) {
    const unauthenticated = error && typeof error === "object" && "digest" in error && String(error.digest).startsWith("NEXT_REDIRECT");
    return NextResponse.json({error:unauthenticated ? "Sign in to use your saved logos." : "This logo could not be loaded."},{status:unauthenticated ? 401 : 500});
  }
}
