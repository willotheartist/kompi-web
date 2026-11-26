import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { isPrivatePage, isPublicApi } from "./lib/route-policy";
export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isApi = path.startsWith("/api/");
  const privatePage = isPrivatePage(path);
  const target = process.env.NEXT_PUBLIC_APP_URL ? new URL(process.env.NEXT_PUBLIC_APP_URL) : null;
  const publicHost = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host : "kompi.app";
  const isAppHost = !!target && target.host !== publicHost && target.host === req.nextUrl.host;
  // Only move the established public host. Preview URLs remain self-contained.
  if (target && target.host !== publicHost && req.nextUrl.host === publicHost && (privatePage || ["/signin", "/signup", "/forgot-password", "/reset-password", "/verify-email"].includes(path)) && ["GET", "HEAD"].includes(req.method)) {
    const dest = new URL(path + req.nextUrl.search, target);
    return NextResponse.redirect(dest, 307);
  }
  if (isAppHost && path === "/") return NextResponse.redirect(new URL("/dashboard", req.url));
  if ((isApi && !isPublicApi(path, req.method)) || privatePage) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.email) {
      if (isApi) return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
      const signIn = new URL("/signin", req.url); signIn.searchParams.set("callbackUrl", path + req.nextUrl.search);
      return NextResponse.redirect(signIn);
    }
  }
  if (isApi && !isPublicApi(path, req.method) && !["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    const origin = req.headers.get("origin");
    if (origin && origin !== req.nextUrl.origin) return NextResponse.json({ error: "Request origin not allowed." }, { status: 403 });
  }
  const res = NextResponse.next();
  if (privatePage || isApi || isAppHost || ["/signin", "/signup", "/forgot-password", "/reset-password"].includes(path)) res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|gif|woff2|css|js)$).*)"] };
