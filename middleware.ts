// middleware.ts
import NextAuthMiddleware from "next-auth/middleware";
import { NextResponse, type NextRequest } from "next/server";

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

    // Optional: runtime header for /r/* too
    headers.set("x-kompi-rt", "0");

    return NextResponse.next({
      request: { headers },
    });
  }

  // ---- EVERYTHING ELSE: NEXTAUTH PROTECTION ----
  // NextAuth's default export is a middleware handler that accepts NextRequest
  return (NextAuthMiddleware as unknown as (req: NextRequest) => Response)(req);
}
