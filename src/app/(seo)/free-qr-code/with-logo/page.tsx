// src/app/free-qr-code/with-logo/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  Brush,
  Download,
  Image as ImageIcon,
  ScanLine,
  Sparkles,
  Zap,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { KRCode2 } from "@/components/kr-codes/KRCode2";

const SITE_NAME = "Kompi";
const SITE_URL = "https://kompi.ai";
const SLUG_PATH = "/qr-code/with-logo";
const CANONICAL_URL = `${SITE_URL}${SLUG_PATH}`;
const SEO_VIDEO_SRC = "/seo/qr-code-with-logo.mp4";

// Keep these FAQs in sync with the FAQ JSON-LD below.
const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Can I add my own logo to a QR code for free?",
    a: "Yes. Kompi lets you generate a QR code with a logo, then download a clean, scan-friendly output. For brand-heavy use cases, you can also refine styling and error-correction-friendly settings in the generator.",
  },
  {
    q: "Will a QR code still scan reliably with a logo in the middle?",
    a: "Usually, yes—if you keep good contrast, leave enough quiet zone, avoid oversized logos, and use higher error correction. Kompi is designed to help you create logo QR codes that remain easy to scan.",
  },
  {
    q: "What’s the best logo size for a QR code?",
    a: "A common safe range is roughly 15–25% of the QR code’s width (centered), depending on design and error correction. If you push the logo too large or reduce contrast, scans can fail—especially on older cameras.",
  },
  {
    q: "Do I need a transparent background logo?",
    a: "It helps. Transparent PNG/SVG logos blend better and preserve QR modules. If your logo has a background, consider a subtle white padding behind it so the QR stays readable.",
  },
  {
    q: "Should I use a static or dynamic QR code with a logo?",
    a: "Static QR codes encode the final destination directly. Dynamic QR codes let you update the destination later and track scans. If you’re running campaigns, menus, or seasonal offers, dynamic is usually the better choice.",
  },
  {
    q: "Can I put a logo on a QR code for a restaurant menu?",
    a: "Absolutely. Pair a logo QR with Kompi’s QR menus so customers recognize your brand instantly and you can update menu content without reprinting materials.",
  },
  {
    q: "What file formats can I download?",
    a: "Common formats include PNG (great for web) and SVG (great for print). If you need crisp large-format printing, SVG is typically the best option.",
  },
  {
    q: "How do I test a QR code with a logo before printing?",
    a: "Test with multiple phones, camera apps, and lighting conditions. Check scanning from various distances and angles, and confirm the destination loads quickly on mobile networks.",
  },
  {
    q: "Why does my QR code with logo fail to scan?",
    a: "The most common causes are low contrast, too little quiet zone, logo too large, heavy styling that distorts modules, or printing too small. Fixing contrast, increasing size, and simplifying styling usually resolves it.",
  },
  {
    q: "Is it okay to use colors in a QR code with a logo?",
    a: "Yes—if you maintain strong contrast between foreground and background. Avoid light foreground colors on white, and avoid gradients that reduce edge definition.",
  },
];

