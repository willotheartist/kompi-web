// src/app/blog/qr-code-generator-that-people-actually-scan/page.tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

const SITE_URL = "https://kompi.io";
const SLUG = "qr-code-generator-that-people-actually-scan";
const CANONICAL_URL = `${SITE_URL}/blog/${SLUG}`;
const OG_IMAGE = `${SITE_URL}/og/${SLUG}.png`;

// Optional blog video convention (safe if the file exists; otherwise remove video section)
const BLOG_VIDEO_SRC = `/seo/${SLUG}.mp4`;

const TITLE = "QR Code Generator: How to Create QR Codes That People Actually Scan";
const DESCRIPTION =
  "Most QR codes fail because of unclear value, bad design, or poor placement. Learn how to create QR codes people actually scan—with practical sizing, design, placement, and tracking best practices.";

const KEYWORDS: string[] = [
  "qr code generator",
  "how to create a qr code",
  "qr code best practices",
  "qr code design tips",
  "qr code placement guide",
  "qr code size for printing",
  "qr code with logo",
  "branded qr code",
  "dynamic vs static qr code",
  "qr code tracking",
  "qr code analytics",
  "qr codes for restaurants",
  "qr menu qr code",
  "qr codes for business cards",
  "qr codes for packaging",
  "utm tracking for qr codes",
  "offline to online marketing",
];

