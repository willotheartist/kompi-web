"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

/**
 * NavbarGate decides whether to render the floating marketing navbar
 * based on the current route.
 *
 * We HIDE the navbar on "app shell" / dashboard-style routes:
 * - /links
 * - /kr-codes
 * - /analytics
 * - /dashboard (if used)
 * - /bio-pages, /campaigns, /domains, /settings
 */
const HIDE_PREFIXES = [
  "/links",
  "/kr-codes",
  "/analytics",
  "/dashboard",
  "/bio-pages",
  "/campaigns",
  "/domains",
  "/settings",
];

export function NavbarGate() {
  const pathname = usePathname();

  // Default to showing navbar if we don't know the path yet
  if (!pathname) return <Navbar />;

  const shouldHide = HIDE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (shouldHide) {
    return null;
  }

  return <Navbar />;
}
