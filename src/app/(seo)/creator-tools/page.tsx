// src/app/(seo)/creator-tools/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

import {
  ArrowRight,
  QrCode,
  BadgePercent,
  UtensilsCrossed,
  IdCard,
  Link2,
  BarChart3,
  Sparkles,
  Boxes,
  ShieldCheck,
  Zap,
  Workflow,
} from "lucide-react";

const SITE_NAME = "Kompi";
const SITE_URL = "https://kompi.ai";
const SLUG = "/creator-tools";
const CANONICAL_URL = `${SITE_URL}${SLUG}`;
const SEO_VIDEO_SRC = "/seo/creator-tools.mp4";

type FaqItem = { q: string; a: string };

const FAQS: FaqItem[] = [
  {
    q: "What are creator tools?",
    a: "Creator tools are utilities that help you create, publish, and grow—like QR generators, link hubs, menus, tracking links, and simple text/publishing helpers that speed up workflows.",
  },
  {
    q: "Are Kompi creator tools free?",
    a: "Many Kompi tools can be used for free, and some advanced workflows may be part of paid plans. You can still build a strong baseline stack with free tools like QR generation and utility converters.",
  },
  {
    q: "Which Kompi tools are best for growth tracking?",
    a: "Use Kompi Links for sharable destinations and route management, and pair them with the UTM Builder to track campaigns across platforms like Instagram, TikTok, email, and offline QR placements.",
  },
  {
    q: "What’s the best tool for a “link in bio” page?",
    a: "K Cards are ideal for creator profiles and link hubs—great for social bios, media kits, and a single place to send fans, clients, or collaborators.",
  },
  {
    q: "How do I make a QR code that matches my brand?",
    a: "Use a QR generator and add brand elements like a logo and consistent colors—while keeping strong contrast and enough quiet zone so it scans reliably. Start with Kompi’s QR code with logo page.",
  },
  {
    q: "Can I build restaurant menus with Kompi?",
    a: "Yes. QR Menus let restaurants and cafes publish mobile-friendly menus that can be updated without reprinting. Pair with a QR code so guests can scan instantly.",
  },
  {
    q: "What’s the difference between KR Codes and standard QR codes?",
    a: "Standard QR codes are widely supported and great for simple destinations. KR Codes focus on a more brand-forward system and structured experiences, often useful for campaigns and consistent design language.",
  },
  {
    q: "Do Kompi tools work on mobile?",
    a: "Yes—Kompi is designed to work well across modern browsers, so you can create, preview, and share from your phone or desktop.",
  },
  {
    q: "How do I choose the right creator tool stack?",
    a: "Start with your goal (grow audience, sell products, collect leads, improve in-person conversions). Then choose one destination (K Cards or Links) and one acquisition method (QR codes), and add tracking via UTMs.",
  },
  {
    q: "Can Kompi replace multiple tools I’m paying for?",
    a: "Often, yes. Many creators use Kompi to combine QR generation, link destinations, menus, and lightweight utilities in one consistent workflow—saving time and subscription costs.",
  },
];

