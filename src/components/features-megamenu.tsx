"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function FeaturesMegaMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close on click outside / Esc
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors px-1 py-1 inline-flex items-center gap-1"
      >
        <span>Features</span>
        <span className="text-[9px]">▾</span>
      </button>

      {open && (
        <div
          // keep open while inside menu
          onMouseEnter={() => setOpen(true)}
          className="
            absolute left-1/2 -translate-x-1/2 mt-3
            w-[min(1120px,100vw-40px)]
            bg-white/96 backdrop-blur-2xl
            border border-neutral-100
            shadow-[0_28px_90px_rgba(15,23,42,0.22)]
            rounded-3xl
            px-7 py-6
            grid grid-cols-[2.2fr_2.2fr_1.6fr]
            gap-7
            z-50
          "
        >
          {/* PRODUCTS */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-3">
              Products
            </div>
            <div className="space-y-2.5">
              <Link
                href="/features/url-shortener"
                className="flex items-start gap-3 rounded-2xl px-2 py-2.5 hover:bg-neutral-50 transition-colors"
                onClick={() => setOpen(false)}
              >
                <div className="mt-0.5 h-7 w-7 rounded-2xl bg-neutral-900 flex items-center justify-center text-[13px] text-white">
                  ↗
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-neutral-900">
                    URL Shortener
                  </div>
                  <div className="text-xs text-neutral-500">
                    Clean, trackable short links for every channel.
                  </div>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-start gap-3 rounded-2xl px-2 py-2.5 hover:bg-neutral-50 transition-colors"
              >
                <div className="mt-0.5 h-7 w-7 rounded-2xl bg-neutral-900/90 flex items-center justify-center text-[13px] text-white">
                  ▢
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-neutral-900">
                    Kompi Codes™ (QR)
                  </div>
                  <div className="text-xs text-neutral-500">
                    On-brand QR codes that match your identity.
                  </div>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-start gap-3 rounded-2xl px-2 py-2.5 hover:bg-neutral-50 transition-colors"
              >
                <div className="mt-0.5 h-7 w-7 rounded-2xl bg-neutral-900/90 flex items-center justify-center text-[13px] text-white">
                  ☰
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-neutral-900">
                    Link-in-bio Pages
                  </div>
                  <div className="text-xs text-neutral-500">
                    Beautiful, branded hubs in minutes.
                  </div>
                </div>
              </Link>

              <Link
                href="#"
                className="flex items-start gap-3 rounded-2xl px-2 py-2.5 hover:bg-neutral-50 transition-colors"
              >
                <div className="mt-0.5 h-7 w-7 rounded-2xl bg-neutral-900/90 flex items-center justify-center text-[13px] text-white">
                  ∞
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold text-neutral-900">
                    Analytics Hub
                  </div>
                  <div className="text-xs text-neutral-500">
                    One view of clicks, sources, devices & more.
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* FEATURES */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-3">
              Features
            </div>
            <div className="space-y-2">
              <Link
                href="#"
                className="block rounded-2xl px-2 py-2 hover:bg-neutral-50"
              >
                <div className="text-sm font-semibold text-neutral-900">
                  Branded links & domains
                </div>
                <div className="text-xs text-neutral-500">
                  Keep every click on-brand with custom slugs & domains.
                </div>
              </Link>
              <Link
                href="#"
                className="block rounded-2xl px-2 py-2 hover:bg-neutral-50"
              >
                <div className="text-sm font-semibold text-neutral-900">
                  Smart routing
                </div>
                <div className="text-xs text-neutral-500">
                  Route by device, geo, campaign or audience.
                </div>
              </Link>
              <Link
                href="#"
                className="block rounded-2xl px-2 py-2 hover:bg-neutral-50"
              >
                <div className="text-sm font-semibold text-neutral-900">
                  UTM campaigns
                </div>
                <div className="text-xs text-neutral-500">
                  Auto-attach UTMs and keep tracking consistent.
                </div>
              </Link>
              <Link
                href="#"
                className="block rounded-2xl px-2 py-2 hover:bg-neutral-50"
              >
                <div className="text-sm font-semibold text-neutral-900">
                  Teams & workspaces
                </div>
                <div className="text-xs text-neutral-500">
                  Multi-brand workspaces with roles & approvals.
                </div>
              </Link>
            </div>
          </div>

          {/* DISCOVER MORE */}
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500 mb-3">
              Discover more
            </div>
            <div className="space-y-1.5 text-xs text-neutral-600">
              <Link href="#" className="block hover:text-neutral-900">
                API & documentation (soon)
              </Link>
              <Link href="#" className="block hover:text-neutral-900">
                Integrations
              </Link>
              <Link href="#" className="block hover:text-neutral-900">
                Changelog
              </Link>
              <Link href="#" className="block hover:text-neutral-900">
                Templates & examples
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
