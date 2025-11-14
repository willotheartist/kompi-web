"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FooterCTA } from "@/components/footer-cta";

type BillingPeriod = "monthly" | "yearly";

type Plan = {
  id: "free" | "creator" | "studio";
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  cta: string;
  highlighted?: boolean;
  bestFor: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For individuals testing ideas.",
    monthly: 0,
    yearly: 0,
    cta: "Start for free",
    bestFor: "Creators getting started",
    features: [
      "1 workspace",
      "10 active short links",
      "1 Link-in-Bio page",
      "Basic click analytics",
      "Standard Kompi Codes™ (QR)",
      "Kompi branding on public pages",
      "Standard email support",
    ],
  },
  {
    id: "creator",
    name: "Creator",
    tagline: "For solo founders & small brands.",
    monthly: 12.99,
    yearly: 131.88,
    cta: "Choose Creator",
    highlighted: true,
    bestFor: "Freelancers, coaches, personal brands",
    features: [
      "Up to 5 workspaces",
      "Unlimited short links",
      "Unlimited Link-in-Bio pages",
      "Advanced analytics (UTM, referrers, devices)",
      "Custom branding (logo, colors)",
      "Branded Kompi Codes™ (QR styles)",
      "Remove Kompi branding",
      "Smart UTM builder",
      "Priority email support",
    ],
  },
  {
    id: "studio",
    name: "Studio",
    tagline: "For agencies, studios & teams.",
    monthly: 24.99,
    yearly: 239.88,
    cta: "Choose Studio",
    bestFor: "Studios, agencies, multi-brand teams",
    features: [
      "Unlimited workspaces",
      "Up to 10 team members",
      "Unlimited links & Link-in-Bio pages",
      "Custom domains (yourbrand.link)",
      "Workspace roles & approvals",
      "Advanced analytics & CSV export",
      "Premium Kompi Codes™ (logos, frames, palettes)",
      "Smart Links routing (device & geo rules)",
      "SLA-backed priority support",
      "Early access to experimental features",
    ],
  },
];

const featureSections = [
  {
    title: "Link management",
    rows: [
      "Active short links",
      "Workspaces",
      "Link-in-Bio pages",
      "Bulk link creation",
      "Smart redirect rules",
    ],
  },
  {
    title: "Branding & domains",
    rows: [
      "Custom Link-in-Bio themes",
      "Remove Kompi branding",
      "Branded QR codes (Kompi Codes™)",
      "Custom domains",
    ],
  },
  {
    title: "Analytics",
    rows: [
      "Basic click counts",
      "UTM & referrer analytics",
      "Device / browser insights",
      "Export & reporting",
    ],
  },
  {
    title: "Collaboration & support",
    rows: ["Team members", "Priority support", "Early feature access"],
  },
];

function formatPrice(plan: Plan, period: BillingPeriod): string {
  if (plan.id === "free") return "£0";
  if (period === "monthly") return `£${plan.monthly.toFixed(2)}`;
  const monthlyEquivalent = plan.yearly / 12;
  return `£${monthlyEquivalent.toFixed(2)}`;
}

function subLabel(plan: Plan, period: BillingPeriod): string {
  if (plan.id === "free") return "Always free";
  if (period === "monthly") return "Billed monthly";
  return `Billed yearly (£${plan.yearly.toFixed(2)})`;
}

