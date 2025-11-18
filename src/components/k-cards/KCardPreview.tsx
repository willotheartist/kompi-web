// src/components/k-cards/KCardPreview.tsx
"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { UserCircle2 } from "lucide-react";

type KCardPreviewProps = {
  wallpaperStyle: React.CSSProperties;
  pageBackground: string;
  previewTitleFont: string;
  previewBodyFont: string;
  title: string;
  subtitle: string;
  titleColor: string;
  pageTextColor: string;
  titleSize: "small" | "large";
  profileLayout: "classic" | "hero";
  avatarPreview: string | null;
  socials: string[];
  socialIconMap: Record<
    string,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  >;
  visibleLinks: { id: string; title: string; url: string; enabled: boolean }[];
  buttonBaseStyles: React.CSSProperties;
};

export function KCardPreview({
  wallpaperStyle,
  pageBackground,
  previewTitleFont,
  previewBodyFont,
  title,
  subtitle,
  titleColor,
  pageTextColor,
  titleSize,
  profileLayout,
  avatarPreview,
  socials,
  socialIconMap,
  visibleLinks,
  buttonBaseStyles,
}: KCardPreviewProps) {
  const effectiveTitleColor = titleColor || "#f9fafb";
  const effectiveTextColor = pageTextColor || "#cbd5f5";

  return (
    <div
      className="relative"
      style={{
        width: "min(320px, 24vw)",
        aspectRatio: "320 / 680",
      }}
    >
      <div
        className="absolute inset-0 rounded-[32px]"
        style={{ backgroundColor: pageBackground || "#020617" }}
      >
        <div
          className="flex h-full w-full flex-col overflow-hidden rounded-[32px]"
          style={wallpaperStyle}
        >
          <div
            className={cn(
              "flex h-full w-full flex-col gap-0 px-6 pb-6 pt-10",
              previewBodyFont
            )}
          >
            {/* header */}
            <div
              className={cn(
                "mb-4 flex flex-col items-center gap-2 text-center",
                previewTitleFont,
                titleSize === "large" ? "mt-2" : "mt-1"
              )}
            >
              <div
                className={cn(
                  "rounded-full overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)]",
                  profileLayout === "classic" ? "h-16 w-16" : "h-20 w-20"
                )}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-black/40">
                    <UserCircle2 className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              <div
                className={cn(
                  "font-semibold",
                  titleSize === "large" ? "text-base" : "text-sm"
                )}
                style={{ color: effectiveTitleColor }}
              >
                {title || "@yourname"}
              </div>
              <div
                className="text-[11px]"
                style={{ color: effectiveTextColor }}
              >
                {subtitle || "Short bio line for your card."}
              </div>
            </div>

            {/* socials */}
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              {socials.map((s) => {
                const Icon = socialIconMap[s];
                if (!Icon) return null;
                return (
                  <span
                    key={s}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                );
              })}
            </div>

            {/* links */}
            <div className="space-y-2">
              {visibleLinks.length === 0 ? (
                <div className="rounded-full border border-dashed border-white/20 bg-black/30 px-4 py-2 text-center text-[11px] text-white/60">
                  Add a link below to see it here.
                </div>
              ) : (
                visibleLinks.slice(0, 5).map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    className="flex w-full items-center justify-center px-4 py-2.5 text-[11px] font-medium transition"
                    style={buttonBaseStyles}
                  >
                    <span className="truncate">
                      {link.title || "Untitled link"}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* footer */}
            <div className="mt-auto pt-6 text-center text-[10px] text-white/40">
              kompi.app/yourcard · Analytics included
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
