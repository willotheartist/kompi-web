// src/app/(seo)/qr-gen-online/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { Globe, QrCode, Palette, BarChart3 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { KRCode2 } from "@/components/kr-codes/KRCode2";

const DOMAIN = "https://kompi.app";
const SEO_VIDEO_SRC = "/seo/qr-gen-online.mp4";
const SEO_VIDEO_ABS = `${DOMAIN}${SEO_VIDEO_SRC}`;
const SEO_THUMBNAIL_ABS = `${DOMAIN}/kompi-platform.png`;

export const metadata: Metadata = {
  title: "Free QR Gen Online | Fast QR Code Generator by Kompi",
  description:
    "Use Kompi's free qr gen tool to create custom QR codes online in seconds. Generate QR codes with colors, logos, tracking and high-quality downloads – no design skills needed.",
  keywords: [
    "qr gen",
    "qr generator",
    "qr code generator",
    "online qr gen",
    "free qr gen",
    "create qr code",
    "qr code maker",
    "qr code creator",
    "qr code generator with logo",
  ],
  alternates: { canonical: "/qr-gen-online" },
  openGraph: {
    title: "Free QR Gen Online | Fast QR Code Generator by Kompi",
    description:
      "Generate custom QR codes with Kompi's online qr gen tool. Add your brand colors, logo and tracking, then download print-ready QR codes in seconds.",
    url: `${DOMAIN}/qr-gen-online`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Gen Online | Fast QR Code Generator by Kompi",
    description: "Create branded QR codes in seconds with Kompi's free online qr gen tool.",
  },
  robots: { index: true, follow: true },
};

const faqs = [
  {
    question: "What is a QR gen tool?",
    answer:
      "A QR gen tool (QR generator) lets you create QR codes from links, menus, contact details, Wi-Fi passwords and more. With Kompi, you can customize colors, shapes and logos, then download high-quality QR codes ready for print or digital use.",
  },
  {
    question: "Is Kompi’s qr gen free to use?",
    answer:
      "Yes, you can use Kompi’s free qr gen online to create and download QR codes. Advanced features like branded workspaces, analytics, dynamic QR codes and team collaboration are available on paid plans.",
  },
  {
    question: "What’s the difference between static and dynamic QR codes?",
    answer:
      "Static QR codes always point to the same destination once created. Dynamic QR codes can be updated later without changing the printed code, and can track scans and engagement — ideal for campaigns, menus and business cards.",
  },
  {
    question: "Can I track how many times my QR code is scanned?",
    answer:
      "Yes. When you create dynamic QR codes with Kompi, you can see scan counts and trends in your analytics dashboard. That helps you understand which campaigns and placements perform best.",
  },
  {
    question: "What file format should I use for printing QR codes?",
    answer:
      "For most print use cases, high-resolution PNG is perfect. If you’re printing at very large sizes, vector formats like SVG or PDF are ideal. Kompi’s qr gen tool can export QR codes suitable for both digital and print use.",
  },
  {
    question: "Can I use custom colors and a logo in my QR codes?",
    answer:
      "Yes. Kompi lets you pick your brand colors, adjust corner and dot styles, and upload a logo in the center of the QR code. We handle contrast and sizing considerations so your QR codes stay easy to scan.",
  },
];

/* -------------------------------------------------------------------------- */
/*  SMALL UI PRIMITIVES (consistent, modern, “Coolors-like”)                  */
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

