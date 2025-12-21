// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import NextAuthMiddleware from "next-auth/middleware";

export const config = {
  matcher: [
    "/r/:path*",
    "/dashboard/:path*",
    "/links/:path*",
    "/qr-menus/:path*",
    "/k-cards/:path*",
    "/settings/:path*",
    "/customers/:path*",
  ],
};

function firstIp(xff: string | null): string | null {
  if (!xff) return null;
  const first = xff.split(",")[0]?.trim();
  return first || null;
}

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ---- PUBLIC SHORT LINKS: GEO ENRICHMENT ONLY ----
  if (pathname.startsWith("/r/")) {
    const headers = new Headers(req.headers);

    // Vercel geo headers (present at the edge)
    const country = req.headers.get("x-vercel-ip-country");
    const region =
      req.headers.get("x-vercel-ip-country-region") || req.headers.get("x-vercel-ip-region");
    const city = req.headers.get("x-vercel-ip-city");

    if (country) headers.set("x-edge-country", country);
    if (region) headers.set("x-edge-region", region);
    if (city) headers.set("x-edge-city", city);

    const ip = firstIp(req.headers.get("x-forwarded-for"));
    if (ip) headers.set("x-edge-ip", ip);

    return NextResponse.next({
      request: { headers },
    });
  }

  // ---- EVERYTHING ELSE: NEXTAUTH PROTECTION ----
  // IMPORTANT: call the NextAuth middleware *function*, not withAuth() output
  return (NextAuthMiddleware as unknown as (req: NextRequest) => any)(req);
}


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const t0 = Date.now();
  const res = NextResponse.next();
  res.headers.set("x-kompi-rt", String(Date.now() - t0));
  return res;
}
