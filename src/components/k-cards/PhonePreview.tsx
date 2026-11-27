"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

// Logical phone size (CSS px) — the Card is laid out at this size, then scaled to fit.
const SCREEN_W = 360;
const SCREEN_H = 780;
const BEZEL = 10;
const PHONE_W = SCREEN_W + BEZEL * 2;
const PHONE_H = SCREEN_H + BEZEL * 2;

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function Clock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now || "9:41"}</span>;
}

/**
 * A phone-shaped, scrollable preview of the Card that always fits its container:
 * the Card renders at real phone size and the whole device scales down to stay fully in view.
 * `children` receives the overlay element so dialogs can open inside the screen.
 */
export function PhonePreview({ children, className, maxScale = 1 }: { children: (overlay: HTMLElement | null) => ReactNode; className?: string; maxScale?: number }) {
  const stage = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);
  const [overlay, setOverlay] = useState<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      setScale(Math.max(0.4, Math.min(maxScale, width / PHONE_W, height / PHONE_H)));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxScale]);

  return (
    <div ref={stage} className={cn("flex min-h-0 w-full flex-1 items-start justify-center", className)}>
      <div className="relative shrink-0 transition-[width,height] duration-300 ease-[cubic-bezier(.16,1,.3,1)]" style={{ width: PHONE_W * scale, height: PHONE_H * scale }}>
        <div
          className="absolute left-0 top-0 origin-top-left rounded-[56px] bg-[#151619] transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{ width: PHONE_W, height: PHONE_H, padding: BEZEL, transform: `scale(${scale})` }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[46px] bg-white">
            {/* Scrollable page */}
            <div className="h-full w-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children(overlay)}</div>

            {/* Status bar */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-12 items-center justify-between px-8 text-[14px] font-semibold text-white mix-blend-difference" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
              <Clock />
              <span className="flex items-center gap-1.5">
                <Signal className="h-[15px] w-[15px]" strokeWidth={2.4} />
                <Wifi className="h-[15px] w-[15px]" strokeWidth={2.4} />
                <BatteryFull className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
            </div>
            <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-[30px] w-[104px] -translate-x-1/2 rounded-full bg-[#151619]" />
            <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-white mix-blend-difference" />

            {/* Dialogs (e.g. Message me) open here, inside the screen */}
            <div ref={setOverlay} className="pointer-events-none absolute inset-0 z-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
