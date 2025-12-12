//src/components/navbar-gate.tsx
"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "./navbar";

export function NavbarGate() {
  const pathname = usePathname();
  const { status } = useSession();

  const isAuthed = status === "authenticated";

  const hideForPath =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/links") ||
    pathname?.startsWith("/analytics") ||
    pathname?.startsWith("/kr-codes") ||
    pathname?.startsWith("/k-cards");

  // 1) If the user is logged in, never show the floating navbar
  if (isAuthed) {
    return null;
  }

  // 2) Extra guard: hide navbar on dashboard-style routes even if somehow not authed
  if (hideForPath) {
    return null;
  }

  // Logged out + not on a dashboard route → show marketing navbar
  return <Navbar />;
}
