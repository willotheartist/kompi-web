import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

const SITE_URL = "https://kompi.app";
const SLUG = "how-kompi-was-built-wall-and-fifth";
const CANONICAL_URL = `${SITE_URL}/blog/${SLUG}`;
const WALL_AND_FIFTH_URL = "https://wallandfifth.com";

const TITLE = "How Kompi Was Built: Smart Links, QR Codes and Digital Identity Software by Wall & Fifth";
const DESCRIPTION =
  "A technical case study of how Kompi was designed and engineered by Wall & Fifth using Next.js, React, PostgreSQL, Prisma, NextAuth, Stripe and event-level analytics.";

const KEYWORDS = [
  "Kompi",
  "Wall & Fifth",
  "Wall and Fifth",
  "Kompi development",
  "custom software development",
  "SaaS development",
  "link management software",
  "URL shortener software",
  "QR code platform",
  "digital identity software",
  "Next.js SaaS",
  "Prisma PostgreSQL",
];

const FAQS = [
  {
    q: "Who built Kompi?",
    a: "Kompi was designed and built by Wall & Fifth as a custom production software platform combining smart links, QR experiences, digital profile cards, analytics and growth tools.",
  },
  {
    q: "What technology is Kompi built with?",
    a: "The current Kompi application uses Next.js 16 and React 19, with PostgreSQL accessed through Prisma. Authentication is handled with NextAuth, billing uses Stripe, and product analytics includes PostHog alongside Kompi's own event data.",
  },
  {
    q: "Is Kompi just a URL shortener?",
    a: "No. Short links are one part of the product. The codebase also supports QR and KR codes, K-Cards, workspaces, analytics, bio-style pages, QR menus, contact and subscriber tools, and other connected growth features.",
  },
  {
    q: "How does Kompi track link performance?",
    a: "Kompi stores click events against links and can record campaign parameters, referrer information and geographic context. Public redirect requests are also enriched with edge-provided location headers before the request reaches the redirect logic.",
  },
  {
    q: "Was Kompi built from a template or no-code platform?",
    a: "No. Kompi is a custom Next.js application with its own application routes, database schema, authentication, billing, redirect infrastructure, analytics models and product interfaces.",
  },
];

