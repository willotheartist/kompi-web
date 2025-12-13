// src/app/customers/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Link2,
  QrCode,
  ScanLine,
  Sparkles,
  Users,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

const KEYWORD = "kompi customers";
const PAGE_SLUG = "/customers";
const SEO_VIDEO_SRC = "/seo/kompi-customers.mp4";

// URL building (env-safe; no fake domains)
const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL;
const SITE_URL = siteUrlRaw ? siteUrlRaw.replace(/\/$/, "") : "";
const CANONICAL_URL = SITE_URL ? `${SITE_URL}${PAGE_SLUG}` : "";
const OG_IMAGE = SITE_URL ? `${SITE_URL}/kompi-platform.png` : "/kompi-platform.png";

function abs(path: string) {
  if (!SITE_URL) return path;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

// Keep these FAQs in sync with FAQ JSON-LD below.
const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Who are Kompi customers?",
    a: "Kompi customers include creators, personal brands, small businesses, SMEs, communities, brands, marketing teams, studios, agencies, events, venues, influencers, and UGC creators—anyone who needs clean destinations, tracking, and scannable distribution.",
  },
  {
    q: "Is Kompi only for creators?",
    a: "No. Creators love Kompi, but it’s built for anyone who shares links and wants measurable outcomes—solo founders, SMEs, agencies, restaurants, event teams, and brands.",
  },
  {
    q: "What’s the fastest way to get started as a Kompi customer?",
    a: "Start with a destination (K Cards or Links), add tracking with the UTM Builder, then distribute via QR codes or KR Codes for offline scanning and campaigns.",
  },
  {
    q: "What is the difference between K Cards and Links?",
    a: "K Cards are a creator-friendly destination (like a modern link hub/landing page). Links are better when you need routing and organization across multiple campaigns and destinations.",
  },
  {
    q: "Can Kompi help with QR campaigns?",
    a: "Yes. You can generate standard QR codes, branded QR codes with logos, and KR Codes (Kompi’s code system). Pair codes with UTMs to measure placements.",
  },
  {
    q: "Do restaurants and venues use Kompi?",
    a: "Yes. Restaurants and venues commonly use QR Menus as a mobile-first destination and place QR codes on tables, windows, and signage.",
  },
  {
    q: "Can agencies use Kompi for clients?",
    a: "Yes. Agencies can standardize destinations and tracking across multiple client campaigns, using Links for routing and UTMs for consistent measurement.",
  },
  {
    q: "Do I need to code to use Kompi?",
    a: "No. Kompi is designed to be fast and practical without requiring development work.",
  },
  {
    q: "How do I measure which platform or placement performs best?",
    a: "Use the UTM Builder to tag links by source/medium/campaign, then use those tracked links across social platforms, email, and QR placements to compare performance.",
  },
];

