// src/app/blog/link-in-bio-best-practices/page.tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

const SITE_URL = "https://kompi.io";
const SLUG = "link-in-bio-best-practices";
const CANONICAL_URL = `${SITE_URL}/blog/${SLUG}`;
const OG_IMAGE = `${SITE_URL}/og/${SLUG}.png`;

// Optional blog video convention (safe if file exists; remove VideoSection if you don't ship it)
const BLOG_VIDEO_SRC = `/seo/${SLUG}.mp4`;

const TITLE = "Link in Bio Best Practices: What Actually Increases Clicks";
const DESCRIPTION =
  "A practical link-in-bio playbook for creators and businesses: what to include, how to structure pages, which CTAs convert, and how to track clicks with UTMs—without clutter.";

const KEYWORDS: string[] = [
  "link in bio best practices",
  "link in bio page",
  "link in bio tips",
  "increase link in bio clicks",
  "bio link strategy",
  "link in bio conversion",
  "link in bio layout",
  "link in bio call to action",
  "best link in bio tools",
  "linktree alternatives",
  "track link in bio clicks",
  "utm for link in bio",
  "instagram bio link",
  "tiktok bio link",
  "creator link page",
  "mini landing page",
  "mobile landing page",
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
    q: "What is a link in bio page?",
    a: "A link in bio page is a mobile-friendly mini landing page that lives behind your social bio link. It helps visitors choose the next action—shop, book, subscribe, view a menu, or contact you—without sending everyone to your homepage.",
  },
  {
    q: "How do I increase link in bio clicks?",
    a: "The fastest improvements come from clarity and hierarchy: use one primary CTA, fewer choices, strong button labels, trust cues, and a destination that loads fast on mobile. Then track clicks and iterate.",
  },
  {
    q: "How many links should I put in my bio?",
    a: "Most profiles convert better with 3–7 high-intent links rather than long lists. Add more only if they’re organized into clear sections and still feel easy to scan.",
  },
  {
    q: "Is it better to use one link or multiple links?",
    a: "If you always want one action (like booking), a single focused link can outperform. If you have multiple audiences or offers, a mini link hub is usually better—especially when structured with a primary CTA and secondary options.",
  },
  {
    q: "Should I change my bio link for every post?",
    a: "Only if you can track and maintain it consistently. A better system is to keep one stable link hub and use UTMs per campaign or per post to measure which content drives clicks.",
  },
  {
    q: "How do I track link in bio clicks with UTMs?",
    a: "Create a campaign URL with UTM parameters (source, medium, campaign), then use that tracked URL as your bio destination. Kompi’s UTM Builder helps you generate clean parameters and Kompi Links gives you trackable destinations.",
  },
  {
    q: "Why do people bounce from my link in bio page?",
    a: "Common reasons: too many choices, unclear button labels, slow load, mismatch between what the post promised and what the page delivers, or weak trust signals (no branding, no context).",
  },
  {
    q: "What should the top button be?",
    a: "Your highest-value, highest-intent action right now: book a call, shop bestsellers, get the menu, start a free trial, or download the guide. Make it specific and outcome-focused.",
  },
];

