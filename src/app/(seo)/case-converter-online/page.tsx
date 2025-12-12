// src/app/(seo)/case-converter-online/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import {
  CaseSensitive,
  ClipboardCopy,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import CaseConverter from "@/components/tools/CaseConverter";

const SITE_NAME = "Kompi";
const SITE_URL = "https://kompi.ai";
const SLUG = "/case-converter-online";
const CANONICAL_URL = `${SITE_URL}${SLUG}`;
const SEO_VIDEO_SRC = "/seo/case-converter-online.mp4";

/* ---------------------------------------------
   Metadata
---------------------------------------------- */
export const metadata: Metadata = {
  title: "Case Converter Online (Uppercase, Lowercase, Title Case) | Kompi",
  description:
    "Free online case converter to instantly change text to uppercase, lowercase, title case, sentence case, or toggle case. Fast, private, and built for writers, developers, and marketers.",
  keywords: [
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "sentence case converter",
    "text case converter",
    "convert text case online",
    "free case converter",
    "online case converter",
    "uppercase lowercase tool",
    "toggle case",
    "capitalize text online",
    "developer text tools",
    "writer text tools",
  ],
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "website",
    url: CANONICAL_URL,
    title: "Case Converter Online (Uppercase, Lowercase, Title Case) | Kompi",
    description:
      "Convert text case instantly. Uppercase, lowercase, title case, sentence case, and more. Free, fast, and privacy-friendly.",
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/kompi-platform.png`,
        width: 1200,
        height: 630,
        alt: "Kompi case converter tool preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Converter Online | Kompi",
    description:
      "Instantly convert text to uppercase, lowercase, title case, and more. Free online case converter.",
    images: [`${SITE_URL}/kompi-platform.png`],
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

function _Figure({
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

function CaseConverterIntroSection() {
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
          <span>Kompi Tools · Case converter</span>
        </div>

        <div className="space-y-7 md:space-y-9">
          <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
            Case converter{" "}
            <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
              online
            </span>{" "}
            for clean text, fast.
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-neutral-700">
            Instantly convert text to <strong>uppercase</strong>, <strong>lowercase</strong>, <strong>title case</strong>,{" "}
            <strong>sentence case</strong>, or <strong>toggle case</strong>. Perfect for writers, developers, marketers and students.
          </p>

          <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-neutral-600">
            No signups, no fuss — paste your text, pick a case, copy the result.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#case-tool"
              className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
            >
              Convert text now
            </a>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
            >
              Explore all tools
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm font-medium text-neutral-600">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#D1FAE5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>Runs fully in your browser</span>
            </div>
            <span>• Copy-ready output</span>
            <span>• Great for titles & docs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  TOOL                                                                      */
/* -------------------------------------------------------------------------- */

function CaseToolSection() {
  return (
    <section id="case-tool" className="scroll-mt-28">
      <Container>
        <Card className="bg-white">
          <CardBody>
            <Eyebrow>TRY IT NOW</Eyebrow>
            <SectionTitle>Convert your text</SectionTitle>
            <SectionSub>Paste or type text, then pick the case format you need. Quick, clean, and private.</SectionSub>

            <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm md:p-6">
              <CaseConverter />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3 text-sm md:text-base text-neutral-600">
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">One-click conversion</h3>
                <p>Switch case formats instantly without retyping or manual editing.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Keeps spacing</h3>
                <p>Preserve punctuation and line breaks so your text stays usable.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Copy and paste</h3>
                <p>Convert, then copy the result into docs, code, emails, or CMS fields.</p>
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

function CaseFeatureIcons() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Eyebrow>FEATURES</Eyebrow>
            <SectionTitle>Everything you need from a case converter</SectionTitle>
            <SectionSub>Fast conversions for titles, docs, code strings and marketing copy.</SectionSub>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <IconFeature icon={<CaseSensitive className="h-5 w-5" />} bg="#E0F2FE" title="All common cases">
              Uppercase, lowercase, title case, sentence case, and toggle case — in one place.
            </IconFeature>

            <IconFeature icon={<Zap className="h-5 w-5" />} bg="#DCFCE7" title="Instant results">
              Convert large blocks of text quickly, with zero setup.
            </IconFeature>

            <IconFeature icon={<ShieldCheck className="h-5 w-5" />} bg="#FEF3C7" title="Privacy-friendly">
              Designed to run in your browser so your text doesn’t need to be uploaded.
            </IconFeature>

            <IconFeature icon={<ClipboardCopy className="h-5 w-5" />} bg="#EDE9FE" title="Copy-ready output">
              Convert, copy, and drop straight into your doc, CMS, email, or code.
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

function CaseVideoSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="video">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>DEMO</Eyebrow>
            <SectionTitle>Watch how it works</SectionTitle>
            <SectionSub>Paste text, choose your case, copy the result. That’s it.</SectionSub>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-black shadow-sm">
            <video className="aspect-video w-full object-cover" src={SEO_VIDEO_SRC} autoPlay muted loop playsInline preload="metadata" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  LONG-FORM (SEO) — BROKEN INTO CARDS                                       */
/* -------------------------------------------------------------------------- */

function CaseLongFormArticle() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4]" aria-labelledby="case-guide-heading">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <Card>
            <CardBody>
              <Eyebrow>GUIDE</Eyebrow>
              <h2 id="case-guide-heading" className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                What is a case converter and when should you use one?
              </h2>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                A <strong>case converter</strong> changes capitalization without changing the underlying text. Instead of manually retyping,
                you can convert content into uppercase, lowercase, title case, sentence case, or toggle case instantly.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#E0F2FE] flex items-center justify-center">
                    <KeyRound className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B0F1A]">Uppercase</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Great for labels, headings, emphasis, and “shouty” UI copy.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B0F1A]">Title / Sentence</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Ideal for blog titles, docs, headings, and readable paragraphs.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center">
                    <Zap className="h-5 w-5 text-[#0B0F1A]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0B0F1A]">Lower / Toggle</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Useful for normalization, usernames, quick fixes, and pasted text cleanup.
                  </p>
                </div>
              </div>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                Related tools:{" "}
                <Link href="/word-counter" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  Word Counter
                </Link>
                ,{" "}
                <Link href="/character-counter" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  Character Counter
                </Link>
                ,{" "}
                <Link href="/json-formatter" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  JSON Formatter
                </Link>
                .
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>USE CASES</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Popular ways people use a case converter
              </h3>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {[
                  { title: "Formatting blog titles", desc: "Convert headlines to title case for publishing and consistency." },
                  { title: "Cleaning up copied text", desc: "Fix inconsistent capitalization after pasting from PDFs, docs or emails." },
                  { title: "Preparing code strings", desc: "Normalize copy before mapping, exporting, or using it in apps/scripts." },
                  { title: "Optimizing marketing copy", desc: "Keep ads, landing pages and email subject lines consistent." },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-7">
                    <h4 className="text-xl font-bold text-[#0B0F1A]">{item.title}</h4>
                    <p className="mt-2 text-base text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
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
/*  STRIP (rectangular + breathing room)                                      */
/* -------------------------------------------------------------------------- */

function CaseStripSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="rounded-3xl bg-[#1E2330] px-8 py-14 text-center text-[#E5F9F0] sm:px-12 md:px-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Stop retyping headings.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[#E5E7EB] leading-relaxed">
            Convert casing in seconds and keep your writing, docs, and UI copy consistent across channels.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#case-tool"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
            >
              Convert text
            </a>
            <Link
              href="/tools"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Browse tools
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

const PAGE_FAQS = [
  { q: "Is this case converter free?", a: "Yes. Kompi’s case converter is free to use." },
  { q: "Does Kompi store my text?", a: "No. Conversions are designed to happen locally in your browser." },
  { q: "Can I convert large blocks of text?", a: "Yes. You can paste long content and convert it instantly." },
  { q: "Which formats are supported?", a: "Uppercase, lowercase, title case, sentence case, and toggle case." },
  { q: "Does it work on mobile?", a: "Yes. The case converter is responsive and works on mobile devices." },
  { q: "Do I need an account?", a: "No account required." },
];

function CaseFaqSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="faq">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>FAQ</Eyebrow>
            <SectionTitle>Case converter FAQs</SectionTitle>
            <SectionSub>Common questions about privacy, formats, and usage.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="space-y-4">
                {PAGE_FAQS.map((f) => (
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

function CaseTrustSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200" id="trust">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>TRUST</Eyebrow>
            <SectionTitle>Fast, clean, and privacy-friendly</SectionTitle>
            <SectionSub>Built for everyday text work — without clutter.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="mx-auto max-w-3xl space-y-6 text-center text-base md:text-lg leading-relaxed text-neutral-700">
                <p>
                  Kompi tools are designed to be simple and reliable. For text tools like case conversion, the best experience is fast and distraction-free.
                </p>
                <p>
                  Need more creator utilities? Browse{" "}
                  <Link href="/tools" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    Kompi tools
                  </Link>{" "}
                  for writing, marketing and development.
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

function CaseRelatedLinksSection() {
  const links = [
    { href: "/word-counter", label: "Word Counter" },
    { href: "/character-counter", label: "Character Counter" },
    { href: "/json-formatter", label: "JSON Formatter" },
    { href: "/tools", label: "All Kompi tools" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200" id="related">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>EXPLORE MORE</Eyebrow>
            <SectionTitle>Related Kompi tools</SectionTitle>
            <SectionSub>More quick utilities for writing, marketing and dev workflows.</SectionSub>
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

/* ---------------------------------------------
   Page
---------------------------------------------- */
export default function Page() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PAGE_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert text case online",
    description: "Paste your text, choose a case format, then copy the result.",
    step: [
      { "@type": "HowToStep", position: 1, name: "Paste your text", text: "Paste or type the text you want to convert." },
      { "@type": "HowToStep", position: 2, name: "Choose a case format", text: "Select uppercase, lowercase, title case, sentence case, or toggle case." },
      { "@type": "HowToStep", position: 3, name: "Copy the result", text: "Copy the converted text and use it anywhere." },
    ],
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Case Converter Online Demo",
    description: "A short demo showing how to convert text case using Kompi’s free tool.",
    thumbnailUrl: [`${SITE_URL}/kompi-platform.png`],
    uploadDate: "2025-01-01",
    contentUrl: `${SITE_URL}${SEO_VIDEO_SRC}`,
    embedUrl: `${SITE_URL}${SLUG}#video`,
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi Case Converter",
    url: CANONICAL_URL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const jsonLd = [webAppJsonLd, faqJsonLd, howToJsonLd, videoJsonLd];

  return (
    <>
      <Script id="case-converter-online-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />

        <main className="pt-20 md:pt-28 pb-24 space-y-24 md:space-y-32">
          <section>
            <Container>
              <CaseConverterIntroSection />
            </Container>
          </section>

          <CaseToolSection />
          <CaseFeatureIcons />
          <CaseVideoSection />
          <CaseLongFormArticle />
          <CaseStripSection />
          <CaseFaqSection />
          <CaseTrustSection />
          <CaseRelatedLinksSection />
        </main>

        <FooterCTA />
      </div>
    </>
  );
}