export const metadata: Metadata = {
  title: "Creator Tools | Free Tools for Creators, Brands & Small Businesses | Kompi",
  description:
    "Discover Kompi creator tools: QR code generators, link hubs, QR menus, KR Codes, and fast utility tools for content, campaigns, and growth tracking.",
  keywords: [
    "creator tools",
    "tools for creators",
    "content creator tools",
    "free creator tools",
    "creator growth tools",
    "link in bio tools",
    "qr code tools for creators",
    "utm builder",
    "qr menu generator",
    "digital business card tools",
    "creator workflow tools",
    "marketing tools for creators",
    "creator toolkit",
    "kompi tools",
    "creator utility tools",
    "creator link tools",
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: "Creator Tools | Free Tools for Creators, Brands & Small Businesses | Kompi",
    description:
      "A practical creator toolkit: QR codes, link hubs, menus, and tracking tools—built to help you publish faster and grow smarter.",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/kompi-platform.png`,
        width: 1200,
        height: 630,
        alt: "Kompi creator tools preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creator Tools | Kompi",
    description: "Explore Kompi creator tools: QR codes, link hubs, QR menus, and tracking tools for growth.",
    images: [`${SITE_URL}/kompi-platform.png`],
  },
  robots: { index: true, follow: true },
};

/* ---------------------------------------------
   Small UI helpers
---------------------------------------------- */
function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

function SectionShell({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  tone = "light",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: "light" | "soft" | "gradient";
}) {
  const toneClass =
    tone === "gradient"
      ? "bg-gradient-to-b from-white to-neutral-50 border-neutral-200"
      : tone === "soft"
        ? "bg-neutral-50 border-neutral-200"
        : "bg-white border-neutral-200";

  return (
    <section id={id} className={`border-t ${toneClass} py-16 md:py-24`} aria-label={title}>
      <Container>
        <div className="space-y-10">
          {/* centered section header */}
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">{eyebrow}</p>
            ) : null}
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">{title}</h2>
            {subtitle ? (
              <p className="text-base leading-relaxed text-neutral-600 md:text-lg">{subtitle}</p>
            ) : null}
          </div>

          {children}
        </div>
      </Container>
    </section>
  );
}

function Pill({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur">
      {icon ? <span className="text-neutral-600">{icon}</span> : null}
      {children}
    </span>
  );
}

type ColorKey = "aqua" | "blue" | "violet" | "pink" | "orange" | "mint" | "lemon" | "slate";

const COLOR_STYLES: Record<ColorKey, { bg: string; ink: string; sub: string; pill: string; border: string }> = {
  aqua: {
    bg: "bg-[#D6FBFF]",
    ink: "text-[#046C7A]",
    sub: "text-[#0B7285]/90",
    pill: "bg-white/70 text-[#046C7A] border-white/50",
    border: "border-white/60",
  },
  blue: {
    bg: "bg-[#DCEBFF]",
    ink: "text-[#1D4ED8]",
    sub: "text-[#1D4ED8]/85",
    pill: "bg-white/70 text-[#1D4ED8] border-white/50",
    border: "border-white/60",
  },
  violet: {
    bg: "bg-[#EFE7FF]",
    ink: "text-[#6D28D9]",
    sub: "text-[#6D28D9]/85",
    pill: "bg-white/70 text-[#6D28D9] border-white/50",
    border: "border-white/60",
  },
  pink: {
    bg: "bg-[#FFE5F1]",
    ink: "text-[#BE185D]",
    sub: "text-[#BE185D]/85",
    pill: "bg-white/70 text-[#BE185D] border-white/50",
    border: "border-white/60",
  },
  orange: {
    bg: "bg-[#FFE9CC]",
    ink: "text-[#C2410C]",
    sub: "text-[#C2410C]/85",
    pill: "bg-white/70 text-[#C2410C] border-white/50",
    border: "border-white/60",
  },
  mint: {
    bg: "bg-[#E6FFF3]",
    ink: "text-[#047857]",
    sub: "text-[#047857]/85",
    pill: "bg-white/70 text-[#047857] border-white/50",
    border: "border-white/60",
  },
  lemon: {
    bg: "bg-[#FFF9CC]",
    ink: "text-[#92400E]",
    sub: "text-[#92400E]/85",
    pill: "bg-white/70 text-[#92400E] border-white/50",
    border: "border-white/60",
  },
  slate: {
    bg: "bg-[#EEF2FF]",
    ink: "text-[#0F172A]",
    sub: "text-[#0F172A]/70",
    pill: "bg-white/70 text-[#0F172A] border-white/50",
    border: "border-white/60",
  },
};

function BigToolCard({
  title,
  desc,
  href,
  cta,
  badge,
  color = "aqua",
  icon,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  badge?: string;
  color?: ColorKey;
  icon: React.ReactNode;
}) {
  const s = COLOR_STYLES[color];
  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden rounded-[2rem] border p-7 md:p-9",
        "transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
        s.bg,
        s.border,
      ].join(" ")}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/35 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/25 blur-2xl" />
      </div>

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/60 bg-white/55 p-3 shadow-sm">
              <span className={s.ink}>{icon}</span>
            </div>
            {badge ? (
              <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${s.pill}`}>{badge}</span>
            ) : null}
          </div>

          <span className="inline-flex items-center justify-center rounded-2xl border border-white/60 bg-white/50 p-2">
            <ArrowRight className={`h-5 w-5 ${s.ink}`} />
          </span>
        </div>

        <div className="space-y-3">
          <h3 className={`text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl ${s.ink}`}>{title}</h3>
          <p className={`max-w-xl text-base leading-relaxed md:text-lg ${s.sub}`}>{desc}</p>
        </div>

        <div className="pt-2">
          <span
            className={[
              "inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2",
              "text-xs font-semibold uppercase tracking-[0.2em]",
              s.ink,
            ].join(" ")}
          >
            {cta}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 text-neutral-900">{icon}</div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm leading-relaxed text-neutral-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   Sections
