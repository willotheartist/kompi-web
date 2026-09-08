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
  title: TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  alternates: { canonical: CANONICAL_URL },
  openGraph: {
    type: "article",
    url: CANONICAL_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Kompi",
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

      <main className="bg-white text-neutral-900">
        <header className="border-b border-black/10 bg-linear-to-b from-[#F7F7F4] to-white pt-24 md:pt-28">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-18">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm font-medium text-neutral-600">
              <Link href="/blog" className="underline underline-offset-4">
                Kompi Blog
              </Link>
              <span aria-hidden="true">•</span>
              <time dateTime={published}>8 September 2026</time>
              <span aria-hidden="true">•</span>
              <span>Technical case study</span>
            </div>

            <h1 className="max-w-5xl text-4xl font-extrabold tracking-tight text-neutral-950 md:text-6xl">
              {TITLE}
            </h1>

            <p className="mt-7 max-w-4xl text-lg leading-relaxed text-neutral-700 md:text-xl">
              Kompi is a web application for smart links, QR experiences, digital profile cards and measurable sharing.
              The product was designed and built by{" "}
              <a href={WALL_AND_FIFTH_URL} className="font-semibold text-neutral-950 underline underline-offset-4">
                Wall & Fifth
              </a>{" "}
              as a custom production software platform rather than a collection of disconnected tools.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-16 px-6 py-12 md:py-16">
          <section className="rounded-3xl border border-black/10 bg-[#FFF5A8] p-7 md:p-9">
            <div className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-700">The short version</div>
            <p className="mt-4 text-xl font-semibold leading-relaxed text-neutral-950 md:text-2xl">
              Kompi runs on Next.js and React, uses PostgreSQL through Prisma for its application data, NextAuth for sign-in,
              Stripe for billing, and a dedicated event model for link and campaign analytics. The same product architecture
              connects short links, KR/QR codes, K-Cards, workspaces and growth tooling inside one account.
            </p>
          </section>

          <Section title="The product brief: make sharing measurable">
            <p>
              A short link looks simple from the outside. A production link platform is not. It has to create and manage destinations,
              redirect quickly, preserve campaign context, record useful events, separate data between workspaces, protect authenticated
              areas and give users a dashboard that turns raw activity into something understandable.
            </p>
            <p>
              Kompi was built around that broader product problem. Links are one layer; the application also connects{" "}
              <Link href="/kr-codes" className="underline underline-offset-4">KR Codes</Link>,{" "}
              <Link href="/k-cards" className="underline underline-offset-4">K-Cards</Link>,{" "}
              <Link href="/analytics" className="underline underline-offset-4">analytics</Link>, QR experiences and workspace-level tools.
              That shared foundation is what allows a user to create something once, share it in different formats and still understand
              what happened afterwards.
            </p>
          </Section>

          <Section title="The application architecture">
            <p>
              The current Kompi codebase is a custom Next.js 16 application running React 19. The application layer is written in
              TypeScript and uses the Next.js App Router for public marketing pages, authenticated product routes and API endpoints.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <FactCard title="Frontend and application layer">
                Next.js 16, React 19, TypeScript, Tailwind CSS, Radix UI components and Framer Motion provide the interface and route structure.
              </FactCard>
              <FactCard title="Data layer">
                PostgreSQL is the primary database, with Prisma providing the schema, relations and application client.
              </FactCard>
              <FactCard title="Authentication">
                NextAuth supports Google sign-in and email/password credentials while authenticated product routes are protected through middleware.
              </FactCard>
              <FactCard title="Billing and product analytics">
                Stripe is integrated for paid plans and subscriptions, while PostHog is included for product analytics alongside Kompi's first-party event models.
              </FactCard>
            </div>
          </Section>

          <Section title="A data model built around workspaces, not isolated features">
            <p>
              One of the important architectural decisions is that Kompi's main product objects share a workspace model. A workspace can own
              links, bio pages, KR codes, forms, subscriber lists, engagement events and additional tools. This makes the account the centre of
              the product rather than forcing every feature into a separate silo.
            </p>
            <p>
              The database schema also models K-Cards, QR menus, contact submissions, courses, loyalty activity, builder sites and Kompi Chat
              entities. That matters because features can evolve while keeping authentication, ownership and account structure consistent.
            </p>
          </Section>

          <Section title="How Kompi's link and analytics engine works">
            <p>
              Each Kompi link stores its destination, short code, status, workspace relationship and aggregate click count. Individual click
              events can then capture more useful context including UTM source, medium, campaign, content and term, along with referrer and
              geographic fields.
            </p>
            <p>
              Public redirect requests are handled differently from protected dashboard traffic. At the edge, Kompi can read Vercel-provided
              country, region and city headers and pass that context into the redirect request. The result is a redirect layer designed for both
              speed and measurement rather than simply forwarding one URL to another.
            </p>
            <div className="rounded-3xl border border-black/10 bg-neutral-950 p-7 text-white md:p-9">
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-white/60">Why this matters</div>
              <p className="mt-4 text-xl leading-relaxed text-white/90">
                A marketer can use different links or campaign parameters for different placements and still analyse them inside the same product.
                That turns the redirect itself into useful first-party infrastructure.
              </p>
            </div>
          </Section>

          <Section title="QR codes, KR Codes and K-Cards use the same product foundation">
            <p>
              Kompi's QR functionality is not treated as a separate image generator bolted onto the website. KR Code records can hold a destination,
              style information and workspace ownership. K-Cards have their own public slugs and structured data, while click and message events can
              be associated back to the relevant card or workspace.
            </p>
            <p>
              That shared architecture is what makes the product more useful than a one-off QR generator: a physical scan, a digital profile card
              and a short link can all lead back into the same account, analytics and growth workflow.
            </p>
          </Section>

          <Section title="Building the public site and the product together">
            <p>
              Kompi also has a substantial public content layer: product pages, customer pages, free tools, QR guides and a structured blog. The
              same Next.js application therefore has to serve two very different jobs — a crawlable public website and a protected SaaS dashboard.
            </p>
            <p>
              Public pages use canonical metadata, index/follow directives and structured data where appropriate. The site also generates a sitemap
              for core routes, tools and programmatic SEO pages. Keeping this work in the product codebase means product launches and search pages can
              share the same components, routes and deployment pipeline.
            </p>
          </Section>

          <Section title="What Wall & Fifth built">
            <p>
              The work by{" "}
              <a href={WALL_AND_FIFTH_URL} className="font-semibold underline underline-offset-4">
                Wall & Fifth
              </a>{" "}
              covered the product as a complete software system: interface design, product structure, authenticated dashboard flows, database-backed
              features, link infrastructure, QR experiences, analytics, billing integration and the public-facing web application.
            </p>
            <p>
              The useful distinction is that Kompi is not a marketing site pretending to be software. It is a production application with its own
              users, workspaces, persistent product objects, authentication, billing, event data and public redirect behaviour. That is the kind of
              full-stack product build Wall & Fifth specialises in.
            </p>
            <a
              href={WALL_AND_FIFTH_URL}
              className="inline-flex rounded-2xl bg-black px-5 py-3 font-semibold text-white transition hover:opacity-85"
            >
              Visit Wall & Fifth
            </a>
          </Section>

          <Section title="The stack at a glance">
            <div className="overflow-hidden rounded-3xl border border-black/10">
              <div className="grid grid-cols-2 border-b border-black/10 bg-neutral-50 px-5 py-3 text-sm font-bold text-neutral-700">
                <div>Layer</div>
                <div>Kompi implementation</div>
              </div>
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
                <div key={layer} className="grid grid-cols-2 border-b border-black/10 px-5 py-4 last:border-b-0">
                  <div className="font-semibold text-neutral-950">{layer}</div>
                  <div className="text-neutral-700">{implementation}</div>
                </div>
              ))}
            </div>
          </Section>

          <section id="faq" className="space-y-7">
            <div>
              <div className="text-sm font-bold uppercase tracking-[0.16em] text-neutral-500">FAQ</div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">Questions about the Kompi build</h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((item) => (
                <article key={item.q} className="rounded-3xl border border-black/10 bg-white p-6 md:p-7">
                  <h3 className="text-xl font-bold text-neutral-950">{item.q}</h3>
                  <p className="mt-3 leading-relaxed text-neutral-700">{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-black/10 bg-[#F7F7F4] p-7 md:p-9">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950">Explore the product</h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-neutral-700">
              See Kompi's live product pages for the user-facing side of the platform, or visit Wall & Fifth for custom product design and software development.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/features/url-shortener" className="rounded-2xl border border-black/10 bg-white px-4 py-2.5 font-semibold">Smart links</Link>
              <Link href="/kr-codes" className="rounded-2xl border border-black/10 bg-white px-4 py-2.5 font-semibold">KR Codes</Link>
              <Link href="/k-cards" className="rounded-2xl border border-black/10 bg-white px-4 py-2.5 font-semibold">K-Cards</Link>
              <Link href="/analytics" className="rounded-2xl border border-black/10 bg-white px-4 py-2.5 font-semibold">Analytics</Link>
              <a href={WALL_AND_FIFTH_URL} className="rounded-2xl bg-black px-4 py-2.5 font-semibold text-white">Wall & Fifth</a>
            </div>
          </section>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl">{title}</h2>
      <div className="space-y-5 text-base leading-relaxed text-neutral-700 md:text-lg">{children}</div>
    </section>
  );
}

function FactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-neutral-50 p-6">
      <h3 className="text-lg font-bold text-neutral-950">{title}</h3>
      <p className="mt-2 leading-relaxed text-neutral-700">{children}</p>
    </div>
  );
}
