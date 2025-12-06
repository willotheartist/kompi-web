import type { Metadata } from "next";
import Link from "next/link";
import ProfitMarginCalculator from "@/components/tools/ProfitMarginCalculator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Profit Margin Calculator | Check Margin, Profit & Markup | Kompi Tools",
  description:
    "Quickly calculate profit, margin, and markup for your products and services. Great for creators, agencies, and small businesses.",
};

const faqs = [
  {
    question: "Is the profit margin calculator free?",
    answer:
      "Yes. This calculator is free to use directly in your browser—no signup required.",
  },
  {
    question: "What numbers do I need?",
    answer:
      "You just need your total revenue and total cost for the product, project, or period you want to check.",
  },
  {
    question: "Does this replace accounting or tax advice?",
    answer:
      "No. It’s a quick planning tool to help you sense-check your margins. For detailed decisions, talk to your accountant or financial advisor.",
  },
  {
    question: "Can I save or export results?",
    answer:
      "You can copy the summary and paste it into invoices, proposals, or your Kompi notes and docs.",
  },
  {
    question: "Can I pin this inside the Kompi dashboard?",
    answer:
      "Yes. When you have a Kompi account, you can add this calculator to your dashboard tools and access it whenever you&apos;re pricing something new.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Profit Margin Calculator",
  url: "https://kompi.app/tools/profit-margin-calculator",
  applicationCategory: "BusinessApplication",
  description:
    "Quickly calculate profit, margin, and markup for your products and services.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicProfitMarginCalculatorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[10px] font-semibold text-white">
              %
            </span>
            <span>Kompi Tools · Profit margin calculator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              See{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                your margin in seconds
              </span>{" "}
              before you ship or quote.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Plug in what you charge and what it costs to deliver. Kompi shows
              your profit, margin, and markup—so pricing doesn&apos;t feel like a
              guess.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#profit-margin-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Calculate my margin
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
        id="profit-margin-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#111111] p-[1px] shadow-xl shadow-[#111111]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <ProfitMarginCalculator variant="public" />
          </div>
        </div>
      </section>

      {/* THREE PANELS */}
      <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              FOR CREATORS & SMALL TEAMS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Use it whenever you&apos;re tempted to underprice.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-6 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  SERVICES & RETAINERS
                </p>
                <h3 className="text-lg font-semibold text-[#1E2330]">
                  Check project margins
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Use it before you send a proposal or sign a new retainer.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-6 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1E2330]">
                  DIGITAL PRODUCTS
                </p>
                <h3 className="text-lg font-semibold text-[#1E2330]">
                  Price your next launch
                </h3>
                <p className="text-sm text-[#111827]">
                  Sense-check your margin before you fix prices on sales pages
                  or checkout links.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-6 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  PHYSICAL GOODS
                </p>
                <h3 className="text-lg font-semibold text-[#1E2330]">
                  Keep an eye on costs
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Adjust for shipping, packaging, and platform fees before you
                  run a promo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F7F3] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the profit margin calculator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Use this alongside QR menus, offers, and links so you&apos;re not
              guessing on price anymore.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E3F2FF] bg-[#FFFFFF] p-5 text-sm"
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
