// src/app/blog/instagram-hashtag-mistakes-2026/page.tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

const SITE_URL = "https://kompi.io";
const SLUG = "instagram-hashtag-mistakes-2026";
const CANONICAL_URL = `${SITE_URL}/blog/${SLUG}`;
const OG_IMAGE = `${SITE_URL}/og/${SLUG}.png`;

const TITLE = "Instagram Hashtag Mistakes That Kill Reach (And What To Do Instead)";
const DESCRIPTION =
  "Stop using outdated hashtag tactics. Learn the most common Instagram hashtag mistakes that reduce reach in 2026—and the practical fixes to build cleaner, more relevant hashtag sets that actually help discovery.";

const KEYWORDS: string[] = [
  "instagram hashtag mistakes",
  "instagram hashtags not working",
  "why instagram reach dropped",
  "hashtag stuffing",
  "instagram hashtag strategy 2026",
  "reels hashtag mistakes",
  "how to use hashtags on instagram",
  "hashtag sets instagram",
  "niche hashtags instagram",
  "intent hashtags",
  "branded hashtags",
  "instagram discoverability",
  "social media growth strategy",
  "utm tracking instagram",
  "trackable links instagram",
];

export const metadata: Metadata = {
  title: `${TITLE} | Kompi Blog`,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "article",
    url: CANONICAL_URL,
    title: `${TITLE} | Kompi`,
    description: DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | Kompi`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
  },
};

type FAQItem = { q: string; a: string };

const FAQS: FAQItem[] = [
  {
    q: "Are hashtags still worth using on Instagram in 2026?",
    a: "Yes—hashtags can still help categorize content and support discoverability, especially for niche topics. They work best when they match the post’s topic and intent instead of being broad or random.",
  },
  {
    q: "How many hashtags should I use?",
    a: "There isn’t one perfect number, but most creators do better with smaller, more relevant sets. A practical range is often 6–15 for posts and 8–18 for Reels, adjusted to your niche and content type.",
  },
  {
    q: "Is using 30 hashtags bad?",
    a: "Not inherently, but it often leads to low relevance and repeated blocks. If you can’t justify every hashtag, reduce the count and increase specificity.",
  },
  {
    q: "Should I put hashtags in the caption or the comments?",
    a: "Either can work. The bigger lever is relevance and engagement quality. Choose the placement that keeps your caption readable and your workflow consistent.",
  },
  {
    q: "Do trending hashtags help?",
    a: "Only when the trend is truly relevant to your content. Using unrelated trending hashtags can attract the wrong audience and reduce engagement quality.",
  },
  {
    q: "What are “niche hashtags” and why do they matter?",
    a: "Niche hashtags are more specific tags with smaller communities. They can be easier to rank for and often bring more qualified discovery than ultra-broad hashtags.",
  },
  {
    q: "What’s the best way to test hashtag sets?",
    a: "Rotate a few structured sets per content pillar and track outcomes over time. Measure more than views—look at saves, shares, profile visits, and link clicks.",
  },
  {
    q: "How do I track whether my Instagram content converts?",
    a: "Use trackable links and UTM parameters. Kompi helps you create short links at /links and add campaign parameters at /tools/utm-builder so you can measure clicks by post or campaign.",
  },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

export default function Page() {
  const published = "2026-01-06";
  const modified = "2026-01-06";
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
    name: "How to fix Instagram hashtags that are hurting your reach",
    description:
      "A practical workflow to diagnose hashtag mistakes, rebuild relevant sets, rotate them by content pillar, and track what actually converts.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Define the post",
        text: "Write a one-sentence ‘topic sentence’ describing your post (topic + audience + intent).",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Generate and curate",
        text: "Generate ideas, then keep only hashtags that clearly match the topic sentence (avoid irrelevant trends).",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Build a structured set",
        text: "Create a balanced set: 2–4 broad, 6–12 niche, 2–4 intent, and 1–2 branded/series hashtags.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Rotate and measure",
        text: "Rotate 2–3 sets per content pillar and measure outcomes over weeks (saves, shares, profile visits, and link clicks).",
      },
    ],
  };

  return (
    <>
      <Navbar />

      <main className="bg-white text-neutral-900">
        <HeroSection published={published} />

        {/* Slightly wider + more “slider card” spacing rhythm */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="mx-auto max-w-5xl space-y-16 md:space-y-20">
              <TocSection />
              <QuickSummarySection />
              <MistakesSection />
              <FixFrameworkSection />
              <ExamplesSection />
              <TrackingSection />
              <FaqSection />
              <RelatedLinksSection />
              <RelatedPostsSection />
            </div>
          </Container>
        </section>
      </main>

      <FooterCTA />

      <Script id="jsonld-blogposting-instagram-hashtag-mistakes" type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </Script>

      <Script id="jsonld-breadcrumb-instagram-hashtag-mistakes" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>

      <Script id="jsonld-faq-instagram-hashtag-mistakes" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>

      <Script id="jsonld-howto-instagram-hashtag-mistakes" type="application/ld+json">
        {JSON.stringify(howToJsonLd)}
      </Script>
    </>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Sections
 * ------------------------------------------------------------------------------------------------- */

function HeroSection(props: { published: string }) {
  return (
    <header className="border-b border-black/10 bg-gradient-to-b from-[#F7F7F4] to-white">
      <Container>
        <div className="pt-20 md:pt-24 pb-12 md:pb-16">
          {/* “Slider-card” hero: big rounded block, strong contrast */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-neutral-950 text-white shadow-xl">
            {/* soft highlight like the slider cards */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)",
              }}
            />
            <div className="relative p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                <Link href="/blog" className="underline underline-offset-4 decoration-white/30 hover:decoration-white/70">
                  Blog
                </Link>
                <span aria-hidden="true">•</span>
                <span>{formatDate(props.published)}</span>
                <span aria-hidden="true">•</span>
                <span>8–11 min read</span>
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight max-w-4xl">
                {TITLE}
              </h1>

              <p className="mt-6 text-lg md:text-xl text-white/85 max-w-4xl leading-relaxed">
                Most “hashtag tips” are outdated or overly simplistic. In 2026, the biggest reach killers are usually
                <span className="font-semibold"> relevance mistakes</span>: generic tags, repeated blocks, and mismatched intent.
                This guide breaks down the most common problems—and the fixes you can apply immediately.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/hashtag-generator"
                  className="inline-flex items-center justify-center rounded-2xl bg-white text-neutral-950 px-5 py-3 font-semibold hover:opacity-90 transition"
                >
                  Use the Hashtag Generator
                </Link>
                <Link
                  href="/blog/instagram-hashtag-strategy-2026"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 border border-white/15 px-5 py-3 font-medium hover:bg-white/15 transition"
                >
                  Read the full 2026 strategy
                </Link>
                <Link
                  href="/tools/utm-builder"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/10 border border-white/15 px-5 py-3 font-medium hover:bg-white/15 transition"
                >
                  Track posts with UTMs
                </Link>
              </div>

              <div className="mt-10 grid md:grid-cols-3 gap-4">
                <MiniCard
                  title="The goal"
                  description="Use hashtags to clarify what your content is about and who it’s for—without spam."
                />
                <MiniCard
                  title="The method"
                  description="Build structured sets (broad + niche + intent + branded), then rotate and refine."
                />
                <MiniCard
                  title="The proof"
                  description={
                    <>
                      Track outcomes with{" "}
                      <Link href="/links" className="underline underline-offset-4 decoration-white/30 hover:decoration-white/70">
                        Links
                      </Link>{" "}
                      +{" "}
                      <Link
                        href="/tools/utm-builder"
                        className="underline underline-offset-4 decoration-white/30 hover:decoration-white/70"
                      >
                        UTMs
                      </Link>{" "}
                      so you learn what actually converts.
                    </>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

function TocSection() {
  const items = [
    { href: "#quick-summary", label: "Quick summary" },
    { href: "#mistakes", label: "The mistakes that kill reach" },
    { href: "#fix-framework", label: "A simple fix framework" },
    { href: "#examples", label: "Examples you can copy" },
    { href: "#tracking", label: "How to measure what works" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <section className="rounded-[2.5rem] border border-black/10 bg-white p-6 md:p-10 shadow-sm">
      <div className="grid md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-5 space-y-2">
          <div className="text-sm font-semibold text-neutral-600">On this page</div>
          <h2 className="text-2xl font-extrabold tracking-tight">Table of contents</h2>
          <p className="text-neutral-600">
            Skim the fixes, then apply the workflow with the{" "}
            <Link href="/hashtag-generator" className="underline underline-offset-4">
              Hashtag Generator
            </Link>
            .
          </p>
        </div>
        <div className="md:col-span-7">
          <ul className="grid sm:grid-cols-2 gap-3">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 font-semibold hover:bg-neutral-100 transition"
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

function QuickSummarySection() {
  return (
    <section id="quick-summary" className="space-y-6">
      <SectionHeader
        eyebrow="Quick summary"
        title="If you only read one section, read this"
        description={
          <>
            Hashtags can still support discovery, but the biggest wins come from using fewer, more relevant tags and
            aligning them with the post’s topic and intent. If you’re not sure where to start, generate ideas on{" "}
            <Link href="/hashtag-generator" className="underline underline-offset-4">
              the hashtag generator page
            </Link>
            , then curate with the framework below.
          </>
        }
      />

      <div className="rounded-[2.5rem] border border-black/10 bg-neutral-50 p-6 md:p-10 space-y-5">
        <h3 className="text-xl font-extrabold tracking-tight">The 2026 rule of thumb</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ChecklistCard
            title="Do this"
            items={[
              "Write a one-sentence topic sentence (topic + audience + intent)",
              "Use structured sets: broad + niche + intent + branded",
              "Rotate 2–3 sets per content pillar",
              "Keep hashtags relevant to what’s on-screen and in the caption",
              "Measure outcomes (saves, shares, clicks) over weeks—not one post",
            ]}
          />
          <ChecklistCard
            title="Avoid this"
            items={[
              "Copy/paste the same block across different topics",
              "Stuffing generic ‘viral’ tags for reach",
              "Using irrelevant trending hashtags",
              "Using ambiguous tags that attract the wrong audience",
              "Never testing/iterating and relying on guesswork",
            ]}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Link
            href="/hashtag-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-950 text-white px-5 py-3 font-semibold hover:bg-black transition"
          >
            Generate a better set
          </Link>
          <Link
            href="/blog/instagram-hashtag-strategy-2026"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-black/10 px-5 py-3 font-semibold hover:bg-neutral-50 transition"
          >
            Full strategy guide
          </Link>
        </div>
      </div>
    </section>
  );
}

function MistakesSection() {
  const mistakes: Array<{
    id: string;
    title: string;
    why: ReactNode;
    fix: ReactNode;
    quickCheck: string[];
  }> = [
    {
      id: "mistake-1",
      title: "Pasting the same hashtag block on every post",
      why: (
        <>
          This is one of the most common “silent” problems. When you reuse a static block across different topics,
          you reduce relevance. Instagram has fewer clues about what each post is actually about, and your distribution
          becomes less consistent.
        </>
      ),
      fix: (
        <>
          Build <span className="font-medium">2–3 hashtag sets per content pillar</span> and rotate them.
          If the topic changes, the hashtags should change too. Use the{" "}
          <Link href="/hashtag-generator" className="underline underline-offset-4">
            Hashtag Generator
          </Link>{" "}
          to create new sets quickly.
        </>
      ),
      quickCheck: [
        "Does this set match the exact topic of this post?",
        "Would a stranger understand the post category from the hashtags alone?",
        "Are you rotating sets instead of repeating one block forever?",
      ],
    },
    {
      id: "mistake-2",
      title: "Stuffing ultra-broad hashtags hoping for viral reach",
      why: (
        <>
          Hashtags like <code>#viral</code>, <code>#explorepage</code>, or huge generic categories rarely help you rank.
          They’re too broad to reliably surface your post to a specific audience, and your post can be buried instantly.
        </>
      ),
      fix: (
        <>
          Replace broad spam tags with <span className="font-medium">niche hashtags</span> your audience actually follows.
          Niche tags often bring more qualified discovery than giant ones. Combine them with a few broad anchors (not dozens).
        </>
      ),
      quickCheck: [
        "Do most hashtags describe a real niche community?",
        "Are you relying on ‘viral’ tags instead of relevance?",
        "Can you justify every tag you’re using?",
      ],
    },
    {
      id: "mistake-3",
      title: "Using hashtags that don’t match the content (trend chasing)",
      why: (
        <>
          Trending hashtags can bring attention—but only when your content genuinely fits the trend/topic. If the tags
          don’t match what viewers see and expect, engagement quality drops (fewer saves/shares), and distribution usually slows.
        </>
      ),
      fix: (
        <>
          Write a one-sentence “topic sentence” and map your hashtags to it. If a hashtag doesn’t clearly fit the sentence,
          cut it—no matter how popular it is.
        </>
      ),
      quickCheck: [
        "Does the hashtag match what’s on-screen?",
        "Does it match the caption and viewer intent?",
        "Would the right audience be happy they found this post?",
      ],
    },
    {
      id: "mistake-4",
      title: "Using too many hashtags without structure",
      why: (
        <>
          The problem isn’t just the number—it’s the lack of structure. Big lists often include unrelated tags, duplicate intent,
          or broad tags that dilute clarity. That can lead to weaker topic signals.
        </>
      ),
      fix: (
        <>
          Use a balanced structure: <span className="font-medium">2–4 broad</span>,{" "}
          <span className="font-medium">6–12 niche</span>,{" "}
          <span className="font-medium">2–4 intent</span>,{" "}
          <span className="font-medium">1–2 branded/series</span>.
          If you need help, start with the{" "}
          <Link href="/hashtag-generator" className="underline underline-offset-4">
            generator
          </Link>{" "}
          and curate down.
        </>
      ),
      quickCheck: [
        "Do you have niche tags where you can realistically show up?",
        "Do you have a couple of intent tags that fit the post type?",
        "Do you have 1–2 branded tags for repeatability?",
      ],
    },
    {
      id: "mistake-5",
      title: "Treating hashtags as the whole strategy (no destination, no tracking)",
      why: (
        <>
          Hashtags can help discovery, but discovery isn’t the same as results. If you don’t have a clear destination (offer, page,
          bio link) and you don’t track outcomes, you can’t learn what works.
        </>
      ),
      fix: (
        <>
          Pair every post with a measurable CTA. Use{" "}
          <Link href="/links" className="underline underline-offset-4">
            Kompi Links
          </Link>{" "}
          for trackable destinations, then add attribution using{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTMs
          </Link>
          . If you promote offline, connect it with{" "}
          <Link href="/qr-code/with-logo" className="underline underline-offset-4">
            QR codes with logo
          </Link>{" "}
          or the{" "}
          <Link href="/qr-code-generator" className="underline underline-offset-4">
            QR Code Generator
          </Link>
          .
        </>
      ),
      quickCheck: [
        "Does this post have a clear next action?",
        "Can you measure clicks by campaign or post?",
        "Are you learning outcomes (not just views)?",
      ],
    },
    {
      id: "mistake-6",
      title: "Never auditing performance (so you repeat the same mistakes)",
      why: (
        <>
          If you never review performance over time, you’ll keep repeating the same hashtag choices whether they help or not.
          Single-post conclusions are often misleading—look for patterns.
        </>
      ),
      fix: (
        <>
          Review performance monthly: saves, shares, profile visits, and link clicks.
          Use trackable links and UTMs so you can compare outcomes across content pillars.
        </>
      ),
      quickCheck: [
        "Do you review sets monthly and adjust?",
        "Can you identify your best-performing pillars?",
        "Do you measure clicks with UTMs and short links?",
      ],
    },
  ];

  return (
    <section id="mistakes" className="space-y-8">
      <SectionHeader
        eyebrow="The mistakes"
        title="The hashtag mistakes that kill reach in 2026"
        description={
          <>
            These aren’t “secret hacks.” They’re common, fixable issues. If you correct them—and commit to a simple rotation
            and tracking workflow—you’ll usually see more consistent discovery over time.
          </>
        }
      />

      <div className="space-y-6">
        {mistakes.map((m, idx) => (
          <MistakeCard
            key={m.id}
            index={idx + 1}
            title={m.title}
            why={m.why}
            fix={m.fix}
            quickCheck={m.quickCheck}
          />
        ))}
      </div>
    </section>
  );
}

function FixFrameworkSection() {
  return (
    <section id="fix-framework" className="space-y-8">
      <SectionHeader
        eyebrow="Fix framework"
        title="A simple way to rebuild your hashtag sets"
        description={
          <>
            The goal is clarity: help Instagram categorize your content and help the right people find it. This workflow is
            designed to be repeatable and testable—so you can improve without guessing.
          </>
        }
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 md:p-10 space-y-5 shadow-sm">
          <h3 className="text-xl font-extrabold tracking-tight">The 5-step workflow</h3>

          <ol className="space-y-3 text-neutral-700">
            <StepRow n={1} title="Write a topic sentence">
              Topic + audience + intent. Example: “3 quick desk stretches for tight hips.”
            </StepRow>
            <StepRow n={2} title="Generate ideas fast">
              Use{" "}
              <Link href="/hashtag-generator" className="underline underline-offset-4">
                Hashtag Generator
              </Link>{" "}
              to get options.
            </StepRow>
            <StepRow n={3} title="Curate ruthlessly">
              Keep only tags that clearly match the sentence. Remove irrelevant trends.
            </StepRow>
            <StepRow n={4} title="Structure your set">
              2–4 broad, 6–12 niche, 2–4 intent, 1–2 branded/series.
            </StepRow>
            <StepRow n={5} title="Rotate and measure">
              Rotate sets per content pillar and track outcomes using{" "}
              <Link href="/links" className="underline underline-offset-4">
                Links
              </Link>{" "}
              +{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4">
                UTMs
              </Link>
              .
            </StepRow>
          </ol>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/hashtag-generator"
              className="rounded-2xl bg-neutral-950 text-white px-4 py-2.5 font-semibold hover:bg-black transition"
            >
              Generate a set
            </Link>
            <Link
              href="/blog/instagram-hashtag-strategy-2026"
              className="rounded-2xl bg-white border border-black/10 px-4 py-2.5 font-semibold hover:bg-neutral-50 transition"
            >
              Full strategy guide
            </Link>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-black/10 bg-neutral-50 p-6 md:p-10 space-y-5">
          <h3 className="text-xl font-extrabold tracking-tight">A “good set” checklist</h3>

          <div className="grid gap-3">
            <CheckRow>Every hashtag matches the content topic (no mismatches)</CheckRow>
            <CheckRow>You have more niche tags than ultra-broad tags</CheckRow>
            <CheckRow>You included a few intent tags (tutorial, tips, how-to)</CheckRow>
            <CheckRow>You have 1–2 branded/series tags for repeatability</CheckRow>
            <CheckRow>You can explain why each hashtag is there</CheckRow>
          </div>

          <div className="rounded-[2.5rem] border border-black/10 bg-white p-5 space-y-3">
            <div className="text-sm font-semibold text-neutral-600">Pro tip</div>
            <p className="text-neutral-700">
              If you’re using hashtags for business outcomes (not just views), make sure your CTA is measurable. Build a
              trackable destination via{" "}
              <Link href="/links" className="underline underline-offset-4">
                Links
              </Link>{" "}
              and add attribution via{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4">
                UTMs
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExamplesSection() {
  const examples = [
    {
      title: "Creator / Personal Brand (education)",
      tags: [
        "#contentcreator",
        "#creatortips",
        "#socialmediatips",
        "#reelscreator",
        "#buildinpublic",
        "#contentstrategy",
        "#creatorworkflow",
        "#howto",
        "#tutorial",
        "#YourBrandName",
      ],
      notes: [
        "Keep the set aligned with the actual value of the post (tips, tutorial, workflow).",
        "Swap niche tags per topic: editing, scripting, content planning, etc.",
      ],
    },
    {
      title: "Small business (product drop)",
      tags: [
        "#smallbusiness",
        "#supportsmallbusiness",
        "#productlaunch",
        "#newarrivals",
        "#limiteddrop",
        "#shoplocal",
        "#giftideas",
        "#productreview",
        "#shopnow",
        "#YourBrandName",
      ],
      notes: [
        "Use niche tags that match your category (skincare, coffee, apparel, etc.).",
        "Track clicks to your product page with UTMs.",
      ],
    },
    {
      title: "Local service (bookings)",
      tags: [
        "#localbusiness",
        "#smallbusinessowner",
        "#YourCity",
        "#YourCityBusiness",
        "#YourService",
        "#YourServiceTips",
        "#booknow",
        "#howto",
        "#beforeandafter",
        "#YourBrandName",
      ],
      notes: [
        "Replace placeholder city/service tags with your real niche keywords.",
        "Add a clear booking CTA and track clicks from Instagram.",
      ],
    },
    {
      title: "Restaurant / cafe (menu + specials)",
      tags: [
        "#foodie",
        "#instafood",
        "#localfood",
        "#coffeetime",
        "#brunch",
        "#dailyspecial",
        "#YourCityEats",
        "#restaurant",
        "#menu",
        "#YourBrandName",
      ],
      notes: [
        "If you have a menu page, link it using QR menus and trackable links.",
        "Avoid generic tags that don’t match the dish or vibe.",
      ],
    },
  ];

  return (
    <section id="examples" className="space-y-8">
      <SectionHeader
        eyebrow="Examples"
        title="Hashtag set examples you can copy (and adapt)"
        description={
          <>
            These are templates. Swap in your niche keywords, location, and series tags. If you want faster iteration,
            generate ideas on{" "}
            <Link href="/hashtag-generator" className="underline underline-offset-4">
              Hashtag Generator
            </Link>{" "}
            and curate down.
          </>
        }
      />

      <div className="grid lg:grid-cols-2 gap-6">
        {examples.map((ex) => (
          <ExampleCard key={ex.title} title={ex.title} tags={ex.tags} notes={ex.notes} />
        ))}
      </div>

      <div className="rounded-[2.5rem] border border-black/10 bg-neutral-50 p-6 md:p-10 space-y-5">
        <h3 className="text-2xl font-extrabold tracking-tight">Make your next post measurable</h3>
        <p className="text-neutral-700">
          Discovery is only half the game. If you want to learn what actually works, pair posts with a trackable destination
          link and attribution. Start with{" "}
          <Link href="/links" className="underline underline-offset-4">
            Links
          </Link>{" "}
          and{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTM Builder
          </Link>
          . For offline campaigns, add{" "}
          <Link href="/qr-code/with-logo" className="underline underline-offset-4">
            QR codes with logo
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-950 text-white px-5 py-3 font-semibold hover:bg-black transition"
          >
            Create a trackable link
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-black/10 px-5 py-3 font-semibold hover:bg-neutral-50 transition"
          >
            Add UTMs
          </Link>
          <Link
            href="/qr-code-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-black/10 px-5 py-3 font-semibold hover:bg-neutral-50 transition"
          >
            Create a QR code
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrackingSection() {
  return (
    <section id="tracking" className="space-y-8">
      <SectionHeader
        eyebrow="Measurement"
        title="How to measure whether your hashtags are helping"
        description={
          <>
            Hashtags are part of distribution—not the whole story. The most reliable way to improve is to measure patterns
            over time, not single posts. If you want real attribution, use UTMs and trackable links.
          </>
        }
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 md:p-10 space-y-4 shadow-sm">
          <h3 className="text-xl font-extrabold tracking-tight">Weekly metrics to watch</h3>
          <ul className="space-y-2 text-neutral-700">
            <Bullet>Non-follower reach (trend over weeks)</Bullet>
            <Bullet>Saves (strong “value” signal)</Bullet>
            <Bullet>Shares (strong “relevance” signal)</Bullet>
            <Bullet>Profile visits (interest + intent)</Bullet>
            <Bullet>Link clicks (business metric)</Bullet>
          </ul>

          <div className="rounded-[2.5rem] border border-black/10 bg-neutral-50 p-5">
            <div className="text-sm font-semibold text-neutral-600">If clicks matter for your business</div>
            <p className="text-neutral-700 mt-2">
              Build your destination using{" "}
              <Link href="/links" className="underline underline-offset-4">
                Kompi Links
              </Link>{" "}
              and add attribution with{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4">
                UTMs
              </Link>
              . That lets you compare which posts and campaigns drive outcomes.
            </p>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-black/10 bg-neutral-50 p-6 md:p-10 space-y-4">
          <h3 className="text-xl font-extrabold tracking-tight">A simple attribution setup</h3>
          <ol className="space-y-3 text-neutral-700">
            <StepRow n={1} title="Create a destination link">
              Use{" "}
              <Link href="/links" className="underline underline-offset-4">
                /links
              </Link>{" "}
              to create a short link or a link hub.
            </StepRow>
            <StepRow n={2} title="Add UTMs for Instagram">
              Use{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4">
                /tools/utm-builder
              </Link>{" "}
              (source=instagram, medium=social, campaign=your-campaign).
            </StepRow>
            <StepRow n={3} title="Post + measure">
              Publish content with your curated hashtag set, then compare clicks across posts over time.
            </StepRow>
            <StepRow n={4} title="Extend offline (optional)">
              If you run flyers/packaging/signage, connect the same offer with{" "}
              <Link href="/qr-code/with-logo" className="underline underline-offset-4">
                /qr-code/with-logo
              </Link>{" "}
              or{" "}
              <Link href="/qr-code-generator" className="underline underline-offset-4">
                /qr-code-generator
              </Link>
              .
            </StepRow>
          </ol>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/links"
              className="rounded-2xl bg-neutral-950 text-white px-4 py-2.5 font-semibold hover:bg-black transition"
            >
              Open Links
            </Link>
            <Link
              href="/tools/utm-builder"
              className="rounded-2xl bg-white border border-black/10 px-4 py-2.5 font-semibold hover:bg-neutral-50 transition"
            >
              Open UTM Builder
            </Link>
            <Link
              href="/hashtag-generator"
              className="rounded-2xl bg-white border border-black/10 px-4 py-2.5 font-semibold hover:bg-neutral-50 transition"
            >
              Generate hashtags
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 md:p-10 space-y-4 shadow-sm">
        <h3 className="text-2xl font-extrabold tracking-tight">If you’re building a full funnel</h3>
        <p className="text-neutral-700">Kompi isn’t just hashtags. Use the ecosystem to route and measure attention:</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <PillLink href="/links" label="Links" />
          <PillLink href="/tools/utm-builder" label="UTM Builder" />
          <PillLink href="/kr-codes" label="KR Codes" />
          <PillLink href="/qr-menus" label="QR Menus" />
          <PillLink href="/qr-code/with-logo" label="QR with logo" />
          <PillLink href="/qr-code-generator" label="QR generator" />
          <PillLink href="/k-cards" label="K-Cards" />
          <PillLink href="/hashtag-generator" label="Hashtag generator" />
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
        title="Frequently asked questions"
        description={
          <>
            Quick answers about hashtags, relevance, and how to track results. If you want the full framework, read{" "}
            <Link href="/blog/instagram-hashtag-strategy-2026" className="underline underline-offset-4">
              Instagram Hashtag Strategy in 2026
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

      <div className="rounded-[2.5rem] border border-black/10 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-extrabold tracking-tight">Want to fix your sets in minutes?</h3>
        <p className="text-neutral-700">
          Use{" "}
          <Link href="/hashtag-generator" className="underline underline-offset-4">
            Hashtag Generator
          </Link>{" "}
          to generate ideas, then curate with the broad + niche + intent + branded structure. If clicks matter, track them
          with{" "}
          <Link href="/links" className="underline underline-offset-4">
            Links
          </Link>{" "}
          and{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTMs
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/hashtag-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-950 text-white px-5 py-3 font-semibold hover:bg-black transition"
          >
            Open Hashtag Generator
          </Link>
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-black/10 px-5 py-3 font-semibold hover:bg-neutral-50 transition"
          >
            Create tracked links
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedLinksSection() {
  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="Kompi tools"
        title="Turn Instagram discovery into measurable growth"
        description="Hashtags can support discovery. Kompi helps you route attention to a destination and track what converts."
      />

      <div className="grid md:grid-cols-2 gap-6">
        <RelatedLinkCard
          href="/hashtag-generator"
          title="Hashtag Generator"
          description="Generate hashtag ideas fast, then curate into structured sets."
        />
        <RelatedLinkCard
          href="/links"
          title="Kompi Links"
          description="Create short links and link hubs for your bio, offers, and campaigns."
        />
        <RelatedLinkCard
          href="/tools/utm-builder"
          title="UTM Builder"
          description="Add campaign parameters so you can attribute clicks by post and campaign."
        />
        <RelatedLinkCard
          href="/qr-code/with-logo"
          title="QR Code With Logo"
          description="Bridge offline-to-online campaigns with branded QR codes."
        />
      </div>
    </section>
  );
}

function RelatedPostsSection() {
  const related = [
    {
      href: "/blog/instagram-hashtag-strategy-2026",
      title: "Instagram Hashtag Strategy in 2026: How to Build Sets That Rank",
      desc: "The full framework: broad + niche + intent + branded, plus rotation and measurement.",
    },
    {
      href: "/blog/how-many-hashtags-instagram-2026",
      title: "How Many Hashtags Should You Use on Reels vs Carousels in 2026?",
      desc: "Practical ranges and how to adapt based on your niche and post type.",
    },
    {
      href: "/blog/track-instagram-utm-links",
      title: "How to Track Instagram Post Performance with UTMs (So You Stop Guessing)",
      desc: "A measurable workflow using UTMs + trackable links—built for real outcomes.",
    },
  ];

  return (
    <section className="space-y-6">
      <SectionHeader
        eyebrow="More reading"
        title="Keep building your Instagram system"
        description="If you want consistency, build a repeatable workflow: generate → curate → rotate → measure."
      />

      <div className="grid md:grid-cols-3 gap-4">
        {related.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="rounded-[2.5rem] border border-black/10 bg-white p-6 hover:bg-neutral-50 transition space-y-2 shadow-sm"
          >
            <div className="font-extrabold tracking-tight">{p.title}</div>
            <div className="text-sm text-neutral-600">{p.desc}</div>
            <div className="pt-1 text-sm font-semibold">Read →</div>
          </Link>
        ))}
      </div>

      <div className="rounded-[2.5rem] border border-black/10 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-2xl font-extrabold tracking-tight">Next step</h3>
        <p className="text-neutral-700">
          Fix your sets, then make your Instagram traffic measurable. Start with{" "}
          <Link href="/links" className="underline underline-offset-4">
            Links
          </Link>{" "}
          and{" "}
          <Link href="/tools/utm-builder" className="underline underline-offset-4">
            UTMs
          </Link>
          . If you’re also promoting offline, add{" "}
          <Link href="/qr-code-generator" className="underline underline-offset-4">
            QR codes
          </Link>{" "}
          or{" "}
          <Link href="/qr-menus" className="underline underline-offset-4">
            QR menus
          </Link>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/hashtag-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-neutral-950 text-white px-5 py-3 font-semibold hover:bg-black transition"
          >
            Generate a set now
          </Link>
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-black/10 px-5 py-3 font-semibold hover:bg-neutral-50 transition"
          >
            Create tracked links
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-black/10 px-5 py-3 font-semibold hover:bg-neutral-50 transition"
          >
            Build UTMs
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------------------------------
 * UI Components
 * ------------------------------------------------------------------------------------------------- */

function SectionHeader(props: { eyebrow: string; title: string; description: ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-neutral-600">{props.eyebrow}</div>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{props.title}</h2>
      <div className="text-neutral-600 text-base md:text-lg max-w-4xl leading-relaxed">{props.description}</div>
    </div>
  );
}

function MiniCard(props: { title: string; description: ReactNode }) {
  return (
    <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 space-y-2">
      <div className="font-extrabold tracking-tight text-white">{props.title}</div>
      <div className="text-white/80">{props.description}</div>
    </div>
  );
}

function ChecklistCard(props: { title: string; items: string[] }) {
  return (
    <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 md:p-8 space-y-4 shadow-sm">
      <div className="text-lg font-extrabold tracking-tight">{props.title}</div>
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

function MistakeCard(props: {
  index: number;
  title: string;
  why: ReactNode;
  fix: ReactNode;
  quickCheck: string[];
}) {
  return (
    <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 md:p-10 space-y-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-full bg-neutral-950 text-white flex items-center justify-center text-sm font-extrabold shrink-0">
          {props.index}
        </div>
        <div className="space-y-1">
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{props.title}</h3>
          <div className="text-neutral-600">What’s happening, why it hurts, and the fix.</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-neutral-600">Why it hurts reach</div>
        <div className="text-neutral-800 leading-relaxed">{props.why}</div>
      </div>

      <div className="rounded-[2.25rem] border border-black/10 bg-neutral-50 p-5 space-y-3">
        <div className="text-sm font-semibold text-neutral-700">Fix</div>
        <div className="text-neutral-800 leading-relaxed">{props.fix}</div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold text-neutral-600">Quick check</div>
        <ul className="grid md:grid-cols-3 gap-2">
          {props.quickCheck.map((q) => (
            <li key={q} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-neutral-700">
              {q}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ExampleCard(props: { title: string; tags: string[]; notes: string[] }) {
  return (
    <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 md:p-10 space-y-5 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-xl font-extrabold tracking-tight">{props.title}</h3>
        <p className="text-neutral-600">Template set (swap placeholders and refine to your niche).</p>
      </div>

      <div className="rounded-[2.25rem] border border-black/10 bg-neutral-50 p-5">
        <div className="flex flex-wrap gap-2">
          {props.tags.map((t) => (
            <span key={t} className="inline-flex rounded-full bg-white border border-black/10 px-3 py-1 text-sm">
              {t}
            </span>
          ))}
        </div>
      </div>

      <ul className="space-y-2 text-neutral-700">
        {props.notes.map((n) => (
          <li key={n} className="flex gap-2">
            <Dot />
            <span>{n}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/hashtag-generator"
          className="rounded-2xl bg-neutral-950 text-white px-4 py-2.5 font-semibold hover:bg-black transition"
        >
          Generate more ideas
        </Link>
        <Link
          href="/links"
          className="rounded-2xl bg-white border border-black/10 px-4 py-2.5 font-semibold hover:bg-neutral-50 transition"
        >
          Add a trackable link
        </Link>
      </div>
    </div>
  );
}

function StepRow(props: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <div className="h-8 w-8 rounded-full bg-neutral-950 text-white flex items-center justify-center text-sm font-extrabold shrink-0">
        {props.n}
      </div>
      <div className="space-y-1">
        <div className="font-extrabold tracking-tight">{props.title}</div>
        <div className="text-neutral-700">{props.children}</div>
      </div>
    </li>
  );
}

function CheckRow(props: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
      <div className="mt-1.5 h-2 w-2 rounded-full bg-neutral-950 shrink-0" />
      <div className="text-neutral-700">{props.children}</div>
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
  return <span className="mt-2 h-2 w-2 rounded-full bg-neutral-950 shrink-0" />;
}

function PillLink(props: { href: string; label: string }) {
  return (
    <Link
      href={props.href}
      className={cx(
        "inline-flex items-center justify-between",
        "rounded-2xl",
        "border border-black/10",
        "bg-neutral-50",
        "px-4 py-3",
        "font-semibold",
        "hover:bg-neutral-100",
        "transition"
      )}
    >
      <span>{props.label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function FaqItem(props: { q: string; a: string }) {
  return (
    <div className="rounded-[2.5rem] border border-black/10 bg-white p-6 md:p-7 space-y-2 shadow-sm">
      <div className="text-lg font-extrabold tracking-tight">{props.q}</div>
      <div className="text-neutral-600 leading-relaxed">{props.a}</div>
    </div>
  );
}

function RelatedLinkCard(props: { href: string; title: string; description: string }) {
  return (
    <Link
      href={props.href}
      className={cx(
        "rounded-[2.5rem]",
        "border border-black/10",
        "bg-white",
        "p-6 md:p-10",
        "space-y-2",
        "hover:bg-neutral-50",
        "transition",
        "shadow-sm"
      )}
    >
      <div className="text-xl font-extrabold tracking-tight">{props.title}</div>
      <div className="text-neutral-600">{props.description}</div>
      <div className="pt-2 text-sm font-semibold">Explore →</div>
    </Link>
  );
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
