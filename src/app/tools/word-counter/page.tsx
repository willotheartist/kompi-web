// src/app/tools/word-counter/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { WordCounter } from "@/components/tools/WordCounter";
import AutoLinkedContent from "@/components/seo/AutoLinkedContent";
import { FooterCTA } from "@/components/footer-cta";

const DOMAIN = "https://kompi.app";
const CANONICAL = "/tools/word-counter";

export const metadata: Metadata = {
  title: "Free Online Word Counter | Count Words & Characters | Kompi Tools",
  description:
    "Use Kompi's free online word counter to count words, characters, lines and reading time. Perfect for social posts, blog articles, SEO copy, emails, and more.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  keywords: [
    "word counter",
    "online word counter",
    "character counter",
    "count words",
    "count characters",
    "reading time calculator",
    "word count tool",
    "character count tool",
  ],
  openGraph: {
    type: "website",
    url: `${DOMAIN}${CANONICAL}`,
    title: "Free Online Word Counter | Kompi Tools",
    description:
      "Count words, characters, lines, and reading time. Runs 100% in your browser — no signup required.",
    siteName: "Kompi",
    images: [
      {
        url: `${DOMAIN}/solutions/solutions21.png`,
        width: 1200,
        height: 630,
        alt: "Kompi Word Counter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Word Counter | Kompi Tools",
    description:
      "Count words, characters, lines, and reading time. Runs 100% in your browser — no signup required.",
    images: [`${DOMAIN}/solutions/solutions21.png`],
  },
};

const faqs = [
  {
    question: "Is the Kompi word counter free to use?",
    answer:
      "Yes. The Kompi word counter is completely free. You can paste or type as much text as you like, with no signup, no account, and no email required.",
  },
  {
    question: "What does this word counter measure?",
    answer:
      "Kompi shows total words, total characters, characters without spaces, number of lines, and a simple reading time estimate based on an average reading speed.",
  },
  {
    question: "Is my text stored or logged anywhere?",
    answer:
      "No. Your text stays in your browser and is not stored or logged by Kompi. When you close or refresh the page, your content disappears.",
  },
  {
    question: "Who is this word counter for?",
    answer:
      "Creators, copywriters, social media managers, founders, and anyone who writes for the web. It works great for social posts, ads, emails, landing pages, and blog content.",
  },
  {
    question: "Can I use it for SEO meta titles and descriptions?",
    answer:
      "Yes. Many people use word and character counters to fit within recommended limits for SEO titles and meta descriptions. Kompi shows characters with and without spaces so you can fine-tune length.",
  },
  {
    question: "Does the reading time estimate work for every language?",
    answer:
      "Reading time is an estimate based on a typical reading speed of around 200 words per minute. It works best as a guideline rather than an exact value, and can vary by language and audience.",
  },
  {
    question: "Can I use the word counter on mobile?",
    answer:
      "Yes. This page is built to work smoothly on phones, tablets, and desktop browsers, so you can check word counts wherever you write.",
  },
  {
    question: "How does this fit into the rest of Kompi?",
    answer:
      "Kompi focuses on links, QR codes, and tools that help you promote what you create. The word counter is one of several simple utilities you can pin to your Kompi dashboard for everyday writing.",
  },
  {
    question: "Can I add this tool to my Kompi workspace?",
    answer:
      "Yes. Create a free Kompi account and add the word counter to your dashboard so it’s always one click away while you work on links, QR menus, and more.",
  },
];

function buildJsonLd() {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi Word Counter",
    url: `${DOMAIN}${CANONICAL}`,
    applicationCategory: "UtilitiesApplication",
    description:
      "Count words, characters, lines and reading time with Kompi's free online word counter.",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Kompi", item: `${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Tools", item: `${DOMAIN}/tools` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Word Counter",
        item: `${DOMAIN}${CANONICAL}`,
      },
    ],
  };

  return [webAppJsonLd, faqJsonLd, breadcrumbsJsonLd];
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 md:px-8">{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5177e1]">
      {children}
    </p>
  );
}

function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#1E2330]/20 transition hover:bg-black"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm transition hover:bg-[#F7F7F3]"
    >
      {children}
    </Link>
  );
}

