// src/app/tools/utm-builder/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { UtmBuilder } from "@/components/tools/UtmBuilder";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free UTM Builder | Create Clean Tracking Links for Campaigns | Kompi Tools",
  description:
    "Build clean UTM tracking links for ads, newsletters, and social campaigns. Kompi's free UTM builder makes it easy to track where clicks really come from.",
};

const faqs = [
  {
    question: "What is a UTM builder?",
    answer:
      "A UTM builder helps you add tracking parameters like utm_source and utm_medium to your links so tools like Kompi, Google Analytics, and others can see where traffic comes from.",
  },
  {
    question: "Is this UTM builder free?",
    answer:
      "Yes. The Kompi UTM builder is completely free to use as many times as you like. No account or card required.",
  },
  {
    question: "Which UTM parameters should I use?",
    answer:
      "At minimum, set utm_source and utm_medium. Add utm_campaign for launches and promos, and utm_content or utm_term if you need extra detail.",
  },
  {
    question: "Will these links work with Google Analytics and Kompi?",
    answer:
      "Yes. The UTM parameters follow the standard convention used by Google Analytics, Kompi, and most analytics platforms.",
  },
  {
    question: "Do you store the URLs I create?",
    answer:
      "No. All links are built directly in your browser. Kompi doesn’t store or log the UTM parameters you type into this tool.",
  },
  {
    question: "Can I use this for social media and email?",
    answer:
      "Yes. Many people use this UTM builder for newsletters, Link-in-bio pages, creator campaigns, and paid ads.",
  },
  {
    question: "Can I use this inside my Kompi dashboard?",
    answer:
      "Yes. When you create a free Kompi account you can pin the UTM builder as a tool inside your dashboard so it’s always one click away.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi UTM Builder",
  url: "https://kompi.app/tools/utm-builder",
  applicationCategory: "UtilitiesApplication",
  description:
    "Build clean UTM tracking links for ads, newsletters, and social campaigns.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicUtmBuilderPage() {
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
            <span>Kompi Tools · UTM builder</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn any link into a{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                clean tracking link
              </span>{" "}
              in a few clicks.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Paste a URL, add UTM parameters, and copy a campaign-ready link
              you can drop into ads, bios, and newsletters. No spreadsheets, no
              guesswork—just consistent tracking.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#utm-builder-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Build a tracking link
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
              <span>• Works with Kompi & Google Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="utm-builder-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <UtmBuilder variant="public" />
          </div>
        </div>
      </section>

      {/* USE CASE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              TRACK WHAT&apos;S ACTUALLY WORKING
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One UTM builder, three campaigns you can ship today.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Use Kompi to quickly label where your clicks are coming from so
              you can see which channels, promos, and placements actually move
              the needle.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  NEWSLETTERS & EMAIL
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Track which emails drive clicks
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Give each campaign (or even each CTA) its own tracking link so
                  you can see which sends pull real traffic.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• utm_source=newsletter</li>
                  <li>• utm_medium=email</li>
                  <li>• utm_campaign=spring_launch</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-7 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Make your Link-in-bio actually measurable
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Use different UTM links for bio, story, and comments so you
                  can see what really drives clicks on Instagram and TikTok.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• utm_source=instagram-bio</li>
                  <li>• utm_medium=social</li>
                  <li>• utm_content=linkinbio_main</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  PAID ADS
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Compare creatives & audiences
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Ship separate links for each ad set so you can see which
                  visuals and hooks really deliver.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• utm_source=meta-ads</li>
                  <li>• utm_medium=cpc</li>
                  <li>• utm_content=carousel_a / video_b</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the Kompi UTM builder?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they standardise their
              tracking across emails, ads, and social.
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
