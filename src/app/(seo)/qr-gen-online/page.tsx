// src/app/(seo)/qr-gen-online/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { KRCode2 } from "@/components/kr-codes/KRCode2";

const DOMAIN = "https://kompi.app";
const SEO_VIDEO_SRC = "/seo/qr-gen-online.mp4";
const SEO_VIDEO_ABS = `${DOMAIN}${SEO_VIDEO_SRC}`;
const SEO_THUMBNAIL_ABS = `${DOMAIN}/kompi-platform.png`; // update if you add a specific thumbnail

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
  alternates: {
    canonical: "/qr-gen-online",
  },
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
    description:
      "Create branded QR codes in seconds with Kompi's free online qr gen tool.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
/*  HERO SECTION – barcode-style layout                                      */
/* -------------------------------------------------------------------------- */

function QrGenIntroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* soft gradient behind hero, inspired by barcode page */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 transform-gpu blur-3xl">
        <div className="mx-auto h-48 max-w-3xl bg-gradient-to-r from-[#A3CF3D] via-[#9BDFD1] to-[#4B9FFF] opacity-70" />
      </div>

      <div className="mx-auto flex flex-col items-center justify-center px-2 py-10 text-center sm:px-4 md:py-14">
        {/* pill badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#D1FAE5]">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1E2330] text-[10px] font-semibold text-white">
            K
          </span>
          <span>Kompi Tools · Free online qr gen</span>
        </div>

        <div className="space-y-6 sm:space-y-7">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Free{" "}
            <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
              QR gen online
            </span>{" "}
            to turn your links into branded QR codes.
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
            Use Kompi&apos;s fast <strong>qr gen</strong> tool to create QR
            codes for links, menus, Wi-Fi, business cards and more. Customize
            colors, shapes and logos, then download print-ready QR codes in just
            a few clicks.
          </p>

          <p className="mx-auto max-w-xl text-xs leading-relaxed text-[#6B7280] sm:text-sm">
            No design skills needed – paste your link, tweak your QR style, and
            share or print your code anywhere. Ideal for creators, small
            businesses, brands and agencies.
          </p>

          {/* CTAs – similar to barcode generator */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#qr-gen-tool"
              className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
            >
              Generate QR codes
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
            >
              Save QR codes in my Kompi workspace
            </Link>
          </div>

          {/* benefit chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
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
/*  VIDEO SECTION – big centred block                                        */
/* -------------------------------------------------------------------------- */

function QrGenVideoSection() {
  return (
    <section className="px-4 mt-12 md:mt-14">
      <div className="max-w-5xl mx-auto space-y-6 text-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Watch how Kompi qr gen works in under a minute
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
            See how to paste a link, customize your QR code and download a
            print-ready file. No signups, no setup — just scan-ready codes.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white border border-neutral-200 shadow-sm p-3 sm:p-4 md:p-5">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900/80 flex items-center justify-center">
            <video
              className="h-full w-full"
              src={SEO_VIDEO_SRC}
              controls
              preload="metadata"
              poster="/kompi-platform.png" // optional: thumbnail in /public/seo
            >
              Sorry, your browser doesn&apos;t support embedded videos. You can
              download it directly from <a href={SEO_VIDEO_SRC}>this link</a>.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  LONG-FORM ARTICLE                                                        */
/* -------------------------------------------------------------------------- */

function QrGenLongFormArticle() {
  return (
    <section
      className="px-4 mt-14 md:mt-16"
      aria-labelledby="qr-gen-guide-heading"
    >
      <div className="max-w-5xl mx-auto rounded-[2rem] bg-white border border-neutral-200 shadow-sm p-6 md:p-8 lg:p-10 space-y-8 text-neutral-800 text-sm md:text-base leading-relaxed">
        <header className="space-y-3">
          <h2
            id="qr-gen-guide-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            What is an online qr gen and how does it work?
          </h2>
          <p>
            A <strong>qr gen</strong> (QR generator) is a tool that converts
            information — usually a URL — into a scannable QR code. When someone
            scans that QR code with their phone camera, they&apos;re taken
            directly to your link, menu, profile, form or file. Kompi&apos;s
            online qr gen focuses on speed, branding and analytics so you can
            ship campaigns faster and know what&apos;s actually working.
          </p>
        </header>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Static vs dynamic QR codes
          </h3>
          <p>
            When you generate a QR code, you&apos;ll typically choose between{" "}
            <strong>static</strong> and <strong>dynamic</strong> QR codes:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Static QR codes</strong> always point to the same
              destination. They&apos;re perfect for long-term, unchanging links:
              your homepage, a simple menu PDF or a one-time resource.
            </li>
            <li>
              <strong>Dynamic QR codes</strong> give you flexibility. You can
              change the destination later without reprinting, and you can track
              scans and engagement over time.
            </li>
          </ul>
          <p>
            With Kompi, you can start with a simple static QR code, then upgrade
            to dynamic when you&apos;re ready for analytics and campaigns. If
            you need fully flexible, trackable codes at scale, explore{" "}
            <Link
              href="/kr-codes"
              className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700"
            >
              Kompi KR Codes
            </Link>{" "}
            for advanced QR code management.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Best use cases for qr gen in 2025
          </h3>
          <p>
            QR codes are now part of everyday behaviour. People expect to scan
            for menus, offers and more. Here are a few high-impact ways to use
            an{" "}
            <strong>online qr generator and qr code maker like Kompi&apos;s</strong>
            :
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Restaurants & cafés:</strong> link to digital menus,
              order forms or feedback pages using{" "}
              <Link
                href="/qr-menus"
                className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700"
              >
                QR menus
              </Link>
              .
            </li>
            <li>
              <strong>Brands & packaging:</strong> send people from packaging to
              product pages, how-to guides or loyalty programs.
            </li>
            <li>
              <strong>Events & conferences:</strong> put QR codes on badges,
              banners and slides to share schedules, slides, signups or contact
              cards.
            </li>
            <li>
              <strong>Creators & personal brands:</strong> use QR codes to link
              directly to your{" "}
              <Link
                href="/k-cards"
                className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700"
              >
                Kompi Card
              </Link>{" "}
              or link-in-bio page.
            </li>
            <li>
              <strong>Retail & offline ads:</strong> add QR codes to posters,
              flyers and displays to capture traffic and track campaign
              performance.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            How to create a QR code with Kompi&apos;s qr gen
          </h3>
          <p>
            You don&apos;t need to be technical to use Kompi as your{" "}
            <strong>qr code generator</strong>. Here&apos;s a simple workflow:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Paste the URL or content you want to share.</li>
            <li>
              Pick your QR style: classic dots, rounded, diamond and more. You
              can match your brand colors and add a logo.
            </li>
            <li>
              Choose whether you need a simple static code or a dynamic QR code
              with tracking.
            </li>
            <li>
              Generate your QR code, test it with your phone, then download a
              high-quality file for print or digital use.
            </li>
          </ol>
          <p>
            If you&apos;re running campaigns, pair your QR codes with{" "}
            <Link
              href="/links"
              className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700"
            >
              Kompi links
            </Link>{" "}
            and{" "}
            <Link
              href="/tools/utm-builder"
              className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700"
            >
              UTM builder
            </Link>{" "}
            so you can see performance inside your analytics.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Design and branding tips for QR codes
          </h3>
          <p>
            A good QR code has two jobs: it should be{" "}
            <strong>instantly scannable</strong> and look like it belongs to
            your brand. When using Kompi&apos;s qr gen:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Maintain strong contrast between the QR code foreground and
              background.
            </li>
            <li>
              Avoid making the logo too large — leave enough data modules
              visible so it remains scannable.
            </li>
            <li>
              Keep enough quiet space (margin) around the QR code so cameras can
              detect it easily.
            </li>
            <li>
              Test your QR code on multiple devices and lighting conditions
              before printing at scale.
            </li>
          </ul>
          <p>
            Kompi supports <strong>qr code generator with logo</strong> use
            cases while keeping your codes clean and on-brand.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Print, file formats and scanability
          </h3>
          <p>
            For most people, the easiest option is to download a{" "}
            <strong>high-resolution PNG</strong> from the qr gen and drop it
            into your design tool or document. If you&apos;re working on
            large-format prints like billboards or trade-show stands, consider
            vector-style outputs where available.
          </p>
          <p>
            As a rule of thumb, the farther away people will stand, the larger
            the QR code needs to be. Always print a sample and test it from the
            actual distance where people will scan.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Security, privacy and link control
          </h3>
          <p>
            QR codes are simply a way to encode data — usually a URL. The
            security and privacy experience comes from where that URL leads.
            With Kompi, you stay in control of your destinations and workspace:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              You decide which links your QR codes point to, and you can update
              them when you use dynamic codes.
            </li>
            <li>
              You can pause or redirect campaigns without reprinting, by
              updating the underlying link.
            </li>
            <li>
              You can keep QR codes mapped to your{" "}
              <Link
                href="/qr-code-generator"
                className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700"
              >
                core QR generator
              </Link>{" "}
              setup or to individual campaign pages.
            </li>
          </ul>
          <p>
            As with any QR code, encourage users to scan codes from trusted
            sources, and keep your own links clean, simple and branded when
            possible.
          </p>
        </section>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  USE CASE CARDS – plan-style like barcode page                            */
/* -------------------------------------------------------------------------- */

function QrGenTypesSection() {
  return (
    <section className="bg-[#FFFFFF] border-t border-neutral-200 mt-16 md:mt-20">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-10">
        <header className="space-y-3 text-center max-w-3xl mx-auto">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
            QR CODES FOR ANY PLACE PEOPLE SCAN
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight">
            One qr gen, three very normal use cases.
          </p>
          <p className="text-sm md:text-base text-[#4B5563]">
            Kompi&apos;s <strong>online qr gen</strong> works for menus,
            campaigns and profiles. Start simple with static codes, then upgrade
            to dynamic when you&apos;re ready to track scans.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-6 ring-1 ring-[#E5E7EB]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                MENUS & PRINT
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-[#1E2330]">
                For restaurants & cafés
              </h3>
              <p className="text-sm text-[#4B5563]">
                Link table tents, window stickers and flyers to{" "}
                <Link
                  href="/qr-menus"
                  className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700"
                >
                  QR menus
                </Link>{" "}
                you can update anytime.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                <li>• Swap menus without reprinting</li>
                <li>• Send people to offers or feedback</li>
                <li>• Track which locations scan most</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-[#DCFCE7] p-6 ring-2 ring-[#1E2330]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                Recommended
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#1E2330]">
                For campaigns & packaging
              </h3>
              <p className="text-sm text-[#111827]">
                Turn posters, boxes and in-store displays into trackable entry
                points that all route through Kompi links.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                <li>• Point scans to a landing page</li>
                <li>• Use one QR across channels</li>
                <li>• Update offers without reprints</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-[#E0F2FE] p-6 ring-1 ring-[#BFDBFE]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1D4ED8]">
                CREATORS & TEAMS
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-[#1E2330]">
                For profiles & link-in-bio
              </h3>
              <p className="text-sm text-[#4B5563]">
                Drive scans to a{" "}
                <Link
                  href="/k-cards"
                  className="underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-700"
                >
                  Kompi Card
                </Link>{" "}
                or link-in-bio page that holds everything you want people to
                see.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                <li>• Share one scannable identity</li>
                <li>• Route people to socials & offers</li>
                <li>• Keep everything editable over time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  BRIGHT STRIP                                                             */
/* -------------------------------------------------------------------------- */

function QrGenStripSection() {
  return (
    <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8 border-t border-neutral-200">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[999px] bg-[#1E2330] px-6 py-10 text-center text-[#E5F9F0] sm:px-10 md:px-16">
          <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
            Your QR codes shouldn&apos;t live in a totally separate system.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-[#E5E7EB]">
            Use Kompi to generate QR codes that stay connected to your links,
            menus and analytics. Change where they point without changing the
            print, packaging or signage.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#qr-gen-tool"
              className="inline-flex items-center justify-center rounded-full bg-[#F5FDF5] px-6 py-2.5 text-xs font-semibold text-[#111827] hover:bg-white"
            >
              Generate QR codes
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-[#E5F9F0] bg-transparent px-6 py-2.5 text-xs font-medium text-[#E5F9F0] hover:bg-[#E5F9F0]/10"
            >
              Create free Kompi account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  WHY KOMPI – redesigned, less boring                                      */
/* -------------------------------------------------------------------------- */

function QrGenWhyKompiSection() {
  return (
    <section className="bg-[#F7F7F3] border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-8">
        <header className="space-y-3 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Why use Kompi for qr gen?
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-neutral-600">
            Kompi gives you a clean <strong>online qr generator</strong> plus
            simple tools for branding, tracking and organizing your QR codes as you grow.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white border border-neutral-200 p-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Built for branding
            </p>
            <h3 className="text-sm font-semibold text-neutral-900">
              QR codes that look like your brand
            </h3>
            <p className="text-xs md:text-sm text-neutral-600">
              Use your brand colors, shapes and logo so QR codes feel like part of
              your design, not an afterthought.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-emerald-200 p-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              Simple analytics
            </p>
            <h3 className="text-sm font-semibold text-neutral-900">
              See what&apos;s getting scanned
            </h3>
            <p className="text-xs md:text-sm text-neutral-600">
              When you&apos;re ready, add dynamic QR codes and basic analytics so
              you can see which menus, posters or campaigns perform best.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-neutral-200 p-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              Part of Kompi
            </p>
            <h3 className="text-sm font-semibold text-neutral-900">
              One place for links &amp; QR
            </h3>
            <p className="text-xs md:text-sm text-neutral-600">
              Use qr gen alongside Kompi links, menus and cards so everything
              lives in one simple workspace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QrGenComparisonSection() {
  return (
    <section className="bg-[#f7f7f4] border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 space-y-6">
        <header className="space-y-3 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Kompi qr gen vs typical QR code generators
          </h2>
          <p className="text-sm md:text-base text-neutral-700">
            There are many <strong>qr code generators</strong> online. Kompi is
            designed for people who want a fast qr gen tool that also fits into
            a bigger growth stack — not just a one-off download.
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-300">
                <th className="py-3 pr-4 font-semibold">Feature</th>
                <th className="py-3 px-4 font-semibold">Kompi QR Gen</th>
                <th className="py-3 px-4 font-semibold">
                  Typical free QR generator
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Branding & styles</td>
                <td className="py-3 px-4">
                  Multiple styles, brand colors, logos and layouts.
                </td>
                <td className="py-3 px-4">
                  Basic black-and-white codes with limited customization.
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Dynamic QR support</td>
                <td className="py-3 px-4">
                  Dynamic QR codes with analytics and editable destinations.
                </td>
                <td className="py-3 px-4">
                  Often static-only or limited dynamic features.
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Analytics & tracking</td>
                <td className="py-3 px-4">
                  Scan insights, trends and link performance across campaigns.
                </td>
                <td className="py-3 px-4">
                  Basic or no analytics, often outside your main workflows.
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Part of a growth stack</td>
                <td className="py-3 px-4">
                  Works with Kompi links, menus, subscribers and workspaces.
                </td>
                <td className="py-3 px-4">
                  Standalone tools that don&apos;t connect to the rest of your
                  stack.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Team & workspace friendly</td>
                <td className="py-3 px-4">
                  Built for creators, brands and agencies managing multiple
                  projects.
                </td>
                <td className="py-3 px-4">
                  Often designed for single-use, one-off QR creation.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs md:text-sm text-neutral-600">
          Kompi&apos;s qr gen is ideal if you want to start free and grow into a
          more advanced setup over time — without switching platforms.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  TESTIMONIAL-STYLE ROW                                                   */
/* -------------------------------------------------------------------------- */

function QrGenTestimonialSection() {
  return (
    <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8 border-t border-neutral-200">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
            LESS FRICTION, MORE SCANS
          </h2>
          <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Fewer “which generator was that?”, more “scan, done”.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
            <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
            <p className="text-sm font-semibold text-[#1E2330]">
              “Everything runs through Kompi now”
            </p>
            <p className="mt-2 text-xs text-[#4B5563]">
              “Nice to have QR codes, links and menus in one place instead of
              three random tools.”
            </p>
          </div>
          <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
            <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
            <p className="text-sm font-semibold text-[#1E2330]">
              “Fast to generate, easy to scan”
            </p>
            <p className="mt-2 text-xs text-[#4B5563]">
              “We dropped the QR codes onto our menus and posters, and every
              phone we tried picked them up instantly.”
            </p>
          </div>
          <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
            <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
            <p className="text-sm font-semibold text-[#1E2330]">
              “No more dead links on print”
            </p>
            <p className="mt-2 text-xs text-[#4B5563]">
              “If something changes, we update the Kompi link and the QR codes
              just keep working. No frantic reprints.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ / TRUST / RELATED LINKS                                             */
/* -------------------------------------------------------------------------- */

function QrGenFaqSection() {
  return (
    <section className="bg-[#f7f7f4] border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <header className="space-y-3 mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            QR gen FAQs
          </h2>
          <p className="text-sm md:text-base text-neutral-700">
            Everything you need to know about using Kompi as your online qr gen
            and QR code generator.
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-neutral-200 bg-white p-4 md:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                <span className="font-medium text-sm md:text-base">
                  {faq.question}
                </span>
                <span className="text-xs text-neutral-500 group-open:hidden">
                  +
                </span>
                <span className="text-xs text-neutral-500 hidden group-open:inline">
                  −
                </span>
              </summary>
              <p className="mt-3 text-xs md:text-sm text-neutral-700">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function QrGenTrustSection() {
  return (
    <section className="bg-white border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-12 space-y-4 text-xs md:text-sm text-neutral-700">
        <h2 className="text-base md:text-lg font-semibold tracking-tight">
          Privacy, safety and responsible QR use
        </h2>
        <p>
          Kompi provides tools to help you create and manage QR codes. As with
          any QR code, the safety of the experience depends on where the code
          leads. Always link to pages you trust and control, and encourage your
          audience to scan codes from trusted sources.
        </p>
        <p>
          When you use Kompi&apos;s qr gen together with dynamic QR features,
          you can update destinations and pause campaigns without reprinting.
          That gives you more control over what happens after every scan.
        </p>
        <p>
          For more advanced setups, pair qr gen with Kompi&apos;s workspaces,
          links and analytics so you can organise your campaigns and understand
          performance over time.
        </p>
      </div>
    </section>
  );
}

function QrGenRelatedLinksSection() {
  return (
    <section className="bg-[#f7f7f4] border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-12 space-y-4">
        <h2 className="text-base md:text-lg font-semibold tracking-tight">
          Related Kompi tools & pages
        </h2>
        <p className="text-xs md:text-sm text-neutral-700">
          Explore more QR and link tools that work seamlessly with Kompi qr
          gen:
        </p>
        <ul className="grid gap-3 md:grid-cols-2 text-xs md:text-sm">
          <li>
            <Link
              href="/qr-code-generator"
              className="inline-flex items-center justify-between w-full rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-neutral-400 transition-colors"
            >
              <span>Core QR code generator</span>
              <span>↗</span>
            </Link>
          </li>
          <li>
            <Link
              href="/qr-code/with-logo"
              className="inline-flex items-center justify-between w-full rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-neutral-400 transition-colors"
            >
              <span>QR code generator with logo</span>
              <span>↗</span>
            </Link>
          </li>
          <li>
            <Link
              href="/qr-menus"
              className="inline-flex items-center justify-between w-full rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-neutral-400 transition-colors"
            >
              <span>QR menus for restaurants</span>
              <span>↗</span>
            </Link>
          </li>
          <li>
            <Link
              href="/k-cards"
              className="inline-flex items-center justify-between w-full rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-neutral-400 transition-colors"
            >
              <span>Kompi Cards – link in bio</span>
              <span>↗</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  PAGE + JSON-LD                                                          */
/* -------------------------------------------------------------------------- */

export default function QrGenOnlinePage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi QR Gen Online",
    applicationCategory: "UtilityApplication",
    description:
      "Free online qr gen tool to create custom QR codes with branding, colors and tracking.",
    operatingSystem: "Any",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create a QR code with Kompi",
    description:
      "Simple steps to generate a QR code using Kompi's free online qr gen tool.",
    step: [
      {
        "@type": "HowToStep",
        name: "Paste your link or content",
        text: "Paste the URL or content you want people to visit after scanning your QR code.",
      },
      {
        "@type": "HowToStep",
        name: "Customize the QR style",
        text: "Choose your QR style, colors and optional logo to match your brand.",
      },
      {
        "@type": "HowToStep",
        name: "Select static or dynamic",
        text: "Decide whether you need a simple static QR code or a dynamic QR code with tracking and flexible destinations.",
      },
      {
        "@type": "HowToStep",
        name: "Generate, test and download",
        text: "Generate your QR code, test it with your phone camera, then download a high-quality file for print or digital use.",
      },
    ],
  };

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "How to use Kompi qr gen",
    description:
      "Step-by-step walkthrough of creating a QR code with Kompi's free qr gen tool.",
    thumbnailUrl: [SEO_THUMBNAIL_ABS],
    uploadDate: "2025-01-01", // update to real publish date
    contentUrl: SEO_VIDEO_ABS,
    embedUrl: SEO_VIDEO_ABS,
  };

  const jsonLd = [webAppSchema, faqSchema, howToSchema, videoSchema];

  return (
    <>
      <Script
        id="qr-gen-online-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />
        <main className="pt-16 md:pt-20 pb-20 space-y-16 md:space-y-20">
          {/* Hero */}
          <section className="px-4">
            <div className="max-w-5xl mx-auto">
              <QrGenIntroSection />
            </div>
          </section>

          {/* QR generator – no visual box, just layout container */}
          <section id="qr-gen-tool" className="px-4">
            <div className="max-w-5xl mx-auto">
              <KRCode2 />
            </div>
          </section>

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
