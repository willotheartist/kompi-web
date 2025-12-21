"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "./navbar";

function NavbarGateAuthed() {
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  // If the user is logged in, never show the floating navbar
  if (isAuthed) return null;

  // Logged out + not on a dashboard route → show marketing navbar
  return <Navbar />;
}

export function NavbarGate() {
  const pathname = usePathname();

  const hideForPath =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/links") ||
    pathname?.startsWith("/analytics") ||
    pathname?.startsWith("/kr-codes") ||
    pathname?.startsWith("/k-cards");

  // ✅ IMPORTANT: On dashboard-style routes, bail out BEFORE mounting the session hook component.
  if (hideForPath) return null;

  return <NavbarGateAuthed />;
}
