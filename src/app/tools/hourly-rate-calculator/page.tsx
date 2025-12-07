// src/app/tools/hourly-rate-calculator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { HourlyRateCalculator } from "@/components/tools/HourlyRateCalculator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Hourly Rate Calculator for Freelancers | Free Business Tool | Kompi",
  description:
    "Work out a realistic minimum hourly rate as a freelancer or solo business owner. Factor in income goals, expenses, and billable time with Kompi's free hourly rate calculator.",
};

const faqs = [
  {
    question: "Who is this hourly rate calculator for?",
    answer:
      "This tool is designed for freelancers, contractors, and solo business owners who bill by the hour or by project and want a clearer baseline rate.",
  },
  {
    question: "Does this include taxes?",
    answer:
      "No. The calculator focuses on pre-tax numbers. You can bake your expected tax rate into either your target income or yearly expenses.",
  },
  {
    question: "What is “billable percentage”?",
    answer:
      "Billable percentage is the share of your total working time you can realistically invoice for—after accounting for admin, marketing, meetings, and time off.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. This is a planning tool, not financial advice. It gives you a clearer starting point so you’re not picking a number at random.",
  },
  {
    question: "Can I use this with project pricing?",
    answer:
      "Yes. Once you have a clearer hourly rate, you can multiply by the realistic hours a project will take, including revisions and meetings.",
  },
  {
    question: "Do you store any of my inputs?",
    answer:
      "No. Everything is calculated in your browser. Kompi does not store your numbers or assumptions from this tool.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Hourly Rate Calculator",
  url: "https://kompi.app/tools/hourly-rate-calculator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Calculate a realistic hourly rate based on your target income, expenses, and billable time.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicHourlyRateCalculatorPage() {
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
            <span>Kompi Tools · Hourly rate calculator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Find a{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                realistic hourly rate
              </span>{" "}
              that actually covers your work.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Plug in your income goals, expenses, and billable time to get a
              clearer minimum hourly rate as a freelancer or solo business
              owner—without a spreadsheet.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#hourly-rate-calculator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Calculate my hourly rate
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Save this in my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Runs 100% in your browser
              </div>
              <span>• No login required</span>
              <span>• Made for freelancers & small teams</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="hourly-rate-calculator-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <HourlyRateCalculator variant="public" />
          </div>
        </div>
      </section>

      {/* CONTEXT STRIP */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              NOT JUST A RANDOM NUMBER
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Price from the maths, not just your gut.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Most freelancers under–charge because they copy someone else&apos;s
              rate or pick a number that “feels ok”. This tool gives you a
              clearer starting point for your own situation.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the hourly rate calculator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what freelancers usually ask before they start
              adjusting their prices.
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
