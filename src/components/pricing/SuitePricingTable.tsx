// src/components/pricing/SuitePricingTable.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PlanId = "free" | "creator" | "suite";

type Plan = {
  id: PlanId;
  name: string;
  priceLabel: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  href?: string;
  comingSoon?: boolean;
};

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    priceLabel: "$0 / month",
    tagline: "Start simple",
    description:
      "Launch your Kompi profile, create links, and try a few of the tools.",
    ctaLabel: "Get started free",
    href: "/signup",
  },
  {
    id: "creator",
    name: "Creator",
    priceLabel: "$9.99 / month",
    tagline: "For growing creators",
    description:
      "Full Creator plan: advanced branding, analytics, unlimited links, and pro K-Cards — plus all Kompi tools.",
    ctaLabel: "Upgrade to Creator",
    href: "/signin",
  },
  {
    id: "suite",
    name: "Kompi Suite",
    priceLabel: "$19.99 / month",
    tagline: "Everything in one suite",
    description:
      "All Creator features + premium upgrades and suite-only tools. Launching soon.",
    ctaLabel: "Coming soon",
    comingSoon: true,
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const isSuite = plan.id === "suite";
  const isCreator = plan.id === "creator";

  return (
    <div
      className={[
        "flex h-full flex-col rounded-3xl border px-6 py-7 sm:px-7 sm:py-8",
        "bg-white",
        isCreator ? "ring-2 ring-[#3A61FF]" : "",
        plan.comingSoon ? "opacity-90" : "",
      ].join(" ")}
      style={{
        borderColor: isSuite ? "#1A1A1A" : "#E5E5E0",
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {plan.name}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-[#6B7280]">
              {plan.tagline}
            </p>
          </div>
          <div className="text-right">
            <p className="text-base font-semibold text-[#111827]">
              {plan.priceLabel}
            </p>
          </div>
        </div>

        <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">
          {plan.description}
        </p>
      </div>

      <div className="mt-6 flex-1" />

      <div className="mt-4">
        <Button
          asChild={!plan.comingSoon}
          disabled={plan.comingSoon}
          className="w-full rounded-full text-sm font-medium"
          style={{
            backgroundColor: plan.comingSoon ? "#E5E7EB" : "#111827",
            color: plan.comingSoon ? "#111827" : "#F9FAFB",
          }}
        >
          {plan.comingSoon ? (
            <span>{plan.ctaLabel}</span>
          ) : (
            <Link href={plan.href || "/signin"}>{plan.ctaLabel}</Link>
          )}
        </Button>
      </div>
    </div>
  );
}

export default function SuitePricingTable() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-[#6B7280]">
        Prices shown in USD. Change or cancel anytime from your Kompi settings.
      </p>
    </div>
  );
}
