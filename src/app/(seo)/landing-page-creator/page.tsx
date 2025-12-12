// src/app/(seo)/landing-page-creator/page.tsx
 

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  BarChart3,
  Link2,
  QrCode,
  ScanLine,
  Sparkles,
  Zap,
  LayoutTemplate,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

/**
 * NOTE
 * - This SEO page is intentionally long + highly structured.
 * - We’re positioning K Cards as the “landing page creator” alternative.
 * - Video is assumed to exist at: /public/seo/landing-page-creator.mp4
 */

const SITE_NAME = "Kompi";
const SITE_URL = "https://kompi.ai";
const SLUG_PATH = "/landing-page-creator";
const CANONICAL_URL = `${SITE_URL}${SLUG_PATH}`;
const SEO_VIDEO_SRC = "/seo/landing-page-creator.mp4";
const OG_IMAGE = `${SITE_URL}/kompi-platform.png`;

type FaqItem = { q: string; a: string };

// Minimum 8 FAQs (we provide more)
const FAQS: FaqItem[] = [
  {
    q: "What is a landing page creator?",
    a: "A landing page creator helps you build a focused page that drives a specific action—like getting clicks, signups, purchases, bookings, or follows—without needing a full website rebuild.",
  },
  {
    q: "Is Kompi a landing page builder?",
    a: "Kompi is a platform with multiple building blocks. If you want a fast landing page creator, K Cards are the best Kompi alternative to traditional landing page builders—designed for creators, QR traffic, and quick publishing.",
  },
  {
    q: "How are K Cards different from a traditional landing page builder?",
    a: "Traditional builders are often heavy and template-driven. K Cards are simpler: one clean, mobile-first page you can update anytime without changing the URL—perfect for link-in-bio, campaigns, and QR scans.",
  },
  {
    q: "Can I use K Cards as a link-in-bio landing page?",
    a: "Yes. K Cards are ideal as a link-in-bio hub: add your key links, CTAs, media, and updates in one destination that works across Instagram, TikTok, YouTube, and more.",
  },
  {
    q: "How do I track my landing page performance?",
    a: "For attribution, use Kompi’s UTM Builder to tag your shared links. Then use those tracked URLs as the destination for your K Card campaigns, Links pages, or QR codes.",
  },
  {
    q: "Can I create a QR code that points to my landing page?",
    a: "Yes. Create your landing destination first (K Cards or Links), then generate a QR code using Kompi’s QR generator. For branding, use the QR code with logo page.",
  },
  {
    q: "What if I need a restaurant menu landing page?",
    a: "Use QR Menus for hospitality. It’s a mobile-first menu landing experience that you can update anytime—then place a QR code on tables, windows, or receipts to drive scans.",
  },
  {
    q: "Is a simple landing page better for creators?",
    a: "Often, yes. Creator traffic is mostly mobile and attention-limited. A fast, focused landing page with clear CTAs converts better than over-designed pages with too many sections and slow load times.",
  },
  {
    q: "Do I need a custom domain to use a landing page creator?",
    a: "Not always. Many creators succeed with a single stable destination URL they can share everywhere. If you later add a domain, the best approach is to keep your main destination stable and update content inside it.",
  },
  {
    q: "How do KR Codes fit into landing pages?",
    a: "KR Codes can be used when you want a more brand-forward, structured code system. Many teams combine K Cards (destination) with KR Codes (scannable brand system) for campaigns.",
  },
];

