import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

const SITE_URL = "https://kompi.app";
const SLUG = "how-to-build-a-smart-link-platform";
const CANONICAL_URL = `${SITE_URL}/blog/${SLUG}`;
const WALL_AND_FIFTH_URL = "https://wallandfifth.com";
const CASE_STUDY_URL = `${SITE_URL}/blog/how-kompi-was-built-wall-and-fifth`;

const TITLE = "How to Build a Smart Link Platform: Redirects, Analytics and QR Codes";
const DESCRIPTION =
  "A practical technical guide to smart link platform architecture, covering redirects, click analytics, UTM attribution, referrers, geo data, QR codes, workspaces, authentication and billing.";

const KEYWORDS = [
  "how to build a smart link platform",
  "smart link platform architecture",
  "URL shortener architecture",
  "link tracking architecture",
  "QR code platform architecture",
  "UTM tracking",
  "redirect analytics",
  "SaaS architecture",
  "Next.js SaaS",
  "PostgreSQL Prisma",
  "Kompi",
  "Wall & Fifth",
];

const FAQS = [
  {
    q: "What is a smart link platform?",
    a: "A smart link platform creates short, manageable URLs that can redirect visitors while recording useful context such as clicks, campaign parameters, referrers and location. More complete platforms can connect those links to QR codes, profile pages, custom domains and workspace-level analytics.",
  },
  {
    q: "What is the most important part of URL shortener architecture?",
    a: "The redirect path is the critical part. It has to resolve a code to a valid destination, redirect reliably, and record analytics without making the user wait unnecessarily or breaking the redirect when event logging fails.",
  },
  {
    q: "Should link tracking use aggregate counters or event-level data?",
    a: "Usually both. Aggregate counters make simple totals cheap to read, while event-level records preserve the dimensions needed for campaign, referrer, geography and time-based analysis.",
  },
  {
    q: "How should UTM parameters be handled in a smart link system?",
    a: "A useful implementation gives explicit parameters on the short-link request priority, then falls back to campaign parameters already present on the destination URL. That keeps campaign intent intact while still allowing per-placement overrides.",
  },
  {
    q: "How do QR codes fit into a smart link platform?",
    a: "The QR code should point to a managed redirect rather than being treated as a disconnected image. That means the destination can be measured, and in a dynamic setup it can be changed later without reprinting the QR code.",
  },
  {
    q: "What stack can be used to build a smart link SaaS?",
    a: "There is no single required stack. Kompi's current implementation uses Next.js and React for the application, PostgreSQL through Prisma for data, NextAuth for authentication and Stripe for billing, with first-party click events used alongside product analytics tooling.",
  },
];

