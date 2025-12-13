"use client";

//src/components/k-cards/KCardPreview.tsx
"use client";

import * as React from "react";
import { useState } from "react";
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
  contact?: { enabled: boolean; buttonLabel: string; intents?: { key: string; label: string }[] };
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
  contact,
  buttonBaseStyles,
  avatarSize,
  headerTextSize,
  avatarShadow,
  variant = "builder",
  slug,
  className,
}: KCardPreviewProps) {

  const [contactOpen, setContactOpen] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [intentKey, setIntentKey] = useState<string | null>(null);
  const [intentLabel, setIntentLabel] = useState<string | null>(null);

  async function submitContactMessage() {
    try {
      if (!slug) {
        setContactStatus("error");
        return;
      }

      setContactStatus("sending");

      const res = await fetch("/api/k-cards/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          companyWebsite: "",
          intentKey,
          intentLabel,
          name: contactName || null,
          email: contactEmail || null,
          phone: contactPhone || null,
          message: contactMessage || null,
        }),
      });

      if (!res.ok) throw new Error("Failed");

      setContactStatus("sent");
      setTimeout(() => {
        setContactOpen(false);
        setContactStatus("idle");
        setContactMessage("");
        setIntentKey(null);
        setIntentLabel(null);
      }, 700);
    } catch {
      setContactStatus("error");
    }
  }

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

  const intents: { key: string; label: string }[] =
    (contact?.intents && contact.intents.length > 0)
      ? contact.intents
      : [
          { key: "hire", label: "Hire me" },
          { key: "quote", label: "Get a quote" },
          { key: "partner", label: "Partnership" },
          { key: "waitlist", label: "Join waitlist" },
        ];


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
              visibleLinks.slice(0, 8).map((link) => {
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

            {/* contact button */}
            {contact?.enabled && (
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="flex w-full items-center justify-center px-4 py-2.5 text-[11px] font-medium transition"
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
            )}

{/* contact modal */}
          {contactOpen && (
            <div
              data-kcard-contact-modal
              className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setContactOpen(false)}
                className="absolute inset-0 bg-black/40"
              />
              <div
                className="relative w-full max-w-md rounded-[26px] border border-black/10 bg-white p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[14px] font-semibold text-[#050505]">
                      {contact?.buttonLabel || "Message me"}
                    </div>
                    <div className="mt-1 text-[11px] text-black/55">
                      Send a quick message — they’ll receive it in Kompi.
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setContactOpen(false)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3eee7]"
                    aria-label="Close"
                  >
                    <span className="text-[16px] leading-none text-black/60">×</span>
                  </button>
                </div>

                
                
                {/* intents */}
                <div data-kcard-intents className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {intents.map((opt: { key: string; label: string }) => {
                      const active = intentKey === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => {
                            setIntentKey(opt.key);
                            setIntentLabel(opt.label);
                          }}
                          className={[
                            "rounded-full border px-3 py-1.5 text-[11px] font-semibold transition",
                            active
                              ? "border-black/20 bg-[#050505] text-white"
                              : "border-black/10 bg-[#f6f4f0] text-[#050505] hover:bg-white",
                          ].join(" ")}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {intentKey && (
                    <button
                      type="button"
                      onClick={() => {
                        setIntentKey(null);
                        setIntentLabel(null);
                      }}
                      className="mt-2 text-[11px] font-medium text-black/50 hover:text-black/70"
                    >
                      Clear selection
                    </button>
                  )}
                </div>

                <div className="mt-4 space-y-2">

                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Name (optional)"
                    className="w-full rounded-[18px] border border-black/10 bg-[#f6f4f0] px-4 py-3 text-[12px] text-[#050505] outline-none placeholder:text-black/40 focus:bg-white"
                  />
                  <input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Email (optional)"
                    className="w-full rounded-[18px] border border-black/10 bg-[#f6f4f0] px-4 py-3 text-[12px] text-[#050505] outline-none placeholder:text-black/40 focus:bg-white"
                  />
                  <input
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Phone (optional)"
                    className="w-full rounded-[18px] border border-black/10 bg-[#f6f4f0] px-4 py-3 text-[12px] text-[#050505] outline-none placeholder:text-black/40 focus:bg-white"
                  />
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write a message…"
                    rows={4}
                    className="w-full resize-none rounded-[18px] border border-black/10 bg-[#f6f4f0] px-4 py-3 text-[12px] text-[#050505] outline-none placeholder:text-black/40 focus:bg-white"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-black/50">
                    {contactStatus === "error" ? "Couldn’t send. Try again." : "\u00A0"}
                  </div>

                  <button
                    type="button"
                    disabled={contactStatus === "sending" || (!contactMessage.trim() && !contactEmail.trim() && !contactPhone.trim())}
                    onClick={submitContactMessage}
                    className={[
                      "rounded-[18px] px-4 py-2.5 text-[12px] font-semibold transition",
                      contactStatus === "sending" || (!contactMessage.trim() && !contactEmail.trim() && !contactPhone.trim())
                        ? "cursor-not-allowed bg-black/10 text-black/40"
                        : "bg-[#050505] text-white hover:opacity-90",
                    ].join(" ")}
                  >
                    {contactStatus === "sending"
                      ? "Sending…"
                      : contactStatus === "sent"
                        ? "Sent ✓"
                        : "Send"}
                  </button>
                </div>
              </div>
            </div>
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
