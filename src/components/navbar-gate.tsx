"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";

export function NavbarGate() {
  const pathname = usePathname();

  const hideNavbar =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/links") ||
    pathname?.startsWith("/analytics") ||
    pathname?.startsWith("/kr-codes") ||
    pathname?.startsWith("/k-cards");

  if (hideNavbar) return null;

  return <Navbar />;
}
