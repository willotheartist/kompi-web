export { default } from "next-auth/middleware";

// Protect all authenticated app areas – if there is no valid session,
// NextAuth middleware will redirect to the sign-in page.
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/links/:path*",
    "/qr-menus/:path*",
    "/k-cards/:path*",
    "/settings/:path*",
    "/customers/:path*",
  ],
};