function cx(...classes: Array<string | null | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const published = "2026-02-01";
  const modified = "2026-02-01";
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
    name: "How to optimize your link in bio to increase clicks",
    description:
      "A practical workflow to build a high-converting link-in-bio page using clear hierarchy, strong CTAs, mobile-first design, and tracking with UTMs.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose your primary action",
        text: "Pick one main outcome you want visitors to take (book, buy, subscribe, menu, contact). Make it the first and most prominent button.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Reduce choices and label links clearly",
        text: "Keep 3–7 links for most profiles. Use outcome-based labels (e.g., “Book a consultation”, “Shop bestsellers”, “Get the menu”).",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Add trust cues and context",
        text: "Use consistent branding, a short description, and proof (reviews, press, stats). Ensure the page loads fast on mobile.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Track clicks with UTMs",
        text: "Create a tracked campaign URL using UTMs for source/medium/campaign, then link it through your bio page so you can measure outcomes by post or campaign.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Review and iterate weekly",
        text: "Check clicks and conversion rate weekly. Promote what performs, remove what doesn’t, and test new button labels or ordering.",
      },
    ],
  };

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Link in Bio Best Practices (Kompi) — Increase clicks with structure + tracking",
    description:
      "A walkthrough of link-in-bio page structure: primary CTA, link hierarchy, trust cues, and tracking with UTMs.",
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
          <WhatActuallyMovesClicksSection />
          <StructureSection />
          <CTASection />
          <DesignAndBrandingSection />
          <ContentAndOffersSection />
          <TrackingAndUTMsSection />
          <PlatformSpecificSection />
          <ExamplesSection />
          <MistakesSection />
          <VideoSection />
          <ChecklistSection />
          <FaqSection />
          <RelatedLinksSection />
          <RelatedPostsSection />
        </div>
      </main>

      <FooterCTA />

      <Script id="jsonld-blogposting-linkinbio" type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </Script>
      <Script id="jsonld-breadcrumb-linkinbio" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Script id="jsonld-faq-linkinbio" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>
      <Script id="jsonld-howto-linkinbio" type="application/ld+json">
        {JSON.stringify(howToJsonLd)}
      </Script>
      <Script id="jsonld-video-linkinbio" type="application/ld+json">
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
          <span>10–13 min read</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-4xl">
          {TITLE}
        </h1>

        <p className="text-lg md:text-xl text-neutral-700 max-w-4xl leading-relaxed">
          Most link-in-bio pages don’t fail because the tool is bad—they fail because the page has no hierarchy.
          People land, feel overwhelmed, and bounce. This guide shows the specific best practices that
          increase clicks: clearer offers, stronger CTAs, better ordering, and real tracking.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Build your link in bio (Kompi Links)
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Track clicks with UTMs
          </Link>
          <Link
            href="/k-cards"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Create a mini landing page (K-Card)
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-2">
          <MiniCard
            title="Best default setup"
            description={
              <>
                Primary CTA first + 3–7 supporting links on{" "}
                <Link href="/links" className="underline underline-offset-4">
                  Links
                </Link>
                .
              </>
            }
          />
          <MiniCard
            title="Fastest click lift"
            description="Rewrite button labels to outcomes: “Book”, “Shop”, “Get the menu”, “Download”."
          />
          <MiniCard
            title="Best measurement"
            description={
              <>
                Add attribution using{" "}
                <Link href="/tools/utm-builder" className="underline underline-offset-4">
                  UTM Builder
                </Link>{" "}
                and compare campaigns.
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
    { href: "#what-moves-clicks", label: "What actually increases clicks" },
    { href: "#structure", label: "Page structure that converts" },
    { href: "#cta", label: "CTAs that people tap" },
    { href: "#design-branding", label: "Design + branding tips" },
    { href: "#offers", label: "Offers & content priorities" },
    { href: "#tracking", label: "Tracking with UTMs" },
    { href: "#platform", label: "Instagram vs TikTok vs YouTube" },
    { href: "#examples", label: "Examples you can copy" },
    { href: "#mistakes", label: "Common mistakes" },
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
            If you run promotions, don’t skip tracking. Use{" "}
            <Link href="/tools/utm-builder" className="underline underline-offset-4">
              UTMs
            </Link>{" "}
            so your analytics stays clean.
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
        title="What increases link in bio clicks the most?"
        description={
          <>
            1) a single primary CTA, 2) fewer choices with clearer labels, 3) a page that loads fast on mobile,
            4) trust cues (branding + proof), and 5) tracking so you can iterate.
          </>
        }
      />

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">The 7 levers that move clicks</h3>
        <ol className="space-y-2 text-neutral-700">
          <li>1) One clear “top button” (the main outcome you want).</li>
          <li>2) Shorter link lists (usually 3–7), organized by intent.</li>
          <li>3) Outcome-based labels (“Book a call”, “Shop bestsellers”).</li>
          <li>4) Strong first screen: headline, context, and primary CTA.</li>
          <li>5) Trust cues: brand consistency, proof, and clarity.</li>
          <li>6) Mobile speed: no heavy pages, no slow destinations.</li>
          <li>
            7) Tracking and iteration with{" "}
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
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Create your link in bio
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Add UTMs for tracking
          </Link>
          <Link
            href="/qr-code/with-logo"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Add a branded QR (offline)
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhatActuallyMovesClicksSection() {
  return (
    <section id="what-moves-clicks" className="space-y-8">
      <SectionHeader
        eyebrow="What works"
        title="What actually increases clicks (and what doesn’t)"
        description={
          <>
            Clicks go up when visitors feel confident: they know what the page is for, what to tap, and what happens next.
            That comes from hierarchy and clarity—not from adding more links.
          </>
        }
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="High-impact changes">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Move your best offer to the top (primary CTA first)</Bullet>
            <Bullet>Cut links that don’t match current goals</Bullet>
            <Bullet>Rewrite labels to outcomes (not vague titles)</Bullet>
            <Bullet>Group links into 2–3 sections maximum</Bullet>
            <Bullet>Add proof: “Trusted by…”, reviews, stats, press</Bullet>
          </ul>
        </Card>

        <Card title="Low-impact (or risky) changes">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Adding 15–30 links “just in case”</Bullet>
            <Bullet>Using generic labels (“Click here”, “My website”)</Bullet>
            <Bullet>Leading with a homepage instead of a focused action</Bullet>
            <Bullet>Changing the bio link constantly without tracking</Bullet>
            <Bullet>Design-heavy pages that slow down on mobile</Bullet>
          </ul>
        </Card>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">The real job of a bio link</h3>
        <p className="text-neutral-700 leading-relaxed">
          Your bio link is a routing layer. It helps different audiences choose the correct next step without forcing
          everyone into the same funnel. That’s why a clean, organized hub like{" "}
          <Link href="/links" className="underline underline-offset-4">
            Kompi Links
          </Link>{" "}
          is often better than a single homepage link.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Build a link hub
          </Link>
          <Link
            href="/k-cards"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Use a mini landing page (K-Card)
          </Link>
        </div>
      </div>
    </section>
  );
}

