// src/app/(seo)/creator-studio/page.tsx

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
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

const SITE_NAME = "Kompi";
const SITE_URL = "https://kompi.ai";
const SLUG_PATH = "/creator-studio";
const CANONICAL_URL = `${SITE_URL}${SLUG_PATH}`;
const SEO_VIDEO_SRC = "/seo/creator-studio.mp4";

type FaqItem = { q: string; a: string };

// Keep these FAQs in sync with the FAQ JSON-LD below.
const FAQS: FaqItem[] = [
  {
    q: "What is a creator studio?",
    a: "A creator studio is a central workspace where creators manage the essentials: a destination page (link hub), campaigns, tracking, QR assets, and repeatable publish workflows—so you spend less time juggling tools and more time creating.",
  },
  {
    q: "Is Kompi Creator Studio a link in bio tool?",
    a: "It can be. If you want a link-in-bio hub, start with K Cards. If you want campaign routing and destinations, use Links. Creator Studio is the umbrella workflow that connects those pieces with tracking and QR.",
  },
  {
    q: "How do I track where traffic comes from?",
    a: "Use the UTM Builder to create consistent tracking parameters, then attach them to the URLs you share. This helps you understand which platforms, posts, or offline placements drive results.",
  },
  {
    q: "Can I use QR codes for creator growth?",
    a: "Yes. QR codes are excellent for offline-to-online conversion—posters, events, merch, packaging, and menus. Pair QR codes with UTMs and a clean destination to measure performance.",
  },
  {
    q: "What’s the difference between a QR code generator and KR Codes?",
    a: "Standard QR codes are widely compatible and great for most uses. KR Codes are a more brand-forward, structured system for teams and campaigns that want consistent design language across assets.",
  },
  {
    q: "Can I add my logo to a QR code?",
    a: "Yes. Use the QR code with logo page to create a branded code that still scans reliably, then place it on your materials.",
  },
  {
    q: "Does Kompi work for restaurants and cafes too?",
    a: "Yes. QR Menus let you publish mobile-friendly menus that you can update anytime without reprinting, and you can drive scans via QR codes on tables, windows, and receipts.",
  },
  {
    q: "Do I need a paid plan to use Creator Studio features?",
    a: "Many Kompi tools are usable for free, and some advanced workflows may depend on plan level. You can still build a strong Creator Studio workflow using core destinations, QR codes, and UTMs.",
  },
  {
    q: "What’s the fastest setup for a creator starting today?",
    a: "Create a K Card as your main destination, generate UTMs for your key links, then publish a QR code (optionally with logo) that points to your K Card or campaign link.",
  },
  {
    q: "How do I keep my creator links updated without changing my bio URL?",
    a: "Use a single durable destination (K Cards or a Links page) as your always-on URL. Update what’s inside the destination without changing the link you’ve already shared.",
  },
];