export const metadata: Metadata = {
  title: "Landing Page Creator for Creators & Brands | K Cards by Kompi",
  description:
    "Create a high-converting landing page in minutes—no code, no heavy builder. K Cards are a clean landing page creator alternative built for creators, QR scans, and campaigns. Track performance with UTMs.",
  keywords: [
    "landing page creator",
    "landing page builder alternative",
    "landing page creator for creators",
    "no code landing page creator",
    "simple landing page builder",
    "creator landing page",
    "link in bio landing page",
    "link in bio page creator",
    "campaign landing page creator",
    "mobile landing page creator",
    "qr code landing page",
    "landing page for qr code",
    "utm tracking landing page",
    "K Cards",
    "Kompi landing pages",
    "digital business card landing page",
    "landing page for small business",
    "landing page for restaurants",
    "landing page conversion tips",
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: "Landing Page Creator for Creators & Brands | K Cards by Kompi",
    description:
      "Skip heavy landing page builders. Use K Cards as a fast, mobile-first landing page creator designed for creators, campaigns, and QR code traffic.",
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kompi K Cards landing page creator preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Landing Page Creator | K Cards by Kompi",
    description: "A clean landing page creator alternative for creators: K Cards + UTMs + QR codes.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

/* -------------------------------------------------------------------------- */
/*  SMALL UI PRIMITIVES (match creator-studio + barcode vibe)                 */
/* -------------------------------------------------------------------------- */

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-4">{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-[0.34em] text-[#5177e1]">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-2xl text-center text-base md:text-lg leading-relaxed text-neutral-600">
      {children}
    </p>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-neutral-200 bg-white shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-10 sm:px-10 sm:py-12">{children}</div>;
}

function Figure({
  src,
  alt,
  aspect = "aspect-[16/10]",
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      <div className={`relative w-full ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

function IconFeature({
  icon,
  bg,
  title,
  children,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: bg }}>
        <div className="h-5 w-5 text-[#0B0F1A]">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-[#0B0F1A]">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-600">{children}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

function LandingPageCreatorHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 transform-gpu blur-3xl">
        <div className="mx-auto h-56 max-w-3xl bg-gradient-to-r from-[#A3CF3D] via-[#9BDFD1] to-[#4B9FFF] opacity-70" />
      </div>

      <div className="mx-auto flex flex-col items-center justify-center py-14 md:py-20 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#D1FAE5]">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1E2330] text-[10px] font-semibold text-white">
            K
          </span>
          <span>Kompi Tools · Landing Page Creator</span>
        </div>

        <div className="space-y-7 md:space-y-9">
          <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
            A{" "}
            <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
              landing page creator
            </span>{" "}
            without builder bloat.
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-neutral-700">
            K Cards are a fast, mobile-first landing page alternative built for creator traffic, QR scans, and campaigns.
            Keep one durable URL — update the contents anytime.
          </p>

          <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-neutral-600">
            Best default stack: K Cards → UTMs → QR. Add Links for routing, QR Menus for hospitality, KR Codes for structured campaign systems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#map"
              className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
            >
              Explore the workflow
            </a>
            <Link
              href="/k-cards"
              className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
            >
              Create a K Card
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm font-medium text-neutral-600">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#D1FAE5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>Destination → tracking → distribution</span>
            </div>
            <span>• Built for mobile conversion</span>
            <span>• Works online + offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  TOOL MAP                                                                  */
/* -------------------------------------------------------------------------- */

function ToolCard({
  href,
  badge,
  title,
  desc,
}: {
  href: string;
  badge: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm hover:border-neutral-400 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-neutral-50 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 ring-1 ring-neutral-200">
              {badge}
            </span>
            <h3 className="text-base md:text-lg font-semibold text-neutral-900 group-hover:underline group-hover:underline-offset-4">
              {title}
            </h3>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-neutral-600">{desc}</p>
        </div>
        <span className="opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
      </div>
    </Link>
  );
}

function LandingPageCreatorMap() {
  return (
    <section id="map" className="scroll-mt-28">
      <Container>
        <Card>
          <CardBody>
            <Eyebrow>LANDING PAGE CREATOR MAP</Eyebrow>
            <SectionTitle>K Cards + Kompi tools = a better landing workflow</SectionTitle>
            <SectionSub>
              A landing page is only useful if it stays stable, is easy to update, and connects to distribution and measurement.
            </SectionSub>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <ToolCard
                href="/k-cards"
                badge="Destination"
                title="K Cards"
                desc="Create a focused landing page / link hub with one durable URL you keep updating."
              />
              <ToolCard
                href="/links"
                badge="Routing"
                title="Kompi Links"
                desc="Campaign-friendly routing and share pages for teams, partners, and multi-destination flows."
              />
              <ToolCard
                href="/tools/utm-builder"
                badge="Tracking"
                title="UTM Builder"
                desc="Add consistent UTMs so you can compare platforms, posts, ads, and offline placements."
              />
              <ToolCard
                href="/qr-code-generator"
                badge="Distribution"
                title="QR Code Generator"
                desc="Turn posters, packaging, events, and business cards into immediate action with scans."
              />
              <ToolCard
                href="/qr-code/with-logo"
                badge="Branding"
                title="QR Code With Logo"
                desc="Boost scan trust with a logo while staying scan-friendly."
              />
              <ToolCard
                href="/qr-menus"
                badge="Hospitality"
                title="QR Menus"
                desc="Publish mobile-first menus you can update anytime — ideal for table tents and windows."
              />
              <ToolCard
                href="/kr-codes"
                badge="System"
                title="KR Codes"
                desc="A brand-forward, structured code system for consistent campaign assets."
              />
              <ToolCard
                href="/k-cards"
                badge="Recommended"
                title="Fastest landing page setup"
                desc="K Cards → UTMs → QR. Simple, repeatable, measurable."
              />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3 text-sm md:text-base text-neutral-600">
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Less builder bloat</h3>
                <p>Skip template sprawl. Publish a clean destination with clear CTAs.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Durable link</h3>
                <p>Keep one URL across bios, campaigns, and prints — update the contents anytime.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Measurable distribution</h3>
                <p>UTMs + QR let you compare platforms and placements instead of guessing.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FEATURE ICONS                                                             */
/* -------------------------------------------------------------------------- */

function LandingPageCreatorFeatures() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Eyebrow>FEATURES</Eyebrow>
            <SectionTitle>What a creator-first landing page needs</SectionTitle>
            <SectionSub>Fast, focused, and built for where traffic actually comes from: social + scans.</SectionSub>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <IconFeature icon={<LayoutTemplate className="h-5 w-5" />} bg="#EDE9FE" title="Focused by default">
              One clear destination that avoids choice overload and keeps CTAs obvious.
            </IconFeature>

            <IconFeature icon={<Link2 className="h-5 w-5" />} bg="#E0F2FE" title="Durable URL">
              Update content without changing the link you already shared (or printed).
            </IconFeature>

            <IconFeature icon={<BarChart3 className="h-5 w-5" />} bg="#DCFCE7" title="Tracking friendly">
              Add UTMs once and compare platforms, posts, and placements consistently.
            </IconFeature>

            <IconFeature icon={<QrCode className="h-5 w-5" />} bg="#FEF3C7" title="QR-ready conversion">
              Scan → land → act. Designed for fast mobile experiences and real-world traffic.
            </IconFeature>

            <IconFeature icon={<BadgeCheck className="h-5 w-5" />} bg="#FCE7F3" title="Trust at scan time">
              Branded destinations + logo QR reduce hesitation and improve follow-through.
            </IconFeature>

            <IconFeature icon={<Sparkles className="h-5 w-5" />} bg="#ECFCCB" title="Creator-friendly workflow">
              Ship in minutes, not hours. Spend time iterating outcomes, not layout tweaks.
            </IconFeature>

            <IconFeature icon={<ScanLine className="h-5 w-5" />} bg="#DBEAFE" title="Offline attribution">
              Use UTMs with QR to measure posters vs packaging vs table tents.
            </IconFeature>

            <IconFeature icon={<Zap className="h-5 w-5" />} bg="#FFE4E6" title="Scales when needed">
              Add Links for routing, QR Menus for venues, KR Codes for structured campaigns.
            </IconFeature>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  VIDEO                                                                     */
/* -------------------------------------------------------------------------- */

function LandingPageCreatorVideo() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="video">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>60-SECOND OVERVIEW</Eyebrow>
            <SectionTitle>See the landing workflow in motion</SectionTitle>
            <SectionSub>Destination → tracking → QR distribution → measurable outcomes.</SectionSub>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-black shadow-sm">
            <video
              className="aspect-video w-full object-cover"
              src={SEO_VIDEO_SRC}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center">
                <LayoutTemplate className="h-5 w-5 text-[#0B0F1A]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 1</p>
              <h3 className="text-lg font-semibold text-[#0B0F1A]">Build the destination</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Publish a focused landing page with{" "}
                <Link href="/k-cards" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  K Cards
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-[#0B0F1A]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 2</p>
              <h3 className="text-lg font-semibold text-[#0B0F1A]">Add UTMs</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Keep naming consistent with{" "}
                <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  UTM Builder
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-[#FEF3C7] flex items-center justify-center">
                <ScanLine className="h-5 w-5 text-[#0B0F1A]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 3</p>
              <h3 className="text-lg font-semibold text-[#0B0F1A]">Drive action</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Generate{" "}
                <Link href="/qr-code-generator" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  QR codes
                </Link>{" "}
                (optionally{" "}
                <Link href="/qr-code/with-logo" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  with logo
                </Link>
                ).
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  LONG-FORM (SEO) — BROKEN INTO CARDS                                       */
/* -------------------------------------------------------------------------- */

function LandingPageCreatorLongForm() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4]" aria-labelledby="landing-page-creator-guide-heading">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <Card>
            <CardBody>
              <Eyebrow>LANDING PAGE CREATOR GUIDE</Eyebrow>
              <h2
                id="landing-page-creator-guide-heading"
                className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]"
              >
                What converts for creators (and why simple wins)
              </h2>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                Landing pages don’t fail because creators don’t have enough design options — they fail because the page
                is slow, unclear, and disconnected from distribution. The best creator landing pages follow one rule:
                <strong> reduce friction</strong>. One destination. One primary CTA. Consistent tracking. QR-ready distribution.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Figure src="/kompi-platform.png" alt="Kompi platform preview" aspect="aspect-[16/10]" priority />
                <Figure src="/kompi-branding.png" alt="Kompi branding preview" aspect="aspect-[16/10]" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>THE PRACTICAL SYSTEM</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                The creator-first landing workflow
              </h3>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 1</p>
                  <h4 className="text-xl font-bold text-[#0B0F1A]">Choose a stable destination</h4>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    Start with{" "}
                    <Link href="/k-cards" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      K Cards
                    </Link>{" "}
                    as your landing page. If you’re routing multiple campaigns, add{" "}
                    <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      Links
                    </Link>
                    .
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 2</p>
                  <h4 className="text-xl font-bold text-[#0B0F1A]">Add attribution with UTMs</h4>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    Use{" "}
                    <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      UTM Builder
                    </Link>{" "}
                    for consistent source/medium/campaign tags. Consistency beats complexity.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 3</p>
                  <h4 className="text-xl font-bold text-[#0B0F1A]">Drive action with QR</h4>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    Generate a{" "}
                    <Link href="/qr-code-generator" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      QR code
                    </Link>{" "}
                    to your tracked URL. Use{" "}
                    <Link href="/qr-code/with-logo" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      logo QR
                    </Link>{" "}
                    when brand trust matters.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 4</p>
                  <h4 className="text-xl font-bold text-[#0B0F1A]">Add specialized destinations</h4>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    For hospitality, publish{" "}
                    <Link href="/qr-menus" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      QR Menus
                    </Link>
                    . For structured campaign assets, explore{" "}
                    <Link href="/kr-codes" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                      KR Codes
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-7 md:p-8">
                <h4 className="text-xl font-bold text-[#0B0F1A]">High-converting landing page structure</h4>
                <ul className="mt-4 space-y-2 text-base text-neutral-700 leading-relaxed">
                  <li>• One clear headline: what you do + who it’s for.</li>
                  <li>• One primary CTA above the fold.</li>
                  <li>• A small set of supporting links (not a giant list).</li>
                  <li>• A trust signal: logo, social proof, featured-in, testimonial.</li>
                  <li>• Measurement: UTMs by platform/placement so you can iterate.</li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/k-cards"
                    className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
                  >
                    Build a K Card
                  </Link>
                  <Link
                    href="/tools/utm-builder"
                    className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-6 py-3 text-sm font-semibold text-[#1E2330] hover:bg-[#F7F7F3]"
                  >
                    Add tracking
                  </Link>
                  <Link
                    href="/qr-code-generator"
                    className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    Generate QR
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  USE CASES                                                                 */
/* -------------------------------------------------------------------------- */

type UseCaseLink = { href: string; label: string };
type UseCaseBlock = {
  k: string;
  title: string;
  body: string;
  links: [UseCaseLink, UseCaseLink];
  bg: string;
  ring: string;
  badge?: string;
};

function LandingPageCreatorUseCases() {
  const blocks: UseCaseBlock[] = [
    {
      k: "CREATORS",
      title: "Link-in-bio landing page that stays updated",
      body: "One durable destination for key links, CTAs, offers, and updates — optimized for mobile traffic.",
      links: [
        { href: "/k-cards", label: "Build with K Cards" },
        { href: "/tools/utm-builder", label: "Add UTMs" },
      ],
      bg: "bg-[#F7F7F3]",
      ring: "ring-1 ring-[#E5E7EB]",
    },
    {
      k: "QR TRAFFIC",
      title: "Scan-to-action destinations",
      body: "Posters, merch, packaging, and signage — fast landing, clear CTA, and branded trust at scan time.",
      links: [
        { href: "/qr-code-generator", label: "Generate QR" },
        { href: "/qr-code/with-logo", label: "Logo QR" },
      ],
      bg: "bg-[#E0F2FE]",
      ring: "ring-1 ring-[#BFDBFE]",
      badge: "High converting",
    },
    {
      k: "BRANDS & TEAMS",
      title: "Campaign routing you can reuse",
      body: "Route offers through Links, tag everything with UTMs, and keep destinations consistent across partners.",
      links: [
        { href: "/links", label: "Use Links" },
        { href: "/tools/utm-builder", label: "Track campaigns" },
      ],
      bg: "bg-[#DCFCE7]",
      ring: "ring-2 ring-[#1E2330]",
      badge: "Recommended",
    },
    {
      k: "HOSPITALITY",
      title: "Menus as landing pages",
      body: "Publish mobile-first menus you can update anytime — then measure scans by placement with UTMs.",
      links: [
        { href: "/qr-menus", label: "Build QR Menus" },
        { href: "/qr-code/with-logo", label: "Brand your QR" },
      ],
      bg: "bg-[#FFF7ED]",
      ring: "ring-1 ring-[#FED7AA]",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200" id="use-cases">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>USE CASES</Eyebrow>
            <SectionTitle>Where this landing workflow shines</SectionTitle>
            <SectionSub>Pick a goal, publish fast, then iterate using measurement — not guesswork.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {blocks.map((b) => {
              const [primary, secondary] = b.links;
              return (
                <div key={b.title} className={`flex flex-col justify-between rounded-3xl p-7 ${b.bg} ${b.ring}`}>
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{b.k}</p>

                    {b.badge ? (
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                        {b.badge}
                      </div>
                    ) : null}

                    <h3 className="text-xl font-bold text-[#0B0F1A]">{b.title}</h3>
                    <p className="text-base text-neutral-700">{b.body}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={primary.href}
                      className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-5 py-3 text-sm font-semibold text-white hover:bg-black"
                    >
                      {primary.label}
                    </Link>
                    <Link
                      href={secondary.href}
                      className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-5 py-3 text-sm font-semibold text-[#1E2330] hover:bg-[#F7F7F3]"
                    >
                      {secondary.label}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  WHY + COMPARISON + TESTIMONIALS                                           */
/* -------------------------------------------------------------------------- */

function LandingPageCreatorWhy() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="why">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>WHY KOMPI</Eyebrow>
            <SectionTitle>Why K Cards are a great landing page creator alternative</SectionTitle>
            <SectionSub>Because landing pages should be durable, mobile-first, and connected to distribution + tracking.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">MOBILE-FIRST</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Built for creator traffic</h3>
              <p className="text-base text-neutral-600">Fast, focused layouts that work naturally on phones and in social apps.</p>
            </div>

            <div className="rounded-3xl bg-white border border-emerald-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">DURABLE</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Keep one stable URL</h3>
              <p className="text-base text-neutral-600">Update the content without changing the link you already shared or printed.</p>
            </div>

            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">MEASURABLE</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Track distribution</h3>
              <p className="text-base text-neutral-600">UTMs + QR make it obvious what’s working across channels and placements.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-7 md:p-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#0B0F1A]">Recommended starter kit</h3>
                <p className="text-base text-neutral-600">
                  If you only do three things: build a K Card, add UTMs, and publish a QR to your tracked URL.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/k-cards"
                    className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
                  >
                    Create a K Card
                  </Link>
                  <Link
                    href="/tools/utm-builder"
                    className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-6 py-3 text-sm font-semibold text-[#1E2330] hover:bg-[#F7F7F3]"
                  >
                    Build UTMs
                  </Link>
                  <Link
                    href="/qr-code/with-logo"
                    className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    Logo QR
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
                <p className="text-sm font-semibold text-neutral-900">Quick checklist</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-neutral-600">
                  <li>• One primary CTA above the fold</li>
                  <li>• 3–6 supporting links (max)</li>
                  <li>• UTMs for anything you want to compare</li>
                  <li>• Test QR scans before printing</li>
                  <li>• Use logo QR when trust matters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function LandingPageCreatorComparison() {
  const rows = [
    { feature: "Setup speed", kompi: "Minutes (focused destination)", other: "Hours (templates + layout tweaks)" },
    { feature: "Mobile-first", kompi: "Built for mobile + QR traffic", other: "Often desktop-first workflows" },
    { feature: "Durable URL", kompi: "Stable destination you update", other: "Rebuilds / duplicated pages" },
    { feature: "Offline conversion", kompi: "QR + logo QR built in", other: "QR is separate and often untracked" },
    { feature: "Attribution", kompi: "UTM Builder for consistency", other: "Manual tags and inconsistent naming" },
    { feature: "Specialized flows", kompi: "QR Menus + KR Codes", other: "Plugins or separate products" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="compare">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>COMPARISON</Eyebrow>
            <SectionTitle>K Cards vs traditional landing page builders</SectionTitle>
            <SectionSub>
              If you need multi-step funnels and complex form logic, builders can fit. If you need speed + clarity + distribution, K Cards win.
            </SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-4 pr-4 font-bold text-neutral-900">Feature</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Kompi (K Cards)</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Traditional builders</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    {rows.map((r) => (
                      <tr key={r.feature} className="border-b border-neutral-100 last:border-b-0">
                        <td className="py-4 pr-4">{r.feature}</td>
                        <td className="py-4 px-4">{r.kompi}</td>
                        <td className="py-4 px-4">{r.other}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-8 text-center text-base md:text-lg text-neutral-600">
                Recommended flow:{" "}
                <Link href="/k-cards" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  K Cards
                </Link>{" "}
                +{" "}
                <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  UTMs
                </Link>{" "}
                +{" "}
                <Link href="/qr-code/with-logo" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  logo QR
                </Link>
                .
              </p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ + TRUST + RELATED                                                     */
/* -------------------------------------------------------------------------- */

function LandingPageCreatorFaq() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="faq">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>FAQ</Eyebrow>
            <SectionTitle>Landing page creator FAQs</SectionTitle>
            <SectionSub>Answers about K Cards, QR destinations, tracking, and creator workflows.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="space-y-4">
                {FAQS.map((f) => (
                  <details key={f.q} className="group rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                      <span className="text-base md:text-lg font-semibold text-neutral-900">{f.q}</span>
                      <span className="text-sm text-neutral-500 group-open:hidden">+</span>
                      <span className="text-sm text-neutral-500 hidden group-open:inline">−</span>
                    </summary>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function LandingPageCreatorTrust() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200" id="trust">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>TRUST</Eyebrow>
            <SectionTitle>Make scans feel safe and clicks feel obvious</SectionTitle>
            <SectionSub>Landing pages perform best when the destination is controlled, clean, and consistent.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="mx-auto max-w-3xl space-y-6 text-center text-base md:text-lg leading-relaxed text-neutral-700">
                <p>
                  QR and creator links are trust moments. A clean destination with a stable URL reduces hesitation — especially when people scan from posters, packaging, or menus.
                </p>
                <p>
                  For measurement, add UTMs to anything you want to compare: platforms, posts, ads, and offline placements.
                </p>
                <p>
                  Before printing at scale, test scans on multiple devices and lighting conditions — and consider logo QR for brand recognition.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/k-cards"
                  className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
                >
                  Create a K Card
                </Link>
                <Link
                  href="/qr-code/with-logo"
                  className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-6 py-3 text-sm font-semibold text-[#1E2330] hover:bg-[#F7F7F3]"
                >
                  Brand your QR
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function LandingPageCreatorRelatedLinks() {
  const links = [
    { href: "/k-cards", label: "K Cards — landing destination + link hub" },
    { href: "/links", label: "Kompi Links — routing & share pages" },
    { href: "/tools/utm-builder", label: "UTM Builder — consistent tracking" },
    { href: "/qr-code-generator", label: "QR Code Generator" },
    { href: "/qr-code/with-logo", label: "QR Code With Logo" },
    { href: "/qr-menus", label: "QR Menus — hospitality landing pages" },
    { href: "/kr-codes", label: "KR Codes — structured campaign system" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="related">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>EXPLORE MORE</Eyebrow>
            <SectionTitle>Landing page building blocks</SectionTitle>
            <SectionSub>Everything you need to publish, track, and distribute creator-first landing pages.</SectionSub>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center justify-between rounded-3xl bg-white border border-neutral-200 px-6 py-5 text-base md:text-lg font-semibold text-neutral-900 shadow-sm hover:border-neutral-400 transition-colors"
              >
                <span>{item.label}</span>
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
              </Link>
            ))}
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-7 md:p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B0F1A]">
              Publish a landing page today — then measure what works.
            </h3>
            <p className="mt-3 mx-auto max-w-2xl text-base md:text-lg text-neutral-600 leading-relaxed">
              Start with K Cards, add UTMs, and drive QR scans to a clean, trusted destination.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/k-cards"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-white hover:bg-black"
              >
                Create a K Card
              </Link>
              <Link
                href="/tools/utm-builder"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] hover:bg-[#F7F7F3]"
              >
                Build UTMs
              </Link>
              <Link
                href="/qr-code-generator"
                className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-8 py-3.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                Generate QR
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD                                                                   */
/* -------------------------------------------------------------------------- */

function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function getHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create a landing page with K Cards (creator-first workflow)",
    description:
      "Create a durable landing destination with K Cards, add UTMs for measurement, and drive action via QR codes and campaigns.",
    totalTime: "PT15M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Create your destination",
        text: "Publish a focused landing destination with K Cards. Keep the URL stable so you can reuse it everywhere.",
        url: `${CANONICAL_URL}#map`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Add a clear call-to-action",
        text: "Pick one primary CTA (subscribe, shop, book, contact) and keep it above the fold.",
        url: `${CANONICAL_URL}#map`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Add tracking with UTMs",
        text: "Use UTM Builder to create consistent utm_source, utm_medium, and utm_campaign tags for measurable distribution.",
        url: `${CANONICAL_URL}#map`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Drive distribution with QR",
        text: "Generate QR codes for offline placements and use logo QR for brand trust when needed.",
        url: `${CANONICAL_URL}#video`,
      },
    ],
  };
}

function getVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Landing Page Creator Workflow (K Cards by Kompi)",
    description:
      "A walkthrough showing how creators use K Cards as a landing page creator alternative, then add UTMs and drive QR traffic.",
    thumbnailUrl: [OG_IMAGE],
    uploadDate: "2025-12-12",
    contentUrl: `${SITE_URL}${SEO_VIDEO_SRC}`,
    embedUrl: `${SITE_URL}${SLUG_PATH}#video`,
  };
}

function getWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi Landing Page Creator",
    url: CANONICAL_URL,
    applicationCategory: "MarketingApplication",
    operatingSystem: "Web",
    description:
      "A creator-first landing page creator alternative powered by K Cards. Build a durable destination, add UTMs for tracking, and drive action with QR codes.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    featureList: [
      "Create a creator-first landing page with K Cards",
      "Use Links to route campaigns and destinations",
      "Add UTM tracking with UTM Builder",
      "Generate QR codes and logo QR codes",
      "Use QR Menus for restaurant and venue experiences",
      "Explore KR Codes for structured, brand-forward code systems",
    ],
  };
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const jsonLd = [getWebAppSchema(), getFaqSchema(), getHowToSchema(), getVideoSchema()];

  return (
    <>
      <Script id="landing-page-creator-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />

        <main className="pt-20 md:pt-28 pb-24 space-y-24 md:space-y-32">
          <section>
            <Container>
              <LandingPageCreatorHero />
            </Container>
          </section>

          <LandingPageCreatorMap />
          <LandingPageCreatorFeatures />
          <LandingPageCreatorVideo />
          <LandingPageCreatorLongForm />
          <LandingPageCreatorUseCases />
          <LandingPageCreatorWhy />
          <LandingPageCreatorComparison />
          <LandingPageCreatorFaq />
          <LandingPageCreatorTrust />
          <LandingPageCreatorRelatedLinks />
        </main>

        <FooterCTA />
      </div>
    </>
  );
}
