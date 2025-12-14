// app/kompi-suite/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { FooterCTA } from "@/components/footer-cta";
import SuitePricingTable from "@/components/pricing/SuitePricingTable";
import FeatureComparisonGrid from "@/components/pricing/FeatureComparisonGrid";
import {
  TOOL_DEFINITIONS,
  type ToolDefinition,
} from "@/lib/tools-config";
import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Sparkles,
  FileText,
  FileIcon,
  Image as ImageIcon,
  Type,
  Hash,
  User,
  Braces,
  ReceiptText,
  PlayCircle,
  MessageCircle,
} from "lucide-react";
import  FKSuite1  from "@/components/ksuite/ksuite1";
import  FKSuite2  from "@/components/ksuite/ksuite2";
import  FKSuite3  from "@/components/ksuite/ksuite3";
import Faqs from "@/components/faqs";
import KompiDoes from "@/components/kompidoes";


export const metadata: Metadata = {
  title:
    "Kompi Suite",
  description:
    "Kompi Suite gives creators, teams, and businesses a full set of premium tools — PDF editors, image utilities, text generators, brand tools, converters and more — all in one place.",
};

const faqs = [
  {
    q: "Who is Kompi Suite for?",
    a: "Creators, freelancers, agencies, small businesses, and anyone who needs fast, ad-free tools for PDFs, images, brand assets, formatting, and everyday digital tasks.",
  },
  {
    q: "What tools are included?",
    a: "PDF tools, image tools, converters, generators, business document creators, formatting helpers, and more — with new tools added regularly.",
  },
  {
    q: "Is everything unlimited?",
    a: "Yes — Kompi Suite unlocks unlimited usage of all Suite-grade tools, with no ads, limits, or watermarks.",
  },
  {
    q: "Will new tools be added?",
    a: "Yes. As we ship new tools, Kompi Suite members get them automatically at no extra cost.",
  },
  {
    q: "Can I switch plans anytime?",
    a: "You can upgrade, downgrade, or cancel at any time directly from your dashboard settings.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Suite",
  url: "https://kompi.app/kompi-suite",
  applicationCategory: "UtilityApplication",
  description:
    "A complete suite of premium tools for creators, teams, and businesses — PDFs, images, converters, brand tools, generators and more.",
  offers: {
    "@type": "Offer",
    price: "19.99",
    priceCurrency: "USD",
  },
};

/* ---------------- Marketing tool card (ToolCard look & feel) ---------------- */

const ICON_COMPONENTS: Record<ToolDefinition["icon"], LucideIcon> = {
  shield: Shield,
  sparkles: Sparkles,
  "file-text": FileText,
  file: FileIcon,
  image: ImageIcon,
  type: Type,
  hash: Hash,
  user: User,
  json: Braces,
  invoice: ReceiptText,
  play: PlayCircle,
  whatsapp: MessageCircle,
};

function MarketingToolCard({ tool }: { tool: ToolDefinition }) {
  const Icon = ICON_COMPONENTS[tool.icon] ?? Sparkles;
  const isComingSoon = tool.status === "coming-soon";

  return (
    <div
      className="group flex h-full min-h-[230px] flex-col rounded-[32px] border bg-card/80 px-5 py-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:bg-card hover:shadow-xl hover:backdrop-blur-lg"
      style={{
        borderColor: "var(--color-border)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top content */}
      <div className="flex items-start gap-4 pr-6 sm:pr-10">
        {/* Icon + pill */}
        <div className="flex flex-col items-start gap-2">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-3xl transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: tool.accentColor }}
          >
            <Icon className="h-8 w-8" strokeWidth={2.1} />
          </div>
          <div
            className="rounded-full px-3 py-1 text-[11px] font-medium leading-none"
            style={{ backgroundColor: tool.accentColor }}
          >
            {tool.category}
          </div>
        </div>

        {/* Title + description */}
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight">
            {tool.name}
          </h3>
          <p className="text-sm text-muted-foreground pr-6 sm:pr-10">
            {tool.shortDescription}
          </p>
        </div>
      </div>

      {/* Bottom pill */}
      <div className="mt-auto pt-5">
        <div
          className="flex h-10 w-full items-center justify-center rounded-full text-xs font-medium"
          style={{
            backgroundColor: isComingSoon ? "#F3F3F3" : "#111111",
            color: isComingSoon ? "#6B7280" : "#FFFFFF",
          }}
        >
          {isComingSoon ? "Coming soon to Kompi Suite" : "Included in Kompi Suite"}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export default function KompiSuitePage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* ======================= HERO ======================= */}
      <section className="relative overflow-hidden bg-[#1A1A1A] text-white">
        <div className="mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium ring-1 ring-white/20">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#F7F7F3] text-[10px] font-semibold text-[#1A1A1A]">
              K
            </span>
            <span>Introducing Kompi Suite</span>
          </div>

          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            One suite. Every tool you need to{" "}
            <span className="rounded-md bg-[#E8F739] px-2 text-[#1A1A1A]">
              build, create and run
            </span>{" "}
            your digital world.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
            PDF tools. Image tools. Brand tools. Generators. Converters. All
            beautifully designed, fast, ad-free, and right inside your Kompi
            dashboard.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full bg-[#E8F739] px-7 py-3 text-sm font-semibold text-[#1A1A1A] shadow-md transition hover:bg-[#d4e635]"
            >
              Get Kompi Suite
            </a>

            <Link
              href="/dashboard/tools"
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Try free tools
            </Link>
          </div>
        </div>
      </section>

      {/* ======================= BIG TOOLS SHOWCASE ======================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[#F7F7F3]">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Replace 10+ apps with one clean, fast workspace.
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-[#4B5563]">
            Kompi Suite is packed with tools for PDFs, images, text, creators,
            businesses and developers. Here&apos;s a look at what&apos;s inside
            — with more tools being added all the time.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {TOOL_DEFINITIONS.map((tool) => (
              <MarketingToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-[#6B7280]">
            Kompi Suite unlocks the full tools library in your dashboard. New
            tools automatically appear here as you add them to Kompi.
          </p>
        </div>
      </section>

      {/* ======================= PRICING ======================= */}
      <section id="pricing" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center mb-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Simple pricing. Powerful tools.
          </h2>
          <p className="mt-3 text-[#4B5563]">
            Choose a plan that fits how you create, build, and work.
          </p>
        </div>

        <SuitePricingTable />
      </section>

      <FKSuite1 />
      <FKSuite2 />
      <FKSuite3 />

      <KompiDoes />

      {/* ======================= FEATURE COMPARISON ======================= */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <FeatureComparisonGrid />
      </section>

      {/* ======================= FAQ ======================= */}
      <section className="bg-white px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Common questions
            </h2>
            <p className="text-sm text-[#4B5563] sm:text-base">
              Everything you need to know about Kompi Suite.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="rounded-2xl border border-[#E3E3E3] bg-[#F7F7F3] p-5"
              >
                <h3 className="mb-1 text-sm font-medium text-[#1A1A1A] sm:text-base">
                  {f.q}
                </h3>
                <p className="text-sm text-[#4B5563]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faqs />

      <FooterCTA />
    

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
