"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UserMenu } from "@/components/user-menu";
import { FeaturesMegaMenu } from "@/components/features-megamenu";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      const lastY = lastYRef.current;
      const diff = y - lastY;

      setAtTop(y < 8);

      if (Math.abs(diff) > 4) {
        if (y > 40 && diff > 0) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      lastYRef.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={[
        "fixed left-0 right-0 top-0 z-40 flex justify-center transition-all duration-300",
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
        atTop ? "mt-4" : "mt-2",
      ].join(" ")}
    >
      <header
        className={[
          "w-full max-w-6xl",
          "px-6 py-4",
          "rounded-3xl",
          "bg-white/90 backdrop-blur-2xl",
          "shadow-[0_18px_60px_rgba(15,23,42,0.16)]",
          "border border-neutral-100",
          "flex items-center justify-between gap-6",
        ].join(" ")}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-3 hover:opacity-95 transition-opacity"
        >
          <div className="h-9 w-9 rounded-3xl bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
            K
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold tracking-tight">
              Kompi Links
            </span>
            <span className="text-[11px] text-neutral-500">
              Links, bios, Kompi Codes™ & analytics
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-600">
          <FeaturesMegaMenu />
          <Link href="/pricing" className="hover:text-neutral-900">
            Pricing
          </Link>
          <a href="/#solutions" className="hover:text-neutral-900">
            Solutions
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <UserMenu />
        </div>
      </header>
    </div>
  );
}
