"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FooterCTA } from "@/components/footer-cta";
import WhyKompi from "@/components/why-kompi";
import { GoProBanner } from "@/components/GoProBanner";
import GoProModal from "@/components/modals/GoProModal";
import "./pricing.css";

type BillingPeriod = "monthly" | "yearly";
type PlanId = "free" | "creator" | "enterprise";

type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  cta: string;
  highlighted?: boolean;
  bestFor: string;
  features: string[];
  comingSoon?: boolean;
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
      "Up to 10 active short links",
      "1 Link-in-Bio page",
      "Basic click analytics",
      "Standard Kompi Codes™ (QR generator)",
      "K-Cards (basic profile)",
      "Link shortener",
      "Kompi branding on public pages",
      "Standard email support",
    ],
  },
  {
    id: "creator",
    name: "Creator",
    tagline: "For solo founders & small brands.",
    monthly: 9.99,
    yearly: 119.88, // tweak if you want a discount
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
      "K-Cards with themes & layouts",
      "Smart UTM builder",
      "Remove Kompi branding",
      "Priority email support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For agencies, studios & teams.",
    monthly: 0,
    yearly: 0,
    cta: "Coming soon",
    bestFor: "Studios, agencies, multi-brand teams",
    comingSoon: true,
    features: [
      "Unlimited workspaces",
      "Up to 10 team members",
      "Unlimited links & Link-in-Bio pages",
      "Custom domains (yourbrand.link)",
      "Workspace roles & approvals",
      "Advanced analytics & CSV export",
      "Premium Kompi Codes™ (logos, frames, palettes)",
      "K-Cards for teams & clients",
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
  if (plan.comingSoon) return "Coming soon";

  if (period === "monthly") return `£${plan.monthly.toFixed(2)}`;
  const monthlyEquivalent = plan.yearly / 12;
  return `£${monthlyEquivalent.toFixed(2)}`;
}

function subLabel(plan: Plan, period: BillingPeriod): string {
  if (plan.id === "free") return "Always free";
  if (plan.comingSoon) return "Launching soon";

  if (period === "monthly") return "Billed monthly";
  return `Billed yearly (£${plan.yearly.toFixed(2)})`;
}

function cell(planId: PlanId, row: string): string {
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
      return planId === "enterprise" ? "✓" : "—";

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
      return planId === "enterprise" ? "✓" : "—";

    case "Basic click counts":
      return "✓";
    case "UTM & referrer analytics":
      return planId === "free" ? "—" : "✓";
    case "Device / browser insights":
      if (planId === "enterprise") return "✓";
      if (planId === "creator") return "Lite";
      return "—";
    case "Export & reporting":
      return planId === "enterprise" ? "✓" : "—";

    case "Team members":
      if (planId === "free") return "1";
      if (planId === "creator") return "1";
      return "Up to 10";
    case "Priority support":
      if (planId === "creator") return "Email";
      if (planId === "enterprise") return "Priority";
      return "—";
    case "Early feature access":
      return planId === "enterprise" ? "✓" : "—";
    default:
      return "—";
  }
}

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [showProModal, setShowProModal] = useState(false);

  return (
    <>
      <main className="wf-pricing-page">
        <GoProBanner onGoProClick={() => setShowProModal(true)} />

        {/* NEW: hero + cards inside one rounded frame */}
        <section className="wf-section wf-pricing-hero">
          <div className="wf-pricing-container">
            <div className="wf-pricing-frame">
              <div className="wf-pricing-hero-shell">
                <p className="wf-pricing-eyebrow">Pricing</p>
                <h1 className="wf-pricing-hero-heading">
                  Membership pricing for growing brands.
                </h1>
                <p className="wf-pricing-hero-body">
                  Start free. When you’re ready, unlock K-Cards, link
                  shortener, QR code generator and studio-grade analytics in
                  one place.
                </p>

                <div className="wf-billing-toggle">
                  <button
                    type="button"
                    onClick={() => setBilling("monthly")}
                    className={
                      "wf-billing-toggle-btn" +
                      (billing === "monthly"
                        ? " wf-billing-toggle-btn-active"
                        : "")
                    }
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBilling("yearly")}
                    className={
                      "wf-billing-toggle-btn wf-billing-toggle-btn-right" +
                      (billing === "yearly"
                        ? " wf-billing-toggle-btn-active"
                        : "")
                    }
                  >
                    <span>Yearly</span>
                    <span className="wf-billing-toggle-pill">
                      save up to 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Cards now live inside the frame, like your screenshot */}
              <div className="grid gap-5 md:grid-cols-3 wf-pricing-plans-grid">
                {plans.map((plan) => {
                  const price = formatPrice(plan, billing);
                  const label = subLabel(plan, billing);

                  const highlightClass = plan.highlighted
                    ? "wf-plan-card-highlighted"
                    : "wf-plan-card-standard";

                  return (
                    <Card
                      key={plan.id}
                      className={[
                        "wf-plan-card",
                        highlightClass,
                        "flex flex-col",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h2 className="wf-plan-title">{plan.name}</h2>
                        {plan.highlighted && (
                          <div className="wf-plan-pill">Popular</div>
                        )}
                        {plan.comingSoon && (
                          <div className="wf-plan-pill">Coming soon</div>
                        )}
                      </div>

                      <p className="wf-plan-tagline">{plan.tagline}</p>

                      <div className="wf-plan-price-block">
                        <div className="wf-plan-price-row">
                          <span className="wf-plan-price">{price}</span>
                          {!plan.comingSoon && (
                            <span className="wf-plan-price-suffix">
                              /month
                            </span>
                          )}
                        </div>
                        <div className="wf-plan-price-sub">{label}</div>
                        <div className="wf-plan-price-best">
                          Best for: {plan.bestFor}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className={
                          "wf-plan-cta" +
                          (plan.highlighted
                            ? " wf-plan-cta-primary"
                            : " wf-plan-cta-secondary")
                        }
                        asChild={!plan.comingSoon}
                        disabled={plan.comingSoon}
                      >
                        {plan.comingSoon ? (
                          <span>{plan.cta}</span>
                        ) : (
                          <Link href="/signin">{plan.cta}</Link>
                        )}
                      </Button>

                      <ul className="wf-plan-features">
                        {plan.features.map((f) => (
                          <li key={f} className="wf-plan-feature-row">
                            <span className="wf-plan-feature-dot" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Comparison (Free / Creator / Enterprise) */}
        <section className="wf-section wf-pricing-compare">
          <div className="wf-pricing-container">
            <div className="wf-compare-shell">
              <div className="wf-compare-header">
                <div>
                  <h3 className="wf-compare-title">Compare plans</h3>
                  <p className="wf-compare-body">
                    See what unlocks as you grow — from simple links to
                    full-funnel routing.
                  </p>
                </div>
                <div className="wf-compare-tags">
                  <span>Free → Launch</span>
                  <span>Creator → Grow</span>
                  <span>Enterprise → Scale</span>
                </div>
              </div>

              <div className="wf-compare-table-wrap">
                <table className="wf-compare-table">
                  <thead>
                    <tr>
                      <th className="wf-compare-th-feature">Feature</th>
                      <th className="wf-compare-th">Free</th>
                      <th className="wf-compare-th">Creator</th>
                      <th className="wf-compare-th">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureSections.map((section) => (
                      <Fragment key={section.title}>
                        <tr className="wf-compare-section-row">
                          <td
                            colSpan={4}
                            className="wf-compare-section-cell"
                          >
                            {section.title}
                          </td>
                        </tr>
                        {section.rows.map((row) => (
                          <tr
                            key={section.title + row}
                            className="wf-compare-row"
                          >
                            <td className="wf-compare-cell-feature">{row}</td>
                            <td className="wf-compare-cell">
                              {cell("free", row)}
                            </td>
                            <td className="wf-compare-cell">
                              {cell("creator", row)}
                            </td>
                            <td className="wf-compare-cell">
                              {cell("enterprise", row)}
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="wf-section wf-pricing-why">
          <div className="wf-pricing-container">
            <WhyKompi />
          </div>
        </section>

        <FooterCTA />
      </main>

      <GoProModal
        open={showProModal}
        onClose={() => setShowProModal(false)}
      />
    </>
  );
}