export const metadata: Metadata = {
  title: "Creator Studio | Build, Track & Share Your Creator Workflow | Kompi",
  description:
    "Kompi Creator Studio helps creators publish faster: link hubs, campaign links, UTMs, QR codes (with logo), KR Codes, and QR menus—one connected workflow for growth.",
  keywords: [
    "creator studio",
    "creator studio tools",
    "content creator studio",
    "creator workflow",
    "link in bio studio",
    "creator link hub",
    "creator analytics tracking",
    "utm builder",
    "qr code for creators",
    "qr code with logo",
    "qr menu generator",
    "digital business card creator",
    "creator growth tools",
    "creator marketing tools",
    "kompi creator studio",
    "kr codes",
    "creator platform",
    "creator toolkit",
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: "Creator Studio | Build, Track & Share Your Creator Workflow | Kompi",
    description:
      "A connected creator workflow: destinations, UTMs, QR codes, menus, and brand-forward code systems. Ship faster and measure what works.",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/kompi-platform.png`,
        width: 1200,
        height: 630,
        alt: "Kompi Creator Studio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Studio | Kompi",
    description:
      "Build a creator workflow: destinations, UTMs, QR codes (with logo), menus, and more—connected in Kompi.",
    images: [`${SITE_URL}/kompi-platform.png`],
  },
  robots: { index: true, follow: true },
};

/* -------------------------------------------------------------------------- */
/*  SMALL UI PRIMITIVES (match /qr-code/with-logo style)                      */
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
    <section
      className={`rounded-3xl border border-neutral-200 bg-white shadow-sm ${className}`}
    >
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
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: bg }}
      >
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

function CreatorStudioIntroSection() {
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
          <span>Kompi Tools · Creator Studio</span>
        </div>

        <div className="space-y-7 md:space-y-9">
          <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
            Build a{" "}
            <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
              creator workflow
            </span>{" "}
            that ships faster — and measures what works.
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-neutral-700">
            One connected setup: a durable destination, consistent tracking, and QR assets (with logo when brand trust matters).
            Less tool-juggling. More “publish → learn → improve.”
          </p>

          <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-neutral-600">
            Start simple: K Card or Links → UTMs → QR. Expand to menus, teams, and KR Codes when you need structure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#studio"
              className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
            >
              Explore the studio workflow
            </a>
            <Link
              href="/k-cards"
              className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
            >
              Start with K Cards
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm font-medium text-neutral-600">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#D1FAE5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>Destination → tracking → QR assets</span>
            </div>
            <span>• Built for creators & small teams</span>
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

function CreatorStudioToolSection() {
  return (
    <section id="studio" className="scroll-mt-28">
      <Container>
        <Card>
          <CardBody>
            <Eyebrow>CREATOR STUDIO MAP</Eyebrow>
            <SectionTitle>One workflow, built from Kompi tools</SectionTitle>
            <SectionSub>
              Creator Studio isn’t one button — it’s a clean set of building blocks that stay connected. Pick your destination,
              add tracking, publish QR assets, then iterate.
            </SectionSub>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <ToolCard
                href="/k-cards"
                badge="Destination"
                title="K Cards"
                desc="Your creator hub / link-in-bio — one durable URL you keep updating."
              />
              <ToolCard
                href="/links"
                badge="Routing"
                title="Kompi Links"
                desc="Campaign-friendly routing and share pages for brands and teams."
              />
              <ToolCard
                href="/tools/utm-builder"
                badge="Tracking"
                title="UTM Builder"
                desc="Create consistent UTMs so you can compare platforms, posts, and placements."
              />
              <ToolCard
                href="/qr-code-generator"
                badge="Acquisition"
                title="QR Code Generator"
                desc="Convert offline attention into visits: posters, merch, signage, business cards."
              />
              <ToolCard
                href="/qr-code/with-logo"
                badge="Branding"
                title="QR Code With Logo"
                desc="Make scans feel trustworthy with your logo — while staying scan-friendly."
              />
              <ToolCard
                href="/qr-menus"
                badge="Hospitality"
                title="QR Menus"
                desc="Publish mobile-friendly menus you can update anytime — no reprints."
              />
              <ToolCard
                href="/kr-codes"
                badge="System"
                title="KR Codes"
                desc="A brand-forward, structured code system for consistent campaign assets."
              />
              <ToolCard
                href="/tools/utm-builder"
                badge="Recommended"
                title="Campaign-ready setup"
                desc="Destination → UTMs → QR. Simple, repeatable, measurable."
              />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3 text-sm md:text-base text-neutral-600">
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Less link chaos</h3>
                <p>Keep one main destination URL and update what’s inside — not the URL you already shared.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Attribution by default</h3>
                <p>UTMs turn distribution into learning: what platform, what post, what placement.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Offline conversion</h3>
                <p>QR assets bridge posters, merch, events, and packaging into measurable action.</p>
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

function CreatorStudioFeatureIcons() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Eyebrow>FEATURES</Eyebrow>
            <SectionTitle>Built for real creator workflows</SectionTitle>
            <SectionSub>Ship faster, stay consistent, and measure what works across channels and placements.</SectionSub>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <IconFeature icon={<Link2 className="h-5 w-5" />} bg="#E0F2FE" title="Durable destinations">
              Use K Cards or Links as the “always-on” URL you can keep updating.
            </IconFeature>

            <IconFeature icon={<BarChart3 className="h-5 w-5" />} bg="#DCFCE7" title="Tracking built in">
              Add UTMs once, keep naming consistent, and compare platforms and placements.
            </IconFeature>

            <IconFeature icon={<QrCode className="h-5 w-5" />} bg="#FEF3C7" title="QR for conversion">
              Turn offline attention into action — posters, merch, business cards, events.
            </IconFeature>

            <IconFeature icon={<BadgeCheck className="h-5 w-5" />} bg="#EDE9FE" title="Brand-forward options">
              Logo QR for trust, and KR Codes when you need a structured campaign system.
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

function CreatorStudioVideoSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="video">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>60-SECOND OVERVIEW</Eyebrow>
            <SectionTitle>See the studio workflow in motion</SectionTitle>
            <SectionSub>Destination → tracking → QR assets → outcomes. Keep it simple and repeatable.</SectionSub>
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
              <div className="h-10 w-10 rounded-2xl bg-[#E0F2FE] flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-[#0B0F1A]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 1</p>
              <h3 className="text-lg font-semibold text-[#0B0F1A]">Pick a destination</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Start with{" "}
                <Link
                  href="/k-cards"
                  className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                >
                  K Cards
                </Link>{" "}
                or{" "}
                <Link
                  href="/links"
                  className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                >
                  Links
                </Link>
                .
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                <Zap className="h-5 w-5 text-[#0B0F1A]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 2</p>
              <h3 className="text-lg font-semibold text-[#0B0F1A]">Add tracking</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Use{" "}
                <Link
                  href="/tools/utm-builder"
                  className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                >
                  UTM Builder
                </Link>{" "}
                to keep naming consistent.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-[#FEF3C7] flex items-center justify-center">
                <ScanLine className="h-5 w-5 text-[#0B0F1A]" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 3</p>
              <h3 className="text-lg font-semibold text-[#0B0F1A]">Publish QR assets</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Generate{" "}
                <Link
                  href="/qr-code-generator"
                  className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                >
                  QR codes
                </Link>{" "}
                (optionally{" "}
                <Link
                  href="/qr-code/with-logo"
                  className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                >
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

function CreatorStudioLongForm() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4]" aria-labelledby="creator-studio-guide-heading">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <Card>
            <CardBody>
              <Eyebrow>CREATOR STUDIO GUIDE</Eyebrow>
              <h2
                id="creator-studio-guide-heading"
                className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]"
              >
                How to build a Creator Studio that grows with you
              </h2>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                A creator studio isn’t just editing and posting — it’s the operational layer that keeps your sharing consistent
                and measurable. The simplest system is:{" "}
                <strong>destination → tracking → QR assets</strong>. Once those pieces are connected, you can publish faster and
                learn what actually drives results.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Figure src="/kompi-platform.png" alt="Kompi platform preview" aspect="aspect-[16/10]" priority />
                <Figure src="/kompi-branding.png" alt="Kompi branding preview" aspect="aspect-[16/10]" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>THE 4-STEP SYSTEM</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                The “publish → learn → improve” workflow
              </h3>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 1</p>
                  <h4 className="text-xl font-bold text-[#0B0F1A]">Choose a durable destination</h4>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    Use{" "}
                    <Link
                      href="/k-cards"
                      className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                    >
                      K Cards
                    </Link>{" "}
                    for your creator hub, or{" "}
                    <Link
                      href="/links"
                      className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                    >
                      Links
                    </Link>{" "}
                    for routing campaigns. Keep the URL stable — update the content inside.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 2</p>
                  <h4 className="text-xl font-bold text-[#0B0F1A]">Add attribution with UTMs</h4>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    Use{" "}
                    <Link
                      href="/tools/utm-builder"
                      className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                    >
                      UTM Builder
                    </Link>{" "}
                    to tag platforms, posts, and offline placements. Consistency beats complexity.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 3</p>
                  <h4 className="text-xl font-bold text-[#0B0F1A]">Publish QR assets for conversion</h4>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    QR reduces friction. Generate a{" "}
                    <Link
                      href="/qr-code-generator"
                      className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                    >
                      QR code
                    </Link>{" "}
                    to your tracked destination, and use{" "}
                    <Link
                      href="/qr-code/with-logo"
                      className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                    >
                      logo QR
                    </Link>{" "}
                    when trust matters.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Step 4</p>
                  <h4 className="text-xl font-bold text-[#0B0F1A]">Scale with structure</h4>
                  <p className="text-base text-neutral-700 leading-relaxed">
                    If you’re running repeatable campaigns, explore{" "}
                    <Link
                      href="/kr-codes"
                      className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                    >
                      KR Codes
                    </Link>{" "}
                    for consistent assets. For venues, publish{" "}
                    <Link
                      href="/qr-menus"
                      className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                    >
                      QR Menus
                    </Link>{" "}
                    and update anytime.
                  </p>
                </div>
              </div>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                The goal isn’t a perfect setup once — it’s a workflow you can reuse every month without rebuilding from scratch.
              </p>
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

function CreatorStudioUseCases() {
  const blocks: UseCaseBlock[] = [
    {
      k: "CREATORS & INFLUENCERS",
      title: "Link hub + QR for real-world growth",
      body: "Keep one destination, track platforms, and convert posters/merch/events into measurable action.",
      links: [
        { href: "/k-cards", label: "Create a K Card" },
        { href: "/qr-code/with-logo", label: "Brand your QR" },
      ],
      bg: "bg-[#F7F7F3]",
      ring: "ring-1 ring-[#E5E7EB]",
    },
    {
      k: "BRANDS & TEAMS",
      title: "Campaign routing you can reuse",
      body: "Route campaigns through Links, tag everything with UTMs, and keep assets consistent across placements.",
      links: [
        { href: "/links", label: "Use Links" },
        { href: "/kr-codes", label: "Explore KR Codes" },
      ],
      bg: "bg-[#DCFCE7]",
      ring: "ring-2 ring-[#1E2330]",
      badge: "Recommended",
    },
    {
      k: "HOSPITALITY",
      title: "Menus as content (not PDFs)",
      body: "Publish mobile-first QR menus you can update anytime — and measure table vs window placements with UTMs.",
      links: [
        { href: "/qr-menus", label: "Build QR Menus" },
        { href: "/tools/utm-builder", label: "Track with UTMs" },
      ],
      bg: "bg-[#E0F2FE]",
      ring: "ring-1 ring-[#BFDBFE]",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200" id="use-cases">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>USE CASES</Eyebrow>
            <SectionTitle>Where Creator Studio shines</SectionTitle>
            <SectionSub>Pick a workflow, reuse it across channels, and keep everything measurable.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
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
/*  STRIP CTA                                                                 */
/* -------------------------------------------------------------------------- */

function CreatorStudioStrip() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="rounded-3xl bg-[#1E2330] px-8 py-14 text-center text-[#E5F9F0] sm:px-12 md:px-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Stop rebuilding your setup every month.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[#E5E7EB] leading-relaxed">
            Keep one destination, add consistent tracking, and publish QR assets for every channel — online and offline.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/k-cards"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
            >
              Create a K Card
            </Link>
            <Link
              href="/tools/utm-builder"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Build UTMs
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  WHY + COMPARISON + TESTIMONIALS                                           */
/* -------------------------------------------------------------------------- */

function CreatorStudioWhyKompi() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="why-kompi">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>WHY KOMPI</Eyebrow>
            <SectionTitle>Why Creator Studio works on Kompi</SectionTitle>
            <SectionSub>Because it connects the parts creators actually need: destination, attribution, and conversion.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">DESTINATION-FIRST</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Keep one durable URL</h3>
              <p className="text-base text-neutral-600">Use K Cards or Links as your stable destination and update the content inside.</p>
            </div>

            <div className="rounded-3xl bg-white border border-emerald-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">MEASUREMENT</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Track what drives results</h3>
              <p className="text-base text-neutral-600">UTMs make your distribution measurable across platforms, posts, and placements.</p>
            </div>

            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">CONVERSION</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Make action effortless</h3>
              <p className="text-base text-neutral-600">QR assets compress friction. Logo QR boosts trust at scan time.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CreatorStudioComparison() {
  const rows = [
    {
      feature: "Stable destination",
      kompi: "K Cards + Links keep your main URL consistent.",
      other: "Constantly changing link tools and landing pages.",
    },
    {
      feature: "Attribution",
      kompi: "UTM Builder makes tracking consistent.",
      other: "Manual tags, inconsistent naming, unclear results.",
    },
    {
      feature: "Offline-to-online",
      kompi: "QR + logo QR workflows built-in.",
      other: "QR is separate and often untracked.",
    },
    {
      feature: "Hospitality workflow",
      kompi: "QR Menus for editable, mobile-first menus.",
      other: "PDF menus + reprints + outdated items.",
    },
    {
      feature: "Brand-forward system",
      kompi: "KR Codes for consistent campaign styling.",
      other: "Inconsistent visuals across assets.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="compare">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>COMPARISON</Eyebrow>
            <SectionTitle>Creator Studio vs a patchwork stack</SectionTitle>
            <SectionSub>A creator studio should reduce friction — not add more tabs.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-4 pr-4 font-bold text-neutral-900">Feature</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Kompi Creator Studio</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Patchwork stack</th>
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
                Fastest path:{" "}
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

function CreatorStudioTestimonials() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>LESS FRICTION</Eyebrow>
            <SectionTitle>More “publish, done”. Less “where’s that link?”</SectionTitle>
            <SectionSub>Keep your setup consistent across bios, campaigns, and real-world placements.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“Finally, one workflow”</p>
              <p className="mt-3 text-base text-neutral-600">
                “Destination + UTMs + QR made my launches way easier to manage.”
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“QR actually feels measurable”</p>
              <p className="mt-3 text-base text-neutral-600">“UTMs by placement helped us compare posters vs merch.”</p>
            </div>

            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“Love the logo QR”</p>
              <p className="mt-3 text-base text-neutral-600">“Brand trust went up — and scans stayed fast.”</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ + TRUST + RELATED                                                     */
/* -------------------------------------------------------------------------- */

function CreatorStudioFaq() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="faq">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>FAQ</Eyebrow>
            <SectionTitle>Creator Studio FAQs</SectionTitle>
            <SectionSub>Setup, tracking, QR assets, and how to keep your links updated.</SectionSub>
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

function CreatorStudioTrust() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200" id="trust">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>TRUST</Eyebrow>
            <SectionTitle>Keep destinations clean, trusted, and controlled</SectionTitle>
            <SectionSub>
              QR and link hubs are powerful — the safest workflows use destinations you control and keep your system consistent.
            </SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="mx-auto max-w-3xl space-y-6 text-center text-base md:text-lg leading-relaxed text-neutral-700">
                <p>
                  Use a stable destination (K Cards or Links) and update what’s inside it — that’s how you avoid broken links
                  across old posts, printed materials, merch, and partner pages.
                </p>
                <p>
                  For campaigns and offline placements, add UTMs so you can compare what’s working and iterate without rebuilding
                  your setup.
                </p>
                <p>
                  Before printing QR at scale, test scans on multiple devices and lighting conditions — and consider logo QR when
                  brand trust matters.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function CreatorStudioRelatedLinks() {
  const links = [
    { href: "/k-cards", label: "K Cards — creator destination hub" },
    { href: "/links", label: "Kompi Links — branded routing & share pages" },
    { href: "/tools/utm-builder", label: "UTM Builder for tracking" },
    { href: "/qr-code-generator", label: "QR Code Generator" },
    { href: "/qr-code/with-logo", label: "QR Code With Logo" },
    { href: "/qr-menus", label: "QR Menus for hospitality" },
    { href: "/kr-codes", label: "KR Codes — structured campaign system" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="related">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>EXPLORE MORE</Eyebrow>
            <SectionTitle>Creator Studio building blocks</SectionTitle>
            <SectionSub>Assemble your workflow in Kompi — destination, tracking, and QR assets.</SectionSub>
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
    name: "How to set up a Creator Studio workflow with Kompi",
    description:
      "Create a durable destination, add campaign tracking, generate QR assets, and iterate based on performance.",
    totalTime: "PT20M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose your destination",
        text: "Use K Cards for a creator hub or Links for routing campaigns. Keep this URL stable so you can reuse it everywhere.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Add campaign tracking",
        text: "Generate UTMs for platforms and placements using UTM Builder. Keep naming consistent to compare results.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Generate QR assets",
        text: "Create QR codes for tracked URLs. Add a logo for brand trust when needed, and test scanning on multiple devices.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Publish, measure, iterate",
        text: "Share your destination across channels and placements. Use performance insights to refine without rebuilding your main URL.",
      },
    ],
  };
}

function getVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Kompi Creator Studio Walkthrough",
    description:
      "A walkthrough showing a practical creator workflow: destination, UTMs, QR assets, and measurable outcomes.",
    thumbnailUrl: [`${SITE_URL}/kompi-platform.png`],
    uploadDate: "2025-01-01",
    contentUrl: `${SITE_URL}${SEO_VIDEO_SRC}`,
    embedUrl: `${SITE_URL}${SLUG_PATH}#video`,
  };
}

function getWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi Creator Studio",
    url: CANONICAL_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "A connected creator workflow: destinations, UTMs, QR assets (with logo), menus, and structured code systems for campaigns.",
  };
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const jsonLd = [getWebAppSchema(), getFaqSchema(), getHowToSchema(), getVideoSchema()];

  return (
    <>
      <Script id="creator-studio-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />

        <main className="pt-20 md:pt-28 pb-24 space-y-24 md:space-y-32">
          <section>
            <Container>
              <CreatorStudioIntroSection />
            </Container>
          </section>

          <CreatorStudioToolSection />
          <CreatorStudioFeatureIcons />
          <CreatorStudioVideoSection />
          <CreatorStudioLongForm />
          <CreatorStudioUseCases />
          <CreatorStudioStrip />
          <CreatorStudioWhyKompi />
          <CreatorStudioComparison />
          <CreatorStudioTestimonials />
          <CreatorStudioFaq />
          <CreatorStudioTrust />
          <CreatorStudioRelatedLinks />
        </main>

        <FooterCTA />
      </div>
    </>
  );
}
