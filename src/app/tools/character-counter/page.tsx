// src/app/tools/character-counter/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CharacterCounter } from "@/components/tools/CharacterCounter";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Character Counter | Count Characters, Words & Lines | Kompi Tools",
  description:
    "Quickly count characters, words, and lines for social posts, ad copy, meta descriptions, and more with Kompi’s free character counter.",
  alternates: {
    canonical: "https://kompi.app/tools/character-counter",
  },
};

const faqs = [
  {
    question: "Is the Kompi character counter free?",
    answer:
      "Yes. The character counter is free to use as much as you like. No account or email required.",
  },
  {
    question: "What can I use this character counter for?",
    answer:
      "It’s ideal for social posts, ad copy, meta descriptions, product blurbs, and anywhere else where you need to stay within a character limit.",
  },
  {
    question: "Does Kompi store my text?",
    answer:
      "No. Your text stays in your browser. Kompi does not store or log what you type or paste into the tool.",
  },
  {
    question: "Does it also count words and lines?",
    answer:
      "Yes. You get live counts for characters, characters without spaces, words, and lines.",
  },
  {
    question: "Can I add this character counter to my Kompi dashboard?",
    answer:
      "Yes. Create a free Kompi account and pin the character counter as a tool so it’s always one click away when you’re writing.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Character Counter",
  url: "https://kompi.app/tools/character-counter",
  applicationCategory: "UtilitiesApplication",
  description:
    "Count characters, words, and lines for your content with Kompi's free character counter.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicCharacterCounterPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#FFCFD2] via-[#A5FFD6] to-[#BDE0FE] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Character counter</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Stay inside{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                every character limit
              </span>{" "}
              without guessing.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Paste your copy and see live counts for characters, words, and
              lines. Great for social posts, ad copy, meta descriptions, and
              product blurbs when there&apos;s not much room to write.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#character-counter-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Start counting
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="character-counter-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <CharacterCounter variant="public" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the Kompi character counter?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              This tool is built for people who write a lot of short, high-impact
              content where limits matter—here&apos;s how it fits into that.
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