function StructureSection() {
  return (
    <section id="structure" className="space-y-8">
      <SectionHeader
        eyebrow="Structure"
        title="A link in bio structure that converts"
        description="Think in layers: identity → primary action → supporting options → trust → contact."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Recommended layout (top to bottom)">
          <ol className="space-y-2 text-neutral-700">
            <li>1) Profile header: name + one-line value statement</li>
            <li>2) Primary CTA button (the main action)</li>
            <li>3) 3–6 supporting links (secondary actions)</li>
            <li>4) Proof/trust: testimonials, stats, press, partners</li>
            <li>5) Contact options: email, booking, socials</li>
          </ol>
        </Card>

        <Card title="Why this layout works">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>It answers “Who is this?” in one glance</Bullet>
            <Bullet>It makes the next step obvious (one primary CTA)</Bullet>
            <Bullet>It limits decision fatigue with fewer links</Bullet>
            <Bullet>It builds trust before asking for a conversion</Bullet>
            <Bullet>It keeps the page scannable on mobile</Bullet>
          </ul>
        </Card>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-5">
        <h3 className="text-2xl font-semibold">Best practice: one “always-on” hub</h3>
        <p className="text-neutral-700 leading-relaxed">
          Instead of swapping your bio link for every post, keep one stable hub on{" "}
          <Link href="/links" className="underline underline-offset-4">
            /links
          </Link>{" "}
          and measure campaigns with{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            /tools/utm-builder
          </Link>
          . You get consistency without losing attribution.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <MiniCard title="Stable bio link" description="Keeps your profile consistent and avoids broken promos." />
          <MiniCard title="UTMs per campaign" description="Measure posts and placements without changing the hub." />
          <MiniCard
            title="QR for offline"
            description={
              <>
                Add scans from posters/packaging with{" "}
                <Link href="/qr-code-generator" className="underline underline-offset-4">
                  QR codes
                </Link>
                .
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="cta" className="space-y-8">
      <SectionHeader
        eyebrow="CTAs"
        title="CTA buttons that people actually tap"
        description="Your button copy is either a decision shortcut—or a speed bump. Make it outcome-focused."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Do: outcome-based labels">
          <div className="grid sm:grid-cols-2 gap-3 text-neutral-700">
            <Tag>Book a consultation</Tag>
            <Tag>Shop bestsellers</Tag>
            <Tag>Get the menu</Tag>
            <Tag>Download the guide</Tag>
            <Tag>Start free trial</Tag>
            <Tag>See pricing</Tag>
            <Tag>Join the newsletter</Tag>
            <Tag>Watch the tutorial</Tag>
          </div>
        </Card>

        <Card title="Avoid: vague labels">
          <div className="grid sm:grid-cols-2 gap-3 text-neutral-700">
            <Tag muted>Click here</Tag>
            <Tag muted>My website</Tag>
            <Tag muted>Link</Tag>
            <Tag muted>New post</Tag>
            <Tag muted>More info</Tag>
            <Tag muted>Shop</Tag>
            <Tag muted>Services</Tag>
            <Tag muted>Contact</Tag>
          </div>
        </Card>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">Make the first button the “money button”</h3>
        <p className="text-neutral-700 leading-relaxed">
          Your top button should match what your audience wants most right now. If you’re unsure, choose the highest-intent
          action (book, buy, menu, subscribe), then validate by tracking clicks and conversions over a week.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Build your page
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Track the CTA with UTMs
          </Link>
        </div>
      </div>
    </section>
  );
}