function FigureContain({
  src,
  alt,
  max = 340,
}: {
  src: string;
  alt: string;
  max?: number;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10">
      <div className={`relative mx-auto aspect-square w-full max-w-[${max}px]`}>
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 80vw, 340px" className="object-contain" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

function QrGenIntroSection() {
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
          <span>Kompi Tools · Free online qr gen</span>
        </div>

        <div className="space-y-7 md:space-y-9">
          <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
            Free{" "}
            <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
              QR gen online
            </span>{" "}
            to turn your links into branded QR codes.
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-neutral-700">
            Use Kompi&apos;s fast <strong>qr gen</strong> tool to create QR codes for links, menus, Wi-Fi, business cards and more.
            Customize colors, shapes and logos, then download print-ready QR codes in just a few clicks.
          </p>

          <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-neutral-600">
            No design skills needed – paste your link, tweak your QR style, and share or print your code anywhere.
            Ideal for creators, small businesses, brands and agencies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#qr-gen-tool"
              className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
            >
              Generate QR codes
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
            >
              Save QR codes in my Kompi workspace
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm font-medium text-neutral-600">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#D1FAE5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>Runs fully in your browser</span>
            </div>
            <span>• Dynamic &amp; static QR codes</span>
            <span>• High-res downloads for print</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  VIDEO                                                                      */
/* -------------------------------------------------------------------------- */

function QrGenVideoSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4]">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>60-SECOND DEMO</Eyebrow>
            <SectionTitle>Watch how Kompi qr gen works</SectionTitle>
            <SectionSub>
              Paste a link, customize your QR code, and download a print-ready file. No signups, no setup — just scan-ready codes.
            </SectionSub>
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
/*  LONG-FORM (SEO) — VISUALLY BROKEN INTO CARDS                               */
/* -------------------------------------------------------------------------- */

function QrGenLongFormArticle() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4]" aria-labelledby="qr-gen-guide-heading">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <Card>
            <CardBody>
              <Eyebrow>QR GEN GUIDE</Eyebrow>
              <h2 id="qr-gen-guide-heading" className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                What is an online qr gen and how does it work?
              </h2>
              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                A <strong>qr gen</strong> (QR generator) is a tool that converts information — usually a URL — into a scannable QR code.
                When someone scans that QR code with their phone camera, they&apos;re taken directly to your link, menu, profile, form or file.
                Kompi&apos;s online qr gen focuses on speed, branding and analytics so you can ship campaigns faster and know what&apos;s actually working.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Figure src="/kompi-platform.png" alt="Kompi QR generator interface" aspect="aspect-[16/10]" priority />
                <Figure src="/kompi-analytics.png" alt="Kompi analytics" aspect="aspect-[16/10]" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>STATIC VS DYNAMIC</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Static vs dynamic QR codes
              </h3>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                When you generate a QR code, you&apos;ll typically choose between <strong>static</strong> and <strong>dynamic</strong> QR codes:
              </p>

              <ul className="mt-8 mx-auto max-w-3xl space-y-4 text-left text-base md:text-lg leading-relaxed text-neutral-700 list-disc list-inside">
                <li>
                  <strong>Static QR codes</strong> always point to the same destination. They&apos;re perfect for long-term, unchanging links:
                  your homepage, a simple menu PDF or a one-time resource.
                </li>
                <li>
                  <strong>Dynamic QR codes</strong> give you flexibility. You can change the destination later without reprinting, and you can track scans and engagement over time.
                </li>
              </ul>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <FigureContain src="/kroptions/classic.png" alt="Classic QR style" />
                <FigureContain src="/kroptions/rounded.png" alt="Rounded QR style" />
              </div>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                With Kompi, you can start with a simple static QR code, then upgrade to dynamic when you&apos;re ready for analytics and campaigns.
                If you need fully flexible, trackable codes at scale, explore{" "}
                <Link href="/kr-codes" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  Kompi KR Codes
                </Link>{" "}
                for advanced QR code management.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>USE CASES</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Best use cases for qr gen in 2025
              </h3>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                QR codes are now part of everyday behaviour. People expect to scan for menus, offers and more. Here are a few high-impact ways to use an{" "}
                <strong>online qr generator and qr code maker like Kompi&apos;s</strong>:
              </p>

              <ul className="mt-8 mx-auto max-w-3xl space-y-4 text-left text-base md:text-lg leading-relaxed text-neutral-700 list-disc list-inside">
                <li>
                  <strong>Restaurants & cafés:</strong> link to digital menus, order forms or feedback pages using{" "}
                  <Link href="/qr-menus" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    QR menus
                  </Link>
                  .
                </li>
                <li>
                  <strong>Brands & packaging:</strong> send people from packaging to product pages, how-to guides or loyalty programs.
                </li>
                <li>
                  <strong>Events & conferences:</strong> put QR codes on badges, banners and slides to share schedules, slides, signups or contact cards.
                </li>
                <li>
                  <strong>Creators & personal brands:</strong> use QR codes to link directly to your{" "}
                  <Link href="/k-cards" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    Kompi Card
                  </Link>{" "}
                  or link-in-bio page.
                </li>
                <li>
                  <strong>Retail & offline ads:</strong> add QR codes to posters, flyers and displays to capture traffic and track campaign performance.
                </li>
              </ul>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <Figure src="/growth/menu-builder.png" alt="QR menus" aspect="aspect-[16/11]" />
                <Figure src="/growth/links.png" alt="Campaign links" aspect="aspect-[16/11]" />
                <Figure src="/growth/k-cards.png" alt="Kompi cards" aspect="aspect-[16/11]" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>WORKFLOW</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                How to create a QR code with Kompi&apos;s qr gen
              </h3>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                You don&apos;t need to be technical to use Kompi as your <strong>qr code generator</strong>. Here&apos;s a simple workflow:
              </p>

              <ol className="mt-8 mx-auto max-w-3xl space-y-4 text-left text-base md:text-lg leading-relaxed text-neutral-700 list-decimal list-inside">
                <li>Paste the URL or content you want to share.</li>
                <li>Pick your QR style: classic dots, rounded, diamond and more. You can match your brand colors and add a logo.</li>
                <li>Choose whether you need a simple static code or a dynamic QR code with tracking.</li>
                <li>Generate your QR code, test it with your phone, then download a high-quality file for print or digital use.</li>
              </ol>

              <div className="mt-10">
                <Figure src="/growth/kompi-codes.png" alt="Kompi codes" aspect="aspect-[21/9]" />
              </div>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                If you&apos;re running campaigns, pair your QR codes with{" "}
                <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  Kompi links
                </Link>{" "}
                and{" "}
                <Link href="/tools/utm-builder" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  UTM builder
                </Link>{" "}
                so you can see performance inside your analytics.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>DESIGN</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Design and branding tips for QR codes
              </h3>

              <div className="mt-10">
                <Figure src="/kompi-branding.png" alt="Kompi branding" aspect="aspect-[21/9]" />
              </div>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                A good QR code has two jobs: it should be <strong>instantly scannable</strong> and look like it belongs to your brand.
                When using Kompi&apos;s qr gen:
              </p>

              <ul className="mt-8 mx-auto max-w-3xl space-y-4 text-left text-base md:text-lg leading-relaxed text-neutral-700 list-disc list-inside">
                <li>Maintain strong contrast between the QR code foreground and background.</li>
                <li>Avoid making the logo too large — leave enough data modules visible so it remains scannable.</li>
                <li>Keep enough quiet space (margin) around the QR code so cameras can detect it easily.</li>
                <li>Test your QR code on multiple devices and lighting conditions before printing at scale.</li>
              </ul>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                Kompi supports <strong>qr code generator with logo</strong> use cases while keeping your codes clean and on-brand.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>PRINT & SAFETY</Eyebrow>

              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Print, file formats and scanability
              </h3>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                For most people, the easiest option is to download a <strong>high-resolution PNG</strong> from the qr gen and drop it into your design tool or document.
                If you&apos;re working on large-format prints like billboards or trade-show stands, consider vector-style outputs where available.
              </p>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                As a rule of thumb, the farther away people will stand, the larger the QR code needs to be. Always print a sample and test it from the actual distance where people will scan.
              </p>

              <div className="mt-12 h-px w-full bg-neutral-200" />

              <h3 className="mt-12 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Security, privacy and link control
              </h3>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                QR codes are simply a way to encode data — usually a URL. The security and privacy experience comes from where that URL leads.
                With Kompi, you stay in control of your destinations and workspace:
              </p>

              <ul className="mt-8 mx-auto max-w-3xl space-y-4 text-left text-base md:text-lg leading-relaxed text-neutral-700 list-disc list-inside">
                <li>You decide which links your QR codes point to, and you can update them when you use dynamic codes.</li>
                <li>You can pause or redirect campaigns without reprinting, by updating the underlying link.</li>
                <li>
                  You can keep QR codes mapped to your{" "}
                  <Link href="/qr-code-generator" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    core QR generator
                  </Link>{" "}
                  setup or to individual campaign pages.
                </li>
              </ul>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                As with any QR code, encourage users to scan codes from trusted sources, and keep your own links clean, simple and branded when possible.
              </p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  USE CASE CARDS                                                           */
/* -------------------------------------------------------------------------- */

function QrGenTypesSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>QR CODES FOR ANY PLACE PEOPLE SCAN</Eyebrow>
            <SectionTitle>One qr gen, three very normal use cases.</SectionTitle>
            <SectionSub>
              Kompi&apos;s <strong>online qr gen</strong> works for menus, campaigns and profiles. Start simple with static codes, then upgrade to dynamic when you&apos;re ready to track scans.
            </SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">MENUS & PRINT</p>
                <h3 className="text-xl font-bold text-[#0B0F1A]">For restaurants & cafés</h3>
                <p className="text-base text-neutral-700">
                  Link table tents, window stickers and flyers to{" "}
                  <Link href="/qr-menus" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    QR menus
                  </Link>{" "}
                  you can update anytime.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-700">
                  <li>• Swap menus without reprinting</li>
                  <li>• Send people to offers or feedback</li>
                  <li>• Track which locations scan most</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#DCFCE7] p-7 ring-2 ring-[#1E2330]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  Recommended
                </div>
                <h3 className="text-xl font-bold text-[#0B0F1A]">For campaigns & packaging</h3>
                <p className="text-base text-neutral-800">
                  Turn posters, boxes and in-store displays into trackable entry points that all route through Kompi links.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-800">
                  <li>• Point scans to a landing page</li>
                  <li>• Use one QR across channels</li>
                  <li>• Update offers without reprints</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#E0F2FE] p-7 ring-1 ring-[#BFDBFE]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1D4ED8]">CREATORS & TEAMS</p>
                <h3 className="text-xl font-bold text-[#0B0F1A]">For profiles & link-in-bio</h3>
                <p className="text-base text-neutral-700">
                  Drive scans to a{" "}
                  <Link href="/k-cards" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                    Kompi Card
                  </Link>{" "}
                  or link-in-bio page that holds everything you want people to see.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-700">
                  <li>• Share one scannable identity</li>
                  <li>• Route people to socials & offers</li>
                  <li>• Keep everything editable over time</li>
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
/*  STRIP                                                                     */
/* -------------------------------------------------------------------------- */

function QrGenStripSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="rounded-3xl bg-[#1E2330] border border-white/10 px-6 py-12 text-center text-[#E5F9F0] sm:px-10 sm:py-14 md:px-14 md:py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Your QR codes shouldn&apos;t live in a totally separate system.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base md:text-lg text-[#E5E7EB] leading-relaxed">
            Use Kompi to generate QR codes that stay connected to your links, menus and analytics. Change where they point without changing the print, packaging or signage.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#qr-gen-tool"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
            >
              Generate QR codes
            </a>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-[#E5F9F0]/60 bg-transparent px-7 py-3 text-sm font-semibold text-[#E5F9F0] hover:bg-[#E5F9F0]/10"
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

function QrGenWhyKompiSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>WHY KOMPI</Eyebrow>
            <SectionTitle>Why use Kompi for qr gen?</SectionTitle>
            <SectionSub>
              Kompi gives you a clean <strong>online qr generator</strong> plus simple tools for branding, tracking and organizing your QR codes as you grow.
            </SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Built for branding</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">QR codes that look like your brand</h3>
              <p className="text-base text-neutral-600">Use your brand colors, shapes and logo so QR codes feel like part of your design, not an afterthought.</p>
            </div>

            <div className="rounded-3xl bg-white border border-emerald-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">Simple analytics</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">See what&apos;s getting scanned</h3>
              <p className="text-base text-neutral-600">When you&apos;re ready, add dynamic QR codes and basic analytics so you can see which menus, posters or campaigns perform best.</p>
            </div>

            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">Part of Kompi</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">One place for links &amp; QR</h3>
              <p className="text-base text-neutral-600">Use qr gen alongside Kompi links, menus and cards so everything lives in one simple workspace.</p>
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

function QrGenComparisonSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>COMPARISON</Eyebrow>
            <SectionTitle>Kompi vs typical QR code generators</SectionTitle>
            <SectionSub>
              There are many <strong>qr code generators</strong> online. Kompi is designed for people who want a fast qr gen tool that also fits into a bigger growth stack — not just a one-off download.
            </SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-4 pr-4 font-bold text-neutral-900">Feature</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Kompi QR Gen</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Typical free QR generator</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Branding & styles</td>
                      <td className="py-4 px-4">Multiple styles, brand colors, logos and layouts.</td>
                      <td className="py-4 px-4">Basic black-and-white codes with limited customization.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Dynamic QR support</td>
                      <td className="py-4 px-4">Dynamic QR codes with analytics and editable destinations.</td>
                      <td className="py-4 px-4">Often static-only or limited dynamic features.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Analytics & tracking</td>
                      <td className="py-4 px-4">Scan insights, trends and link performance across campaigns.</td>
                      <td className="py-4 px-4">Basic or no analytics, often outside your main workflows.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Part of a growth stack</td>
                      <td className="py-4 px-4">Works with Kompi links, menus, subscribers and workspaces.</td>
                      <td className="py-4 px-4">Standalone tools that don&apos;t connect to the rest of your stack.</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">Team & workspace friendly</td>
                      <td className="py-4 px-4">Built for creators, brands and agencies managing multiple projects.</td>
                      <td className="py-4 px-4">Often designed for single-use, one-off QR creation.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-8 text-center text-base md:text-lg text-neutral-600">
                Kompi&apos;s qr gen is ideal if you want to start free and grow into a more advanced setup over time — without switching platforms.
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

function QrGenTestimonialSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>LESS FRICTION, MORE SCANS</Eyebrow>
            <SectionTitle>More “scan, done”. Less “which generator was that?”</SectionTitle>
            <SectionSub>Simple, fast QR creation that stays connected to your links and campaigns.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“Everything runs through Kompi now”</p>
              <p className="mt-3 text-base text-neutral-600">“Nice to have QR codes, links and menus in one place instead of three random tools.”</p>
            </div>

            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“Fast to generate, easy to scan”</p>
              <p className="mt-3 text-base text-neutral-600">“We dropped the QR codes onto our menus and posters, and every phone we tried picked them up instantly.”</p>
            </div>

            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“No more dead links on print”</p>
              <p className="mt-3 text-base text-neutral-600">“If something changes, we update the Kompi link and the QR codes just keep working. No frantic reprints.”</p>
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

function QrGenFaqSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>FAQ</Eyebrow>
            <SectionTitle>QR gen FAQs</SectionTitle>
            <SectionSub>Everything you need to know about using Kompi as your online qr gen and QR code generator.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-2xl border border-neutral-200 bg-white p-5 md:p-6"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                      <span className="text-base md:text-lg font-semibold text-neutral-900">{faq.question}</span>
                      <span className="text-sm text-neutral-500 group-open:hidden">+</span>
                      <span className="text-sm text-neutral-500 hidden group-open:inline">−</span>
                    </summary>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700">{faq.answer}</p>
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

function QrGenTrustSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>TRUST</Eyebrow>
            <SectionTitle>Privacy, safety and responsible QR use</SectionTitle>
            <SectionSub>QR codes are powerful — and the experience depends on where they lead. Keep it trusted, clean and controlled.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="mx-auto max-w-3xl space-y-6 text-center text-base md:text-lg leading-relaxed text-neutral-700">
                <p>
                  Kompi provides tools to help you create and manage QR codes. As with any QR code, the safety of the experience depends on where the code leads.
                  Always link to pages you trust and control, and encourage your audience to scan codes from trusted sources.
                </p>
                <p>
                  When you use Kompi&apos;s qr gen together with dynamic QR features, you can update destinations and pause campaigns without reprinting.
                  That gives you more control over what happens after every scan.
                </p>
                <p>
                  For more advanced setups, pair qr gen with Kompi&apos;s workspaces, links and analytics so you can organise your campaigns and understand performance over time.
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

function QrGenRelatedLinksSection() {
  const links = [
    { href: "/qr-code-generator", label: "Core QR code generator" },
    { href: "/qr-code/with-logo", label: "QR code generator with logo" },
    { href: "/qr-menus", label: "QR menus for restaurants" },
    { href: "/k-cards", label: "Kompi Cards – link in bio" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>EXPLORE MORE</Eyebrow>
            <SectionTitle>Related Kompi tools & pages</SectionTitle>
            <SectionSub>Explore more QR and link tools that work seamlessly with Kompi qr gen.</SectionSub>
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
/*  ICON FEATURES (Coolors-style visual grid)                                  */
/* -------------------------------------------------------------------------- */

function IconFeature({
  icon,
  bg,
  color,
  title,
  children,
}: {
  icon: LucideIcon;
  bg: string;
  color: string;
  title: string;
  children: React.ReactNode;
}) {
  const Icon = icon;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: bg }}
      >
        <Icon className="h-7 w-7" style={{ color }} aria-hidden="true" />
      </div>

      <h3 className="text-lg font-semibold text-[#0B0F1A]">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-600">{children}</p>
    </div>
  );
}


function QrGenFeatureIcons() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Eyebrow>FEATURES</Eyebrow>
            <SectionTitle>Everything you expect from a modern qr gen</SectionTitle>
            <SectionSub>
              Simple to start, powerful when you need more. No clutter, no setup.
            </SectionSub>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <IconFeature icon={Globe} bg="#E0F2FE" color="#0284C7" title="Works everywhere">
              QR codes scan instantly on iOS and Android using standard phone
              cameras. No apps required.
            </IconFeature>

            <IconFeature icon={QrCode} bg="#DCFCE7" color="#16A34A" title="Static & dynamic QR">
              Start with a simple static QR code, then upgrade to dynamic codes
              with editable destinations and tracking.
            </IconFeature>

            <IconFeature icon={Palette} bg="#FEF3C7" color="#D97706" title="Brand-ready designs">
              Match your brand with colors, corner styles and optional logos —
              without breaking scanability.
            </IconFeature>

            <IconFeature icon={BarChart3} bg="#EDE9FE" color="#7C3AED" title="Scan analytics">
              See how often your QR codes are scanned and which campaigns perform
              best over time.
            </IconFeature>
          </div>
        </div>
      </Container>
    </section>
  );
}


