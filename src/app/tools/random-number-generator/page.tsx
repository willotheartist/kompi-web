// src/app/tools/random-number-generator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { RandomNumberGenerator } from "@/components/tools/RandomNumberGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Random Number Generator | Pick Numbers in Any Range | Kompi Tools",
  description:
    "Generate truly random numbers in any range with Kompi’s free random number generator. Perfect for giveaways, testing, spreadsheets, and quick decisions.",
};

const faqs = [
  {
    question: "Is the Kompi random number generator free?",
    answer:
      "Yes. The random number generator is completely free to use, with no login or signup required.",
  },
  {
    question: "What can I use this random number generator for?",
    answer:
      "Creators and teams use it for giveaways, picking winners, generating test data, creating example numbers for tutorials, and making quick decisions.",
  },
  {
    question: "Can I generate more than one number at a time?",
    answer:
      "Yes. You can generate multiple numbers in one click. Just set the count field before generating.",
  },
  {
    question: "Does it support decimal numbers?",
    answer:
      "Yes. Switch to the decimal mode and choose how many decimal places you want to include.",
  },
  {
    question: "Does Kompi store the numbers I generate?",
    answer:
      "No. Numbers are generated in your browser. Kompi does not store or log your inputs or results.",
  },
  {
    question: "Can I add this tool to my Kompi dashboard?",
    answer:
      "Yes. When you create a free Kompi account you can pin the random number generator as a tool inside your dashboard so it’s always one click away.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Random Number Generator",
  url: "https://kompi.app/tools/random-number-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate random integers or decimals in any range with Kompi's free random number generator.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicRandomNumberGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#A3CF3D] via-[#F4C6FF] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Random number generator</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Generate{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                random numbers
              </span>{" "}
              in any range in one click.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Set a minimum, maximum, and how many numbers you need. Perfect for
              giveaways, test data, spreadsheets, and quick decisions when you
              want simple, fair randomness.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#random-number-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Generate numbers
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
              <span>• Works with whole numbers and decimals</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="random-number-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <RandomNumberGenerator variant="public" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the Kompi random number generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they use this as part
              of their workflow for giveaways, demos, and quick decisions.
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
