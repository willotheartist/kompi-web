// src/app/tools/word-counter/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { WordCounter } from "@/components/tools/WordCounter";
import AutoLinkedContent from "@/components/seo/AutoLinkedContent";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Online Word Counter | Count Words & Characters | Kompi Tools",
  description:
    "Use Kompi's free online word counter to count words, characters, lines and reading time. Perfect for social posts, blog articles, SEO copy, emails, and more.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Word Counter",
  url: "https://kompi.app/tools/word-counter",
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

export default function PublicWordCounterPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO – text only, centred, tall & airy */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#006B81] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Word counter</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              The free{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                online word counter
              </span>{" "}
              that actually feels nice to write in.
            </h1>

            <AutoLinkedContent
              text="Kompi gives you more than a free word counter. Create QR codes, short links and landing pages from one dashboard, then choose the pricing and plan that fit how you work as a creator."
              currentUrl="/tools/word-counter"
              className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg"
            />

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#word-counter-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Start counting words
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Runs 100% in your browser
              </div>
              <span>• No login or email required</span>
              <span>• Works on desktop, tablet & mobile</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION – directly under hero, tight spacing */}
      <section
        id="word-counter-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <WordCounter />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              CHECK YOUR WRITING AT A GLANCE
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One word counter, three everyday use cases.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Whether you&apos;re writing fast social posts, longer blog
              articles, or polished landing pages, Kompi keeps your content the
              right length for the job.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  SOCIAL & SHORT FORM
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Social-ready copy
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Make sure tweets, captions, and hooks stay punchy without
                  getting cut off by character limits.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Perfect for X, LinkedIn & IG</li>
                  <li>• See characters with & without spaces</li>
                  <li>• Quickly test multiple variations</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Draft a social post
              </button>
            </div>

            {/* Card 2 – highlighted */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-7 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Blog & long-form
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Shape blog posts, articles, and scripts with a clear sense of
                  length and reading time.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Track word count as you write</li>
                  <li>• Estimate reading time for your audience</li>
                  <li>• Great for newsletters & essays</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Draft a blog section
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  SEO & LANDING PAGES
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  SEO-friendly content
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Keep titles, meta descriptions, and hero copy within
                  best-practice ranges for search and UX.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Check character limits for meta</li>
                  <li>• Balance short, scannable sections</li>
                  <li>• Pair with Kompi links & QR tools</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#006B81] bg-[#006B81] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#034557]">
                Optimise an SEO snippet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BRIGHT STRIP */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#E8F739] px-8 py-10 text-center shadow-md sm:px-12">
            <h2 className="text-xl font-semibold text-[#1E2330] sm:text-2xl md:text-3xl">
              Ready to sanity-check your next piece of writing?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#111827] sm:text-base">
              Use Kompi&apos;s free word counter now, then pin it to your Kompi
              dashboard so it&apos;s always one click away when you&apos;re
              drafting links, menus, and campaigns.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#word-counter-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] shadow hover:bg:black hover:bg-black"
              >
                Open the word counter
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-6 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]"
              >
                Create free Kompi account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE PANELS – narrative use cases */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Writing for the web, without second guessing length.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E3F2FF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR EVERYDAY WRITING
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Keep your copy clear, concise, and to the point.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Emails, intros, announcements — Kompi gives you a quick sense of
                how long something feels before you hit send. No more guessing
                whether that paragraph is too heavy.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                {/* You can later swap this for a word-counter demo video if you add one */}
                <div className="flex h-full w-full items-center justify-center text-xs text-[#6B7280]">
                  Word counter preview
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#9BDFD1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#0F172A]">
                  Great for teams & client work
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR TEAMS & CLIENT CONTENT
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Align writers, editors, and stakeholders on length.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Agencies, studios, and in-house teams can use Kompi to quickly
                check copy length against briefs and content guidelines before
                pushing anything live.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#006B81] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E3F2FF] sm:text-sm">
                FOR CREATORS & BUILDERS
              </p>
              <h3 className="text-2xl font-semibold text-[#E3F2FF] sm:text-3xl">
                Pair clear copy with smarter links and QR codes.
              </h3>
              <p className="text-sm leading-relaxed text-[#E3F2FF] sm:text-base">
                Kompi isn&apos;t just a word counter. It&apos;s part of a
                toolkit for creators and small businesses — from link tracking
                to QR menus — so your words and destinations always work
                together.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#0B1220] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#E5E7EB]">
                  Kompi tools ecosystem
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE TESTIMONIAL ROW */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              SMALL TOOL, BIG WRITING UPGRADE
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less guessing, more confident publishing.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “My tab for every caption”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “I write all my Instagram and LinkedIn posts here now. Super
                easy to see if something&apos;s too long before I copy it over.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Helpful for client blogs”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We have rough word targets in our briefs. Kompi makes it easy
                to check where we are without opening a full document tool.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Clean, focused, no fluff”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “It does one job really well. No random distractions, no heavy
                interface. Just a nice space to paste and check my writing.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the Kompi word counter?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they start using this
              page every day. Straight answers, no jargon.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E3F2FF] bg-[#F7F7F3] p-5 text-sm"
              >
                <h3 className="mb-1 text-sm font-medium text-[#1E2330] sm:text-base">
                  {item.question}
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global footer CTA */}
      <FooterCTA />

      {/* JSON-LD schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
