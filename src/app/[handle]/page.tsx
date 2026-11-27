// src/app/[handle]/page.tsx
export const dynamic = "force-dynamic"; // public page cache (tune: 30/60/300)

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { KCardPreview } from "@/components/k-cards/KCardPreview";
import { PUBLIC_PROFILE_URL, appUrl } from "@/lib/urls";
import { CardViewTracker } from "@/components/k-cards/card-view-tracker";
import { ViewOnMobile } from "@/components/k-cards/view-on-mobile";
import {
  DEFAULT_KCARD_THEME,
  type KCardThemeState,
} from "@/components/k-cards/kcard-theme-presets";
import type { KCardsInitialData } from "@/components/k-cards/KCardsPage";
import { kcardButtonStyles, kcardWallpaperStyle, isPaidPlan, sanitizeStickers } from "@/components/k-cards/kcard-style";
import { getKCardFontClass } from "@/lib/fonts";

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

  const { pageBackground, titleFont, pageFont, titleColor, pageTextColor } = theme;

  // Same font and button rules as the editor preview, so the live Card matches it.
  const previewTitleFont = getKCardFontClass(titleFont);
  const previewBodyFont = getKCardFontClass(pageFont);
  const buttonBaseStyles = kcardButtonStyles(theme);
  const wallpaperStyle = kcardWallpaperStyle(theme);

  const visibleLinks =
    (Array.isArray(linksRaw) ? linksRaw : []).filter((l) => l && l.enabled !== false) ?? [];
  const socials = socialsRaw ?? ["Instagram", "YouTube", "Website"];


  const freePlan = !kcard.workspace || kcard.workspace.plan === "FREE";
  const pro = isPaidPlan(kcard.workspace?.plan);
  const cardUrl = `${PUBLIC_PROFILE_URL}/${handle}`;

  return (
    <main className="relative min-h-dvh" style={wallpaperStyle}>
      {/* On wide screens the theme fills the page, dimmed, with the Card as a tall column on top (like Linktree). */}
      <div aria-hidden className="pointer-events-none fixed inset-0 hidden bg-[#151619]/35 sm:block" />
      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-[600px] flex-col sm:pt-10">
        <div className="flex flex-1 flex-col overflow-hidden sm:rounded-t-[36px]" style={wallpaperStyle}>
          <KCardPreview
            variant="public"
            slug={handle}
            shareUrl={cardUrl}
            showKompiBadge={freePlan}
            linkIcons={Boolean(theme.linkIcons)}
            skin={pro ? theme.skin : undefined}
            verified={pro && theme.verified !== false}
            stickers={sanitizeStickers(theme.stickers)}
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
            footer={
              <>
                {(contactDetails?.email || contactDetails?.phone) && (
                  <a className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-[#151619] transition-transform hover:scale-[1.03]" href={`/${encodeURIComponent(handle)}/contact.vcf`}>
                    Save contact
                  </a>
                )}
                {freePlan && (
                  <a href={appUrl("/signup")} className="inline-flex h-12 items-center rounded-full bg-white px-6 text-[15px] font-medium text-[#151619] transition-transform hover:scale-[1.03]">
                    Get your own Kompi Card
                  </a>
                )}
              </>
            }
          />
          <CardViewTracker slug={handle} />
        </div>
      </div>
      <ViewOnMobile url={cardUrl} />
    </main>
  );
}