export const metadata: Metadata = {
  title: "How Kompi Was Built: Smart Links, QR Codes and Digital Identity Software by Wall & Fifth",
  description:
    "A technical case study of how Kompi was designed and engineered by Wall & Fifth using Next.js, React, PostgreSQL, Prisma, NextAuth, Stripe and event-level analytics.",
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
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": CANONICAL_URL },
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: published,
    dateModified: modified,
    author: { "@type": "Organization", name: "Kompi", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Kompi", url: SITE_URL },
    about: {
      "@type": "SoftwareApplication",
      name: "Kompi",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      creator: {
        "@type": "Organization",
        name: "Wall & Fifth",
        url: WALL_AND_FIFTH_URL,
      },
    },
    mentions: {
      "@type": "Organization",
      name: "Wall & Fifth",
      url: WALL_AND_FIFTH_URL,
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
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#f7f7f3] text-[#111111]">
        <header className="overflow-hidden border-b border-[#e2e2dc] bg-[#f7f7f3] pt-24 md:pt-28">
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
            <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
              <div>
                <p className="wf-eyebrow tracking-[0.22em] text-xs">KOMPI / BUILD STORY</p>
                <h1 className="mt-6 max-w-4xl text-[clamp(3.6rem,7vw,7rem)] font-normal leading-[0.94] tracking-[-0.055em]">
                  How Kompi was
                  <br />
                  <span className="wf-serif-accent">built</span>.
                </h1>
              </div>

              <div className="lg:pb-2">
                <p className="max-w-xl text-lg font-normal leading-[1.65] text-[#595959] md:text-xl">
                  Smart links, QR experiences, K-Cards and analytics — designed as one calm,
                  connected product by{" "}
                  <a
                    href={WALL_AND_FIFTH_URL}
                    className="text-[#111111] underline decoration-1 underline-offset-4"
                  >
                    Wall & Fifth
                  </a>
                  .
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs uppercase tracking-[0.16em] text-[#6b6b6b]">
                  <Link href="/blog" className="transition hover:text-black">Kompi Blog</Link>
                  <span className="h-1 w-1 rounded-full bg-[#d4ff3e]" />
                  <time dateTime={published}>8 September 2026</time>
                  <span className="h-1 w-1 rounded-full bg-[#d4ff3e]" />
                  <span>Technical case study</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <section className="grid gap-8 border-b border-[#d8d8d1] pb-16 md:grid-cols-[0.72fr_1.28fr] md:gap-14 md:pb-24">
            <div>
              <p className="wf-eyebrow tracking-[0.2em] text-xs">THE SHORT VERSION</p>
            </div>
            <div>
              <p className="max-w-4xl text-2xl font-normal leading-[1.45] tracking-[-0.02em] text-[#1a1a1a] md:text-4xl">
                Kompi is a custom production application built on Next.js and React, with PostgreSQL,
                Prisma, NextAuth, Stripe and first-party event data underneath it.
              </p>
              <div className="mt-8 inline-flex rounded-full bg-[#d4ff3e] px-4 py-2 text-sm font-medium">
                One account. Multiple ways to share. One analytics layer.
              </div>
            </div>
          </section>

          <ArticleSection label="01 / PRODUCT" title="Make sharing measurable">
            <p>
              A short link looks simple from the outside. A production link platform is not. It has to create and manage destinations,
              redirect quickly, preserve campaign context, record useful events, separate data between workspaces, protect authenticated
              areas and turn activity into something a person can actually understand.
            </p>
            <p>
              Kompi was built around that broader product problem. Links are one layer; the application also connects{" "}
              <Link href="/kr-codes" className="article-link">KR Codes</Link>,{" "}
              <Link href="/k-cards" className="article-link">K-Cards</Link>,{" "}
              <Link href="/analytics" className="article-link">analytics</Link>, QR experiences and workspace-level tools.
            </p>
          </ArticleSection>

          <ArticleSection label="02 / ARCHITECTURE" title="A product system, not a pile of features">
            <p>
              The current Kompi codebase is a custom Next.js 16 application running React 19. TypeScript and the Next.js App Router
              handle the public marketing site, authenticated product routes and API endpoints, while PostgreSQL and Prisma provide the
              persistent application layer.
            </p>

            <div className="mt-10 grid border-y border-[#d8d8d1] md:grid-cols-2">
              <SystemItem number="01" title="Application">
                Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI and Framer Motion.
              </SystemItem>
              <SystemItem number="02" title="Data">
                PostgreSQL as the primary database, modelled and accessed through Prisma.
              </SystemItem>
              <SystemItem number="03" title="Identity">
                NextAuth with Google sign-in and email/password credentials, protected by route middleware.
              </SystemItem>
              <SystemItem number="04" title="Commercial layer">
                Stripe for billing and subscriptions, with PostHog plus Kompi's own event models for analytics.
              </SystemItem>
            </div>
          </ArticleSection>

          <ArticleSection label="03 / DATA MODEL" title="Everything starts with a workspace">
            <p>
              Kompi's main product objects share a workspace model. A workspace can own links, bio pages, KR codes, forms,
              subscriber lists, engagement events and additional tools. The account is the centre of the product instead of each
              feature living in its own silo.
            </p>
            <p>
              The schema also models K-Cards, QR menus, contact submissions, courses, loyalty activity, builder sites and Kompi Chat.
              Features can expand without having to reinvent authentication, ownership or account structure every time.
            </p>
          </ArticleSection>

          <ArticleSection label="04 / ANALYTICS" title="The redirect is part of the product">
            <p>
              Each Kompi link stores its destination, short code, status, workspace relationship and aggregate click count. Individual
              click events can capture UTM source, medium, campaign, content and term, plus referrer and geographic context.
            </p>
            <p>
              Public redirects are handled differently from protected dashboard traffic. At the edge, Kompi can read Vercel-provided
              country, region and city headers and pass that context into the redirect request. The result is infrastructure designed
              for measurement as well as speed.
            </p>

            <div className="mt-10 grid gap-0 overflow-hidden rounded-[28px] bg-[#111111] text-white md:grid-cols-[0.7fr_1.3fr]">
              <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r md:p-9">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">WHY IT MATTERS</p>
              </div>
              <div className="p-7 md:p-9">
                <p className="text-xl font-normal leading-[1.55] text-white/90 md:text-2xl">
                  Different placements can use different links or campaign parameters while still feeding one coherent analytics view.
                </p>
              </div>
            </div>
          </ArticleSection>

          <ArticleSection label="05 / PHYSICAL + DIGITAL" title="QR, KR Codes and K-Cards share the same foundation">
            <p>
              Kompi's QR functionality is not a separate image generator bolted onto a website. KR Code records can hold a destination,
              style information and workspace ownership. K-Cards have public slugs and structured data, while click and message events
              can be associated back to the relevant card or workspace.
            </p>
            <p>
              A physical scan, a digital profile card and a short link can all return to the same account, analytics and growth workflow.
            </p>
          </ArticleSection>

          <ArticleSection label="06 / PUBLIC WEB" title="The marketing site and the SaaS live together">
            <p>
              Kompi has a substantial public content layer: product pages, customer pages, free tools, QR guides and a structured blog.
              The same Next.js application therefore serves two jobs — a crawlable public website and a protected SaaS dashboard.
            </p>
            <p>
              Public pages use canonical metadata, index/follow directives and structured data where appropriate, while the sitemap
              covers core routes, tools and programmatic SEO pages. Product and acquisition work can share the same components and deployment pipeline.
            </p>
          </ArticleSection>

          <section className="my-20 overflow-hidden rounded-[34px] bg-[#d4ff3e] px-7 py-10 md:my-28 md:px-12 md:py-14">
            <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/55">BUILT BY WALL & FIFTH</p>
                <h2 className="mt-4 text-4xl font-normal leading-[1] tracking-[-0.04em] md:text-6xl">
                  Product design through to
                  <br />
                  <span className="wf-serif-accent">production software</span>.
                </h2>
              </div>
              <div>
                <p className="text-lg font-normal leading-[1.65] text-black/70">
                  Wall & Fifth's work on Kompi covered interface design, product structure, authenticated dashboard flows,
                  database-backed features, link infrastructure, QR experiences, analytics, billing integration and the public web application.
                </p>
                <a
                  href={WALL_AND_FIFTH_URL}
                  className="wf-btn-primary mt-8 !bg-black !text-white"
                >
                  Visit Wall & Fifth
                </a>
              </div>
            </div>
          </section>

          <ArticleSection label="07 / STACK" title="The stack at a glance">
            <div className="mt-8 border-t border-[#d8d8d1]">
              {[
                ["Application", "Next.js 16 + React 19 + TypeScript"],
                ["Database", "PostgreSQL"],
                ["ORM", "Prisma 6"],
                ["Authentication", "NextAuth with Google and credentials"],
                ["Billing", "Stripe"],
                ["Product analytics", "PostHog + first-party event models"],
                ["Charts", "Recharts"],
                ["QR", "QR generation and styling libraries + Kompi KR Code models"],
                ["Deployment", "Vercel-compatible Next.js architecture"],
              ].map(([layer, implementation]) => (
                <div
                  key={layer}
                  className="grid gap-2 border-b border-[#d8d8d1] py-5 md:grid-cols-[0.55fr_1.45fr] md:gap-8"
                >
                  <div className="text-xs uppercase tracking-[0.16em] text-[#777]">{layer}</div>
                  <div className="text-base font-normal text-[#222] md:text-lg">{implementation}</div>
                </div>
              ))}
            </div>
          </ArticleSection>

          <section id="faq" className="border-t border-[#d8d8d1] py-20 md:py-28">
            <div className="grid gap-12 md:grid-cols-[0.72fr_1.28fr] md:gap-14">
              <div>
                <p className="wf-eyebrow tracking-[0.2em] text-xs">FAQ</p>
                <h2 className="mt-5 max-w-md text-4xl font-normal leading-[1.04] tracking-[-0.04em] md:text-5xl">
                  Questions about the <span className="wf-serif-accent">build</span>.
                </h2>
              </div>
              <div className="divide-y divide-[#d8d8d1] border-y border-[#d8d8d1]">
                {FAQS.map((item) => (
                  <article key={item.q} className="py-7 md:py-8">
                    <h3 className="text-lg font-medium tracking-[-0.01em] text-[#111] md:text-xl">{item.q}</h3>
                    <p className="mt-3 max-w-3xl text-base font-normal leading-[1.7] text-[#626262]">{item.a}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[#d8d8d1] py-16 md:py-20">
            <div className="grid gap-8 md:grid-cols-[0.72fr_1.28fr] md:gap-14">
              <p className="wf-eyebrow tracking-[0.2em] text-xs">EXPLORE KOMPI</p>
              <div>
                <h2 className="text-3xl font-normal tracking-[-0.035em] md:text-4xl">See the product in action.</h2>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  <PillLink href="/features/url-shortener">Smart links</PillLink>
                  <PillLink href="/kr-codes">KR Codes</PillLink>
                  <PillLink href="/k-cards">K-Cards</PillLink>
                  <PillLink href="/analytics">Analytics</PillLink>
                  <a href={WALL_AND_FIFTH_URL} className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white">
                    Wall & Fifth
                  </a>
                </div>
              </div>
            </div>
          </section>

          <p className="pb-4 text-xs leading-relaxed text-[#8a8a84]">
            Technical details in this case study reflect the Kompi production codebase as reviewed on 8 September 2026.
          </p>
        </div>
      </main>

      <FooterCTA />

      <Script id="jsonld-kompi-wall-fifth-article" type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </Script>
      <Script id="jsonld-kompi-wall-fifth-breadcrumb" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <Script id="jsonld-kompi-wall-fifth-faq" type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </Script>
    </>
  );
}

function ArticleSection({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-8 border-b border-[#d8d8d1] py-16 md:grid-cols-[0.72fr_1.28fr] md:gap-14 md:py-24">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#777]">{label}</p>
        <h2 className="mt-5 max-w-md text-3xl font-normal leading-[1.08] tracking-[-0.035em] md:text-5xl">{title}</h2>
      </div>
      <div className="space-y-6 text-base font-normal leading-[1.78] text-[#606060] md:text-lg [&_.article-link]:text-[#111] [&_.article-link]:underline [&_.article-link]:decoration-1 [&_.article-link]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}

function SystemItem({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#d8d8d1] py-7 md:min-h-48 md:border-b-0 md:border-r md:p-8 md:odd:border-b md:even:border-r-0 md:even:border-b">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-medium tracking-[-0.015em]">{title}</h3>
        <span className="text-xs tracking-[0.16em] text-[#999]">{number}</span>
      </div>
      <p className="mt-5 max-w-md text-sm font-normal leading-[1.7] text-[#676767] md:text-base">{children}</p>
    </div>
  );
}

function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-[#d4d4cd] bg-white px-5 py-2.5 text-sm font-medium transition hover:border-black"
    >
      {children}
    </Link>
  );
}
