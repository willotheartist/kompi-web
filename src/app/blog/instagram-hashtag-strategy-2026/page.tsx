// src/app/blog/instagram-hashtag-strategy-2026/page.tsx

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

const SITE_URL = "https://kompi.io";
const SLUG = "instagram-hashtag-strategy-2026";
const CANONICAL_URL = `${SITE_URL}/blog/${SLUG}`;
const OG_IMAGE = `${SITE_URL}/og/${SLUG}.png`;

const TITLE =
  "Instagram Hashtag Strategy in 2026: How to Build Sets That Rank (Without Stuffing)";
const DESCRIPTION =
  "A practical 2026 hashtag framework for Instagram: build rankable sets without stuffing, rotate intelligently, avoid common mistakes, and track real outcomes with UTMs + links.";

const KEYWORDS: string[] = [
  "instagram hashtag strategy 2026",
  "instagram hashtags 2026",
  "how many hashtags instagram 2026",
  "hashtag sets instagram",
  "rank hashtags instagram",
  "instagram hashtag tips",
  "reels hashtags 2026",
  "hashtag rotation strategy",
  "hashtag research",
  "avoid hashtag stuffing",
  "instagram discoverability",
  "social media growth",
  "utm tracking for instagram",
  "track link clicks instagram",
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

export default function Page() {
  const published = "2026-01-05";
  const modified = "2026-01-05";
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: TITLE,
        item: CANONICAL_URL,
      },
    ],
  };

  return (
    <>
      <Navbar />

      <main className="bg-white text-neutral-900">
        <header className="border-b border-neutral-200 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600">
              <Link href="/blog" className="underline underline-offset-4">
                Blog
              </Link>
              <span aria-hidden="true">•</span>
              <span>{formatDate(published)}</span>
              <span aria-hidden="true">•</span>
              <span>8–10 min read</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {TITLE}
            </h1>

            <p className="text-lg md:text-xl text-neutral-700 max-w-3xl">
              Hashtags aren’t dead. They’re just misunderstood. Here’s a clean,
              practical 2026 framework to build rankable Instagram hashtag sets
              without stuffing—plus a simple way to track real outcomes with{" "}
              <Link
                href="/tools/utm-builder"
                className="underline underline-offset-4"
              >
                UTMs
              </Link>{" "}
              and{" "}
              <Link href="/links" className="underline underline-offset-4">
                trackable links
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/hashtag-generator"
                className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
              >
                Try the Hashtag Generator
              </Link>
              <Link
                href="/tools/utm-builder"
                className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
              >
                Build UTMs for Instagram
              </Link>
            </div>
          </div>
        </header>

        <section className="max-w-4xl mx-auto px-6 py-12 md:py-16 space-y-12">
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-3">
                <h2 className="text-xl font-semibold">Quick takeaway</h2>
                <p className="text-neutral-700">
                  The best Instagram hashtag strategy in 2026 is simple: use
                  fewer hashtags, make them more relevant, and build sets around
                  intent + niche. Rotate sets by content pillar, avoid irrelevant
                  trends, and track clicks so you stop guessing.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <PillLink href="/hashtag-generator" label="Hashtag Generator" />
                  <PillLink href="/links" label="Kompi Links" />
                  <PillLink href="/tools/utm-builder" label="UTM Builder" />
                  <PillLink href="/qr-code-generator" label="QR Code Generator" />
                </div>
              </div>
              <div className="md:col-span-4">
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 space-y-3">
                  <div className="text-sm font-medium text-neutral-700">
                    Use this structure
                  </div>
                  <ul className="text-sm text-neutral-700 space-y-2">
                    <li className="flex gap-2">
                      <Dot />
                      <span>2–4 Broad hashtags</span>
                    </li>
                    <li className="flex gap-2">
                      <Dot />
                      <span>6–12 Niche hashtags</span>
                    </li>
                    <li className="flex gap-2">
                      <Dot />
                      <span>2–4 Intent hashtags</span>
                    </li>
                    <li className="flex gap-2">
                      <Dot />
                      <span>1–2 Branded/Series hashtags</span>
                    </li>
                  </ul>

                  <Link
                    href="/hashtag-generator"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-black text-white px-4 py-2.5 font-medium hover:opacity-90 transition"
                  >
                    Generate a set
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <ArticleBody />

          <CalloutTrackSection />

          <RelatedPostsSection />
        </section>
      </main>

      <FooterCTA />

      <Script id="jsonld-blogposting" type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </Script>

      <Script id="jsonld-breadcrumb" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
    </>
  );
}

/* -------------------------------------------------------------------------------------------------
 * Content Sections
 * ------------------------------------------------------------------------------------------------- */