---------------------------------------------- */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 md:pt-16">
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 blur-3xl">
        <div className="mx-auto h-60 max-w-6xl bg-gradient-to-r from-[#D6FBFF] via-[#EFE7FF] to-[#FFE9CC] opacity-85" />
      </div>

      <Container>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            <Pill icon={<Sparkles className="h-4 w-4" />}>Creator stack</Pill>
            <Pill icon={<QrCode className="h-4 w-4" />}>QR codes</Pill>
            <Pill icon={<Link2 className="h-4 w-4" />}>Destinations</Pill>
            <Pill icon={<BarChart3 className="h-4 w-4" />}>Tracking</Pill>
            <Pill icon={<Zap className="h-4 w-4" />}>Fast utilities</Pill>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-6xl">
            Creator tools that feel modern, not messy.
          </h1>

          <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
            Kompi brings together the essentials for creators, brands, and small businesses: <strong>QR codes</strong>,{" "}
            <strong>link destinations</strong>, <strong>menus</strong>, and <strong>tracking</strong>—plus lightweight
            utilities that save time every week.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#tools"
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-neutral-800"
            >
              Explore tools
            </a>
            <Link
              href="/k-cards"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-sm transition hover:bg-neutral-50"
            >
              Start with a destination (K Cards)
            </Link>
          </div>

          <div className="mt-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-5 text-left md:p-6">
            <p className="text-sm font-semibold text-neutral-900">A simple creator workflow (recommended)</p>
            <ol className="mt-3 space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-neutral-900 ring-1 ring-neutral-200">
                  1
                </span>
                <span>
                  Build a destination with{" "}
                  <Link href="/k-cards" className="font-medium text-neutral-900">
                    K Cards
                  </Link>{" "}
                  or{" "}
                  <Link href="/links" className="font-medium text-neutral-900">
                    Links
                  </Link>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-neutral-900 ring-1 ring-neutral-200">
                  2
                </span>
                <span>
                  Add attribution with{" "}
                  <Link href="/tools/utm-builder" className="font-medium text-neutral-900">
                    UTM Builder
                  </Link>
                  .
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-neutral-900 ring-1 ring-neutral-200">
                  3
                </span>
                <span>
                  Drive scans via{" "}
                  <Link href="/qr-code-generator" className="font-medium text-neutral-900">
                    QR codes
                  </Link>{" "}
                  (optionally{" "}
                  <Link href="/qr-code/with-logo" className="font-medium text-neutral-900">
                    with your logo
                  </Link>
                  ).
                </span>
              </li>
            </ol>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-2 text-xs font-semibold text-neutral-700 shadow-sm backdrop-blur">
            <ShieldCheck className="h-4 w-4" />
            Browser-first • No clutter • Built for speed
          </div>
        </div>
      </Container>
    </section>
  );
}