export const metadata: Metadata = {
  title: "Kompi Customers | Who Kompi Is Made For",
  description:
    "Kompi customers include creators, personal brands, SMEs, small businesses, communities, agencies, studios, events, venues, brands, and marketing teams. Learn who Kompi is for—and how each group uses K Cards, Links, UTMs, and QR/KR codes.",
  keywords: [
    "kompi customers",
    "who is kompi for",
    "creator tools",
    "personal brand tools",
    "small business marketing tools",
    "sme marketing tools",
    "community growth tools",
    "agency campaign tools",
    "event marketing qr codes",
    "venue qr menus",
    "influencer link in bio",
    "ugc creator tools",
    "utm builder",
    "qr code generator",
    "qr code with logo",
    "kr codes",
    "k cards",
    "link management tools",
  ],
  robots: { index: true, follow: true },
  ...(CANONICAL_URL
    ? {
        alternates: { canonical: CANONICAL_URL },
        openGraph: {
          type: "website",
          url: CANONICAL_URL,
          title: "Kompi Customers | Who Kompi Is Made For",
          description:
            "Creators, brands, small businesses, agencies, events, venues—see who Kompi is made for and how Kompi’s workflow helps: destination, tracking, and distribution.",
          siteName: "Kompi",
          images: [
            {
              url: OG_IMAGE,
              width: 1200,
              height: 630,
              alt: "Kompi customers overview",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: "Kompi Customers | Who Kompi Is Made For",
          description:
            "Kompi customers include creators, SMEs, brands, agencies, and venues. Learn the destination + tracking + distribution workflow.",
          images: [OG_IMAGE],
        },
      }
    : {
        twitter: {
          card: "summary_large_image",
          title: "Kompi Customers | Who Kompi Is Made For",
          description:
            "Kompi customers include creators, SMEs, brands, agencies, and venues. Learn the destination + tracking + distribution workflow.",
        },
      }),
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
/*  SECTIONS                                                                  */
/* -------------------------------------------------------------------------- */

function CustomersIntroSection() {
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
          <span>Kompi · Customers</span>
        </div>

        <div className="space-y-7 md:space-y-9">
          <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
            Kompi customers are{" "}
            <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
              anyone who ships
            </span>{" "}
            links & scans that convert.
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-neutral-700">
            People searching <strong>{KEYWORD}</strong> want one answer: “Is this for me?”
            If you share links, run campaigns, print QR codes, host events, or operate a local business — yes.
          </p>

          <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-neutral-600">
            The common workflow: <strong>Destination</strong> → <strong>Tracking</strong> → <strong>Distribution</strong>.
            Do it once, reuse it everywhere.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#segments"
              className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
            >
              See customer segments
            </a>
            <Link
              href="/k-cards"
              className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
            >
              Start with K Cards
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm font-medium text-neutral-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#D1FAE5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>Stable destination</span>
            </span>
            <span>• UTMs for attribution</span>
            <span>• QR/KR for offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SegmentsSection() {
  const segments = [
    {
      title: "Creators & personal brands",
      tag: "K Cards first",
      bg: "#E0F2FE",
      bullets: ["Link-in-bio hub", "Launch CTAs", "Merch + event scans"],
      primary: { href: "/k-cards", label: "Start with K Cards" },
      secondary: { href: "/qr-code/with-logo", label: "Brand your QR" },
    },
    {
      title: "Small businesses & SMEs",
      tag: "Real-world conversion",
      bg: "#DCFCE7",
      bullets: ["Flyers + signage", "Receipts + packaging", "Local promos"],
      primary: { href: "/qr-code-generator", label: "Generate QR" },
      secondary: { href: "/k-cards", label: "Create destination" },
    },
    {
      title: "Brands, agencies & teams",
      tag: "Campaign systems",
      bg: "#EDE9FE",
      bullets: ["Routing layers", "UTM conventions", "Clean reporting"],
      primary: { href: "/links", label: "Use Links" },
      secondary: { href: "/tools/utm-builder", label: "Build UTMs" },
    },
    {
      title: "Communities, events & venues",
      tag: "Scan moments",
      bg: "#FEF3C7",
      bullets: ["Schedules + updates", "Menus + offers", "Sponsor links"],
      primary: { href: "/qr-menus", label: "QR Menus" },
      secondary: { href: "/kr-codes", label: "KR Codes" },
    },
  ] as const;

  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200 scroll-mt-28" id="segments">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5 text-center">
            <Eyebrow>SEGMENTS</Eyebrow>
            <SectionTitle>Who Kompi is made for</SectionTitle>
            <SectionSub>Different teams, same workflow — destination, tracking, distribution.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {segments.map((s) => (
              <div
                key={s.title}
                className="rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{s.tag}</p>
                    <h3 className="text-xl font-bold text-[#0B0F1A]">{s.title}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                    <Sparkles className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-base text-neutral-700">
                  {s.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={s.primary.href}
                    className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-3 text-sm font-semibold text-white hover:bg-black"
                  >
                    {s.primary.label}
                  </Link>
                  <Link
                    href={s.secondary.href}
                    className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-6 py-3 text-sm font-semibold text-[#1E2330] hover:bg-[#F7F7F3]"
                  >
                    {s.secondary.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function WorkflowIconsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Eyebrow>THE WORKFLOW</Eyebrow>
            <SectionTitle>Destination → Tracking → Distribution</SectionTitle>
            <SectionSub>Most customers don’t need more tools. They need a repeatable layer that stays measurable.</SectionSub>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <IconFeature icon={<Link2 className="h-5 w-5" />} bg="#E0F2FE" title="Destination">
              Start with a clean landing: <Link href="/k-cards" className="underline underline-offset-4">K Cards</Link> or route with{" "}
              <Link href="/links" className="underline underline-offset-4">Links</Link>.
            </IconFeature>

            <IconFeature icon={<BadgeCheck className="h-5 w-5" />} bg="#DCFCE7" title="Tracking">
              Add attribution using <Link href="/tools/utm-builder" className="underline underline-offset-4">UTM Builder</Link> so reporting stays clean.
            </IconFeature>

            <IconFeature icon={<QrCode className="h-5 w-5" />} bg="#FEF3C7" title="Distribution">
              Turn offline attention into action with <Link href="/qr-code-generator" className="underline underline-offset-4">QR codes</Link> and logo QR.
            </IconFeature>

            <IconFeature icon={<ScanLine className="h-5 w-5" />} bg="#EDE9FE" title="System-level scanning">
              Want brand-first scanning? Use <Link href="/kr-codes" className="underline underline-offset-4">KR Codes</Link> as a campaign-ready system.
            </IconFeature>
          </div>
        </div>
      </Container>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200 scroll-mt-28" id="video">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5 text-center">
            <Eyebrow>60-SECOND OVERVIEW</Eyebrow>
            <SectionTitle>Kompi customers, one shared pattern</SectionTitle>
            <SectionSub>See how creators, teams, venues and communities use the same workflow.</SectionSub>
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

          <p className="text-center text-sm text-neutral-600">
            Want to start building?{" "}
            <Link href="/k-cards" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
              Create a K Card
            </Link>{" "}
            or{" "}
            <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
              use Links
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

function LongFormCardsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4]" aria-labelledby="customers-guide-heading">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <Card>
            <CardBody>
              <Eyebrow>THE GUIDE</Eyebrow>
              <h2
                id="customers-guide-heading"
                className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]"
              >
                Who Kompi is made for (and how each group uses it)
              </h2>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                Kompi customers span creators, small businesses, agencies, communities and venues — because the mechanics are universal:
                build a destination, measure what works, distribute via links and scans.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Figure src="/kompi-platform.png" alt="Kompi platform preview" aspect="aspect-[16/10]" priority />
                <Figure src="/kompi-branding.png" alt="Kompi branding preview" aspect="aspect-[16/10]" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>THE 3 BUILDING BLOCKS</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                The workflow almost every customer ends up using
              </h3>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#E0F2FE] flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#0B0F1A]">Destination</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Start with <Link href="/k-cards" className="underline underline-offset-4">K Cards</Link> (hub) or{" "}
                    <Link href="/links" className="underline underline-offset-4">Links</Link> (routing).
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                    <BadgeCheck className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#0B0F1A]">Tracking</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Use <Link href="/tools/utm-builder" className="underline underline-offset-4">UTM Builder</Link> to keep attribution consistent.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center">
                    <ScanLine className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#0B0F1A]">Distribution</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Generate <Link href="/qr-code-generator" className="underline underline-offset-4">QR codes</Link>, logo QR, or{" "}
                    <Link href="/kr-codes" className="underline underline-offset-4">KR Codes</Link> for offline.
                  </p>
                </div>
              </div>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                Start simple: <Link href="/k-cards" className="underline underline-offset-4">K Cards</Link> →{" "}
                <Link href="/tools/utm-builder" className="underline underline-offset-4">UTMs</Link> →{" "}
                <Link href="/qr-code/with-logo" className="underline underline-offset-4">Logo QR</Link>.
              </p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200 scroll-mt-28" id="compare">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5 text-center">
            <Eyebrow>COMPARISON</Eyebrow>
            <SectionTitle>Kompi vs patchwork tools</SectionTitle>
            <SectionSub>
              Stop gluing link-in-bio + QR generator + spreadsheets + inconsistent UTMs.
              Use one workflow that holds together.
            </SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-4 pr-4 font-bold text-neutral-900">Feature</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Kompi</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Patchwork stack</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Primary destination</td>
                      <td className="py-4 px-4">K Cards / Links (stable, update anytime)</td>
                      <td className="py-4 px-4">Temporary pages + multiple tools</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Tracking</td>
                      <td className="py-4 px-4">UTM Builder keeps naming consistent</td>
                      <td className="py-4 px-4">Manual tags + messy reporting</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Offline-to-online</td>
                      <td className="py-4 px-4">QR / KR + branded scan options</td>
                      <td className="py-4 px-4">Unmeasured QR files</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Hospitality</td>
                      <td className="py-4 px-4">QR Menus built for updates</td>
                      <td className="py-4 px-4">PDF menus + reprints</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">Scaling</td>
                      <td className="py-4 px-4">Repeatable across teams/clients</td>
                      <td className="py-4 px-4">Rebuild each campaign</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-8 text-center text-base md:text-lg text-neutral-600">
                Want the most “system-y” approach?{" "}
                <Link href="/kr-codes" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  Explore KR Codes
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

function StripCTASection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="rounded-3xl bg-[#1E2330] px-8 py-14 text-center text-[#E5F9F0] sm:px-12 md:px-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Build one workflow. Reuse it everywhere.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[#E5E7EB] leading-relaxed">
            Start with a destination, add UTMs, then distribute with QR/KR. Keep everything clean, measurable, and easy to update.
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

function FaqSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200 scroll-mt-28" id="faq">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5 text-center">
            <Eyebrow>FAQ</Eyebrow>
            <SectionTitle>Kompi customers FAQs</SectionTitle>
            <SectionSub>Quick answers about who Kompi is for, and what to start with.</SectionSub>
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

function RelatedLinksSection() {
  const links = [
    { href: "/k-cards", label: "K Cards — your destination hub", icon: <Users className="h-5 w-5" /> },
    { href: "/links", label: "Links — routing & campaigns", icon: <Link2 className="h-5 w-5" /> },
    { href: "/tools/utm-builder", label: "UTM Builder — tracking", icon: <BadgeCheck className="h-5 w-5" /> },
    { href: "/qr-code-generator", label: "QR Code Generator — distribution", icon: <QrCode className="h-5 w-5" /> },
    { href: "/qr-code/with-logo", label: "QR With Logo — brand trust", icon: <Sparkles className="h-5 w-5" /> },
    { href: "/kr-codes", label: "KR Codes — advanced scanning system", icon: <ScanLine className="h-5 w-5" /> },
    { href: "/qr-menus", label: "QR Menus — hospitality destinations", icon: <Building2 className="h-5 w-5" /> },
    { href: "/customers/events", label: "Events & venues — use cases", icon: <CalendarDays className="h-5 w-5" /> },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200 scroll-mt-28" id="related">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5 text-center">
            <Eyebrow>EXPLORE MORE</Eyebrow>
            <SectionTitle>Tools Kompi customers use</SectionTitle>
            <SectionSub>Pick the building blocks that match your workflow, then reuse them across campaigns and placements.</SectionSub>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center justify-between rounded-3xl bg-white border border-neutral-200 px-6 py-5 text-base md:text-lg font-semibold text-neutral-900 shadow-sm hover:border-neutral-400 transition-colors"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F7F7F3] ring-1 ring-[#E5E7EB]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </span>
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
    name: "How to get started as a Kompi customer",
    description: "Pick a destination, add measurement, then distribute links and scans across channels and placements.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose a destination",
        text: "Start with K Cards as a stable landing destination, or use Links for routing and campaigns.",
        url: abs("/k-cards"),
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Add tracking",
        text: "Use UTM Builder to tag your links by source, medium, and campaign for clear reporting.",
        url: abs("/tools/utm-builder"),
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Distribute with QR / KR",
        text: "Generate QR/KR codes and place them on posters, packaging, menus, and signage to drive scans.",
        url: abs("/qr-code-generator"),
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Iterate without changing the URL",
        text: "Update your destination content as you learn what converts—keep the shared link stable.",
        url: abs(PAGE_SLUG + "#segments"),
      },
    ],
  };
}

function getVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Kompi Customers Overview",
    description:
      "An overview of who Kompi is made for: creators, personal brands, SMEs, communities, agencies, events, venues, and marketing teams.",
    thumbnailUrl: [OG_IMAGE],
    uploadDate: "2025-12-12",
    contentUrl: abs(SEO_VIDEO_SRC),
    embedUrl: abs(PAGE_SLUG + "#video"),
  };
}

function getWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi",
    url: CANONICAL_URL || abs(PAGE_SLUG),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Kompi is built for customers who share links and scans: creators, personal brands, SMEs, communities, agencies, events, venues, and marketing teams. Destinations, tracking, and distribution in one workflow.",
  };
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function CustomersPage() {
  const jsonLd = [getWebAppSchema(), getFaqSchema(), getHowToSchema(), getVideoSchema()];

  return (
    <>
      <Script id="kompi-customers-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />

        {/* KEY FIX: padding so navbar never overlaps */}
        <main className="pt-20 md:pt-28 pb-24 space-y-24 md:space-y-32">
          <section>
            <Container>
              <CustomersIntroSection />
            </Container>
          </section>

          <SegmentsSection />
          <WorkflowIconsSection />
          <VideoSection />
          <LongFormCardsSection />
          <ComparisonSection />
          <StripCTASection />
          <FaqSection />
          <RelatedLinksSection />
        </main>

        <FooterCTA />
      </div>
    </>
  );
}