function ArticleBody() {
  return (
    <article className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          What “ranking” means on Instagram in 2026
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          When people say a hashtag “ranks,” they usually mean one of two things:
          your post appears in the top results for a hashtag, or your post is
          distributed to non-followers who are interested in that topic. In
          2026, both outcomes depend on the same thing: Instagram needs
          confidence that your content is relevant to the hashtag and worth
          showing.
        </p>
        <p className="text-neutral-700 leading-relaxed">
          Hashtags don’t create reach by themselves—hashtags <em>clarify</em>{" "}
          reach. They help Instagram categorize your content and route it to the
          right audience. If the post doesn’t match the tags (or engagement
          quality is weak), distribution slows quickly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          The #1 mistake: stuffing broad hashtags
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          Stuffing looks like copying a huge block of hashtags and pasting it on
          every post—even if half the tags don’t match. Classic examples include
          vague, ultra-broad tags that millions of posts use every day. Even if
          you do appear briefly, you’ll be buried fast. Worse: it can confuse
          Instagram about who your content is for.
        </p>

        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 space-y-3">
          <h3 className="text-xl font-semibold">Why stuffing fails</h3>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex gap-2">
              <Dot />
              <span>Broad tags don’t define a niche audience</span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>Irrelevant tags attract low-intent engagement</span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>Mixed signals make distribution less predictable</span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>Repetitive blocks reduce clarity over time</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          The winning structure: Broad + Niche + Intent + Branded
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          If you want hashtag sets that rank without stuffing, build them with a
          repeatable structure. Here’s the simplest version to start with.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <FrameworkCard
            title="1) Broad tags (2–4)"
            description="Big categories that describe where your content lives. Use a few—don’t rely on them to rank."
            examples={["#fitness", "#skincare", "#foodphotography", "#smallbusiness"]}
          />
          <FrameworkCard
            title="2) Niche tags (6–12)"
            description="Smaller communities where you can realistically show up and get qualified discovery."
            examples={[
              "#mobilitytraining",
              "#beginnerstrengthtraining",
              "#acneskintips",
              "#sourdoughstarter",
              "#londoncoffeeculture",
            ]}
          />
          <FrameworkCard
            title="3) Intent tags (2–4)"
            description="Tags aligned with what someone is trying to learn, buy, or achieve."
            examples={["#howto", "#tutorial", "#tipsandtricks", "#productreview"]}
          />
          <FrameworkCard
            title="4) Branded/series tags (1–2)"
            description="Your tag that builds a library and makes your series bingeable."
            examples={["#YourBrandName", "#YourSeriesName", "#YourBrandTips"]}
          />
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-3">
          <h3 className="text-xl font-semibold">Shortcut: start from a “topic sentence”</h3>
          <p className="text-neutral-700 leading-relaxed">
            Before generating hashtags, write one sentence that describes your
            post. Example: <em>“A 30-second mobility flow to fix tight hips for desk workers.”</em>{" "}
            Your best hashtags should map directly to the topic, audience, and
            intent in that sentence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/hashtag-generator"
              className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
            >
              Generate hashtags from a topic
            </Link>
            <Link
              href="/links"
              className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
            >
              Set up a tracked link hub
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          How many hashtags should you use in 2026?
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          The old “always use 30 hashtags” advice is outdated. In 2026, strong
          sets are usually smaller and more intentional.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <NumberCard title="Reels" value="8–18" note="Enough to clarify topic + intent without noise." />
          <NumberCard title="Posts/Carousels" value="6–15" note="Keep it tight and relevant—quality beats quantity." />
        </div>

        <p className="text-neutral-700 leading-relaxed">
          If you can’t justify a hashtag, remove it. Ten high-relevance tags
          usually beat thirty random ones.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          The “3-set rotation” strategy (simple + effective)
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          Instead of repeating the same hashtag block forever, build three sets
          per content pillar. Rotate based on what you posted. This keeps
          relevance high and makes it easier to learn what performs.
        </p>

        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-8 space-y-4">
          <h3 className="text-xl font-semibold">Example rotation (fitness coach)</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <RotationCard
              title="Set A: Beginner Strength"
              bullets={[
                "Broad: #fitness #strengthtraining",
                "Niche: beginner + equipment + goals",
                "Intent: #howto #workouttips",
              ]}
            />
            <RotationCard
              title="Set B: Mobility & Pain Relief"
              bullets={[
                "Broad: #mobility #stretching",
                "Niche: desk work + hips + low back",
                "Intent: #mobilitytips #tutorial",
              ]}
            />
            <RotationCard
              title="Set C: Nutrition Habits"
              bullets={[
                "Broad: #nutrition #healthyhabits",
                "Niche: meal prep + macros + routine",
                "Intent: #tipsandtricks #howto",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          What to avoid in 2026
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <AvoidCard
            title="Irrelevant trending tags"
            description="If the tag doesn’t match your content, skip it. Relevance wins long-term."
          />
          <AvoidCard
            title="Ambiguous tags"
            description="If a hashtag has multiple meanings, you may attract the wrong audience."
          />
          <AvoidCard
            title="Copy/paste blocks across unrelated posts"
            description="Instagram learns from consistency—reward relevance, avoid mixed signals."
          />
          <AvoidCard
            title="Comment dumping as a “hack”"
            description="Placement matters less than relevance and engagement quality."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          How to know if your hashtag strategy is working
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          Track what matters weekly. Views are nice, but outcomes are better.
        </p>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-3">
          <h3 className="text-xl font-semibold">Weekly metrics</h3>
          <ul className="space-y-2 text-neutral-700">
            <li className="flex gap-2">
              <Dot />
              <span>Non-follower reach (Explore + topic distribution)</span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>Saves (strong “value” signal)</span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>Shares (strong “relevance” signal)</span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>Profile visits (interest + intent)</span>
            </li>
            <li className="flex gap-2">
              <Dot />
              <span>
                Link clicks (business metric) — track with{" "}
                <Link href="/links" className="underline underline-offset-4">
                  Kompi Links
                </Link>{" "}
                and{" "}
                <Link
                  href="/tools/utm-builder"
                  className="underline underline-offset-4"
                >
                  UTMs
                </Link>
              </span>
            </li>
          </ul>
        </div>

        <p className="text-neutral-700 leading-relaxed">
          If you’re running offline campaigns too, connect the same offer with a{" "}
          <Link href="/qr-code/with-logo" className="underline underline-offset-4">
            QR code with logo
          </Link>{" "}
          or a{" "}
          <Link href="/qr-code-generator" className="underline underline-offset-4">
            QR code generator
          </Link>{" "}
          so you can bridge offline-to-online traffic cleanly.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">
          The fastest way to build sets (without overthinking)
        </h2>
        <p className="text-neutral-700 leading-relaxed">
          Use a generator to get options, then curate the final list using the
          framework. If you want to do it right, follow this workflow:
        </p>

        <ol className="space-y-3 text-neutral-700">
          <li className="flex gap-3">
            <StepNumber n={1} />
            <div>
              Write your post’s topic sentence (topic + audience + intent).
            </div>
          </li>
          <li className="flex gap-3">
            <StepNumber n={2} />
            <div>
              Generate ideas using{" "}
              <Link href="/hashtag-generator" className="underline underline-offset-4">
                Kompi’s Hashtag Generator
              </Link>
              .
            </div>
          </li>
          <li className="flex gap-3">
            <StepNumber n={3} />
            <div>
              Keep only hashtags that match the post exactly (no trend chasing).
            </div>
          </li>
          <li className="flex gap-3">
            <StepNumber n={4} />
            <div>
              Build the final set: 2–4 broad, 6–12 niche, 2–4 intent, 1–2 branded.
            </div>
          </li>
          <li className="flex gap-3">
            <StepNumber n={5} />
            <div>
              Track clicks using{" "}
              <Link href="/links" className="underline underline-offset-4">
                Kompi Links
              </Link>{" "}
              +{" "}
              <Link href="/tools/utm-builder" className="underline underline-offset-4">
                UTMs
              </Link>{" "}
              and refine weekly.
            </div>
          </li>
        </ol>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h2 className="text-2xl font-semibold">Try it now</h2>
        <p className="text-neutral-700">
          Build a clean hashtag set for your next post, then connect it to a
          trackable destination so you can learn what actually converts.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/hashtag-generator"
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Open Hashtag Generator
          </Link>
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Create a trackable link hub
          </Link>
          <Link
            href="/tools/utm-builder"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Build UTMs
          </Link>
        </div>
      </section>
    </article>
  );
}

function CalloutTrackSection() {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Don’t just chase reach—track outcomes</h2>
        <p className="text-neutral-700 leading-relaxed">
          If you’re serious about growth, stop treating hashtags as the finish
          line. Hashtags help discovery. Your destination and tracking determine
          whether that discovery turns into results. Kompi gives you a simple
          workflow:
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <ActionCard
          title="1) Build a destination"
          description={
            <>
              Create a clean link hub or short link using{" "}
              <Link href="/links" className="underline underline-offset-4">
                Kompi Links
              </Link>
              .
            </>
          }
          href="/links"
          cta="Open Links"
        />
        <ActionCard
          title="2) Add attribution"
          description={
            <>
              Generate campaign parameters using the{" "}
              <Link
                href="/tools/utm-builder"
                className="underline underline-offset-4"
              >
                UTM Builder
              </Link>
              .
            </>
          }
          href="/tools/utm-builder"
          cta="Open UTM Builder"
        />
        <ActionCard
          title="3) Extend offline (optional)"
          description={
            <>
              Add a branded QR code using{" "}
              <Link
                href="/qr-code/with-logo"
                className="underline underline-offset-4"
              >
                QR with logo
              </Link>{" "}
              for posters, packaging, or menus.
            </>
          }
          href="/qr-code/with-logo"
          cta="Create branded QR"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/kr-codes"
          className="rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-2 font-medium hover:bg-neutral-100 transition"
        >
          Explore KR Codes
        </Link>
        <Link
          href="/qr-menus"
          className="rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-2 font-medium hover:bg-neutral-100 transition"
        >
          Build QR Menus
        </Link>
        <Link
          href="/k-cards"
          className="rounded-2xl bg-neutral-50 border border-neutral-200 px-4 py-2 font-medium hover:bg-neutral-100 transition"
        >
          Create K-Cards
        </Link>
      </div>
    </section>
  );
}

function RelatedPostsSection() {
  const related = [
    {
      title: "Hashtag Mistakes That Kill Reach (And What To Do Instead)",
      href: "/blog/instagram-hashtag-mistakes-2026",
      desc: "Common pitfalls and the simplest fixes for better relevance and distribution.",
    },
    {
      title: "How Many Hashtags Should You Use on Reels vs Carousels in 2026?",
      href: "/blog/how-many-hashtags-instagram-2026",
      desc: "A practical range and how to tailor your count by content type.",
    },
    {
      title: "How to Track Instagram Post Performance with UTMs (So You Stop Guessing)",
      href: "/blog/track-instagram-utm-links",
      desc: "Turn posts into measurable campaigns using UTMs + short links.",
    },
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">More posts</h2>
        <p className="text-neutral-700">
          If you want to build a consistent system, these next reads pair well
          with the framework above.
        </p>
      </div>

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

      <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 md:p-10 space-y-4">
        <h3 className="text-xl font-semibold">Want to generate sets faster?</h3>
        <p className="text-neutral-700">
          Use the{" "}
          <Link href="/hashtag-generator" className="underline underline-offset-4">
            Hashtag Generator
          </Link>{" "}
          to get ideas, then curate with the Broad + Niche + Intent + Branded
          structure. When you’re ready to measure outcomes, start with{" "}
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
            className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition"
          >
            Open Hashtag Generator
          </Link>
          <Link
            href="/links"
            className="inline-flex items-center justify-center rounded-2xl bg-white border border-neutral-200 px-5 py-3 font-medium hover:bg-neutral-100 transition"
          >
            Create tracked links
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------------------------------
 * UI Helpers
 * ------------------------------------------------------------------------------------------------- */

function PillLink(props: { href: string; label: string }) {
  return (
    <Link
      href={props.href}
      className="inline-flex items-center rounded-full bg-neutral-50 border border-neutral-200 px-3 py-1.5 text-sm font-medium hover:bg-neutral-100 transition"
    >
      {props.label}
    </Link>
  );
}

function Dot() {
  return <span className="mt-1.5 h-2 w-2 rounded-full bg-neutral-900 shrink-0" />;
}

function FrameworkCard(props: {
  title: string;
  description: string;
  examples: string[];
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-4">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <p className="text-neutral-700">{props.description}</p>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="flex flex-wrap gap-2">
          {props.examples.map((e) => (
            <span
              key={e}
              className="inline-flex rounded-full bg-white border border-neutral-200 px-3 py-1 text-sm"
            >
              {e}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function NumberCard(props: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-2">
      <div className="text-sm font-medium text-neutral-600">{props.title}</div>
      <div className="text-3xl font-semibold">{props.value}</div>
      <div className="text-neutral-700">{props.note}</div>
    </div>
  );
}

function RotationCard(props: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-5 space-y-3">
      <div className="font-semibold">{props.title}</div>
      <ul className="space-y-2 text-sm text-neutral-700">
        {props.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <Dot />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AvoidCard(props: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8 space-y-2">
      <div className="text-xl font-semibold">{props.title}</div>
      <p className="text-neutral-700">{props.description}</p>
    </div>
  );
}

function ActionCard(props: {
  title: string;
  description: ReactNode;
  href: string;
  cta: string;
}) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 space-y-4">
      <div className="space-y-2">
        <div className="text-lg font-semibold">{props.title}</div>
        <div className="text-neutral-700">{props.description}</div>
      </div>
      <Link
        href={props.href}
        className="inline-flex items-center justify-center rounded-2xl bg-black text-white px-4 py-2.5 font-medium hover:opacity-90 transition"
      >
        {props.cta}
      </Link>
    </div>
  );
}

function StepNumber(props: { n: number }) {
  return (
    <div className="h-7 w-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0">
      {props.n}
    </div>
  );
}

function formatDate(iso: string) {
  // Minimal, locale-safe-ish formatting without Intl edge cases across runtimes
  // (ISO: YYYY-MM-DD)
  const [y, m, d] = iso.split("-").map((x) => Number(x));
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