function DesignAndBrandingSection() {
  return (
    <section id="design-branding" className="space-y-8">
      <SectionHeader
        eyebrow="Design"
        title="Design + branding tips that boost confidence (and clicks)"
        description="A bio page is small, but it represents your brand. Consistency and readability usually outperform flashy design."
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <MiniCard title="Readable by default" description="Large tap targets, strong contrast, and clear spacing." />
        <MiniCard title="Match your brand" description="Use consistent colors, tone, and imagery across platforms." />
        <MiniCard title="One-screen clarity" description="Visitors should understand the page without scrolling." />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Keep it fast">
          <p className="text-neutral-700 leading-relaxed">
            Mobile visitors are impatient. Heavy images, bloated embeds, and slow destinations reduce clicks. Keep the page
            lightweight and ensure links open fast on mobile data.
          </p>
          <div className="pt-3 text-neutral-700">
            If you’re using QR on print or packaging, send scans to a fast hub via{" "}
            <Link href="/links" className="underline underline-offset-4">
              Links
            </Link>{" "}
            and create a branded QR via{" "}
            <Link href="/qr-code/with-logo" className="underline underline-offset-4">
              QR with logo
            </Link>
            .
          </div>
        </Card>

        <Card title="Use trust cues intentionally">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Short bio line: who you help + how</Bullet>
            <Bullet>Proof: “Trusted by…”, testimonials, ratings</Bullet>
            <Bullet>Consistency: same name/photo across platforms</Bullet>
            <Bullet>Safety: recognizable domain and clean link labels</Bullet>
          </ul>
        </Card>
      </div>
    </section>
  );
}

