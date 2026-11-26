"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Shared dashboard kit. Visual language follows the QR studio: neutral ink on white,
 * 1px hairline borders, no shadows or glows, Inter Tight with tight tracking.
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const ink = "#151619";

const listV: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } } };
const itemV: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
};

export function Stagger({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "ul" }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={listV} initial="hidden" animate="show">
      {children}
    </Comp>
  );
}

export function Rise({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" | "section" | "li" }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={itemV}>
      {children}
    </Comp>
  );
}

export function PageHeader({
  eyebrow,
  icon: Icon,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  icon?: LucideIcon;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 sm:mb-8">
      <div className="min-w-0">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mb-2.5 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.1em] text-[#80858C]"
          >
            {Icon && <Icon size={15} strokeWidth={1.9} />}
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.04 }}
          className="text-[28px] font-medium leading-[1.15] tracking-[-0.05em] sm:text-[34px]"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
            className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#696C72]"
          >
            {description}
          </motion.p>
        )}
      </div>
      {actions && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2"
        >
          {actions}
        </motion.div>
      )}
    </header>
  );
}

export function Panel({ children, className, title, action, icon: Icon, bodyClassName }: { children: ReactNode; className?: string; title?: ReactNode; action?: ReactNode; icon?: LucideIcon; bodyClassName?: string }) {
  return (
    <section className={cn("min-w-0 rounded-[16px] border border-[#E3E5E7] bg-white", className)}>
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDEEF0] px-5 py-4 sm:px-6">
          <h2 className="flex items-center gap-2 text-[16px] font-medium tracking-[-0.02em]">
            {Icon && <Icon size={17} strokeWidth={1.8} className="text-[#80858C]" />}
            {title}
          </h2>
          {action}
        </div>
      )}
      <div className={cn("p-5 sm:p-6", bodyClassName)}>{children}</div>
    </section>
  );
}

export function CountUp({ value, className, format = (n: number) => Math.round(n).toLocaleString() }: { value: number; className?: string; format?: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? value : 0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- no animation when reduced motion is requested.
      setShown(value);
      return;
    }
    const controls = animate(0, value, { duration: Math.min(1.2, 0.5 + Math.log10(value + 1) * 0.18), ease: EASE, onUpdate: setShown });
    return () => controls.stop();
  }, [inView, value, reduced]);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {format(shown)}
    </span>
  );
}

export function Delta({ value, className }: { value: number | null | undefined; className?: string }) {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  const up = value > 0;
  const flat = value === 0;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-[6px] px-1.5 py-0.5 text-[12px] font-medium tabular-nums",
        flat ? "bg-[#F1F2F4] text-[#696C72]" : up ? "bg-[#EEF3ED] text-[#357452]" : "bg-[#FBEFED] text-[#9B3E35]",
        className,
      )}
    >
      {flat ? "±" : up ? "↑" : "↓"} {Math.abs(Math.round(value))}%
    </span>
  );
}

export function Sparkline({ data, className, height = 40, stroke = ink }: { data: number[]; className?: string; height?: number; stroke?: string }) {
  const id = useId();
  const w = 120;
  const max = Math.max(1, ...data);
  const pts = data.map((v, i) => [data.length === 1 ? w : (i / (data.length - 1)) * w, height - 3 - (v / max) * (height - 8)] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${height} L0,${height} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className={cn("w-full overflow-visible", className)} style={{ height }} aria-hidden>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.1" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
        {/* Left-to-right reveal; pathLength can't be used with a non-scaling stroke. */}
        <clipPath id={`${id}-clip`}>
          <motion.rect x={0} y={-4} height={height + 8} initial={{ width: 0 }} animate={{ width: w + 4 }} transition={{ duration: 0.9, ease: EASE, delay: 0.15 }} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <path d={area} fill={`url(#${id}-fill)`} />
        <path d={line} fill="none" stroke={stroke} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

export function Meter({ used, max, className }: { used: number; max: number; className?: string }) {
  const pct = Math.min(100, max ? (used / max) * 100 : 0);
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-[#ECEEF0]", className)}>
      <motion.div
        className={cn("h-full rounded-full", pct >= 90 ? "bg-[#B4473E]" : "bg-[#151619]")}
        initial={{ width: 0 }}
        animate={{ width: `${Math.max(pct, used ? 2 : 0)}%` }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      />
    </div>
  );
}

export function EmptyState({ icon: Icon, title, children, action, className }: { icon: LucideIcon; title: string; children?: ReactNode; action?: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn("flex flex-col items-center justify-center gap-3 rounded-[16px] border border-dashed border-[#D6D9DE] bg-white px-6 py-14 text-center", className)}
    >
      <motion.div
        initial={{ scale: 0.8, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="mb-1 grid size-14 place-items-center rounded-[15px] border border-[#E9EBEE] bg-[#F8F9FA] text-[#5A5E65]"
      >
        <Icon size={26} strokeWidth={1.6} />
      </motion.div>
      <h2 className="text-[20px] font-medium tracking-[-0.035em]">{title}</h2>
      {children && <div className="max-w-md text-[15px] leading-relaxed text-[#696C72]">{children}</div>}
      {action && <div className="mt-2 flex flex-wrap justify-center gap-2">{action}</div>}
    </motion.div>
  );
}

export const buttonStyles = {
  primary:
    "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#151619] px-4 text-[14px] font-medium text-white transition-[background-color,transform] duration-150 hover:bg-[#2B2D31] active:scale-[0.98] disabled:opacity-50",
  secondary:
    "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-[#E3E5E7] bg-white px-4 text-[14px] font-medium text-[#151619] transition-[background-color,border-color,transform] duration-150 hover:border-[#CDD1D7] hover:bg-[#F7F8F9] active:scale-[0.98] disabled:opacity-50",
  ghost:
    "inline-flex min-h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-[9px] px-2.5 text-[14px] text-[#5A5E65] transition-colors hover:bg-[#F3F4F5] hover:text-[#151619]",
  icon: "inline-grid size-9 place-items-center rounded-[9px] text-[#696C72] transition-colors hover:bg-[#F3F4F5] hover:text-[#151619] disabled:opacity-50",
};
