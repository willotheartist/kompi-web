// src/app/[handle]/page.tsx
export const dynamic = "force-dynamic"; // public page cache (tune: 30/60/300)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { KCardPreview } from "@/components/k-cards/KCardPreview";
import { PUBLIC_PROFILE_URL, appUrl } from "@/lib/urls";
import { CardViewTracker } from "@/components/k-cards/card-view-tracker";
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
    where: { slug: handle, user: { bannedAt: null } },
    select: { slug: true, isPublic: true, data: true, workspace: { select: { plan: true } } },
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
  const baseUrl = PUBLIC_PROFILE_URL;

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
    socialUrls = {},
    contact,
    contactDetails,
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
    (Array.isArray(linksRaw) ? linksRaw : []).filter((l) => l && l.enabled !== false) ?? [];
  const socials = socialsRaw ?? ["Instagram", "YouTube", "Website"];


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
            socialUrls={socialUrls}
            contact={contact}
            visibleLinks={visibleLinks}
            buttonBaseStyles={buttonBaseStyles}
            avatarSize={avatarSize}
            headerTextSize={headerTextSize}
            avatarShadow={avatarShadow}
            linkIcons={Boolean(theme.linkIcons)}
          />

          <CardViewTracker slug={handle} />
          {(contactDetails?.email || contactDetails?.phone) && <a className="mx-auto mt-5 block w-fit rounded-full border border-black/15 bg-white px-5 py-3 text-sm text-neutral-900" href={`/${encodeURIComponent(handle)}/contact.vcf`}>Save contact</a>}

        </div>

        {(!kcard.workspace || kcard.workspace.plan === "FREE") && <a href={appUrl("/signup")} className="mt-6 text-center text-sm text-neutral-700 underline">Create your own Kompi Card</a>}
      </div>
    </main>
  );
}