function Section({
  id,
  tone = "white",
  children,
}: {
  id?: string;
  tone?: "white" | "soft";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        tone === "soft"
          ? "bg-[#f7f7f4] border-t border-neutral-200"
          : "bg-white border-t border-neutral-200"
      }
    >
      <Container>
        <div className="py-16 md:py-20">{children}</div>
      </Container>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  href,
  cta,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex h-full flex-col justify-between rounded-3xl bg-white p-7 ring-1 ring-neutral-200">
      <div className="space-y-2">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm leading-relaxed text-neutral-600">{desc}</p>
      </div>

      <Link
        href={href}
        className="mt-7 inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-900 hover:bg-neutral-50"
      >
        {cta}
      </Link>
    </div>
  );
}

export default function PublicWordCounterPage() {
  const jsonLd = buildJsonLd();

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#c8c4c4]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f7f7f4]">
        <div className="pointer-events-none absolute inset-x-0 -top-28 -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-56 max-w-4xl bg-linear-to-r from-[#A3CF3D] via-[#9BDFD1] to-[#4B9FFF] opacity-70" />
        </div>

        <Container>
          <div className="py-20 md:py-30">
            <div className="mx-auto max-w-3xl text-center space-y-7">
              <nav aria-label="Breadcrumb">
                <ol className="mx-auto inline-flex items-center gap-2 bg-transparent px-4 py-1.5 text-xs font-medium text-[#1E2330] ring ring-neutral-500">
                  <li>
                    <Link href="/" className="hover:underline">
                      Kompi
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/tools" className="hover:underline">
                      Tools
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Word counter</li>
                </ol>
              </nav>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
                A{" "}
                <span className="bg-linear-to-r from-[#cbcbe0] to-[#4B9FFF] bg-clip-text text-transparent">
                  super clean
                </span>{" "}
                word counter that feels good to write in.
              </h1>

              <AutoLinkedContent
                text="Paste or type, and Kompi instantly shows words, characters, lines, paragraphs, sentences, and reading time. Then keep going — Kompi also helps you create short links, QR codes, and landing pages from one dashboard."
                currentUrl={CANONICAL}
                className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-neutral-700"
              />

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <PrimaryLink href="#word-counter-tool">
                  Start counting <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="/signup">Add to my dashboard</SecondaryLink>
              </div>

              <div className="items-center justify-center gap-5 pt-2">
                100% in-browser No login Words + characters Reading time Copy-friendly
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TOOL */}
      <Section id="word-counter-tool" tone="soft">
        <div className="space-y-50">
          <div className="w-full">
            <WordCounter />
          </div>

          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>WHAT IT CHECKS</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Everything you need — nothing you don’t.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Word count, character count, lines, paragraphs, sentences, and a
              simple reading time estimate. Perfect for social posts, emails,
              scripts, blog drafts, and SEO snippets.
            </p>
          </div>
        </div>
      </Section>

      {/* USE CASES */}
      <Section tone="white">
        <div className="space-y-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>USE CASES</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Three everyday ways people use this.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Keep your writing tight where it matters, and comfortably long
              where it needs space.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              title="Social & short-form"
              desc="Check character limits fast for X, LinkedIn captions, hooks, and ads."
              href="#word-counter-tool"
              cta="Draft a short post"
            />
            <FeatureCard
              title="Blog & long-form"
              desc="Track word count and reading time while you write sections and newsletters."
              href="#word-counter-tool"
              cta="Draft a blog section"
            />
            <FeatureCard
              title="SEO & landing pages"
              desc="Tune meta descriptions, titles, and hero copy without guessing."
              href="#word-counter-tool"
              cta="Polish an SEO snippet"
            />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="soft">
        <div className="space-y-10">
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              People usually ask…
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4">
            {faqs.map((item) => (
              <details
                key={item.question}
                className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-neutral-500 group-open:hidden">+</span>
                  <span className="text-neutral-500 hidden group-open:inline">−</span>
                </summary>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-[#f7f7f4]">
        <Container>
          <div className="py-16 md:py-20">
            <div className="rounded-3xl bg-[#1E2330] p-10 md:p-14 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Want this tool pinned in your workspace?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
                Create a free Kompi account and keep the word counter one click
                away while you build links, QR codes, and campaigns.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
                >
                  Start free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/tools"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Explore tools
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FooterCTA />

      {/* JSON-LD schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
