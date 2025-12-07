// src/app/tools/youtube-title-generator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { YoutubeTitleGenerator } from "@/components/tools/YoutubeTitleGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free YouTube Title Generator | Click-Worthy Video Titles | Kompi Tools",
  description:
    "Turn your video ideas into scroll-stopping YouTube titles. Kompi's free YouTube title generator helps creators write clear, clickable titles in seconds.",
};

const faqs = [
  {
    question: "Is the YouTube title generator free?",
    answer:
      "Yes. The Kompi YouTube title generator is free to use as many times as you like. No account or credit card required.",
  },
  {
    question: "What do I need to use this tool?",
    answer:
      "You just need a rough idea of your video topic. Add an audience and outcome if you want more tailored title ideas.",
  },
  {
    question: "Does this guarantee more views?",
    answer:
      "No tool can guarantee views, but clearer, more compelling titles usually improve click-through rate when the content matches the promise.",
  },
  {
    question: "Can I use this for Shorts and long-form videos?",
    answer:
      "Yes. Use shorter titles for Shorts and more descriptive titles for tutorials and long-form content.",
  },
  {
    question: "Does this replace keyword research?",
    answer:
      "No. You can mix what you learn from keyword research with the structure and hooks from this tool for best results.",
  },
  {
    question: "Does Kompi store my video ideas?",
    answer:
      "No. Everything is generated in your browser. Kompi does not store your topics or the titles you create with this tool.",
  },
  {
    question: "Can I pin this inside my Kompi dashboard?",
    answer:
      "Yes. When you create a free Kompi account you can save the YouTube title generator as a dashboard tool, next to links and QR codes.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi YouTube Title Generator",
  url: "https://kompi.app/tools/youtube-title-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate clear, clickable YouTube titles for Shorts and long-form videos in seconds.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicYoutubeTitleGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1E2330] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · YouTube title generator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn your{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                video idea
              </span>{" "}
              into a click-worthy title in minutes.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Describe your video, pick a tone, and get a batch of title ideas
              you can test for Shorts, long-form videos, and playlists—without
              staring at a blank field.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#youtube-title-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Generate YouTube titles
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
              <span>• Works for Shorts & long-form</span>
              <span>• No login, no email required</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="youtube-title-generator-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <YoutubeTitleGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* SIMPLE PANELS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              BEFORE YOU HIT PUBLISH
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Titles that match the value of the video you already made.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              You&apos;ve done the hard work: planning, filming, and editing.
              Use Kompi to make sure the title does that work justice.
            </p>
          </div>

          <div className="grid gap-8 rounded-3xl bg-[#E3F2FF] p-8 sm:grid-cols-2 sm:p-12">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR CREATOR CHANNELS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Get 10–15 options instead of rewriting the same one.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Ask your audience what they actually want to click on instead of
                guessing. Paste a few of your favourite titles into your upload
                flow, A/B tests, or polls.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-72 sm:w-72">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#6B7280]">
                  Title ideas list preview
                </div>
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
              Questions about the YouTube title generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what creators usually ask before they add this to
              their upload checklist.
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

      <FooterCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