function ToolDirectorySection() {
  return (
    <section id="tools" className="border-t border-neutral-200 bg-white py-16 md:py-24">
      <Container>
        <div className="space-y-10">
          <header className="mx-auto max-w-3xl space-y-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
              OUR TOOLS, LOVED BY CREATORS
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">Pick a tool. Ship faster.</h2>
            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              Big titles, better spacing, clean hovers. Jump into the tool that matches your goal.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            <BigToolCard
              title="QR Generator"
              desc="Create QR codes for URLs, campaigns, downloads, events, and offline placements."
              href="/qr-code-generator"
              cta="Generate QR codes"
              badge="Core"
              color="aqua"
              icon={<QrCode className="h-7 w-7" />}
            />
            <BigToolCard
              title="Explore KR Codes"
              desc="A brand-forward, structured code system for repeatable campaign assets and consistent design language."
              href="/kr-codes"
              cta="Explore KR Codes"
              badge="System"
              color="blue"
              icon={<Boxes className="h-7 w-7" />}
            />
            <BigToolCard
              title="QR With Logo"
              desc="Upload your logo and keep scans trustworthy with scan-friendly styling guidance."
              href="/qr-code/with-logo"
              cta="Make a logo QR"
              badge="Branding"
              color="violet"
              icon={<Sparkles className="h-7 w-7" />}
            />
            <BigToolCard
              title="QR Menus"
              desc="Publish mobile-friendly menus you can update anytime—perfect for cafes, bars, and venues."
              href="/qr-menus"
              cta="Build a QR menu"
              badge="Hospitality"
              color="mint"
              icon={<UtensilsCrossed className="h-7 w-7" />}
            />
            <BigToolCard
              title="K Cards"
              desc="A creator profile + link-in-bio hub. One destination you can keep reusing."
              href="/k-cards"
              cta="Create a K Card"
              badge="Creator"
              color="pink"
              icon={<IdCard className="h-7 w-7" />}
            />
            <BigToolCard
              title="Kompi Links"
              desc="Organize destinations, route campaigns, and keep your share layer clean and flexible."
              href="/links"
              cta="Manage links"
              badge="Growth"
              color="orange"
              icon={<Link2 className="h-7 w-7" />}
            />
            <BigToolCard
              title="UTM Builder"
              desc="Generate consistent campaign tags so you can measure posts, platforms, and physical placements."
              href="/tools/utm-builder"
              cta="Build UTMs"
              badge="Analytics"
              color="lemon"
              icon={<BarChart3 className="h-7 w-7" />}
            />
            <BigToolCard
              title="Creator Utilities"
              desc="Fast text tools for publishing workflows: case conversion, counters, and format helpers."
              href="/tools"
              cta="Browse utilities"
              badge="Utilities"
              color="slate"
              icon={<Workflow className="h-7 w-7" />}
            />
            <BigToolCard
              title="Track Offers"
              desc="Turn promos into measurable campaigns with UTMs + Links, then drive scans via QR."
              href="/links"
              cta="Start workflow"
              badge="Best combo"
              color="blue"
              icon={<BadgePercent className="h-7 w-7" />}
            />
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                  Want the “done in 10 minutes” stack?
                </h3>
                <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
                  Build one destination, add UTMs, then create a logo QR. After that, reuse the same destination everywhere.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/k-cards"
                    className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                  >
                    Start with K Cards
                  </Link>
                  <Link
                    href="/tools/utm-builder"
                    className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
                  >
                    Build UTMs
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-neutral-900">The 4-step loop</p>
                <ol className="mt-3 space-y-2 text-sm text-neutral-600">
                  <li className="flex gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                      1
                    </span>
                    <span>Create a destination (K Cards or Links).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                      2
                    </span>
                    <span>Add UTMs for key placements.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                      3
                    </span>
                    <span>Generate a QR (optionally with logo).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                      4
                    </span>
                    <span>Ship → measure → iterate monthly.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function VideoSection() {
  return (
    <SectionShell
      id="video"
      eyebrow="Video"
      title="Watch: How creators use Kompi tools together"
      subtitle="A quick walkthrough showing a practical workflow: build a destination, add tracking, then drive scans via QR."
      tone="gradient"
    >
      <div className="rounded-[2rem] border border-neutral-200 bg-white p-4 shadow-sm md:p-6">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
          <video controls preload="metadata" className="h-auto w-full" aria-label="Kompi creator tools demo video">
            <source src={SEO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Step 1</p>
            <p className="mt-2 text-sm font-semibold text-neutral-900">Build your destination</p>
            <p className="mt-1 text-sm text-neutral-600">
              Start with{" "}
              <Link href="/k-cards" className="font-medium text-neutral-900">
                K Cards
              </Link>{" "}
              or{" "}
              <Link href="/links" className="font-medium text-neutral-900">
                Links
              </Link>
              .
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Step 2</p>
            <p className="mt-2 text-sm font-semibold text-neutral-900">Track campaigns</p>
            <p className="mt-1 text-sm text-neutral-600">
              Use{" "}
              <Link href="/tools/utm-builder" className="font-medium text-neutral-900">
                UTM Builder
              </Link>{" "}
              for attribution.
            </p>
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">Step 3</p>
            <p className="mt-2 text-sm font-semibold text-neutral-900">Drive scans</p>
            <p className="mt-1 text-sm text-neutral-600">
              Generate a{" "}
              <Link href="/qr-code-generator" className="font-medium text-neutral-900">
                QR code
              </Link>{" "}
              (optionally{" "}
              <Link href="/qr-code/with-logo" className="font-medium text-neutral-900">
                with logo
              </Link>
              ).
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function LongFormArticleSection() {
  return (
    <SectionShell
      id="guide"
      eyebrow="Long-form guide"
      title="Creator tools that actually move the needle"
      subtitle="A practical, no-fluff guide to building a workflow that grows audience, improves conversions, and saves time."
      tone="light"
    >
      <div className="prose prose-neutral mx-auto max-w-3xl">
        <p>
          “Creator tools” is a broad label—sometimes it means complex editing software, sometimes it means analytics dashboards,
          and sometimes it means tiny utilities that save you ten minutes every day. The most effective creator tool stack usually
          isn’t the fanciest. It’s the one that removes friction between <em>what you make</em> and <em>how people find it, engage,
          and take action</em>.
        </p>

        <p>
          Kompi focuses on that bridge: reliable ways to share, track, and convert attention across online and offline channels.
          Whether you’re a content creator, a small brand, a freelancer, or a local business, the goal is the same: build a simple
          system that consistently turns views into clicks, scans into visits, and visits into outcomes.
        </p>

        <h2>Start with a destination that can evolve</h2>
        <ul>
          <li>
            Use{" "}
            <Link href="/k-cards" className="font-medium text-neutral-900">
              K Cards
            </Link>{" "}
            when you want a clean link-in-bio hub, creator profile, or single shareable page.
          </li>
          <li>
            Use{" "}
            <Link href="/links" className="font-medium text-neutral-900">
              Kompi Links
            </Link>{" "}
            when you want routing, organization, and flexible campaign destinations.
          </li>
        </ul>

        <h2>Add attribution early (before you need it)</h2>
        <p>
          Attribution doesn’t need to be complicated. You can get most of the benefit by adding UTMs to campaigns where you have
          multiple placements. Kompi’s{" "}
          <Link href="/tools/utm-builder" className="font-medium text-neutral-900">
            UTM Builder
          </Link>{" "}
          helps you keep naming consistent.
        </p>

        <h2>Turn attention into action with QR codes</h2>
        <p>
          QR codes compress a complicated action into one scan. Use{" "}
          <Link href="/qr-code-generator" className="font-medium text-neutral-900">
            QR Code Generator
          </Link>{" "}
          for quick destinations, and{" "}
          <Link href="/qr-code/with-logo" className="font-medium text-neutral-900">
            QR Code With Logo
          </Link>{" "}
          when trust + brand recognition matter.
        </p>

        <div className="not-prose mt-10 rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-8">
          <p className="text-sm font-semibold text-neutral-900">Ready to build your stack?</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Start with a destination, add tracking, then drive scans with QR—simple, repeatable, and measurable.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/k-cards"
              className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
            >
              Create a K Card
            </Link>
            <Link
              href="/tools/utm-builder"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Build UTMs
            </Link>
            <Link
              href="/qr-code-generator"
              className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              Generate a QR
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function UseCasesSection() {
  const useCases = [
    {
      title: "Creators & influencers",
      points: ["Link-in-bio that stays updated", "QR codes for posters and merch", "UTM tracking for campaigns"],
      primaryLink: { href: "/k-cards", label: "Use K Cards" },
      secondaryLink: { href: "/qr-code/with-logo", label: "QR with logo" },
    },
    {
      title: "Small businesses",
      points: ["QR codes for offers and reviews", "Links for promotions & routing", "Brand consistency across materials"],
      primaryLink: { href: "/links", label: "Use Links" },
      secondaryLink: { href: "/qr-code-generator", label: "QR generator" },
    },
    {
      title: "Restaurants & cafes",
      points: ["Mobile-friendly menus", "Update without reprinting", "Measure placement performance"],
      primaryLink: { href: "/qr-menus", label: "Build QR menus" },
      secondaryLink: { href: "/tools/utm-builder", label: "Track with UTMs" },
    },
    {
      title: "Brands & teams",
      points: ["Repeatable campaign assets", "Structured code systems", "Consistent design language"],
      primaryLink: { href: "/kr-codes", label: "Explore KR Codes" },
      secondaryLink: { href: "/qr-code/with-logo", label: "Brand your QR" },
    },
  ];

  return (
    <SectionShell
      id="use-cases"
      eyebrow="Use cases"
      title="Who Kompi creator tools are built for"
      subtitle="Choose the set that matches your workflow—then expand as you grow."
      tone="soft"
    >
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        {useCases.map((u) => (
          <div key={u.title} className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-900">{u.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              {u.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neutral-300" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={u.primaryLink.href}
                className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                {u.primaryLink.label}
              </Link>
              <Link
                href={u.secondaryLink.href}
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
              >
                {u.secondaryLink.label}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function WhyKompiSection() {
  return (
    <SectionShell
      id="why-kompi"
      eyebrow="Why Kompi"
      title="Why creators pick Kompi"
      subtitle="A unified workflow: share destinations, add attribution, and drive action—without duct-taping a dozen tools together."
      tone="light"
    >
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        <FeatureCard
          title="Build once, reuse everywhere"
          desc="Create one destination with K Cards, or organize many destinations with Links."
          icon={<Workflow className="h-5 w-5" />}
        />
        <FeatureCard
          title="Measure what works"
          desc="Add attribution with UTMs so you can compare platforms, posts, and physical placements."
          icon={<BarChart3 className="h-5 w-5" />}
        />
        <FeatureCard
          title="Convert offline attention"
          desc="Use QR + logo QR to turn real-world moments into clicks, visits, signups, and sales."
          icon={<QrCode className="h-5 w-5" />}
        />
      </div>
    </SectionShell>
  );
}

function ComparisonSection() {
  const rows = [
    { feature: "One reusable destination", kompi: "K Cards + Links keep everything organized", patchwork: "Multiple tools, multiple URLs to maintain" },
    { feature: "Campaign measurement", kompi: "UTM Builder + structured routing", patchwork: "Manual tagging and inconsistent naming" },
    { feature: "Offline conversion", kompi: "QR + logo QR + menu QR workflows", patchwork: "QR is separate and often untracked" },
    { feature: "Hospitality workflows", kompi: "QR Menus designed for updates", patchwork: "PDF menus and constant reprints" },
    { feature: "Brand-forward system option", kompi: "KR Codes for consistent design language", patchwork: "Inconsistent visuals across assets" },
  ];

  return (
    <SectionShell
      id="comparison"
      eyebrow="Comparison"
      title="Kompi vs a patchwork creator stack"
      subtitle="You can build a creator workflow with a dozen separate tools—or you can keep it simple and connected."
      tone="soft"
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm">
        <div className="grid grid-cols-3 border-b border-neutral-200 bg-neutral-50 px-5 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
          <div>Feature</div>
          <div>Kompi</div>
          <div>Patchwork</div>
        </div>
        {rows.map((r) => (
          <div key={r.feature} className="grid grid-cols-3 gap-4 border-b border-neutral-200 px-5 py-5 text-sm last:border-b-0">
            <div className="font-medium text-neutral-900">{r.feature}</div>
            <div className="text-neutral-800">{r.kompi}</div>
            <div className="text-neutral-600">{r.patchwork}</div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-2">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">If you’re starting today</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Create a destination with{" "}
            <Link href="/k-cards" className="font-medium text-neutral-900">
              K Cards
            </Link>{" "}
            and drive traffic via{" "}
            <Link href="/qr-code-generator" className="font-medium text-neutral-900">
              QR codes
            </Link>
            .
          </p>
        </div>
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900">If you’re running campaigns</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Add attribution using{" "}
            <Link href="/tools/utm-builder" className="font-medium text-neutral-900">
              UTM Builder
            </Link>{" "}
            and manage destinations via{" "}
            <Link href="/links" className="font-medium text-neutral-900">
              Links
            </Link>
            .
          </p>
        </div>
      </div>
    </SectionShell>
  );
}

function FaqSection() {
  return (
    <SectionShell
      id="faq"
      eyebrow="FAQ"
      title="Creator tools FAQ"
      subtitle="Quick answers about Kompi tools, tracking, QR workflows, and choosing the right stack."
      tone="light"
    >
      <div className="mx-auto max-w-4xl space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="group rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <span className="text-base font-semibold text-neutral-900">{f.q}</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-700">
                <ArrowRight className="h-5 w-5 rotate-90 transition-transform duration-200 group-open:rotate-[270deg]" />
              </span>
            </summary>
            <div className="mt-4 text-sm leading-relaxed text-neutral-600">{f.a}</div>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

function TrustSection() {
  return (
    <SectionShell
      id="trust"
      eyebrow="Trust"
      title="Built for real creator workflows"
      subtitle="Fast, practical, and designed to reduce friction between creation, sharing, and measurement."
      tone="soft"
    >
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        <FeatureCard
          title="Clarity over complexity"
          desc="The best creator tools are the ones you actually use. Kompi stays simple and repeatable."
          icon={<Zap className="h-5 w-5" />}
        />
        <FeatureCard
          title="Connected building blocks"
          desc="Use Links and K Cards as destinations, then amplify via QR codes (with logo when brand trust matters)."
          icon={<Link2 className="h-5 w-5" />}
        />
        <FeatureCard
          title="Measurement-friendly"
          desc="Campaigns are easier when you can compare results. Use UTMs and keep naming consistent."
          icon={<ShieldCheck className="h-5 w-5" />}
        />
      </div>
    </SectionShell>
  );
}

function RelatedLinksSection() {
  const links = [
    { href: "/k-cards", title: "K Cards", desc: "A creator profile and link-in-bio hub you can share everywhere.", icon: <IdCard className="h-5 w-5" /> },
    { href: "/links", title: "Kompi Links", desc: "Organize destinations and route campaigns with clarity.", icon: <Link2 className="h-5 w-5" /> },
    { href: "/qr-code-generator", title: "QR Code Generator", desc: "Drive offline conversions and make scanning effortless.", icon: <QrCode className="h-5 w-5" /> },
    { href: "/qr-code/with-logo", title: "QR Code With Logo", desc: "Brand your QR assets and improve scan trust.", icon: <Sparkles className="h-5 w-5" /> },
    { href: "/qr-menus", title: "QR Menus", desc: "Publish editable menus for restaurants and venues.", icon: <UtensilsCrossed className="h-5 w-5" /> },
    { href: "/kr-codes", title: "KR Codes", desc: "A brand-forward structured code system for campaigns.", icon: <Boxes className="h-5 w-5" /> },
    { href: "/tools/utm-builder", title: "UTM Builder", desc: "Add consistent tracking to campaigns and QR placements.", icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <SectionShell
      id="related"
      eyebrow="Explore"
      title="Explore key Kompi pages"
      subtitle="These pair perfectly with creator tools and help you build a complete workflow."
      tone="gradient"
    >
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-50 hover:shadow-lg hover:shadow-black/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3 text-neutral-900">{l.icon}</div>
                <div>
                  <p className="text-base font-semibold text-neutral-900">{l.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{l.desc}</p>
                </div>
              </div>
              <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 text-neutral-700">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-6xl rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
        <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
          Next: turn tools into a system
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600 md:text-base">
          If you want a simple, repeatable workflow: create a destination with{" "}
          <Link href="/k-cards" className="font-medium text-neutral-900">
            K Cards
          </Link>
          , track with{" "}
          <Link href="/tools/utm-builder" className="font-medium text-neutral-900">
            UTMs
          </Link>
          , and publish a branded{" "}
          <Link href="/qr-code/with-logo" className="font-medium text-neutral-900">
            logo QR
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/k-cards"
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Start with K Cards
          </Link>
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
          >
            Generate a QR
          </Link>
        </div>
      </div>
    </SectionShell>
  );
}

/* ---------------------------------------------
   Page
---------------------------------------------- */
export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to build a simple creator tool stack with Kompi",
    description: "A practical workflow: choose a destination, add tracking, and drive scans with QR codes.",
    totalTime: "PT20M",
    supply: [
      { "@type": "HowToSupply", name: "A destination page (K Card or Links page)" },
      { "@type": "HowToSupply", name: "Campaign name and platform list for UTMs" },
    ],
    tool: [
      { "@type": "HowToTool", name: "Kompi K Cards" },
      { "@type": "HowToTool", name: "Kompi Links" },
      { "@type": "HowToTool", name: "Kompi UTM Builder" },
      { "@type": "HowToTool", name: "Kompi QR Code Generator" },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Pick a destination",
        text: "Choose one primary destination: use K Cards for a link-in-bio hub or Links for routing and organization.",
        url: CANONICAL_URL + "#tools",
      },
      {
        "@type": "HowToStep",
        name: "Add campaign tracking",
        text: "Use UTM Builder to tag key placements (platforms, email, print, QR). Keep naming consistent.",
        url: CANONICAL_URL + "#tools",
      },
      {
        "@type": "HowToStep",
        name: "Generate QR codes",
        text: "Create QR codes for your tracked URLs, and consider adding a logo for brand recognition and trust.",
        url: CANONICAL_URL + "#tools",
      },
      {
        "@type": "HowToStep",
        name: "Publish and iterate",
        text: "Share your destination across channels, then review what works and refine monthly.",
        url: CANONICAL_URL + "#guide",
      },
    ],
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Kompi Creator Tools Workflow Demo",
    description: "A walkthrough showing how creators use Kompi tools together: destinations, UTMs, and QR codes.",
    thumbnailUrl: [`${SITE_URL}/kompi-platform.png`],
    uploadDate: "2025-12-12",
    contentUrl: `${SITE_URL}${SEO_VIDEO_SRC}`,
    embedUrl: `${SITE_URL}${SLUG}#video`,
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi Creator Tools",
    url: CANONICAL_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    featureList: [
      "QR Code Generator",
      "QR Code With Logo",
      "K Cards link-in-bio hub",
      "Kompi Links destination routing",
      "UTM Builder for campaign tracking",
      "QR Menus for hospitality",
      "KR Codes for brand-forward structured codes",
    ],
  };

  return (
    <>
      <Script id="ld-webapp-creator-tools" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <Script id="ld-faq-creator-tools" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id="ld-howto-creator-tools" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <Script id="ld-video-creator-tools" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />

      <Navbar />

      <main className="bg-white">
        <HeroSection />
        <ToolDirectorySection />
        <VideoSection />
        <LongFormArticleSection />
        <UseCasesSection />
        <WhyKompiSection />
        <ComparisonSection />
        <FaqSection />
        <TrustSection />
        <RelatedLinksSection />

        <div className="border-t border-neutral-200 bg-white py-16 md:py-24">
          <Container>
            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 md:p-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2 md:max-w-2xl">
                  <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
                    Build your creator workflow in Kompi
                  </h2>
                  <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
                    Start with a destination, track your campaigns, and drive scans from anywhere. A clean stack is:{" "}
                    <span className="font-medium text-neutral-900">K Cards</span> +{" "}
                    <span className="font-medium text-neutral-900">UTM Builder</span> +{" "}
                    <span className="font-medium text-neutral-900">QR with logo</span>.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/k-cards"
                    className="inline-flex items-center justify-center rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800"
                  >
                    Create a K Card
                  </Link>
                  <Link
                    href="/qr-code-generator"
                    className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
                  >
                    Generate a QR
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </main>

      <FooterCTA />
    </>
  );
}
