"use client";

import { usePathname } from "next/navigation";

const APP_ROUTES = [
  "/",
  "/links",
  "/kr-codes",
  "/bio-pages",
  "/analytics",
  "/campaigns",
  "/domains",
  "/settings",
];

function shouldHideNavbar(pathname: string) {
  return APP_ROUTES.some((base) =>
    base === "/" ? pathname === "/" : pathname.startsWith(base)
  );
}

export function NavbarGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  if (shouldHideNavbar(pathname)) return null;
  return <>{children}</>;
}
