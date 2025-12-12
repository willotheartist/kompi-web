//src/components/k-cards/KCardPreview.tsx
"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import {
  UserCircle2,
  Instagram,
  Youtube,
  Music2,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Globe2,
} from "lucide-react";

const SOCIAL_ICON_MAP: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  Instagram,
  YouTube: Youtube,
  TikTok: Music2,
  Twitter: Facebook, // placeholder
  LinkedIn: Linkedin,
  WhatsApp: MessageCircle,
  Email: Mail,
  Website: Globe2,
};

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
  _profileLayout: "classic" | "hero";
  avatarPreview: string | null;
  socials: string[];
  socialUrls?: Record<string, string>;
  visibleLinks: { id: string; title: string; url: string; enabled: boolean }[];
  buttonBaseStyles: React.CSSProperties;
  avatarSize: "small" | "medium" | "large";
  headerTextSize: "small" | "medium" | "large";
  avatarShadow: "shadow" | "flat";
  /** builder = small phone preview, public = full-width card */
  variant?: "builder" | "public";
  /** slug of the public K-Card, used for analytics */
  slug?: string;
  className?: string;
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
  titleSize: _titleSize,
  _profileLayout,
  avatarPreview,
  socials,
  socialUrls = {},
  visibleLinks,
  buttonBaseStyles,
  avatarSize,
  headerTextSize,
  avatarShadow,
  variant = "builder",
  slug,
  className,
}: KCardPreviewProps) {
  const effectiveTitleColor = titleColor || "#f9fafb";
  const effectiveTextColor = pageTextColor || "#cbd5f5";

  const avatarSizeClass =
    avatarSize === "small"
      ? "h-14 w-14"
      : avatarSize === "medium"
      ? "h-16 w-16"
      : "h-20 w-20";

  const titleSizeClass =
    headerTextSize === "small"
      ? "text-sm"
      : headerTextSize === "medium"
      ? "text-base"
      : "text-lg";

  const subtitleSizeClass =
    headerTextSize === "small"
      ? "text-[10px]"
      : headerTextSize === "medium"
      ? "text-[11px]"
      : "text-sm";

  const headerMarginTop = headerTextSize === "large" ? "mt-2" : "mt-1";

  // If the theme has a real wallpaper (not "none"), use it.
  // Otherwise, use the solid pageBackground color (for the Blank theme).
  const hasWallpaper =
    typeof wallpaperStyle?.background === "string" &&
    wallpaperStyle.background.trim().toLowerCase() !== "none";

  const cardBackgroundStyle: React.CSSProperties = hasWallpaper
    ? wallpaperStyle
    : { backgroundColor: pageBackground || "#020617" };

  const isPublic = variant === "public";

  function trackKCardLinkClick(linkId: string, url: string) {
    if (!slug || !url) return;

    const payload = JSON.stringify({ slug, linkId, url });

    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/k-cards/clicks", blob);
      } else {
        fetch("/api/k-cards/clicks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {
          // best-effort only
        });
      }
    } catch {
      // ignore tracking errors
    }
  }

  return (
    <div
      className={cn("relative", className)}
      style={{
        // builder: small phone preview used in UI
        // public: full-width card like Linktree
        width: isPublic ? "min(480px, 100%)" : "min(320px, 24vw)",
        maxWidth: "100%",
        aspectRatio: "320 / 680",
      }}
    >
      <div
        className="absolute inset-0 rounded-[32px]"
        style={cardBackgroundStyle}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col gap-0 overflow-hidden rounded-[32px] px-6 pb-6 pt-10",
            previewBodyFont
          )}
        >
          {/* header */}
          <div
            className={cn(
              "mb-4 flex flex-col items-center gap-2 text-center",
              previewTitleFont,
              headerMarginTop
            )}
          >
            <div
              className={cn(
                "overflow-hidden rounded-full",
                avatarSizeClass,
                avatarShadow === "shadow" &&
                  "shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
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
              className={cn("font-semibold", titleSizeClass)}
              style={{ color: effectiveTitleColor }}
            >
              {title || "@yourname"}
            </div>
            <div
              className={cn(subtitleSizeClass)}
              style={{ color: effectiveTextColor }}
            >
              {subtitle || "Short bio line for your card."}
            </div>
          </div>

          {/* socials */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            {socials.map((s) => {
              const Icon = SOCIAL_ICON_MAP[s];
              if (!Icon) return null;
              const href = socialUrls[s]?.trim();
              return (
                <a
                  key={s}
                  href={href || "#"}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noreferrer" : undefined}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
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
              visibleLinks.slice(0, 5).map((link) => {
                const href = (link.url || "").trim();
                const content = (
                  <span className="truncate">
                    {link.title || "Untitled link"}
                  </span>
                );

                if (isPublic) {
                  return (
                    <a
                      key={link.id}
                      href={href || "#"}
                      target={href ? "_blank" : undefined}
                      rel={href ? "noreferrer" : undefined}
                      onClick={() => {
                        if (href) {
                          trackKCardLinkClick(link.id, href);
                        }
                      }}
                      className="flex w-full items-center justify-center px-4 py-2.5 text-[11px] font-medium transition"
                      style={{
                        ...buttonBaseStyles,
                        transform: buttonBaseStyles?.boxShadow?.includes(
                          "0 6px 0"
                        )
                          ? "translateY(-2px)"
                          : undefined,
                      }}
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <button
                    key={link.id}
                    type="button"
                    className="flex w-full items-center justify-center px-4 py-2.5 text-[11px] font-medium transition"
                    style={{
                      ...buttonBaseStyles,
                      transform: buttonBaseStyles?.boxShadow?.includes(
                        "0 6px 0"
                      )
                        ? "translateY(-2px)"
                        : undefined,
                    }}
                  >
                    {content}
                  </button>
                );
              })
            )}
          </div>

          {/* footer */}
          <div className="mt-auto pt-6 text-center text-[10px] text-white/40">
            kompi.app/yourcard · Analytics included
          </div>
        </div>
      </div>
    </div>
  );
}