/* -------------------------------------------------------------------------- */
/*  PAGE + JSON-LD                                                            */
/* -------------------------------------------------------------------------- */

export default function QrGenOnlinePage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi QR Gen Online",
    applicationCategory: "UtilityApplication",
    description: "Free online qr gen tool to create custom QR codes with branding, colors and tracking.",
    operatingSystem: "Any",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create a QR code with Kompi",
    description: "Simple steps to generate a QR code using Kompi's free online qr gen tool.",
    step: [
      { "@type": "HowToStep", name: "Paste your link or content", text: "Paste the URL or content you want people to visit after scanning your QR code." },
      { "@type": "HowToStep", name: "Customize the QR style", text: "Choose your QR style, colors and optional logo to match your brand." },
      { "@type": "HowToStep", name: "Select static or dynamic", text: "Decide whether you need a simple static QR code or a dynamic QR code with tracking and flexible destinations." },
      { "@type": "HowToStep", name: "Generate, test and download", text: "Generate your QR code, test it with your phone camera, then download a high-quality file for print or digital use." },
    ],
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "How to use Kompi qr gen",
    description: "Step-by-step walkthrough of creating a QR code with Kompi's free qr gen tool.",
    thumbnailUrl: [SEO_THUMBNAIL_ABS],
    uploadDate: "2025-01-01",
    contentUrl: SEO_VIDEO_ABS,
    embedUrl: SEO_VIDEO_ABS,
  };

  const jsonLd = [webAppSchema, faqSchema, howToSchema, videoSchema];

  return (
    <>
      <Script id="qr-gen-online-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />

        {/* BIGGER PAGE RHYTHM */}
        <main className="pt-20 md:pt-28 pb-24 space-y-24 md:space-y-32">
          {/* Hero */}
          <section>
            <Container>
              <QrGenIntroSection />
            </Container>
          </section>

          {/* QR tool */}
          <section id="qr-gen-tool" className="scroll-mt-28">
            <Container>
              <Card className="bg-white">
                <CardBody>
                  <Eyebrow>TRY IT NOW</Eyebrow>
                  <SectionTitle>Generate your QR code</SectionTitle>
                  <SectionSub>Free online qr gen. Customize your style, then download a scan-ready code.</SectionSub>

                  <div className="mt-10">
                    <KRCode2 />
                  </div>
                </CardBody>
              </Card>
            </Container>
          </section>

          <QrGenFeatureIcons />
          <QrGenVideoSection />
          <QrGenLongFormArticle />
          <QrGenTypesSection />
          <QrGenStripSection />
          <QrGenWhyKompiSection />
          <QrGenComparisonSection />
          <QrGenTestimonialSection />
          <QrGenFaqSection />
          <QrGenTrustSection />
          <QrGenRelatedLinksSection />
        </main>

        <FooterCTA />
      </div>
    </>
  );
}