function cell(planId: Plan["id"], row: string): string {
  switch (row) {
    case "Active short links":
      if (planId === "free") return "10";
      return "Unlimited";
    case "Workspaces":
      if (planId === "free") return "1";
      if (planId === "creator") return "5";
      return "Unlimited";
    case "Link-in-Bio pages":
      if (planId === "free") return "1";
      return "Unlimited";
    case "Bulk link creation":
      return planId === "free" ? "—" : "✓";
    case "Smart redirect rules":
      return planId === "studio" ? "✓" : "—";

    case "Custom Link-in-Bio themes":
      if (planId === "free") return "Basic";
      return "Advanced";
    case "Remove Kompi branding":
      return planId === "free" ? "—" : "✓";
    case "Branded QR codes (Kompi Codes™)":
      if (planId === "free") return "Standard";
      if (planId === "creator") return "Branded";
      return "Premium";
    case "Custom domains":
      return planId === "studio" ? "✓" : "—";

    case "Basic click counts":
      return "✓";
    case "UTM & referrer analytics":
      return planId === "free" ? "—" : "✓";
    case "Device / browser insights":
      if (planId === "studio") return "✓";
      if (planId === "creator") return "Lite";
      return "—";
    case "Export & reporting":
      return planId === "studio" ? "✓" : "—";

    case "Team members":
      if (planId === "free") return "1";
      if (planId === "creator") return "1";
      return "Up to 10";
    case "Priority support":
      if (planId === "creator") return "Email";
      if (planId === "studio") return "Priority";
      return "—";
    case "Early feature access":
      return planId === "studio" ? "✓" : "—";
    default:
      return "—";
  }
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <main className="min-h-screen bg-[#020618] text-neutral-50 pb-0">
      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-28 px-4 bg-gradient-to-br from-[#020618] via-[#0b1029] to-[#181b4a]">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Pricing for the next generation of links.
          </h1>
          <p className="text-sm md:text-base text-slate-200 max-w-2xl">
            Start free. Scale into Kompi Codes™, smart redirects, branded hubs,
            and studio-grade analytics — without switching tools.
          </p>

          {/* Billing toggle */}
          <div className="mt-2 inline-flex items-center bg-[#020817] border border-slate-700/60 rounded-full p-1 text-xs shadow-[0_16px_50px_rgba(0,0,0,0.7)]">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`px-5 py-2 rounded-full transition ${
                billing === "monthly"
                  ? "bg-[#43C7FF] text-slate-900"
                  : "text-slate-300"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`px-5 py-2 rounded-full transition flex items-center gap-1 ${
                billing === "yearly"
                  ? "bg-[#43C7FF] text-slate-900"
                  : "text-slate-300"
              }`}
            >
              Yearly
              <span className="text-[10px] uppercase">
                save up to 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* PLAN CARDS */}
      <section className="px-4 pt-4 pb-10 bg-gradient-to-b from-[#181b4a] via-[#020618] to-[#020618]">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const price = formatPrice(plan, billing);
            const label = subLabel(plan, billing);

            const gradientBase =
              plan.id === "free"
                ? "from-[#111827] via-[#020817] to-[#020817]"
                : plan.id === "creator"
                ? "from-[#111827] via-[#241b8c] to-[#020817]"
                : "from-[#020817] via-[#241b8c] to-[#43C7FF]/10";

            const borderGlow = plan.highlighted
              ? "border-[#43C7FF] shadow-[0_24px_90px_rgba(0,0,0,0.85)]"
              : "border-slate-800/80 shadow-[0_18px_70px_rgba(0,0,0,0.8)]";

            return (
              <Card
                key={plan.id}
                className={`
                  relative overflow-hidden
                  flex flex-col rounded-3xl p-6
                  bg-gradient-to-br ${gradientBase}
                  backdrop-blur-2xl
                  text-slate-50
                  border ${borderGlow}
                  transition-transform transition-shadow duration-200
                  hover:-translate-y-1 hover:shadow-[0_30px_110px_rgba(0,0,0,0.95)]
                `}
              >
                <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 bg-[#43C7FF]/15 rounded-full blur-3xl" />

                {plan.highlighted && (
                  <div className="inline-flex items-center px-3 py-1 mb-3 rounded-full bg-[#43C7FF] text-[11px] font-semibold text-slate-900">
                    Most popular
                  </div>
                )}

                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="text-sm text-slate-300 mb-4">
                  {plan.tagline}
                </p>

                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-semibold text-white">
                      {price}
                    </span>
                    <span className="text-sm text-slate-400">
                      /month
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {label}
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    Best for: {plan.bestFor}
                  </div>
                </div>

                <ul className="flex-1 space-y-2 text-sm text-slate-100 mb-6 text-left">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#43C7FF]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="sm"
                  className={`w-full rounded-full text-sm font-semibold ${
                    plan.highlighted
                      ? "bg-[#43C7FF] hover:bg-[#30b2eb] text-slate-900"
                      : "bg-transparent border border-slate-500 hover:bg-slate-900/60 text-slate-100"
                  }`}
                  asChild
                >
                  <Link href="/signin">{plan.cta}</Link>
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FEATURE COMPARISON */}
      <section className="px-4 pb-0 bg-[#020618]">
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#030816]/95 border border-slate-800/80 shadow-[0_30px_110px_rgba(0,0,0,0.9)] p-6 md:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Compare plans
              </h3>
              <p className="text-sm text-slate-400">
                See what unlocks as you grow — from simple links to
                full-funnel routing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              <span>Free → Launch</span>
              <span>Creator → Grow</span>
              <span>Studio → Scale</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm text-slate-100 border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80">
                  <th className="py-2 pr-3 text-left font-medium text-slate-500">
                    Feature
                  </th>
                  <th className="py-2 px-3 text-center font-medium">
                    Free
                  </th>
                  <th className="py-2 px-3 text-center font-medium">
                    Creator
                  </th>
                  <th className="py-2 px-3 text-center font-medium">
                    Studio
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureSections.map((section) => (
                  <Fragment key={section.title}>
                    <tr className="bg-slate-900/40">
                      <td
                        colSpan={4}
                        className="py-2 px-3 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-slate-400"
                      >
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr
                        key={section.title + row}
                        className="border-b border-slate-900/40"
                      >
                        <td className="py-2 pr-3 text-slate-200">
                          {row}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {cell("free", row)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {cell("creator", row)}
                        </td>
                        <td className="py-2 px-3 text-center">
                          {cell("studio", row)}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FooterCTA />
    </main>
  );
}