export const metadata: Metadata = {
  title: `${TITLE} | Kompi Blog`,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "article",
    url: CANONICAL_URL,
    title: `${TITLE} | Kompi`,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Kompi`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

type FAQItem = { q: string; a: string };

const FAQS: FAQItem[] = [
  {
    q: "Do QR codes still work in 2026?",
    a: "Yes. Most smartphones scan QR codes with the default camera. QR codes work best when the value is clear, the code is easy to scan (size + contrast), and the destination loads fast on mobile.",
  },
  {
    q: "Why don’t people scan my QR code?",
    a: "The most common reasons are: no clear call-to-action, poor contrast, the code is too small for the viewing distance, printing issues (blur/ink bleed), reflective placement, or a slow/bad destination page.",
  },
  {
    q: "What should my QR code link to?",
    a: "Link to the next step users actually want: a menu, booking page, product page, offer, contact card, or a focused mini landing page—avoid generic homepages unless they’re truly the best next action.",
  },
  {
    q: "Static vs dynamic QR code: which is better?",
    a: "Dynamic QR codes are usually better for marketing because you can update the destination and measure performance without reprinting. Static QR codes are fine for permanent, unchanging info.",
  },
  {
    q: "Does adding a logo hurt scanning?",
    a: "Not when done correctly. Keep the logo small, centered, and high-contrast, preserve the quiet zone, and test with multiple devices. A logo can increase trust and brand recognition.",
  },
  {
    q: "How big should a QR code be on print?",
    a: "A practical rule of thumb is: for every 10 cm (4 in) of scan distance, the QR code should be at least 1 cm (0.4 in) wide. Increase size for posters, outdoor signage, and fast-moving environments.",
  },
  {
    q: "Can I track QR scans and performance?",
    a: "Yes. Use trackable destinations (short links or link hubs) and add UTM parameters per placement/campaign to see which QR placements drive clicks and outcomes.",
  },
  {
    q: "What’s the best QR code setup for restaurants?",
    a: "Use a fast, mobile-first menu page and place the QR code where guests naturally pause (tables, counter, receipts). Add a clear CTA like “Scan for menu” and keep the code large enough to scan while seated.",
  },
];

function cx(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const published = "2026-01-10";
  const modified = "2026-01-10";
  const authorName = "Kompi";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL_URL,
    },
    headline: TITLE,
    description: DESCRIPTION,
    image: [OG_IMAGE],
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: authorName,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Kompi",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.ico`,
      },
    },
    keywords: KEYWORDS.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: TITLE, item: CANONICAL_URL },
    ],
  };

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
    name: "How to create a QR code that people actually scan",
    description:
      "A step-by-step checklist for choosing a destination, generating a QR code, designing it for reliable scanning, placing it correctly, and tracking results.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose the destination",
        text: "Pick the next action: menu, booking, offer, contact card, or a mini landing page. Avoid generic homepages unless they’re the best next step.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Generate the QR code",
        text: "Create the code using a reliable QR generator and export at print-safe resolution.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Design for scanning",
        text: "Use high contrast, preserve the quiet zone, and (optionally) add a small centered logo. Test scans on multiple phones.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Size and place it correctly",
        text: "Make it large enough for the viewing distance, avoid glossy/curved surfaces when possible, and include a clear call-to-action next to the code.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Track and improve",
        text: "Use trackable destinations and UTMs by placement/campaign to learn what converts, then iterate on CTA, size, and landing page.",
      },
    ],
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "QR Code Generator: Create QR codes people actually scan",
    description:
      "A quick walkthrough covering QR code destination choices, scannability design tips, placement best practices, and tracking with UTMs.",
    thumbnailUrl: [OG_IMAGE],
    uploadDate: "2026-01-01",
    contentUrl: `${SITE_URL}${BLOG_VIDEO_SRC}`,
    embedUrl: `${SITE_URL}${BLOG_VIDEO_SRC}`,
  };

  return (
    <>
      <Navbar />

      <main className="bg-white text-neutral-900">
        <HeroSection published={published} />

        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-16 md:space-y-20">
          <TocSection />
          <QuickAnswerSection />
          <WhyScansFailSection />
          <MakePeopleWantToScanSection />
          <DesignSection />
          <SizeAndPrintSection />
          <PlacementSection />
          <DestinationsSection />
          <TrackingSection />
          <UseCasesSection />
          <VideoSection />
          <ChecklistSection />
          <FaqSection />
          <RelatedLinksSection />
          <RelatedPostsSection />
        </div>
      </main>

      <FooterCTA />

      <Script id="jsonld-blogposting-qr-scan" type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </Script>
      <Script id="jsonld-breadcrumb-qr-scan" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Script id="jsonld-faq-qr-scan" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <Script id="jsonld-howto-qr-scan" type="application/ld+json">
        {JSON.stringify(howToJsonLd)}
      </Script>
      <Script id="jsonld-video-qr-scan" type="application/ld+json">
        {JSON.stringify(videoJsonLd)}
      </Script>
    </>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Sections
 * ------------------------------------------------------------------------------------------------- */

function HeroSection(props: { published: string }) {
  return (
    <header className="bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-6 py-14 md:py-20 space-y-7">
        <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
          <Link href="/blog" className="underline underline-offset-4">
            Blog
          </Link>
          <span aria-hidden="true">•</span>
          <span>{formatDate(props.published)}</span>
          <span aria-hidden="true">•</span>
          <span>10–14 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
          {TITLE}
        </h1>

        <p className="text-lg md:text-xl text-neutral-700 max-w-4xl leading-relaxed">
          QR codes are everywhere—but most of them underperform. The fix isn’t “try harder.”
          It’s better <span className="font-medium">value</span>, better{" "}
          <span className="font-medium">design</span>, better{" "}
          <span className="font-medium">placement</span>, and better{" "}
          <span className="font-medium">measurement</span>. This guide gives you
          the exact checklist.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Use Kompi QR Code Generator
          </Link>
          <Link
            href="/qr-code/with-logo"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Create a QR code with logo
          </Link>
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Build a trackable destination
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <MiniCard
            title="Best default setup"
            description={
              <>
                QR →{" "}
                <Link href="/links" className="underline underline-offset-4">
                  link hub
                </Link>{" "}
                → action (so you can update without reprinting).
              </>
            }
          />
          <MiniCard
            title="Best for restaurants"
            description={
              <>
                Use{" "}
                <Link href="/qr-menus" className="underline underline-offset-4">
                  QR Menus
                </Link>{" "}
                for fast, table-friendly scanning.
              </>
            }
          />
          <MiniCard
            title="Best for measurement"
            description={
              <>
                Add attribution with{" "}
                <Link href="/tools/utm-builder" className="underline underline-offset-4">
                  UTMs
                </Link>{" "}
                and compare placements.
              </>
            }
          />
        </div>
      </div>
    </header>
  );
}

function TocSection() {
  const items = [
    { href: "#quick-answer", label: "Quick answer" },
    { href: "#why-scans-fail", label: "Why QR scans fail" },
    { href: "#make-them-scan", label: "Make people want to scan" },
    { href: "#design", label: "Design rules" },
    { href: "#size-print", label: "Size & print checklist" },
    { href: "#placement", label: "Placement that works" },
    { href: "#destinations", label: "What to link to" },
    { href: "#tracking", label: "Tracking & UTMs" },
    { href: "#use-cases", label: "Best use cases" },
    { href: "#checklist", label: "Copy/paste checklist" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
      <div className="grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-5 space-y-2">
          <div className="text-sm font-medium text-neutral-600">On this page</div>
          <h2 className="text-xl font-semibold">Table of contents</h2>
          <p className="text-neutral-600">
            If you’re building a campaign, you’ll want the tracking section (UTMs + trackable links).
          </p>
        </div>
        <div className="md:col-span-7">
          <ul className="grid sm:grid-cols-2 gap-3">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 font-medium hover:bg-neutral-100 transition"
                >
                  <span>{it.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function QuickAnswerSection() {
  return (
    <section id="quick-answer" className="space-y-6">
      <SectionHeader
        eyebrow="Quick answer"
        title="How do you create a QR code people actually scan?"
        description={
          <>
            Use a clear CTA, high-contrast design, correct print size for the viewing distance, and a fast mobile
            destination. Then track performance by placement so you can improve.
          </>
        }
      />

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">The 6-step formula</h3>
        <ol className="space-y-2 text-neutral-700">
          <li>1) Offer a clear benefit (“Scan for menu”, “Get 10% off”, “Save contact”).</li>
          <li>2) Link to a fast, mobile-friendly page (not a generic homepage).</li>
          <li>
            3) Use high contrast and preserve the quiet zone (space around the code).
          </li>
          <li>4) Size it correctly for distance; bigger is safer for print.</li>
          <li>5) Place it where scanning feels natural (waiting moments).</li>
          <li>
            6) Track outcomes using{" "}
            <Link href="/links" className="underline underline-offset-4">
              Links
            </Link>{" "}
            +{" "}
            <Link href="/tools/utm-builder" className="underline underline-offset-4">
              UTMs
            </Link>
            .
          </li>
        </ol>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Generate a QR code
          </Link>
          <Link
            href="/qr-code/with-logo"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Add branding (logo)
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Build UTMs
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyScansFailSection() {
  return (
    <section id="why-scans-fail" className="space-y-8">
      <SectionHeader
        eyebrow="Diagnosis"
        title="Why most QR codes don’t get scanned"
        description={
          <>
            QR codes don’t “fail” because people hate scanning. They fail because the experience is unclear or annoying.
            Here are the most common causes we see in the real world.
          </>
        }
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="The trust problem">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>No CTA (users won’t scan a mystery code)</Bullet>
            <Bullet>Unbranded placement (looks suspicious)</Bullet>
            <Bullet>Destination feels risky or irrelevant</Bullet>
            <Bullet>Inconsistent brand signals</Bullet>
          </ul>
          <div className="pt-3 text-neutral-700">
            Fix it with a clear CTA and brand cues like{" "}
            <Link href="/qr-code/with-logo" className="underline underline-offset-4">
              a QR code with logo
            </Link>
            .
          </div>
        </Card>

        <Card title="The scan friction problem">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Too small for the distance</Bullet>
            <Bullet>Low contrast or busy background</Bullet>
            <Bullet>Printed poorly (blur/ink bleed)</Bullet>
            <Bullet>Placed on glossy or curved surfaces</Bullet>
          </ul>
          <div className="pt-3 text-neutral-700">
            Fix it with size, contrast, and placement—then test on multiple devices before printing.
          </div>
        </Card>
      </div>
    </section>
  );
}

function MakePeopleWantToScanSection() {
  return (
    <section id="make-them-scan" className="space-y-8">
      <SectionHeader
        eyebrow="Motivation"
        title="Make people want to scan"
        description={
          <>
            The best QR code strategy is simple: make the outcome obvious and valuable. Your CTA is not decoration—it’s the
            reason scanning happens.
          </>
        }
      />

      <div className="grid md:grid-cols-3 gap-4">
        <MiniCard title="Menu" description="“Scan for menu” (fast, mobile, readable)." />
        <MiniCard title="Offer" description="“Scan to claim 10% off” (immediate value)." />
        <MiniCard title="Contact" description="“Scan to save contact” (low effort, high utility)." />
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">Best practice: QR → choice → action</h3>
        <p className="text-neutral-700 leading-relaxed">
          If multiple actions are possible, don’t cram them into one destination page.
          Use a mini hub that presents 2–5 clear options. Build that destination with{" "}
          <Link href="/links" className="underline underline-offset-4">
            Kompi Links
          </Link>{" "}
          and update it anytime without changing the printed QR.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Create a link hub
          </Link>
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Generate the QR code
          </Link>
        </div>
      </div>
    </section>
  );
}

function DesignSection() {
  return (
    <section id="design" className="space-y-8">
      <SectionHeader
        eyebrow="Design"
        title="Design rules for reliable scanning"
        description="The goal is reliability, not novelty. Make scanning effortless under imperfect conditions."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Design checklist (do this)">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Dark code on a light background (high contrast)</Bullet>
            <Bullet>Preserve the quiet zone (clear margin around the code)</Bullet>
            <Bullet>Keep background clean (avoid textures/gradients behind)</Bullet>
            <Bullet>Use a logo carefully (small + centered + tested)</Bullet>
          </ul>
          <div className="pt-3 text-neutral-700">
            For branded codes, use{" "}
            <Link href="/qr-code/with-logo" className="underline underline-offset-4">
              /qr-code/with-logo
            </Link>{" "}
            so the logo is applied safely.
          </div>
        </Card>

        <Card title="Avoid these design traps">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Low-contrast colors (light gray on white)</Bullet>
            <Bullet>Busy images behind the code</Bullet>
            <Bullet>Overly stylized modules that reduce detectability</Bullet>
            <Bullet>Logo too large or too low-contrast</Bullet>
          </ul>
          <div className="pt-3 text-neutral-700">
            If you want to keep branding consistent across materials, align QR colors with your palette and test print.
          </div>
        </Card>
      </div>
    </section>
  );
}

function SizeAndPrintSection() {
  return (
    <section id="size-print" className="space-y-8">
      <SectionHeader
        eyebrow="Print"
        title="Size & print checklist (where most QR codes fail)"
        description="If your QR code is too small, people won’t scan. If it prints blurry, it won’t scan. Size and print quality matter."
      />

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">Rule of thumb: distance → size</h3>
        <p className="text-neutral-700 leading-relaxed">
          Start here: for every <span className="font-medium">10 cm (4 in)</span> of scanning distance,
          make the QR code at least <span className="font-medium">1 cm (0.4 in)</span> wide. Increase size for posters,
          outdoor signage, or quick-scan environments.
        </p>

        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <MiniCard title="Table tent" description="Bigger than you think—people scan while seated." />
          <MiniCard title="Poster" description="Test from real distance; increase size for fast scanning." />
          <MiniCard title="Packaging" description="Avoid curved glossy areas; test ink/finish before mass print." />
        </div>

        <div className="pt-3 flex flex-col sm:flex-row gap-3">
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Generate a print-ready QR
          </Link>
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Create destination link
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlacementSection() {
  return (
    <section id="placement" className="space-y-8">
      <SectionHeader
        eyebrow="Placement"
        title="Placement that actually drives scans"
        description="QR codes work best in “waiting moments”: where people have a second and a reason to scan."
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <MiniCard title="Restaurants" description="Tables, counter signs, receipts—add “Scan for menu”." />
        <MiniCard title="Events" description="Entry points, check-in desks, flyers—use UTMs per placement." />
        <MiniCard title="Retail" description="Shelf talkers, packaging, inserts—offer instructions or a deal." />
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">If you have multiple placements, track them</h3>
        <p className="text-neutral-700 leading-relaxed">
          The fastest way to improve is to compare placements. Use{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTMs
          </Link>{" "}
          so “Poster A” and “Poster B” don’t get lumped together in analytics. Then send every UTM URL through{" "}
          <Link href="/links" className="underline underline-offset-4">
            Links
          </Link>{" "}
          for a clean destination.
        </p>
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section id="destinations" className="space-y-8">
      <SectionHeader
        eyebrow="Destination"
        title="What should your QR code link to?"
        description="Your destination determines whether scanning feels worth it. Make the next step obvious, fast, and mobile-first."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Best destinations (high conversion)">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>
              A focused mini landing page / hub via{" "}
              <Link href="/links" className="underline underline-offset-4">
                /links
              </Link>
            </Bullet>
            <Bullet>
              A restaurant menu via{" "}
              <Link href="/qr-menus" className="underline underline-offset-4">
                /qr-menus
              </Link>
            </Bullet>
            <Bullet>
              A contact card via{" "}
              <Link href="/k-cards" className="underline underline-offset-4">
                /k-cards
              </Link>
            </Bullet>
            <Bullet>A single offer page (discount, signup, booking)</Bullet>
          </ul>
        </Card>

        <Card title="Destinations that usually underperform">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Generic homepage (too many choices)</Bullet>
            <Bullet>Slow pages or non-mobile layouts</Bullet>
            <Bullet>PDFs that are hard to read on mobile (when avoidable)</Bullet>
            <Bullet>Dead ends with no CTA</Bullet>
          </ul>
        </Card>
      </div>
    </section>
  );
}

function TrackingSection() {
  return (
    <section id="tracking" className="space-y-8">
      <SectionHeader
        eyebrow="Measurement"
        title="Track what works: scans are nice, outcomes are better"
        description="If you can’t measure performance by placement, you can’t improve. Track clicks, signups, bookings, and purchases."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="The simplest tracking setup">
          <ol className="space-y-2 text-neutral-700">
            <li>
              1) Create the destination link or hub in{" "}
              <Link href="/links" className="underline underline-offset-4">
                Links
              </Link>
              .
            </li>
            <li>
              2) Add UTMs using{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4">
                UTM Builder
              </Link>{" "}
              (per placement).
            </li>
            <li>
              3) Generate your QR code in{" "}
              <Link href="/qr-code-generator" className="underline underline-offset-4">
                QR Code Generator
              </Link>{" "}
              using the tracked URL.
            </li>
          </ol>
        </Card>

        <Card title="What to measure weekly">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Clicks by placement (poster vs flyer vs table tent)</Bullet>
            <Bullet>Conversion rate on the destination page</Bullet>
            <Bullet>Drop-offs (slow load, unclear CTA)</Bullet>
            <Bullet>Repeat scans and returning visitors (if applicable)</Bullet>
          </ul>
        </Card>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section id="use-cases" className="space-y-8">
      <SectionHeader
        eyebrow="Use cases"
        title="High-performing QR code use cases"
        description="These are the scenarios where QR codes consistently shine—because scanning feels natural and the value is clear."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <UseCaseCard
          title="Restaurants & cafes"
          desc="Menu, ordering, Wi-Fi, loyalty, reviews."
          hrefs={[
            { href: "/qr-menus", label: "QR Menus" },
            { href: "/qr-code/with-logo", label: "QR with logo" },
          ]}
          bullets={[
            "Use a clear CTA: “Scan for menu”",
            "Place where guests pause: tables, counter, receipts",
            "Keep it large enough to scan while seated",
          ]}
        />

        <UseCaseCard
          title="Networking & sales"
          desc="Contact card, calendar link, portfolio, pricing."
          hrefs={[
            { href: "/k-cards", label: "K-Cards" },
            { href: "/links", label: "Links" },
          ]}
          bullets={[
            "Send to a contact card + next actions",
            "Use branding for trust at scan time",
            "Keep the destination minimal and mobile-friendly",
          ]}
        />

        <UseCaseCard
          title="Events & pop-ups"
          desc="Check-in, schedule, signups, lead capture."
          hrefs={[
            { href: "/links", label: "Link hub" },
            { href: "/tools/utm-builder", label: "UTM Builder" },
          ]}
          bullets={[
            "Use UTMs per placement to compare performance",
            "Keep CTA specific: “Scan to check in”",
            "Put codes where lines form (waiting moments)",
          ]}
        />

        <UseCaseCard
          title="Packaging & retail"
          desc="Setup guide, tutorials, warranty, offers."
          hrefs={[
            { href: "/qr-code-generator", label: "QR generator" },
            { href: "/qr-code/with-logo", label: "Add logo" },
          ]}
          bullets={[
            "Offer immediate utility (instructions, guide, deal)",
            "Avoid glossy curves when possible",
            "Test print before mass production",
          ]}
        />
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">Want a modern QR experience?</h3>
        <p className="text-neutral-700 leading-relaxed">
          Explore{" "}
          <Link href="/kr-codes" className="underline underline-offset-4">
            KR Codes
          </Link>{" "}
          for more branded, modern QR-style experiences that feel premium and trustworthy.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/kr-codes"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Explore KR Codes
          </Link>
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Generate a QR code
          </Link>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Video"
        title="Watch: the QR workflow that increases scan rates"
        description="A quick walkthrough: destination → QR → placement → tracking. (Remove this section if you don’t ship the video file.)"
      />

      <div className="rounded-3xl border border-neutral-200 bg-white p-3 md:p-4">
        <video className="w-full rounded-2xl" controls preload="metadata" playsInline>
          <source src={BLOG_VIDEO_SRC} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

function ChecklistSection() {
  return (
    <section id="checklist" className="space-y-8">
      <SectionHeader
        eyebrow="Checklist"
        title="Copy/paste checklist for QR codes that scan"
        description="Use this before you print. It catches the mistakes that destroy scan rates."
      />

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 space-y-5">
        <div className="grid lg:grid-cols-2 gap-6">
          <ChecklistCard
            title="Scan reliability"
            items={[
              "High contrast (dark code on light background)",
              "Quiet zone preserved (clear space around the code)",
              "Sized for distance (bigger is safer)",
              "Tested on multiple phones (iOS + Android)",
              "Printed cleanly (no blur, no ink bleed)",
            ]}
          />
          <ChecklistCard
            title="Conversion & trust"
            items={[
              "Clear CTA next to the code (tell users what they get)",
              "Fast mobile destination (no pinching/zooming)",
              "Destination matches CTA (no bait-and-switch)",
              "Brand cues (logo/colors) for legitimacy",
              "Tracking in place (UTMs per placement)",
            ]}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Generate your QR code
          </Link>
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Create a destination hub
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Add UTMs
          </Link>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="space-y-8">
      <SectionHeader
        eyebrow="FAQ"
        title="QR code generator FAQ"
        description={
          <>
            If you want the fastest “works everywhere” setup, build a destination in{" "}
            <Link href="/links" className="underline underline-offset-4">
              Links
            </Link>{" "}
            and track placements with{" "}
            <Link href="/tools/utm-builder" className="underline underline-offset-4">
              UTMs
            </Link>
            .
          </>
        }
      />

      <div className="grid gap-4">
        {FAQS.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} />
        ))}
      </div>
    </section>
  );
}

function RelatedLinksSection() {
  const cards = [
    {
      href: "/qr-code-generator",
      title: "QR Code Generator",
      desc: "Create QR codes fast and reliably for any destination.",
    },
    {
      href: "/qr-code/with-logo",
      title: "QR Code With Logo",
      desc: "Add branding for trust and recognition at scan time.",
    },
    {
      href: "/links",
      title: "Links",
      desc: "Create trackable mini pages and link hubs for QR destinations.",
    },
    {
      href: "/tools/utm-builder",
      title: "UTM Builder",
      desc: "Measure placements and campaigns with clean attribution.",
    },
    {
      href: "/qr-menus",
      title: "QR Menus",
      desc: "Mobile-first menus designed for fast table scanning.",
    },
    {
      href: "/k-cards",
      title: "K-Cards",
      desc: "Digital business cards and mini landing pages for networking.",
    },
  ];

  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Kompi tools"
        title="Turn QR scans into measurable results"
        description="Generating the QR is step one. The destination and tracking determine whether it converts."
      />

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 hover:bg-neutral-50 transition space-y-2"
          >
            <div className="text-xl font-semibold">{c.title}</div>
            <div className="text-neutral-600">{c.desc}</div>
            <div className="pt-2 text-sm font-medium">Explore →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RelatedPostsSection() {
  const related = [
    {
      href: "/blog/static-vs-dynamic-qr-codes",
      title: "Static vs Dynamic QR Codes: What’s the Difference?",
      desc: "When to use each—and what marketers should choose by default.",
    },
    {
      href: "/blog/qr-code-size-and-placement-guide",
      title: "QR Code Size & Placement Guide (Print Specs That Maximize Scans)",
      desc: "A practical sizing guide for posters, tables, and packaging.",
    },
    {
      href: "/blog/track-offline-marketing-with-qr-codes-and-utms",
      title: "How to Track Offline Marketing with QR Codes + UTMs",
      desc: "Attribute results by placement so you can scale what works.",
    },
  ];

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="More reading"
        title="Next articles to build your QR strategy"
        description="Publish these next and interlink them to build authority around QR code generation, design, and tracking."
      />

      <div className="grid md:grid-cols-3 gap-4">
        {related.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="rounded-3xl border border-neutral-200 bg-white p-6 hover:bg-neutral-50 transition space-y-2"
          >
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-neutral-600">{p.desc}</div>
            <div className="pt-1 text-sm font-medium">Read →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------------------------------
 * UI Helpers
 * ------------------------------------------------------------------------------------------------- */

function SectionHeader(props: { eyebrow: string; title: string; description: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-neutral-600">{props.eyebrow}</div>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{props.title}</h2>
      <div className="text-neutral-600 text-base md:text-lg max-w-4xl">{props.description}</div>
    </div>
  );
}

function MiniCard(props: { title: string; description: ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 space-y-2">
      <div className="font-semibold">{props.title}</div>
      <div className="text-neutral-600 leading-relaxed">{props.description}</div>
    </div>
  );
}

function Card(props: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-4">
      <div className="text-xl font-semibold">{props.title}</div>
      <div className="text-neutral-700 leading-relaxed">{props.children}</div>
    </div>
  );
}

function UseCaseCard(props: {
  title: string;
  desc: string;
  bullets: string[];
  hrefs: Array<{ href: string; label: string }>;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-5">
      <div className="space-y-2">
        <div className="text-xl font-semibold">{props.title}</div>
        <div className="text-neutral-600">{props.desc}</div>
      </div>

      <ul className="space-y-2 text-neutral-700">
        {props.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <Dot />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        {props.hrefs.map((h) => (
          <Link
            key={h.href}
            href={h.href}
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-2.5 font-medium hover:bg-neutral-100 transition"
          >
            {h.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ChecklistCard(props: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 space-y-4">
      <div className="text-lg font-semibold">{props.title}</div>
      <ul className="space-y-2 text-neutral-700">
        {props.items.map((t) => (
          <li key={t} className="flex gap-2">
            <Dot />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqItem(props: { q: string; a: string }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-7 space-y-2">
      <div className="text-lg font-semibold">{props.q}</div>
      <div className="text-neutral-600 leading-relaxed">{props.a}</div>
    </div>
  );
}

function Bullet(props: { children: ReactNode }) {
  return (
    <li className="flex gap-2">
      <Dot />
      <span>{props.children}</span>
    </li>
  );
}

function Dot() {
  return <span className={cx("mt-2 h-2 w-2 rounded-full bg-neutral-900 shrink-0")} />;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map((x) => Number(x));
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
