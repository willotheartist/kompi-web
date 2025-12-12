// src/app/k/[slug]/page.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";
import { prisma } from "@/lib/prisma";
import { KCardPreview } from "@/components/k-cards/KCardPreview";
import {
  DEFAULT_KCARD_THEME,
  type KCardThemeState,
} from "@/components/k-cards/kcard-theme-presets";
import type { KCardsInitialData } from "@/components/k-cards/KCardsPage";
import {
  Instagram,
  Youtube,
  Music2,
  Facebook,
  Linkedin,
  MessageCircle,
  Mail,
  Globe2,
} from "lucide-react";

type Params = { slug: string } | Promise<{ slug: string }>;

async function resolveParams(params: Params): Promise<{ slug: string }> {
  return params instanceof Promise ? await params : params;
}

const _SOCIAL_ICON_MAP: Record<
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

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await resolveParams(props.params);

  const kcard = await prisma.kCard.findFirst({
    where: { slug, isPublic: true },
  });

  if (!kcard) {
    return {
      title: "K-Card not found",
      description: "This K-Card is not available.",
    };
  }

  const data = (kcard.data ?? {}) as KCardsInitialData;
  const title = data.title || "@yourname";
  const description =
    data.subtitle || "All your important links in one K-Card.";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/k/${slug}`,
      type: "website",
    },
  };
}

export default async function PublicKCardPage(props: {
  params: Params;
}) {
  const { slug } = await resolveParams(props.params);

  const kcard = await prisma.kCard.findFirst({
    where: { slug, isPublic: true },
  });

  if (!kcard) {
    notFound();
  }

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

  const previewTitleFont = (() => {
    switch (titleFont) {
      case "serif":
        return "font-serif";
      case "display":
        return "font-semibold tracking-tight";
      default:
        return "font-sans";
    }
  })();

  const previewBodyFont = (() => {
    switch (pageFont) {
      case "serif":
        return "font-serif";
      case "display":
        return "font-semibold tracking-tight";
      default:
        return "font-sans";
    }
  })();

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

  const wallpaperStyle: React.CSSProperties = {
    background: wallpaper,
  };

  const visibleLinks =
    (linksRaw ?? []).filter((l) => l && l.enabled !== false) ?? [];

  const socials = socialsRaw ?? ["Instagram", "YouTube", "Website"];

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={wallpaperStyle}
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-10">
        <KCardPreview
          variant="public"
          slug={slug}
          wallpaperStyle={wallpaperStyle}
          pageBackground={pageBackground}
          previewTitleFont={previewTitleFont}
          previewBodyFont={previewBodyFont}
          title={title}
          subtitle={subtitle}
          titleColor={titleColor}
          pageTextColor={pageTextColor}
          titleSize={titleSize}
          profileLayout={profileLayout}
          avatarPreview={avatarDataUrl}
          socials={socials}
          visibleLinks={visibleLinks}
          buttonBaseStyles={buttonBaseStyles}
          avatarSize={avatarSize}
          headerTextSize={headerTextSize}
          avatarShadow={avatarShadow}
        />
        <p className="mt-6 text-center text-[10px] text-neutral-500">
          Made with <span className="font-semibold">Kompi</span>
        </p>
      </div>
    </main>
  );
}
