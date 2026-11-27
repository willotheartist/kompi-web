"use client";

import { safePublicHref } from "@/lib/card-content";

//src/components/k-cards/KCardPreview.tsx


import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { KCardMessageDialog } from "./KCardMessageDialog";
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
  Pencil,
} from "lucide-react";
import { LinkLogo } from "./LinkLogo";

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

export type KCardEditTarget = { type: "header" } | { type: "link"; id: string } | { type: "message" };

/** Hover outline + "Edit" pill used for in-canvas editing in the Card editor. */
function EditSpot({ onEdit, label, children, className }: { onEdit?: () => void; label: string; children: React.ReactNode; className?: string }) {
  if (!onEdit) return <>{children}</>;
  return (
    <div className={cn("group/spot relative", className)}>
      {children}
      <span aria-hidden className="pointer-events-none absolute -inset-1.5 rounded-[14px] border-[1.5px] border-dashed border-[#3D5AFE] opacity-0 transition-opacity duration-150 group-hover/spot:opacity-100" />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="absolute -right-2 -top-3 z-10 inline-flex h-6 items-center gap-1 rounded-full bg-[#3D5AFE] px-2.5 text-[11px] font-medium text-white opacity-0 transition-opacity duration-150 focus-visible:opacity-100 group-hover/spot:opacity-100"
        style={{ fontFamily: "var(--font-primary, system-ui), system-ui, sans-serif" }}
      >
        <Pencil className="h-3 w-3" /> {label}
      </button>
    </div>
  );
}

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
  contact?: { enabled: boolean; buttonLabel: string; emailOnly?: boolean; intents?: { key: string; label: string; enabled?: boolean }[] };
  buttonBaseStyles: React.CSSProperties;
  avatarSize: "small" | "medium" | "large";
  headerTextSize: "small" | "medium" | "large";
  avatarShadow: "shadow" | "flat";
  /** builder = small phone preview, public = full-width card, device = fills a scrolling phone screen */
  variant?: "builder" | "public" | "device";
  /** Show each link's site logo inside its button. */
  linkIcons?: boolean;
  /** Editor only: makes parts of the Card clickable to jump to their settings. */
  onEdit?: (target: KCardEditTarget) => void;
  /** Editor only: element the message window renders into (the phone screen). */
  overlayTarget?: HTMLElement | null;
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
  contact,
  buttonBaseStyles,
  avatarSize,
  headerTextSize,
  avatarShadow,
  variant = "builder",
  slug,
  className,
  linkIcons,
  onEdit,
  overlayTarget,
}: KCardPreviewProps) {
  const isDevice = variant === "device";

  const [contactOpen, setContactOpen] = useState(false);
  const effectiveTitleColor = titleColor || "#f9fafb";
  const effectiveTextColor = pageTextColor || "#cbd5f5";

  // The public page and the editor's phone render at real phone size, so type and
  // buttons are larger there than in the old miniature preview.
  const fullSize = variant === "public" || variant === "device";
  const avatarSizeClass = fullSize
    ? avatarSize === "small" ? "h-16 w-16" : avatarSize === "medium" ? "h-20 w-20" : "h-24 w-24"
    : avatarSize === "small" ? "h-14 w-14" : avatarSize === "medium" ? "h-16 w-16" : "h-20 w-20";

  const titleSizeClass = fullSize
    ? headerTextSize === "small" ? "text-base" : headerTextSize === "medium" ? "text-lg" : "text-xl"
    : headerTextSize === "small" ? "text-sm" : headerTextSize === "medium" ? "text-base" : "text-lg";

  const subtitleSizeClass = fullSize
    ? headerTextSize === "small" ? "text-[12px]" : headerTextSize === "medium" ? "text-[13px]" : "text-[15px]"
    : headerTextSize === "small" ? "text-[10px]" : headerTextSize === "medium" ? "text-[11px]" : "text-sm";

  const buttonSizeClass = fullSize ? "min-h-[52px] py-3 text-[14px]" : "py-2.5 text-[11px]";

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

  // Only topics the owner switched on; none means the visitor isn't asked to pick one.
  const intents: { key: string; label: string }[] = (contact?.intents ?? [])
    .filter((i) => i.enabled !== false && i.label?.trim())
    .map(({ key, label }) => ({ key, label }));


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
      className={cn("relative", isDevice && "flex min-h-full w-full flex-col", isPublic && "flex min-h-[min(680px,85vh)] flex-col", className)}
      style={
        isDevice
          ? undefined
          : isPublic
          ? { width: "min(480px, 100%)", maxWidth: "100%" }
          : {
              // builder: small phone preview used in UI
              // public: full-width card like Linktree
              width: isPublic ? "min(480px, 100%)" : "min(320px, 24vw)",
              maxWidth: "100%",
              aspectRatio: "320 / 680",
            }
      }
    >
      <div
        className={isDevice ? "flex flex-1 flex-col" : isPublic ? "flex flex-1 flex-col rounded-[32px]" : "absolute inset-0 rounded-[32px]"}
        style={cardBackgroundStyle}
      >
        <div
          className={cn(
            "flex w-full flex-col gap-0 px-6 pb-6",
            isDevice ? "flex-1 pt-[72px]" : isPublic ? "flex-1 rounded-[32px] pt-12" : "h-full overflow-hidden rounded-[32px] pt-10",
            previewBodyFont
          )}
        >
          {/* header */}
          <EditSpot label="Edit profile" onEdit={onEdit ? () => onEdit({ type: "header" }) : undefined} className="mb-5">
          <div
            className={cn(
              "flex flex-col items-center gap-3.5 text-center",
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
            {/* Name and bio sit close together as one unit, clear of the avatar. */}
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn("font-semibold leading-tight tracking-[-0.01em]", titleSizeClass)}
                style={{ color: effectiveTitleColor }}
              >
                {title || "@yourname"}
              </div>
              <div
                className={cn("max-w-[30ch] leading-snug [text-wrap:balance]", subtitleSizeClass)}
                style={{ color: effectiveTextColor }}
              >
                {subtitle || "Short bio line for your card."}
              </div>
            </div>
          </div>

          </EditSpot>

          {/* socials */}
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            {socials.map((s) => {
              const Icon = SOCIAL_ICON_MAP[s];
              if (!Icon) return null;
              const href = safePublicHref(socialUrls[s]);
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
          <div className={fullSize ? "space-y-3" : "space-y-2"}>
            {visibleLinks.length === 0 ? (
              <div className="rounded-full border border-dashed border-white/20 bg-black/30 px-4 py-2 text-center text-[11px] text-white/60">
                Add a link below to see it here.
              </div>
            ) : (
              (fullSize ? visibleLinks : visibleLinks.slice(0, 8)).map((link) => {
                const href = safePublicHref(link.url);
                const content = (
                  <>
                    {linkIcons && (
                      <LinkLogo url={link.url} size={fullSize ? 34 : 24} className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full border-0 bg-white" />
                    )}
                    <span className={cn("truncate", linkIcons && (fullSize ? "px-9" : "px-7"))}>{link.title || "Untitled link"}</span>
                  </>
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
                      className={cn("relative flex w-full items-center justify-center px-4 font-medium transition", buttonSizeClass, linkIcons && !fullSize && "min-h-[42px] py-2")}
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
                  <EditSpot key={link.id} label="Edit link" onEdit={onEdit ? () => onEdit({ type: "link", id: link.id }) : undefined}>
                    <button
                      type="button"
                      onClick={onEdit ? () => onEdit({ type: "link", id: link.id }) : undefined}
                      className={cn("relative flex w-full items-center justify-center px-4 font-medium transition", buttonSizeClass, linkIcons && !fullSize && "min-h-[42px] py-2")}
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
                  </EditSpot>
                );
              })
            )}

            {/* contact button */}
            {contact?.enabled && (
              <EditSpot label="Edit button" onEdit={onEdit ? () => onEdit({ type: "message" }) : undefined}>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className={cn("flex w-full items-center justify-center px-4 font-medium transition", buttonSizeClass)}
                style={{
                  ...buttonBaseStyles,
                  transform: buttonBaseStyles?.boxShadow?.includes("0 6px 0")
                    ? "translateY(-2px)"
                    : undefined,
                }}
              >
                <span className="truncate">
                  {contact.buttonLabel || "Message me"}
                </span>
              </button>
              </EditSpot>
            )}

{/* contact modal */}
          {contact?.enabled && (
            <KCardMessageDialog
              open={contactOpen}
              onClose={() => setContactOpen(false)}
              ownerName={title || "them"}
              avatar={avatarPreview}
              intents={intents}
              emailOnly={contact.emailOnly}
              slug={isPublic ? slug : undefined}
              container={overlayTarget}
            />
          )}

          </div>

          {/* footer */}
          <div className="mt-auto pt-6 text-center text-[10px] text-white/40">
            {slug ? `kompi.app/${slug}` : "kompi.app/yourcard"}
          </div>
        </div>
      </div>
    </div>
  );
}
