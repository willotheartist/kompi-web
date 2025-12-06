// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that should ONLY be accessible when logged in
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/links",
  "/k-cards",
  "/kr-codes",
  "/analytics",
  "/m",        // if your dashboards for menus, etc. live here
  "/menu",
];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = await getToken({ req }); // uses NEXTAUTH_SECRET

  const isAuthRoute =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  // 1) If NOT logged in and hitting a protected page → send to signup (or signin)
  if (!token && isProtectedPath(pathname)) {
    const url = new URL("/signup", req.url);
    // keep where they tried to go so we can redirect back after auth if we want
    url.searchParams.set("from", pathname + search);
    return NextResponse.redirect(url);
  }

  // 2) If logged in and they hit /signin or /signup → push them to dashboard
  if (token && isAuthRoute) {
    const url = new URL("/dashboard", req.url);
    return NextResponse.redirect(url);
  }

  // 3) Everything else just passes through
  return NextResponse.next();
}

// Limit middleware to only the routes we care about to avoid extra work
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/links/:path*",
    "/k-cards/:path*",
    "/kr-codes/:path*",
    "/analytics/:path*",
    "/m/:path*",
    "/menu/:path*",
    "/signin",
    "/signup",
  ],
};
