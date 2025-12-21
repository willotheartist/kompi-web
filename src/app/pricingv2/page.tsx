"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Shield, Sparkles, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type BillingCadence = "monthly" | "yearly";

type ButtonVariant =
  | "default"
  | "outline"
  | "subtle"
  | "ghost"
  | "destructive"
  | null
  | undefined;

type Plan = {
  key: "starter" | "pro" | "growth";
  name: string;
  badge?: string;
  description: string;
  priceMonthly: number; // GBP
  highlight?: boolean;
  features: string[];
  finePrint?: string[];
  cta: {
    label: string;
    href: string;
    variant?: ButtonVariant;
  };
};

function formatGBP(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

function yearlyPriceFromMonthly(monthly: number) {
  // "2 months free" => pay for 10 months
  return monthly * 10;
}

function Pill({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-zinc-800 shadow-sm backdrop-blur",
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <div className="mb-3 flex justify-center">
          <Pill>
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </Pill>
        </div>
      ) : null}
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base text-zinc-600 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function PricingToggle({
  cadence,
  setCadence,
}: {
  cadence: BillingCadence;
  setCadence: (c: BillingCadence) => void;
}) {
  return (
    <div className="mt-7 flex justify-center">
      <div className="inline-flex items-center rounded-full border bg-white/70 p-1 shadow-sm backdrop-blur">
        <button
          type="button"
          onClick={() => setCadence("monthly")}
          className={[
            "rounded-full px-4 py-2 text-sm font-medium transition",
            cadence === "monthly"
              ? "bg-zinc-900 text-white shadow"
              : "text-zinc-700 hover:bg-white",
          ].join(" ")}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => setCadence("yearly")}
          className={[
            "rounded-full px-4 py-2 text-sm font-medium transition",
            cadence === "yearly"
              ? "bg-zinc-900 text-white shadow"
              : "text-zinc-700 hover:bg-white",
          ].join(" ")}
        >
          Yearly{" "}
          <span className="ml-1 text-xs opacity-90">(2 months free)</span>
        </button>
      </div>
    </div>
  );
}

function FeatureRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-sm text-zinc-700">
      <Check className="mt-0.5 h-4 w-4 flex-none text-zinc-900" />
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function PlanCard({
  plan,
  cadence,
}: {
  plan: Plan;
  cadence: BillingCadence;
}) {
  const billedAmount =
    plan.key === "starter"
      ? 0
      : cadence === "monthly"
        ? plan.priceMonthly
        : yearlyPriceFromMonthly(plan.priceMonthly);

  const priceLabel =
    plan.key === "starter" ? "Free" : formatGBP(billedAmount);

  const cadenceLabel =
    plan.key === "starter" ? "" : cadence === "monthly" ? "/ month" : "/ year";

  return (
    <Card
      className={[
        "relative overflow-hidden border bg-white/70 shadow-sm backdrop-blur",
        plan.highlight ? "border-zinc-900 shadow-md" : "border-zinc-200",
      ].join(" ")}
    >
      {plan.highlight ? (
        <div className="absolute inset-x-0 top-0 h-1 bg-zinc-900" />
      ) : null}

      <CardContent className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-zinc-950">
                {plan.name}
              </h3>
              {plan.badge ? (
                <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white">
                  {plan.badge}
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-zinc-600">{plan.description}</p>
          </div>

          {plan.highlight ? (
            <div className="hidden sm:block">
              <Pill className="border-zinc-900/20 bg-zinc-50 text-zinc-900">
                <Zap className="h-3.5 w-3.5" />
                Best value
              </Pill>
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex items-end gap-2">
          <div className="text-3xl font-semibold tracking-tight text-zinc-950">
            {priceLabel}
          </div>
          {cadenceLabel ? (
            <div className="pb-1 text-sm text-zinc-600">{cadenceLabel}</div>
          ) : null}
        </div>

        {plan.key !== "starter" && cadence === "yearly" ? (
          <p className="mt-2 text-xs text-zinc-600">
            Equivalent to{" "}
            <span className="font-medium text-zinc-900">
              {formatGBP(plan.priceMonthly)}
            </span>{" "}
            / month, billed yearly.
          </p>
        ) : null}

        <div className="mt-6">
          <Button
            asChild
            className="w-full"
            variant={plan.cta.variant ?? "default"}
          >
            <Link href={plan.cta.href}>
              {plan.cta.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {plan.key === "starter" ? (
            <p className="mt-2 text-xs text-zinc-600">
              Starter is for testing Kompi — not running your business on it.
            </p>
          ) : null}
        </div>

        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Includes
          </p>
          <ul className="mt-3 space-y-2.5">
            {plan.features.map((f) => (
              <FeatureRow key={f}>{f}</FeatureRow>
            ))}
          </ul>

          {plan.finePrint?.length ? (
            <div className="mt-5 rounded-xl border bg-white/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Notes
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-zinc-600">
                {plan.finePrint.map((t) => (
                  <li key={t}>• {t}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function MiniFAQ() {
  const items = [
    {
      q: "Do you have an agency or enterprise plan?",
      a: "Yes. If you need unlimited domains/workspaces, onboarding, or white-label options, we’ll tailor a plan. Book a call below.",
    },
    {
      q: "Do you offer a yearly discount?",
      a: "Yes — yearly billing gives you 2 months free (pay for 10 months).",
    },
    {
      q: "Is Kompi a Bitly replacement?",
      a: "Kompi covers the core short link + branded domain workflow, but is designed to be the link + attribution layer for growth (UTMs, reporting, pages).",
    },
    {
      q: "Can I downgrade anytime?",
      a: "Yes. You can manage billing from your dashboard. If you downgrade, paid-only features will be locked until you upgrade again.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-3">
        {items.map((it) => (
          <Card
            key={it.q}
            className="border-zinc-200 bg-white/70 shadow-sm backdrop-blur"
          >
            <CardContent className="p-5">
              <p className="font-medium text-zinc-950">{it.q}</p>
              <p className="mt-2 text-sm text-zinc-600">{it.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const [cadence, setCadence] = useState<BillingCadence>("monthly");

  const plans: Plan[] = useMemo(
    () => [
      {
        key: "starter",
        name: "Starter",
        description: "Try Kompi — see your first clicks and analytics.",
        priceMonthly: 0,
        features: [
          "Up to 25 links",
          "Kompi short domain",
          "Basic analytics (total clicks + last 7 days)",
          "1 bio page",
        ],
        finePrint: ["No custom domains", "No exports", "No historical analytics"],
        cta: { label: "Get started", href: "/signup", variant: "outline" },
      },
      {
        key: "pro",
        name: "Pro",
        badge: "Most popular",
        description: "Everything you need to run links properly.",
        priceMonthly: 29,
        features: [
          "Unlimited links",
          "Up to 5 branded domains",
          "Full analytics (geo, device, referrer, UTMs)",
          "QR codes",
          "UTM builder",
          "Bio pages",
          "12 months analytics history",
        ],
        finePrint: ["Built for creators, founders, and small teams."],
        cta: { label: "Start Pro", href: "/signup?plan=pro", variant: "default" },
      },
      {
        key: "growth",
        name: "Growth",
        badge: "Best value",
        description: "For teams, agencies, and serious growth work.",
        priceMonthly: 99,
        highlight: true,
        features: [
          "Everything in Pro",
          "Up to 25 branded domains",
          "Client workspaces",
          "CSV exports",
          "Advanced analytics & comparisons",
          "Priority support",
          "Early access to Kompi Track",
        ],
        finePrint: [
          "Replaces spreadsheets + fragmented tools.",
          "Great for client reporting and performance marketing.",
        ],
        cta: {
          label: "Start Growth",
          href: "/signup?plan=growth",
          variant: "default",
        },
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-50">
      {/* Hero */}
      <section className="px-4 pt-16 sm:px-6 sm:pt-20">
        <SectionHeading
          eyebrow="Founding pricing available for a limited time"
          title="Pricing built for people who care where traffic actually comes from"
          subtitle="Short links, branded domains, QR codes, pages, and attribution — without enterprise bloat or artificial limits."
        />

        <PricingToggle cadence={cadence} setCadence={setCadence} />

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <PlanCard key={p.key} plan={p} cadence={cadence} />
          ))}
        </div>

        {/* Agency/Enterprise */}
        <div className="mx-auto mt-10 max-w-6xl">
          <Card className="border-zinc-200 bg-white/70 shadow-sm backdrop-blur">
            <CardContent className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center sm:p-7">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-zinc-900" />
                  <p className="text-lg font-semibold text-zinc-950">
                    Need more control?
                  </p>
                </div>
                <p className="mt-2 text-sm text-zinc-600">
                  Agency & enterprise plans: unlimited domains/workspaces,
                  onboarding, white-label options, and SLAs.
                </p>
              </div>
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href="/customers/agencies">See agency use cases</Link>
                </Button>
                <Button asChild className="w-full sm:w-auto">
                  <Link href="/signup?intent=enterprise">Talk to us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why switch */}
      <section className="px-4 pb-6 pt-14 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Why teams switch to Kompi
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Modern UX, clear limits, and analytics that actually help you make
              decisions.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "No checkbox bloat",
                desc: "Kompi stays fast and focused — built for day-to-day usage.",
              },
              {
                title: "UTMs built-in",
                desc: "Stop guessing. Track campaigns cleanly from the start.",
              },
              {
                title: "Transparent pricing",
                desc: "Fewer tiers. Clear value. Less “contact sales” theatre.",
              },
              {
                title: "Made for growth teams",
                desc: "Designed for reporting, attribution, and client work.",
              },
            ].map((b) => (
              <Card
                key={b.title}
                className="border-zinc-200 bg-white/70 shadow-sm backdrop-blur"
              >
                <CardContent className="p-5">
                  <p className="font-medium text-zinc-950">{b.title}</p>
                  <p className="mt-2 text-sm text-zinc-600">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deliberate "No"s */}
      <section className="px-4 pb-6 pt-10 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              What Kompi deliberately doesn’t support
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Clarity beats chaos. These decisions keep Kompi reliable, fast, and
              worth paying for.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "“Free forever” businesses",
                desc: "Starter is for testing. If Kompi drives revenue, it should be on a paid plan.",
              },
              {
                title: "Enterprise checkbox theatre",
                desc: "We don’t build for procurement committees. We build for people shipping campaigns.",
              },
              {
                title: "Unlimited usage on low tiers",
                desc: "Domains, exports, and deep analytics are paid features — on purpose.",
              },
              {
                title: "Spam and disposable mass-linking",
                desc: "We protect redirect reputation and deliverability. Abuse gets blocked.",
              },
            ].map((x) => (
              <Card
                key={x.title}
                className="border-zinc-200 bg-white/70 shadow-sm backdrop-blur"
              >
                <CardContent className="p-5">
                  <p className="font-medium text-zinc-950">{x.title}</p>
                  <p className="mt-2 text-sm text-zinc-600">{x.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 pb-20 pt-12 sm:px-6 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              FAQs
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Quick answers. If you’re an agency, we can onboard you fast.
            </p>
          </div>

          <div className="mt-8">
            <MiniFAQ />
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/signup?plan=growth">
                Start Growth
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/pricing">View current pricing page</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