export const metadata: Metadata = {
  title: "How to Build a Smart Link Platform: Redirects, Analytics and QR Codes",
  description:
    "A practical technical guide to smart link platform architecture, covering redirects, click analytics, UTM attribution, referrers, geo data, QR codes, workspaces, authentication and billing.",
  keywords: KEYWORDS,
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "article",
    url: CANONICAL_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Kompi",
    publishedTime: "2026-09-08",
    modifiedTime: "2026-09-08",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  const published = "2026-09-08";
  const modified = "2026-09-08";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL_URL },
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Organization",
      name: "Kompi",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Kompi",
      url: SITE_URL,
    },
    about: [
      { "@type": "Thing", name: "Smart link platform architecture" },
      { "@type": "Thing", name: "URL redirects and click analytics" },
      { "@type": "Thing", name: "QR code tracking" },
    ],
    mentions: [
      {
        "@type": "SoftwareApplication",
        name: "Kompi",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
      },
      {
        "@type": "Organization",
        name: "Wall & Fifth",
        url: WALL_AND_FIFTH_URL,
      },
    ],
    citation: CASE_STUDY_URL,
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
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#F7F7F3] text-[#111111]">
        <header className="pt-24 md:pt-28">
          <div className="mx-auto max-w-6xl px-6 pb-14 pt-12 md:px-8 md:pb-20 md:pt-16">
            <div className="mb-7 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#6B6B6B]">
              <Link href="/blog" className="transition hover:text-black">Kompi Blog</Link>
              <span aria-hidden="true">•</span>
              <time dateTime={published}>8 September 2026</time>
              <span aria-hidden="true">•</span>
              <span>Architecture guide</span>
            </div>

            <div className="max-w-5xl">
              <h1 className="text-[2.9rem] font-normal leading-[0.98] tracking-[-0.045em] text-black sm:text-6xl md:text-7xl lg:text-[5.6rem]">
                How to build a smart link
                <br className="hidden sm:block" />
                <span className="wf-serif-accent"> platform.</span>
              </h1>

              <p className="mt-8 max-w-3xl text-lg font-normal leading-8 text-[#5F5F5A] md:text-xl md:leading-9">
                The redirect is the easy part. A useful smart link product also has to preserve campaign context,
                record trustworthy events, organise ownership, connect physical QR scans to digital behaviour and keep
                the whole thing understandable inside a dashboard.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/features/url-shortener"
                className="inline-flex items-center rounded-full bg-[#D4FF3E] px-5 py-3 text-sm font-medium text-black transition hover:opacity-80"
              >
                Explore Kompi smart links
              </Link>
              <Link
                href="#architecture"
                className="inline-flex items-center rounded-full border border-[#D8D8D1] bg-white px-5 py-3 text-sm font-medium text-black transition hover:border-black"
              >
                See the architecture
              </Link>
            </div>
          </div>
        </header>

        <div className="border-y border-[#E2E2DC] bg-white">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-14">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#77776F]">Built in practice</div>
              <h2 className="mt-3 text-2xl font-normal tracking-[-0.025em] md:text-3xl">
                This is not theoretical architecture.
              </h2>
            </div>
            <div className="max-w-2xl text-base leading-7 text-[#61615B] md:text-lg md:leading-8">
              <p>
                The implementation patterns in this guide come from Kompi, a production smart-link and QR platform designed and
                engineered by{" "}
                <a href={WALL_AND_FIFTH_URL} className="text-black underline decoration-[#A8D600] underline-offset-4">
                  Wall & Fifth
                </a>.
                The examples below are based on the current application code rather than a hypothetical system diagram.
              </p>
            </div>
          </div>
        </div>

        <article className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <div className="grid gap-12 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#77776F]">On this page</div>
              <nav className="mt-5 flex flex-col gap-3 text-sm text-[#66665F]">
                {[
                  ["#architecture", "Core architecture"],
                  ["#redirect", "Redirect path"],
                  ["#events", "Event model"],
                  ["#attribution", "UTM attribution"],
                  ["#referrers", "Referrers & geo"],
                  ["#qr", "QR integration"],
                  ["#workspaces", "Workspaces & auth"],
                  ["#dashboard", "Analytics dashboard"],
                  ["#checklist", "Build checklist"],
                  ["#faq", "FAQ"],
                ].map(([href, label]) => (
                  <Link key={href} href={href} className="transition hover:text-black">
                    {label}
                  </Link>
                ))}
              </nav>
            </aside>

            <div className="max-w-3xl space-y-20">
              <Section id="architecture" eyebrow="01 / Architecture" title="Start with four layers, not one shortener">
                <p>
                  A smart link system is easier to reason about when it is split into four layers: creation, redirect,
                  event capture and analysis. Creation is where a user chooses a destination and code. Redirect is the
                  public path that resolves that code. Event capture records what happened. Analysis turns those records
                  into totals, dimensions and trends.
                </p>
                <p>
                  Keeping those concerns separate matters. A marketing dashboard can become more sophisticated without
                  changing the public redirect contract, while QR codes and profile cards can reuse the same redirect and
                  event infrastructure instead of implementing analytics again.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <SoftCard number="01" title="Create">Destination, short code, ownership and optional campaign context.</SoftCard>
                  <SoftCard number="02" title="Redirect">Resolve an active code and return the visitor to the destination reliably.</SoftCard>
                  <SoftCard number="03" title="Record">Write a first-party event with campaign, referrer, device and location context.</SoftCard>
                  <SoftCard number="04" title="Analyse">Aggregate the event stream into totals, sources, campaigns, places and trends.</SoftCard>
                </div>
              </Section>

              <Section id="redirect" eyebrow="02 / Redirect" title="The redirect route should be boring — in a good way">
                <p>
                  On each public request, Kompi resolves the short code against an active link record, normalises the target
                  URL and returns an HTTP 302 redirect. If the code does not exist, it returns a 404. If the stored destination
                  is invalid, the request fails instead of sending the visitor somewhere unpredictable.
                </p>
                <p>
                  The important resilience decision is that analytics are treated as best-effort. Kompi attempts to create the
                  click event and increment the link total, but the redirect does not depend on those writes succeeding. A
                  temporary analytics failure should not turn a working campaign link into a dead link.
                </p>

                <Callout label="Design principle">
                  The public redirect is infrastructure. Optimise it for reliability first; enrich it with analytics second.
                </Callout>
              </Section>

              <Section id="events" eyebrow="03 / Data" title="Store the event, not just the number">
                <p>
                  A single <em>clicks</em> integer is useful for quick totals but cannot answer most marketing questions. Kompi
                  therefore keeps both an aggregate click count on the link and individual click-event records underneath it.
                </p>
                <p>
                  Event records can carry UTM source, medium, campaign, term and content, plus the raw referrer, a normalised
                  referrer host, user agent and geographic fields. The aggregate count is cheap to display; the event table is
                  what makes segmentation possible.
                </p>

                <div className="overflow-hidden rounded-[22px] border border-[#E1E1DA] bg-white">
                  {[
                    ["Identity", "linkId + timestamp"],
                    ["Campaign", "utm_source, utm_medium, utm_campaign, utm_term, utm_content"],
                    ["Acquisition", "referer + normalised referrerHost"],
                    ["Context", "userAgent + country + region + city"],
                    ["Operational", "aggregate link click counter"],
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      className={`grid gap-3 px-5 py-4 sm:grid-cols-[150px_1fr] ${index ? "border-t border-[#ECECE6]" : ""}`}
                    >
                      <div className="text-sm font-medium text-black">{label}</div>
                      <div className="text-sm leading-6 text-[#686861]">{value}</div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="attribution" eyebrow="04 / Attribution" title="Give explicit campaign parameters priority">
                <p>
                  A link can receive UTMs in two places: on the short URL itself or already embedded in the destination URL.
                  Kompi checks the short-link request first. If a parameter is absent there, it falls back to the destination.
                </p>
                <p>
                  That order is practical because it lets one managed destination support different placements. A creator can
                  keep a canonical destination but issue separate short URLs for an email, QR poster, social profile or paid
                  campaign without duplicating the page behind them.
                </p>

                <div className="rounded-[22px] bg-[#111111] p-7 text-white md:p-8">
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">Attribution order</div>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <div className="text-3xl font-normal">1.</div>
                      <p className="mt-2 text-sm leading-6 text-white/70">Read UTMs supplied on the short-link request.</p>
                    </div>
                    <div>
                      <div className="text-3xl font-normal">2.</div>
                      <p className="mt-2 text-sm leading-6 text-white/70">Fallback to UTMs already stored in the destination URL.</p>
                    </div>
                  </div>
                </div>
              </Section>

              <Section id="referrers" eyebrow="05 / Context" title="Normalise referrers before they reach the dashboard">
                <p>
                  Raw referrer values are messy. Social apps may send app-style schemes, browsers may provide full URLs and
                  some visits arrive with no useful referrer at all. Kompi normalises known hosts into readable sources such as
                  Instagram, TikTok, YouTube, LinkedIn, Reddit, Google and X, while preserving a sensible fallback for direct or
                  unknown traffic.
                </p>
                <p>
                  Geography is captured from edge or hosting-provider headers when available. The current route can use
                  country, region and city values supplied by the edge, which means the redirect handler does not need to make
                  a separate geolocation API request before sending the visitor onward.
                </p>
              </Section>

              <Section id="qr" eyebrow="06 / Physical → digital" title="Make QR codes consumers of the link layer">
                <p>
                  A QR code generator on its own produces an image. A QR feature inside a smart link platform produces a
                  measurable entry point. The stronger architecture is therefore QR → managed link → destination, rather than
                  QR → destination directly.
                </p>
                <p>
                  That pattern means the same analytics model can be used for links shared online and codes printed in the
                  physical world. It also leaves room for dynamic destinations: the printed code stays the same while the
                  managed link can change where it sends people.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Link href="/kr-codes" className="rounded-full border border-[#D8D8D1] bg-white px-4 py-2 text-sm font-medium">KR Codes</Link>
                  <Link href="/qr-code-generator" className="rounded-full border border-[#D8D8D1] bg-white px-4 py-2 text-sm font-medium">QR generator</Link>
                  <Link href="/analytics" className="rounded-full border border-[#D8D8D1] bg-white px-4 py-2 text-sm font-medium">Analytics</Link>
                </div>
              </Section>

              <Section id="workspaces" eyebrow="07 / SaaS" title="Ownership becomes important as soon as the product has users">
                <p>
                  A production link platform needs an ownership model. In Kompi, links belong to workspaces rather than
                  floating around as isolated records. The same workspace can also own bio pages, KR Codes, contact forms,
                  subscriber lists, engagement events and other product tools.
                </p>
                <p>
                  That gives the application one consistent place to enforce access, plan limits and billing. Authentication is
                  handled separately from public redirects: users sign into the product, while visitors should be able to follow
                  a public link without participating in the account system at all.
                </p>
              </Section>

              <Section id="dashboard" eyebrow="08 / Product" title="Analytics only matter if a person can read them">
                <p>
                  Event capture is backend infrastructure; the dashboard is the product. Totals should answer the first question
                  quickly, then let users move into dimensions such as source, campaign, place or time. The trick is not to show
                  every field simply because it exists in the database.
                </p>
                <p>
                  Kompi also combines first-party link events with broader product analytics tooling. Those are different jobs:
                  product analytics helps understand how users operate Kompi itself, while click events explain what happens to
                  the links and campaigns those users publish.
                </p>
              </Section>

              <Section id="checklist" eyebrow="09 / Build checklist" title="A practical sequence for building your own">
                <ol className="space-y-4">
                  {[
                    "Model users, workspaces and link ownership before adding advanced features.",
                    "Create a public redirect route that resolves only active links and validates destinations.",
                    "Store an aggregate click count plus event-level records for analysis.",
                    "Define your attribution rules for UTMs before campaigns start creating inconsistent data.",
                    "Normalise referrers into a small set of useful sources while retaining a fallback.",
                    "Capture edge-provided geographic context without blocking the redirect on a third-party lookup.",
                    "Make QR codes point into the managed link layer so physical and digital campaigns share analytics.",
                    "Keep authenticated dashboard routes separate from public redirect traffic.",
                    "Add billing and plan limits at the workspace level rather than feature by feature.",
                    "Design analytics around decisions users need to make, not around every column you can query.",
                  ].map((item, index) => (
                    <li key={item} className="grid grid-cols-[36px_1fr] gap-3 border-b border-[#E6E6DF] pb-4 last:border-b-0">
                      <span className="text-sm text-[#8A8A82]">{String(index + 1).padStart(2, "0")}</span>
                      <span className="leading-7 text-[#5F5F59]">{item}</span>
                    </li>
                  ))}
                </ol>
              </Section>

              <section className="rounded-[28px] bg-[#D4FF3E] p-7 md:p-9">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-black/55">Kompi case study</div>
                <h2 className="mt-3 max-w-2xl text-3xl font-normal leading-tight tracking-[-0.03em] md:text-4xl">
                  Want to see how these pieces fit together in a real product?
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-black/70">
                  Read the technical case study covering Kompi's application architecture and the work behind the platform.
                </p>
                <Link
                  href="/blog/how-kompi-was-built-wall-and-fifth"
                  className="mt-6 inline-flex rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-80"
                >
                  How Kompi was built
                </Link>
              </section>

              <section id="faq" className="space-y-8 scroll-mt-32">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#77776F]">FAQ</div>
                  <h2 className="mt-3 text-3xl font-normal tracking-[-0.03em] md:text-4xl">Smart link platform questions</h2>
                </div>
                <div className="divide-y divide-[#E1E1DA] border-y border-[#E1E1DA]">
                  {FAQS.map((item) => (
                    <article key={item.q} className="py-6">
                      <h3 className="text-lg font-medium tracking-[-0.015em] text-black">{item.q}</h3>
                      <p className="mt-3 max-w-2xl leading-7 text-[#62625C]">{item.a}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>

      <FooterCTA />

      <Script id="jsonld-smart-link-tech-article" type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </Script>
      <Script id="jsonld-smart-link-breadcrumb" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Script id="jsonld-smart-link-faq" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 space-y-6">
      <div>
        <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#7B7B73]">{eyebrow}</div>
        <h2 className="mt-3 text-3xl font-normal leading-tight tracking-[-0.03em] text-black md:text-[2.6rem]">{title}</h2>
      </div>
      <div className="space-y-5 text-base leading-7 text-[#62625C] md:text-lg md:leading-8">{children}</div>
    </section>
  );
}

function SoftCard({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] border border-[#E1E1DA] bg-white p-5">
      <div className="text-xs text-[#94948B]">{number}</div>
      <h3 className="mt-5 text-lg font-medium tracking-[-0.02em] text-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#6A6A63]">{children}</p>
    </div>
  );
}

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#B4DB22] py-1 pl-5">
      <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#84847B]">{label}</div>
      <p className="mt-2 text-lg leading-8 text-black">{children}</p>
    </div>
  );
}