function ContentAndOffersSection() {
  return (
    <section id="offers" className="space-y-8">
      <SectionHeader
        eyebrow="Offers"
        title="What to put on your link in bio (by goal)"
        description="Choose links that match your primary goal. Your bio page is a funnel—don’t turn it into a sitemap."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <GoalCard
          title="If your goal is sales"
          bullets={[
            "Primary CTA: Shop bestsellers / Shop the drop",
            "Secondary: Pricing, FAQ, Reviews",
            "Optional: Bundle offer or limited-time discount",
          ]}
          footer={
            <>
              Tip: If you run offline promos (stickers, packaging), bridge scans with{" "}
              <Link href="/qr-code-generator" className="underline underline-offset-4">
                QR codes
              </Link>{" "}
              and measure with{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4">
                UTMs
              </Link>
              .
            </>
          }
        />
        <GoalCard
          title="If your goal is leads / bookings"
          bullets={[
            "Primary CTA: Book a call / Get a quote",
            "Secondary: Services, Case studies, Testimonials",
            "Optional: Free lead magnet (guide, checklist)",
          ]}
          footer={
            <>
              Tip: Use a mini page like{" "}
              <Link href="/k-cards" className="underline underline-offset-4">
                K-Cards
              </Link>{" "}
              when you want a more focused landing experience.
            </>
          }
        />
        <GoalCard
          title="If your goal is audience growth"
          bullets={[
            "Primary CTA: Subscribe / Join newsletter",
            "Secondary: Best content, YouTube, Podcast",
            "Optional: ‘Start here’ guide for new followers",
          ]}
          footer={
            <>
              Tip: Keep the hub stable on{" "}
              <Link href="/links" className="underline underline-offset-4">
                /links
              </Link>{" "}
              so you don’t break old promos.
            </>
          }
        />
        <GoalCard
          title="If your goal is local visits"
          bullets={[
            "Primary CTA: Get directions / View menu / Book a table",
            "Secondary: Hours, Reviews, Specials",
            "Optional: Loyalty or email signup",
          ]}
          footer={
            <>
              Tip: Restaurants should use{" "}
              <Link href="/qr-menus" className="underline underline-offset-4">
                QR menus
              </Link>{" "}
              to reduce friction.
            </>
          }
        />
      </div>
    </section>
  );
}

function TrackingAndUTMsSection() {
  return (
    <section id="tracking" className="space-y-8">
      <SectionHeader
        eyebrow="Tracking"
        title="How to track link in bio clicks (without breaking your setup)"
        description="You don’t need complicated analytics. You need clean attribution that stays consistent."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="The simple tracking stack">
          <ol className="space-y-2 text-neutral-700">
            <li>
              1) Build your hub on{" "}
              <Link href="/links" className="underline underline-offset-4">
                /links
              </Link>{" "}
              (stable destination).
            </li>
            <li>
              2) Create campaign URLs with{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4">
                /tools/utm-builder
              </Link>{" "}
              (source/medium/campaign).
            </li>
            <li>3) Use UTMs per post or campaign (not per follower).</li>
            <li>4) Review weekly: clicks, conversion rate, and drop-offs.</li>
          </ol>
        </Card>

        <Card title="What to track (weekly)">
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Total clicks (trend over time)</Bullet>
            <Bullet>Clicks on the primary CTA vs secondary links</Bullet>
            <Bullet>Conversion rate on the destination page</Bullet>
            <Bullet>Top referrers (Instagram/TikTok/YouTube/email)</Bullet>
            <Bullet>Campaign comparison via UTM naming</Bullet>
          </ul>
        </Card>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">Offline? Use QR + the same tracking logic</h3>
        <p className="text-neutral-700 leading-relaxed">
          If you put your bio page on posters, business cards, or packaging, generate a QR code that points to your link hub.
          Brand it with{" "}
          <Link href="/qr-code/with-logo" className="underline underline-offset-4">
            QR with logo
          </Link>{" "}
          and track placements with{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTMs
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Create a QR code
          </Link>
          <Link
            href="/qr-code/with-logo"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Add logo branding
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

function PlatformSpecificSection() {
  return (
    <section id="platform" className="space-y-8">
      <SectionHeader
        eyebrow="Platform notes"
        title="Instagram vs TikTok vs YouTube: how to adapt your bio link"
        description="The page can stay the same, but your top button should match the intent of the platform."
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <MiniCard
          title="Instagram"
          description="Often lifestyle + discovery. Top CTA: Shop, booking, or newsletter—match the content pillar you post most."
        />
        <MiniCard
          title="TikTok"
          description="High-volume traffic, fast decisions. Top CTA should be extremely clear and frictionless."
        />
        <MiniCard
          title="YouTube"
          description="Deeper intent and longer attention. Top CTA can be higher-commitment (course, consultation, pricing)."
        />
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">One hub, multiple campaigns</h3>
        <p className="text-neutral-700 leading-relaxed">
          Keep one stable hub in your bio and swap campaigns inside the hub (or add UTMs per content series). That way,
          you can measure performance without breaking old links.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Build your hub
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Track campaigns
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExamplesSection() {
  const examples: Array<{
    title: string;
    headline: string;
    primary: string;
    links: string[];
    note: ReactNode;
  }> = [
    {
      title: "Creator (education)",
      headline: "Tips to grow your skills (fast, practical, no fluff).",
      primary: "Download the free guide",
      links: ["Watch the latest video", "Join the newsletter", "See my tools", "Work with me"],
      note: (
        <>
          Use a stable hub on{" "}
          <Link href="/links" className="underline underline-offset-4">
            Links
          </Link>{" "}
          and track guide downloads with{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTMs
          </Link>
          .
        </>
      ),
    },
    {
      title: "Local business (restaurant/cafe)",
      headline: "Coffee, brunch, and specials—open daily.",
      primary: "View the menu",
      links: ["Book a table", "Get directions", "Order pickup", "Leave a review"],
      note: (
        <>
          Pair your bio with{" "}
          <Link href="/qr-menus" className="underline underline-offset-4">
            QR Menus
          </Link>{" "}
          and print a branded QR using{" "}
          <Link href="/qr-code/with-logo" className="underline underline-offset-4">
            QR with logo
          </Link>
          .
        </>
      ),
    },
    {
      title: "Service business (bookings)",
      headline: "Helping brands turn attention into customers.",
      primary: "Book a consult",
      links: ["See pricing", "View case studies", "Read testimonials", "Email me"],
      note: (
        <>
          Use a mini landing experience via{" "}
          <Link href="/k-cards" className="underline underline-offset-4">
            K-Cards
          </Link>{" "}
          if you want a more focused page than a generic hub.
        </>
      ),
    },
    {
      title: "E-commerce (product drop)",
      headline: "New drop live — limited stock.",
      primary: "Shop bestsellers",
      links: ["Shop new arrivals", "Shipping & returns", "Reviews", "Contact support"],
      note: (
        <>
          Track “drop” campaigns with{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTMs
          </Link>{" "}
          and route traffic through a clean hub on{" "}
          <Link href="/links" className="underline underline-offset-4">
            Links
          </Link>
          .
        </>
      ),
    },
  ];

  return (
    <section id="examples" className="space-y-8">
      <SectionHeader
        eyebrow="Examples"
        title="Link in bio examples you can copy"
        description="Use these as templates: headline + primary CTA + 3–6 supporting links + trust + contact."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {examples.map((ex) => (
          <ExampleCard
            key={ex.title}
            title={ex.title}
            headline={ex.headline}
            primary={ex.primary}
            links={ex.links}
            note={ex.note}
          />
        ))}
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-semibold">Want to build yours in minutes?</h3>
        <p className="text-neutral-700 leading-relaxed">
          Start with{" "}
          <Link href="/links" className="underline underline-offset-4">
            Kompi Links
          </Link>{" "}
          for your hub, add attribution via{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTMs
          </Link>
          , and create QR access for offline traffic via{" "}
          <Link href="/qr-code-generator" className="underline underline-offset-4">
            QR codes
          </Link>
          .
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Create a link hub
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Build UTMs
          </Link>
          <Link
            href="/qr-code/with-logo"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Brand a QR code
          </Link>
        </div>
      </div>
    </section>
  );
}

function MistakesSection() {
  return (
    <section id="mistakes" className="space-y-8">
      <SectionHeader
        eyebrow="Mistakes"
        title="Link in bio mistakes that kill clicks"
        description="These are the most common reasons people bounce without tapping anything."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <Card title="Too many links (no hierarchy)">
          <p className="text-neutral-700 leading-relaxed">
            A long list forces visitors to work. They don’t know what to choose, so they choose nothing. Fix: one primary
            CTA and fewer supporting links.
          </p>
        </Card>
        <Card title="Vague labels (no outcome)">
          <p className="text-neutral-700 leading-relaxed">
            “Shop” or “Website” doesn’t tell people what they get. Fix: outcome labels like “Shop bestsellers” or “Book a
            consult”.
          </p>
        </Card>
        <Card title="Mismatch between content and destination">
          <p className="text-neutral-700 leading-relaxed">
            If your post promises a menu but your link hub doesn’t show it, visitors bounce. Fix: align the top CTA with
            your main content pillar.
          </p>
        </Card>
        <Card title="No tracking (so you can’t improve)">
          <p className="text-neutral-700 leading-relaxed">
            If you don’t measure clicks by campaign, you can’t learn what works. Fix: use{" "}
            <Link href="/tools/utm-builder" className="underline underline-offset-4">
              UTMs
            </Link>{" "}
            and a stable destination on{" "}
            <Link href="/links" className="underline underline-offset-4">
              Links
            </Link>
            .
          </p>
        </Card>
      </div>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Video"
        title="Watch: a link-in-bio layout that increases clicks"
        description="A quick walkthrough of hierarchy, CTAs, and tracking. (Remove if you don’t ship the video file.)"
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
        title="Copy/paste checklist for a high-converting bio link page"
        description="Use this before you publish—and re-check monthly."
      />

      <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <ChecklistCard
            title="Clarity + conversion"
            items={[
              "I have one primary CTA at the top",
              "I use 3–7 links (or fewer) for most visitors",
              "Button labels describe outcomes, not vague categories",
              "My first screen explains who I am and what to do next",
              "Destinations match the promise in my content",
            ]}
          />
          <ChecklistCard
            title="Trust + measurement"
            items={[
              "Branding is consistent (name, photo, colors)",
              "I include proof (reviews, stats, press, partners)",
              "The page loads fast on mobile",
              "I use UTMs for campaigns",
              "I review clicks and conversions weekly",
            ]}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Build with Kompi Links
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Track with UTMs
          </Link>
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Add QR access
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
        title="Link in bio best practices FAQ"
        description={
          <>
            If you want a clean, trackable setup: build your hub on{" "}
            <Link href="/links" className="underline underline-offset-4">
              Links
            </Link>{" "}
            and generate attribution with{" "}
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
      href: "/links",
      title: "Kompi Links",
      desc: "Build a clean link-in-bio hub with a clear hierarchy and fast mobile performance.",
    },
    {
      href: "/tools/utm-builder",
      title: "UTM Builder",
      desc: "Track clicks by campaign and keep analytics clean with a consistent naming system.",
    },
    {
      href: "/k-cards",
      title: "K-Cards",
      desc: "Create mini landing pages and digital cards for a focused conversion experience.",
    },
    {
      href: "/qr-code-generator",
      title: "QR Code Generator",
      desc: "Bridge offline-to-online by sending scans to your bio link hub or a campaign page.",
    },
    {
      href: "/qr-code/with-logo",
      title: "QR Code With Logo",
      desc: "Add branding to build trust at scan time—great for posters, packaging, and menus.",
    },
    {
      href: "/qr-menus",
      title: "QR Menus",
      desc: "Restaurants: make your top bio CTA “View the menu” and reduce friction instantly.",
    },
  ];

  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Kompi tools"
        title="Build a bio link system that converts"
        description="Clicks increase when your page is clear—and when you track what works so you can improve."
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
      href: "/blog/linktree-alternatives-2026",
      title: "Linktree Alternatives in 2026: What to Use Instead",
      desc: "A comparison guide for creators and businesses who want more control and better tracking.",
    },
    {
      href: "/blog/how-to-track-link-in-bio-clicks-with-utms",
      title: "How to Track Link in Bio Clicks with UTMs (Simple Setup)",
      desc: "A clean attribution workflow that doesn’t require complex analytics.",
    },
    {
      href: "/blog/qr-code-generator-that-people-actually-scan",
      title: "QR Code Generator: How to Create QR Codes That People Actually Scan",
      desc: "If you promote offline, pair your bio link with a QR code and measure placement performance.",
    },
  ];

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="More reading"
        title="Next posts to build your bio link SEO cluster"
        description="Publish these next and interlink them to build authority around link-in-bio pages, tracking, and conversion."
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

function GoalCard(props: { title: string; bullets: string[]; footer: ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-4">
      <div className="text-xl font-semibold">{props.title}</div>
      <ul className="space-y-2 text-neutral-700">
        {props.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <Dot />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-neutral-700">
        {props.footer}
      </div>
    </div>
  );
}

function ExampleCard(props: {
  title: string;
  headline: string;
  primary: string;
  links: string[];
  note: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-5">
      <div className="space-y-2">
        <div className="text-xl font-semibold">{props.title}</div>
        <div className="text-neutral-600">{props.headline}</div>
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 space-y-3">
        <div className="text-sm font-medium text-neutral-600">Primary CTA</div>
        <div className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 font-semibold">
          {props.primary}
        </div>

        <div className="text-sm font-medium text-neutral-600 pt-2">Secondary links</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {props.links.map((l) => (
            <div
              key={l}
              className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-neutral-700"
            >
              {l}
            </div>
          ))}
        </div>
      </div>

      <div className="text-neutral-700">{props.note}</div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/links"
          className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-4 py-2.5 font-medium hover:opacity-90 transition"
        >
          Build this in Links
        </Link>
        <Link
          href="/tools/utm-builder"
          className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-4 py-2.5 font-medium hover:bg-neutral-100 transition"
        >
          Add UTMs
        </Link>
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

function Tag({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <div
      className={cx(
        "rounded-2xl border px-4 py-3 text-sm font-medium",
        muted ? "border-neutral-200 bg-neutral-50 text-neutral-600" : "border-neutral-200 bg-white text-neutral-800"
      )}
    >
      {children}
    </div>
  );
}

function Dot() {
  return <span className="mt-2 h-2 w-2 rounded-full bg-neutral-900 shrink-0" />;
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
