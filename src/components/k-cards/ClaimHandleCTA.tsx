// src/components/k-cards/ClaimHandleCTA.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

type ClaimHandleCTAProps = {
  href: string;
  label?: string;
  className?: string;
  size?: "default" | "embedded";
};

export function ClaimHandleCTA({
  href,
  label = "Claim your handle",
  className,
  size = "default",
}: ClaimHandleCTAProps) {
  const isEmbedded = size === "embedded";

  return (
    <Link
      href={href}
      className={cn(
        // IMPORTANT: let the pill size to its content (like your image)
        "inline-flex w-fit items-center rounded-full bg-white",
        "border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
        isEmbedded ? "px-8 py-4 gap-6" : "px-10 py-5 gap-7",
        // still safe on mobile screens
        "max-w-full",
        className
      )}
      aria-label={label}
    >
      <span
        className={cn(
          "shrink-0 inline-flex items-center justify-center rounded-full bg-[#D7FF3C] text-black",
          isEmbedded ? "h-12 w-12" : "h-14 w-14"
        )}
      >
        <span className={cn("font-black leading-none", isEmbedded ? "text-[16px]" : "text-[16px]")}>
          k.
        </span>
      </span>

      {/* IMPORTANT: no ellipsis, no overflow-hidden */}
      <span
        className={cn(
          "font-black tracking-tight text-black whitespace-nowrap",
          isEmbedded ? "text-[16px]" : "text-[16px]"
        )}
      >
        {label}
      </span>
    </Link>
  );
}
