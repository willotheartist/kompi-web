// src/app/tools/case-converter/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CaseConverter } from "@/components/tools/CaseConverter";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Online Case Converter | Uppercase, Lowercase & Title Case | Kompi Tools",
  description:
    "Convert text to uppercase, lowercase, sentence case, and title case with Kompi's free online case converter. Perfect for social posts, headlines, emails and SEO-friendly copy.",
};

const faqs = [
  {
    question: "Is the Kompi case converter free to use?",
    answer:
      "Yes. You can use this case converter as often as you like for free. No account, no signup, and no email required.",
  },
  {
    question: "What case styles can I convert to?",
    answer:
      "Kompi supports uppercase, lowercase, sentence case, title case, and capitalized words. That covers most everyday writing tasks for the web.",
  },
  {
    question: "Is my text stored anywhere?",
    answer:
      "No. Your text stays in your browser and is not stored or logged by Kompi. When you close or refresh the page, the content disappears.",
  },
  {
    question: "Who is this case converter for?",
    answer:
      "Creators, marketers, writers, developers, and anyone who needs clean, consistently formatted text. It works well for headlines, captions, UI copy, and more.",
  },
  {
    question: "Can I use this for email subjects and headlines?",
    answer:
      "Yes. Many people use case converters to standardize email subjects, blog titles, and landing page headings so everything follows the same style.",
  },
  {
    question: "Does this change punctuation or only letters?",
    answer:
      "The Kompi case converter focuses on changing the letter case while preserving punctuation, numbers, emojis, and spacing as much as possible.",
  },
  {
    question: "Can I use the case converter on mobile?",
    answer:
      "Yes. This page is built to work smoothly on phones, tablets, and desktop browsers, so you can format text wherever you write.",
  },
  {
    question: "How does this fit into the rest of Kompi?",
    answer:
      "Kompi focuses on tools that help you share and promote your work. The case converter is one of several simple utilities you can pin to your dashboard alongside links and QR tools.",
  },
  {
    question: "Can I add this tool to my Kompi workspace?",
    answer:
      "Yes. Create a free Kompi account and add the case converter to your dashboard so it’s always one click away while you’re working on copy.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Case Converter",
  url: "https://kompi.app/tools/case-converter",
  applicationCategory: "UtilitiesApplication",
  description:
    "Convert text to uppercase, lowercase, sentence case, and title case with Kompi's free online case converter.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicCaseConverterPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#006B81] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Case converter</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              The{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                free online case converter
              </span>{" "}
              that tidies your text in one click.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Paste your text once, then flip between uppercase, lowercase,
              sentence case, and title case. Ideal for headlines, captions, UI
              copy, and everything you publish on the internet.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#case-converter-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Open the case converter
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

      {/* TOOL SECTION */}
      <section
        id="case-converter-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <CaseConverter />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              CLEAN UP YOUR TEXT IN SECONDS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One tool, multiple ways to format your copy.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Use Kompi as a quick fix for messy text, a way to standardize
              headings and UI copy, or your daily helper for social content.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  SOCIAL & EMAIL
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Fix quick one-liners
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Turn all caps into sentence case, or tidy up subject lines and
                  short hooks before you hit send.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Clean up ALL CAPS text</li>
                  <li>• Standardize email subjects</li>
                  <li>• Make captions feel natural</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Tidy a subject line
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
                  Headlines & titles
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Quickly switch between Title Case and sentence case to match
                  your brand or editorial style.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Consistent blog titles</li>
                  <li>• On-brand headings across pages</li>
                  <li>• Great for CMS and no-code tools</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Format a headline
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  UX & DEVELOPMENT
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  UI copy that matches
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Keep button labels, error messages, and interface text aligned
                  with your product&apos;s tone.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Standardize microcopy</li>
                  <li>• Help devs and designers sync</li>
                  <li>• Quickly test alternative styles</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#006B81] bg-[#006B81] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#034557]">
                Clean up UI text
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
              Ready to give your text a quick glow-up?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#111827] sm:text-base">
              Use Kompi&apos;s free case converter now, then pin it to your
              Kompi dashboard so it&apos;s always one click away when you&apos;re
              drafting copy.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#case-converter-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] shadow hover:bg-black"
              >
                Open the case converter
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

      {/* FEATURE PANELS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Make everything you publish feel intentional.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E3F2FF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR EVERYDAY CREATORS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Stop fighting with caps-lock and manual fixes.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Captions, hooks, and quotes—Kompi gives you a calm space to
                paste messy text and clean it up without opening a full document
                tool.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#6B7280]">
                  Case converter preview
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#9BDFD1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#0F172A]">
                  Great for teams & client content
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Keep every line of copy on-brand.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Use Kompi while reviewing pages, proposals, and social content
                so every heading, button, and snippet follows the same style
                rules—no matter who wrote it.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#006B81] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E3F2FF] sm:text-sm">
                FOR PRODUCT & MARKETING
              </p>
              <h3 className="text-2xl font-semibold text-[#E3F2FF] sm:text-3xl">
                Pair tidy text with smarter link journeys.
              </h3>
              <p className="text-sm leading-relaxed text-[#E3F2FF] sm:text-base">
                Kompi is more than a case converter. It ties into your links,
                QR codes, and menus so every campaign feels sharp—from the first
                word to the final click.
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

      {/* TESTIMONIAL ROW */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              SMALL TOOL, BIG CONSISTENCY BOOST
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              One less thing to fix by hand.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Perfect for headlines”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “I draft titles in here and flip between sentence case and Title
                Case until one feels right. It&apos;s a tiny but very useful
                ritual.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great for client decks”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We keep Kompi open while building slides. Button labels and
                headings stay consistent, even with multiple people editing.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Saves me from caps-lock chaos”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “Whenever a client sends all-caps copy, I run it through this
                once and we&apos;re back to normal English.”
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
              Questions about the Kompi case converter?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they add this page to
              their writing workflow.
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
