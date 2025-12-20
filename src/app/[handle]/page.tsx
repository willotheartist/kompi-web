// src/app/[handle]/page.tsx
export const revalidate = 60; // public page cache (tune: 30/60/300)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { KCardPreview } from "@/components/k-cards/KCardPreview";
import { ClaimHandleCTA } from "@/components/k-cards/ClaimHandleCTA";
import {
  DEFAULT_KCARD_THEME,
  type KCardThemeState,
} from "@/components/k-cards/kcard-theme-presets";
import type { KCardsInitialData } from "@/components/k-cards/KCardsPage";

type PageProps = {
  params: Promise<{ handle: string }>;
};

const getPublicKCard = cache(async (handle: string) => {
  if (!handle) return null;

  return prisma.kCard.findUnique({
    where: { slug: handle },
    select: { slug: true, isPublic: true, data: true },
  });
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const kcard = await getPublicKCard(handle);

  if (!kcard || !kcard.isPublic) {
    return {
      title: "Kompi page not found",
      description: "This page is not available.",
      robots: { index: false, follow: false },
    };
  }

  const data = (kcard.data ?? {}) as KCardsInitialData;
  const title = data.title || "@yourname";
  const description = data.subtitle || "All your important links in one Kompi.";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/${handle}` },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${handle}`,
      type: "website",
    },
  };
}

export default async function PublicHandlePage({ params }: PageProps) {
  const { handle } = await params;

  const kcard = await getPublicKCard(handle);
  if (!kcard || !kcard.isPublic) notFound();

  const data = (kcard.data ?? {}) as KCardsInitialData;

  const {
    profileLayout = "classic",
    title = "@yourname",
    subtitle = "Designer · Creator · Founder",
    titleSize = "small",
    theme: themeRaw,
    links: linksRaw,
    socials: socialsRaw,
    avatarDataUrl = null,
    avatarSize = "medium",
    headerTextSize = "medium",
    avatarShadow = "shadow",
  } = data || {};

  const theme: KCardThemeState = {
    ...DEFAULT_KCARD_THEME,
    ...(themeRaw as KCardThemeState | undefined),
  };

  const {
    wallpaper,
    pageBackground,
    buttonColor,
    buttonTextColor,
    titleFont,
    pageFont,
    titleColor,
    pageTextColor,
    buttonStyle,
    buttonRadius,
    buttonShadow,
  } = theme;

  const previewTitleFont =
    titleFont === "serif"
      ? "font-serif"
      : titleFont === "display"
        ? "font-semibold tracking-tight"
        : "font-sans";

  const previewBodyFont =
    pageFont === "serif"
      ? "font-serif"
      : pageFont === "display"
        ? "font-semibold tracking-tight"
        : "font-sans";

  const buttonBaseStyles: React.CSSProperties = {
    borderRadius: buttonRadius,
    boxShadow:
      buttonShadow === "none"
        ? "none"
        : buttonShadow === "soft"
          ? "0 6px 14px rgba(15,23,42,0.35)"
          : buttonShadow === "hard"
            ? "0 10px 24px rgba(15,23,42,0.6)"
            : buttonShadow === "3d"
              ? "0 6px 0 rgba(0,0,0,0.45), 0 12px 0 rgba(0,0,0,0.3)"
              : "none",
    border: "1px solid transparent",
  };

  if (buttonStyle === "solid") {
    buttonBaseStyles.backgroundColor = buttonColor;
    buttonBaseStyles.color = buttonTextColor;
    buttonBaseStyles.border = "1px solid rgba(15,23,42,0.5)";
  } else if (buttonStyle === "glass") {
    buttonBaseStyles.backgroundColor = "rgba(15,23,42,0.35)";
    buttonBaseStyles.color = "var(--color-surface)";
    buttonBaseStyles.border = "1px solid rgba(15,23,42,0.35)";
    buttonBaseStyles.backdropFilter = "blur(12px)";
  } else {
    buttonBaseStyles.backgroundColor = "transparent";
    buttonBaseStyles.color = buttonColor;
    buttonBaseStyles.border = `1px solid ${buttonColor}`;
    buttonBaseStyles.boxShadow = "none";
  }

  const wallpaperStyle: React.CSSProperties = { background: wallpaper };

  const visibleLinks =
    (linksRaw ?? []).filter((l) => l && l.enabled !== false) ?? [];
  const socials = socialsRaw ?? ["Instagram", "YouTube", "Website"];

  const claimHref = `/claim?handle=${encodeURIComponent(
    handle
  )}&callbackUrl=${encodeURIComponent(`/${handle}`)}`;

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={wallpaperStyle}
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-10">
        <div className="relative w-full">
          <KCardPreview
            variant="public"
            slug={handle}
            wallpaperStyle={wallpaperStyle}
            pageBackground={pageBackground}
            previewTitleFont={previewTitleFont}
            previewBodyFont={previewBodyFont}
            title={title}
            subtitle={subtitle}
            titleColor={titleColor}
            pageTextColor={pageTextColor}
            titleSize={titleSize}
            _profileLayout={profileLayout}
            avatarPreview={avatarDataUrl}
            socials={socials}
            visibleLinks={visibleLinks}
            buttonBaseStyles={buttonBaseStyles}
            avatarSize={avatarSize}
            headerTextSize={headerTextSize}
            avatarShadow={avatarShadow}
          />

          <div
            className="pointer-events-none absolute inset-x-0 flex justify-center"
            style={{ bottom: 78 }}
          >
            <div className="pointer-events-auto">
              <ClaimHandleCTA
                href={claimHref}
                label="Claim your handle"
                className="w-[320px] max-w-[86vw]"
                size="embedded"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] text-neutral-500">
          Made with <span className="font-semibold">Kompi</span>
        </p>
      </div>
    </main>
  );
}
