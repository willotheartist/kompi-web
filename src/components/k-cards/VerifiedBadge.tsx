"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

// 12-scallop rosette, like the verified marks people already recognise.
const ROSETTE =
  "M12.00 2.70A2.7 2.7 0 0 1 16.65 3.95A2.7 2.7 0 0 1 20.05 7.35A2.7 2.7 0 0 1 21.30 12.00A2.7 2.7 0 0 1 20.05 16.65A2.7 2.7 0 0 1 16.65 20.05A2.7 2.7 0 0 1 12.00 21.30A2.7 2.7 0 0 1 7.35 20.05A2.7 2.7 0 0 1 3.95 16.65A2.7 2.7 0 0 1 2.70 12.00A2.7 2.7 0 0 1 3.95 7.35A2.7 2.7 0 0 1 7.35 3.95A2.7 2.7 0 0 1 12.00 2.70Z";

/** Blue verified badge shown next to the name on Pro Cards. */
export function VerifiedBadge({ size = 22, className, label = "Verified · Kompi Pro", tooltip = true }: { size?: number; className?: string; label?: string; tooltip?: boolean }) {
  const id = useId().replace(/:/g, "");
  const [tip, setTip] = useState(false);
  return (
    <span
      className={cn("kc-verified relative inline-flex shrink-0 align-middle", className)}
      style={{ width: size, height: size }}
      onMouseEnter={tooltip ? () => setTip(true) : undefined}
      onMouseLeave={tooltip ? () => setTip(false) : undefined}
      onFocus={tooltip ? () => setTip(true) : undefined}
      onBlur={tooltip ? () => setTip(false) : undefined}
      tabIndex={tooltip ? 0 : undefined}
      role="img"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className="overflow-visible">
        <defs>
          <linearGradient id={`kvb-${id}`} x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#5AB4FF" />
            <stop offset="0.55" stopColor="#1D8CF8" />
            <stop offset="1" stopColor="#0A63E0" />
          </linearGradient>
          <linearGradient id={`kvs-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={`kvc-${id}`}>
            <path d={ROSETTE} />
          </clipPath>
        </defs>
        <path d={ROSETTE} fill={`url(#kvb-${id})`} />
        {/* Sheen that sweeps across now and then */}
        <g clipPath={`url(#kvc-${id})`}>
          <rect className="kc-verified-sheen" x="-14" y="-4" width="9" height="32" fill={`url(#kvs-${id})`} transform="rotate(20 12 12)" />
        </g>
        <path d="M7.7 12.4l2.9 2.9 5.8-6.3" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {tooltip && tip && (
        <span
          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#151619] px-2.5 py-1 text-[12px] font-medium normal-case tracking-normal !text-white [text-shadow:none]"
          style={{ fontFamily: "var(--font-primary, system-ui), system-ui, sans-serif" }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