export const metadata: Metadata = {
  title: "QR Code With Logo Generator (Free & Scan-Friendly) | Kompi",
  description:
    "Create a QR code with your logo in seconds—clean, branded, and easy to scan. Customize styles, export for print or web, and connect to Kompi tools like links, menus, and KR Codes.",
  keywords: [
    "qr code with logo",
    "logo qr code generator",
    "custom qr code with logo",
    "branded qr code",
    "qr code with image",
    "qr code generator with logo upload",
    "dynamic qr code with logo",
    "qr code with logo png",
    "qr code with logo svg",
    "restaurant menu qr code with logo",
    "business card qr code with logo",
    "scan friendly qr code with logo",
    "free qr code with logo",
    "qr code branding",
    "qr code design",
    "kompi qr code",
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: "QR Code With Logo Generator (Free & Scan-Friendly) | Kompi",
    description:
      "Generate a QR code with your logo that stays scan-friendly. Customize styling, export high-quality files, and connect to Kompi links, menus, and KR Codes.",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/kompi-branding.png`,
        width: 1200,
        height: 630,
        alt: "Kompi QR code with logo generator preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code With Logo Generator (Free & Scan-Friendly) | Kompi",
    description: "Create branded, scan-friendly QR codes with your logo. Export for web/print and connect to Kompi tools.",
    images: [`${SITE_URL}/kompi-branding.png`],
  },
  robots: { index: true, follow: true },
};

/* -------------------------------------------------------------------------- */
/*  SMALL UI PRIMITIVES (match /qr-gen-online style)                          */
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

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

function LogoQrIntroSection() {
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
          <span>Kompi Tools · QR code with logo</span>
        </div>

        <div className="space-y-7 md:space-y-9">
          <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
            Create a{" "}
            <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
              QR code with your logo
            </span>{" "}
            that still scans fast.
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-neutral-700">
            Upload your logo, keep contrast strong, and export scan-friendly files for print or web.
            Perfect for packaging, menus, posters, business cards and campaigns.
          </p>

          <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-neutral-600">
            No design skills needed — generate a clean branded QR in minutes, then test and ship.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#logo-qr-tool"
              className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
            >
              Create logo QR code
            </a>
            <Link
              href="/qr-code-generator"
              className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
            >
              Use standard QR generator
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm font-medium text-neutral-600">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#D1FAE5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>Logo + scanability balance</span>
            </div>
            <span>• PNG &amp; SVG exports</span>
            <span>• Works on iOS &amp; Android</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  TOOL                                                                      */
/* -------------------------------------------------------------------------- */

function LogoQrToolSection() {
  return (
    <section id="logo-qr-tool" className="scroll-mt-28">
      <Container>
        <Card className="bg-white">
          <CardBody>
            <Eyebrow>TRY IT NOW</Eyebrow>
            <SectionTitle>Generate your QR code with logo</SectionTitle>
            <SectionSub>
              Upload a logo, pick a style, then download a scan-ready QR. Need tracking? Route the destination through{" "}
              <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                Kompi Links
              </Link>
              .
            </SectionSub>

            <div className="mt-10">
              <KRCode2 />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3 text-sm md:text-base text-neutral-600">
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Brand recognition</h3>
                <p>Logo QR codes increase trust at scan time — especially on packaging, menus and signage.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Campaign ready</h3>
                <p>
                  Add attribution with{" "}
                  <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    UTM builder
                  </Link>{" "}
                  and route everything via{" "}
                  <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    Links
                  </Link>
                  .
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Print-friendly exports</h3>
                <p>Use PNG for quick web/print. Use SVG for crisp scaling on large-format prints.</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  ICON FEATURES                                                             */
/* -------------------------------------------------------------------------- */

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

function LogoQrFeatureIcons() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Eyebrow>FEATURES</Eyebrow>
            <SectionTitle>Branded QR codes, without breaking scanability</SectionTitle>
            <SectionSub>Make it look like your brand — keep it fast to scan in real-world conditions.</SectionSub>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <IconFeature icon={<ImageIcon className="h-5 w-5" />} bg="#E0F2FE" title="Upload your logo">
              Transparent logos work best, but any clean image can be used with a simple badge background.
            </IconFeature>

            <IconFeature icon={<ScanLine className="h-5 w-5" />} bg="#DCFCE7" title="Scan-friendly defaults">
              Keep contrast high and preserve finder patterns so phones pick it up instantly.
            </IconFeature>

            <IconFeature icon={<Brush className="h-5 w-5" />} bg="#FEF3C7" title="Style controls">
              Adjust corners, dots and colors — and still keep the QR reliable when printed.
            </IconFeature>

            <IconFeature icon={<Download className="h-5 w-5" />} bg="#EDE9FE" title="PNG & SVG exports">
              Download for web or print. SVG is best for large-format, crisp output.
            </IconFeature>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  VIDEO                                                                      */
/* -------------------------------------------------------------------------- */

function LogoQrVideoSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="video">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>60-SECOND DEMO</Eyebrow>
            <SectionTitle>Watch how to create a logo QR</SectionTitle>
            <SectionSub>Upload a logo, pick a style, check contrast — then export for print or web.</SectionSub>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-black shadow-sm">
            <video className="aspect-video w-full object-cover" src={SEO_VIDEO_SRC} autoPlay muted loop playsInline preload="metadata" />
          </div>

          <p className="text-center text-sm text-neutral-600">
            Need a non-logo QR?{" "}
            <Link href="/qr-code-generator" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
              Open the standard generator
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  LONG-FORM (SEO) — BROKEN INTO CARDS                                       */
/* -------------------------------------------------------------------------- */

function LogoQrLongFormArticle() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4]" aria-labelledby="logo-qr-guide-heading">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <Card>
            <CardBody>
              <Eyebrow>LOGO QR GUIDE</Eyebrow>
              <h2
                id="logo-qr-guide-heading"
                className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]"
              >
                How to make a QR code with a logo that still scans
              </h2>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                A logo makes a QR code feel trustworthy — but the QR still needs to be readable by cameras.
                The best logo QRs keep strong contrast, preserve a quiet zone (margin), and keep the logo modest in size.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Figure src="/kompi-branding.png" alt="Kompi branding preview" aspect="aspect-[16/10]" priority />
                <Figure src="/kompi-platform.png" alt="Kompi platform preview" aspect="aspect-[16/10]" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>BEST PRACTICES</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                The 5 rules for scan-friendly logo QR codes
              </h3>

              <ul className="mt-8 mx-auto max-w-3xl space-y-4 text-left text-base md:text-lg leading-relaxed text-neutral-700 list-disc list-inside">
                <li>
                  <strong>Contrast wins:</strong> dark foreground on a light background is the safest.
                </li>
                <li>
                  <strong>Preserve quiet space:</strong> don’t crop the QR too tight — leave a clear margin.
                </li>
                <li>
                  <strong>Keep logo size modest:</strong> a common safe range is ~15–25% of QR width.
                </li>
                <li>
                  <strong>Don’t distort finder patterns:</strong> avoid heavy styling that changes the big corner markers.
                </li>
                <li>
                  <strong>Test before printing:</strong> scan on multiple phones, lighting conditions and distances.
                </li>
              </ul>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                For campaigns, build a clean destination with{" "}
                <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  Kompi Links
                </Link>{" "}
                and track performance with UTMs from the{" "}
                <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  UTM builder
                </Link>
                .
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>STATIC VS DYNAMIC</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Static vs dynamic QR codes with a logo
              </h3>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                <strong>Static</strong> QR codes can’t be changed after printing. <strong>Dynamic</strong> QR workflows let you update destinations and track scans.
                If you’re doing menus, seasonal promos, or campaigns — dynamic tends to win.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#E0F2FE] flex items-center justify-center">
                    <Zap className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#0B0F1A]">Static</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">Best for permanent links and long-term print where nothing changes.</p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#0B0F1A]">Dynamic</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">Update destinations later and measure what gets scanned.</p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center">
                    <BadgeCheck className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h4 className="text-lg font-semibold text-[#0B0F1A]">Best combo</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">Logo QR + branded destination + tracking = best real-world results.</p>
                </div>
              </div>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                Want a more structured QR system? Explore{" "}
                <Link href="/kr-codes" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  KR Codes
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
/*  USE CASE CARDS                                                            */
/* -------------------------------------------------------------------------- */

function LogoQrUseCasesSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200" id="use-cases">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>USE CASES</Eyebrow>
            <SectionTitle>Where logo QR codes shine</SectionTitle>
            <SectionSub>High-trust scans for menus, packaging, events and business cards — with Kompi tools behind the destination.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">HOSPITALITY</p>
                <h3 className="text-xl font-bold text-[#0B0F1A]">Menus & table tents</h3>
                <p className="text-base text-neutral-700">
                  Pair with{" "}
                  <Link href="/qr-menus" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    QR menus
                  </Link>{" "}
                  so customers recognize your brand and you can update content without reprinting.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-700">
                  <li>• Update menu content anytime</li>
                  <li>• Build trust with your logo</li>
                  <li>• Works on iOS & Android</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#DCFCE7] p-7 ring-2 ring-[#1E2330]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  Recommended
                </div>
                <h3 className="text-xl font-bold text-[#0B0F1A]">Campaigns & packaging</h3>
                <p className="text-base text-neutral-800">
                  Route scans through{" "}
                  <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    Kompi Links
                  </Link>{" "}
                  and add UTMs for attribution.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-800">
                  <li>• Track performance by placement</li>
                  <li>• Update destinations later</li>
                  <li>• Keep everything branded</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#E0F2FE] p-7 ring-1 ring-[#BFDBFE]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1D4ED8]">CREATORS & TEAMS</p>
                <h3 className="text-xl font-bold text-[#0B0F1A]">Profiles & business cards</h3>
                <p className="text-base text-neutral-700">
                  Drive scans to a{" "}
                  <Link href="/k-cards" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    K Card
                  </Link>{" "}
                  hub that holds everything you want people to see.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-700">
                  <li>• One scannable identity</li>
                  <li>• Links, socials, offers</li>
                  <li>• Always editable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  STRIP (rectangular + breathing room)                                      */
/* -------------------------------------------------------------------------- */

function LogoQrStripSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="rounded-3xl bg-[#1E2330] px-8 py-14 text-center text-[#E5F9F0] sm:px-12 md:px-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Your QR codes shouldn&apos;t look generic.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[#E5E7EB] leading-relaxed">
            Add your logo, keep it scan-friendly, and connect the destination to the rest of Kompi — links, menus, analytics and workspaces.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#logo-qr-tool"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
            >
              Create logo QR
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Create free Kompi account
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  WHY KOMPI                                                                 */
/* -------------------------------------------------------------------------- */

function LogoQrWhyKompiSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="why-kompi">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>WHY KOMPI</Eyebrow>
            <SectionTitle>Why generate a QR code with logo on Kompi?</SectionTitle>
            <SectionSub>
              Kompi gives you a clean generator plus connected tools for destinations, tracking and team workflows.
            </SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">SCAN-FRIENDLY</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Made to scan in the real world</h3>
              <p className="text-base text-neutral-600">Balance branding with contrast, quiet zone and logo sizing so scans stay fast.</p>
            </div>

            <div className="rounded-3xl bg-white border border-emerald-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">CONNECTED</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Better destinations</h3>
              <p className="text-base text-neutral-600">
                Route scans through{" "}
                <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  Links
                </Link>{" "}
                or a{" "}
                <Link href="/k-cards" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  K Card
                </Link>{" "}
                hub.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">READY TO SCALE</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Workspaces for teams</h3>
              <p className="text-base text-neutral-600">Organize QR codes, assets and destinations across brands, locations and clients.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  COMPARISON                                                                */
/* -------------------------------------------------------------------------- */

function LogoQrComparisonSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="compare">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>COMPARISON</Eyebrow>
            <SectionTitle>Kompi vs basic logo QR generators</SectionTitle>
            <SectionSub>
              If you’re doing branded campaigns, you want a generator that connects the QR to destinations, updates and measurement — not just a one-off file.
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
                      <th className="py-4 px-4 font-bold text-neutral-900">Typical generators</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Logo + scanability</td>
                      <td className="py-4 px-4">Designed to stay scan-friendly with branding.</td>
                      <td className="py-4 px-4">Often looks branded but fails in print.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Destinations</td>
                      <td className="py-4 px-4">Connect to Links, K Cards, QR Menus.</td>
                      <td className="py-4 px-4">Usually just a URL field.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Tracking</td>
                      <td className="py-4 px-4">UTMs + workflows for campaigns.</td>
                      <td className="py-4 px-4">Manual, disconnected.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Exports</td>
                      <td className="py-4 px-4">PNG + SVG for crisp print.</td>
                      <td className="py-4 px-4">Often PNG-only or low-res.</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">Teams</td>
                      <td className="py-4 px-4">Workspaces for brands and agencies.</td>
                      <td className="py-4 px-4">Single-use downloads.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-8 text-center text-base md:text-lg text-neutral-600">
                Want the most “system-y” setup? Explore{" "}
                <Link href="/kr-codes" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  KR Codes
                </Link>{" "}
                for advanced QR management.
              </p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  TESTIMONIALS                                                              */
/* -------------------------------------------------------------------------- */

function LogoQrTestimonialSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>LESS FRICTION</Eyebrow>
            <SectionTitle>More “scan, done”. Less “why won’t it scan?”</SectionTitle>
            <SectionSub>Brand-forward QR creation that stays reliable in print and on screens.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“Looks branded, scans instantly”</p>
              <p className="mt-3 text-base text-neutral-600">“We put these on packaging and every phone picked them up fast.”</p>
            </div>

            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“Great for menus”</p>
              <p className="mt-3 text-base text-neutral-600">“Customers trust the logo and the menu stays up to date.”</p>
            </div>

            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“SVG exports saved us”</p>
              <p className="mt-3 text-base text-neutral-600">“Large prints stayed crisp. No blurry QR edges.”</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

function LogoQrFaqSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="faq">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>FAQ</Eyebrow>
            <SectionTitle>QR code with logo FAQs</SectionTitle>
            <SectionSub>Logo sizing, scan reliability, export formats and best practices.</SectionSub>
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

/* -------------------------------------------------------------------------- */
/*  TRUST                                                                     */
/* -------------------------------------------------------------------------- */

function LogoQrTrustSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200" id="trust">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>TRUST</Eyebrow>
            <SectionTitle>Privacy, safety and responsible QR use</SectionTitle>
            <SectionSub>QR codes are powerful — keep scans clean, trusted and controlled.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="mx-auto max-w-3xl space-y-6 text-center text-base md:text-lg leading-relaxed text-neutral-700">
                <p>
                  A logo helps people trust a QR code — but the real safety comes from where it leads.
                  Always link to destinations you control and keep URLs clean and branded when possible.
                </p>
                <p>
                  For campaigns, route destinations through{" "}
                  <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    Kompi Links
                  </Link>{" "}
                  so you can update pages and manage performance over time.
                </p>
                <p>
                  Before printing at scale, test scans on multiple devices and lighting conditions, and keep enough quiet space around the QR so cameras detect it quickly.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  RELATED LINKS                                                             */
/* -------------------------------------------------------------------------- */

function LogoQrRelatedLinksSection() {
  const links = [
    { href: "/qr-code-generator", label: "Standard QR code generator" },
    { href: "/links", label: "Kompi Links — branded short links" },
    { href: "/tools/utm-builder", label: "UTM builder for tracking" },
    { href: "/qr-menus", label: "QR menus for restaurants" },
    { href: "/k-cards", label: "K Cards — link hub" },
    { href: "/kr-codes", label: "KR Codes — advanced QR management" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="related">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>EXPLORE MORE</Eyebrow>
            <SectionTitle>Related Kompi tools & pages</SectionTitle>
            <SectionSub>Build a complete scan-to-action workflow with QR codes, links and workspaces.</SectionSub>
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
    name: "How to create a QR code with a logo",
    description:
      "Upload a logo, choose a high-contrast style, preserve quiet zone, then download a scan-friendly QR code for web or print.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Choose your destination", text: "Decide where your QR should lead. For campaigns, use Kompi Links and add UTMs." },
      { "@type": "HowToStep", position: 2, name: "Upload your logo", text: "Use a clean logo (transparent PNG/SVG preferred). Keep it modest in size and centered." },
      { "@type": "HowToStep", position: 3, name: "Style for scan reliability", text: "Maintain strong contrast, preserve quiet zone, and avoid extreme styling that distorts modules." },
      { "@type": "HowToStep", position: 4, name: "Test and download", text: "Test on multiple devices and lighting conditions, then download PNG for web or SVG for print." },
    ],
  };
}

function getVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "QR Code With Logo Generator Demo",
    description: "A quick walkthrough showing how to upload a logo, generate a QR code with strong contrast, and export scan-friendly files.",
    thumbnailUrl: [`${SITE_URL}/kompi-branding.png`],
    uploadDate: "2025-01-01",
    contentUrl: `${SITE_URL}${SEO_VIDEO_SRC}`,
    embedUrl: `${SITE_URL}${SLUG_PATH}#video`,
  };
}

function getWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi QR Code With Logo Generator",
    url: CANONICAL_URL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    description: "Free QR code with logo generator. Create branded, scan-friendly QR codes and download PNG or SVG for web and print.",
  };
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function Page() {
  const jsonLd = [getWebAppSchema(), getFaqSchema(), getHowToSchema(), getVideoSchema()];

  return (
    <>
      <Script id="qr-with-logo-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />

        <main className="pt-20 md:pt-28 pb-24 space-y-24 md:space-y-32">
          <section>
            <Container>
              <LogoQrIntroSection />
            </Container>
          </section>

          <LogoQrToolSection />
          <LogoQrFeatureIcons />
          <LogoQrVideoSection />
          <LogoQrLongFormArticle />
          <LogoQrUseCasesSection />
          <LogoQrStripSection />
          <LogoQrWhyKompiSection />
          <LogoQrComparisonSection />
          <LogoQrTestimonialSection />
          <LogoQrFaqSection />
          <LogoQrTrustSection />
          <LogoQrRelatedLinksSection />
        </main>

        <FooterCTA />
      </div>
    </>
  );
}
