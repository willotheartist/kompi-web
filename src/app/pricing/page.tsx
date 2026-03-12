// src/app/pricing/page.tsx
"use client";

import { useState, Fragment } from "react";
import Link from "next/link";
import { FooterCTA } from "@/components/footer-cta";
import { GoProBanner } from "@/components/GoProBanner";
import GoProModal from "@/components/modals/GoProModal";
import {
  MessageSquare,
  QrCode,
  CreditCard,
  Link2,
  Check,
  ChevronDown,
  Sparkles,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Palette,
  Users,
  Headphones,
} from "lucide-react";
import "./pricing.css";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */
type BillingPeriod = "monthly" | "yearly";
type PlanId = "free" | "pro" | "business";

type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: number;
  yearly: number;
  cta: string;
  href: string;
  highlighted?: boolean;
  badge?: string;
  features: string[];
};

/* ─────────────────────────────────────────────
   Plans
   ───────────────────────────────────────────── */
const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For individuals and creators getting started.",
    monthly: 0,
    yearly: 0,
    cta: "Start free",
    href: "/signup",
    features: [
      "1 workspace",
      "Up to 10 short links",
      "1 Link-in-Bio page",
      "Basic Kompi Codes™ (QR)",
      "1 K-Card (basic profile)",
      "Basic click analytics",
      "Kompi Chat — 50 messages/mo",
      "Kompi branding on pages",
      "Standard email support",
      "Access to free tools",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For creators, freelancers, and growing brands.",
    monthly: 29.99,
    yearly: 287.88,
    cta: "Start Pro",
    href: "/signin",
    highlighted: true,
    badge: "Most popular",
    features: [
      "Up to 10 workspaces",
      "Unlimited short links",
      "Unlimited Link-in-Bio pages",
      "Branded Kompi Codes™ (logo, styles)",
      "Unlimited K-Cards with themes",
      "Advanced analytics (UTM, geo, devices)",
      "Kompi Chat — unlimited messages",
      "Kompi Chat — remove branding",
      "Custom branding (logo, colors)",
      "Remove Kompi branding",
      "Smart UTM builder",
      "Priority email support",
      "All Kompi tools",
    ],
  },
  {
    id: "business",
    name: "Business",
    tagline: "For agencies, teams, and serious operations.",
    monthly: 299.99,
    yearly: 2879.88,
    cta: "Talk to us",
    href: "/signin",
    badge: "Best value at scale",
    features: [
      "Everything in Pro",
      "Unlimited workspaces",
      "Custom domains",
      "Kompi Chat — multi-widget",
      "Kompi Chat — custom AI training",
      "White-label K-Cards",
      "Team members & permissions",
      "Workspace-level analytics",
      "Dedicated onboarding",
      "Landing page builder",
      "API access",
      "Priority phone & chat support",
      "Custom invoicing",
    ],
  },
];

/* ─────────────────────────────────────────────
   Core products (hero strip)
   ───────────────────────────────────────────── */
const coreProducts = [
  {
    icon: MessageSquare,
    name: "Kompi Chat",
    desc: "AI chat widget for your website",
  },
  {
    icon: QrCode,
    name: "KR Codes™",
    desc: "Branded QR codes that convert",
  },
  {
    icon: CreditCard,
    name: "K-Cards",
    desc: "Digital business cards & bios",
  },
  {
    icon: Link2,
    name: "URL Shortener",
    desc: "Smart links with analytics",
  },
];

/* ─────────────────────────────────────────────
   Feature comparison
   ───────────────────────────────────────────── */
const featureSections = [
  {
    title: "Kompi Chat",
    rows: [
      { feature: "Chat widget", free: "1 widget", pro: "1 widget", business: "Multi-widget" },
      { feature: "Messages per month", free: "50", pro: "Unlimited", business: "Unlimited" },
      { feature: "Knowledge sources", free: "3", pro: "Unlimited", business: "Unlimited" },
      { feature: "Lead capture", free: "✓", pro: "✓", business: "✓" },
      { feature: "Custom AI training", free: "—", pro: "—", business: "✓" },
      { feature: "Remove chat branding", free: "—", pro: "✓", business: "✓" },
    ],
  },
  {
    title: "KR Codes™ (QR)",
    rows: [
      { feature: "QR code generator", free: "Standard", pro: "Branded", business: "Premium" },
      { feature: "Logo in QR", free: "—", pro: "✓", business: "✓" },
      { feature: "Style customisation", free: "Basic", pro: "Full", business: "Full" },
      { feature: "Dynamic QR codes", free: "—", pro: "✓", business: "✓" },
      { feature: "Scan analytics", free: "Basic", pro: "Advanced", business: "Advanced" },
    ],
  },
  {
    title: "K-Cards",
    rows: [
      { feature: "Digital cards", free: "1", pro: "Unlimited", business: "Unlimited" },
      { feature: "Theme presets", free: "Basic", pro: "All themes", business: "All + custom" },
      { feature: "Contact form", free: "✓", pro: "✓", business: "✓" },
      { feature: "Social links", free: "✓", pro: "✓", business: "✓" },
      { feature: "White-label", free: "—", pro: "—", business: "✓" },
    ],
  },
  {
    title: "Links & shortener",
    rows: [
      { feature: "Short links", free: "10", pro: "Unlimited", business: "Unlimited" },
      { feature: "Link-in-Bio pages", free: "1", pro: "Unlimited", business: "Unlimited" },
      { feature: "Custom domains", free: "—", pro: "—", business: "✓" },
      { feature: "Smart redirects", free: "—", pro: "—", business: "✓" },
      { feature: "UTM builder", free: "Basic", pro: "Advanced", business: "Advanced" },
    ],
  },
  {
    title: "Analytics & branding",
    rows: [
      { feature: "Click analytics", free: "Basic", pro: "Advanced", business: "Full" },
      { feature: "UTM & referrer tracking", free: "—", pro: "✓", business: "✓" },
      { feature: "Geo & device insights", free: "—", pro: "✓", business: "✓" },
      { feature: "Custom branding", free: "—", pro: "✓", business: "✓" },
      { feature: "Remove Kompi branding", free: "—", pro: "✓", business: "✓" },
    ],
  },
  {
    title: "Workspace & support",
    rows: [
      { feature: "Workspaces", free: "1", pro: "10", business: "Unlimited" },
      { feature: "Team members", free: "1", pro: "1", business: "Up to 10" },
      { feature: "API access", free: "—", pro: "—", business: "✓" },
      { feature: "Support", free: "Email", pro: "Priority email", business: "Priority + phone" },
      { feature: "Onboarding", free: "Self-serve", pro: "Self-serve", business: "Dedicated" },
    ],
  },
];

/* ─────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────── */
const faqs = [
  {
    q: "Do I need a credit card to sign up?",
    a: "No. The Free plan is completely free — no card required. You only enter payment details when you choose to upgrade.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. You can upgrade, downgrade, or cancel at any time from your dashboard. Changes take effect immediately.",
  },
  {
    q: "What happens if I exceed my free plan limits?",
    a: "You'll see a prompt to upgrade. We never delete your data — your links, cards, and chat history stay safe.",
  },
  {
    q: "Is there a discount for yearly billing?",
    a: "Yes — yearly billing saves you roughly 20% compared to monthly. The discount is applied automatically when you switch.",
  },
  {
    q: "Can I try Pro features before committing?",
    a: "We offer a 14-day free trial on Pro. Start with full access, then decide if it's right for you.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards via Stripe. Business plan customers can also request custom invoicing.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. If you're not happy within the first 14 days, contact support for a full refund — no questions asked.",
  },
  {
    q: "What's included in Kompi Chat?",
    a: "An AI-powered chat widget you install on any website. It answers questions using your knowledge sources, captures leads, and guides visitors. Free gets 50 messages/month, Pro is unlimited.",
  },
];

/* ─────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────── */
function formatPrice(plan: Plan, period: BillingPeriod): string {
  if (plan.id === "free") return "£0";
  if (period === "monthly") return `£${plan.monthly.toFixed(2)}`;
  return `£${(plan.yearly / 12).toFixed(2)}`;
}

function subLabel(plan: Plan, period: BillingPeriod): string {
  if (plan.id === "free") return "Free forever";
  if (period === "monthly") return "per month";
  return `per month · billed yearly (£${plan.yearly.toFixed(2)})`;
}

/* ─────────────────────────────────────────────
   FAQ Accordion item
   ───────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="wf-faq-item" data-open={open}>
      <button
        type="button"
        className="wf-faq-trigger"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{q}</span>
        <ChevronDown className="wf-faq-chevron" />
      </button>
      {open && <div className="wf-faq-answer">{a}</div>}
    </div>
  );
}

/* ═════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════ */
export default function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const [showProModal, setShowProModal] = useState(false);

  return (
    <>
      <main className="wf-pricing-page">
        <GoProBanner onGoProClick={() => setShowProModal(true)} />

        {/* ── HERO ── */}
        <section className="wf-section wf-pricing-hero">
          <div className="wf-pricing-container">
            <div className="wf-pricing-frame">
              <div className="wf-pricing-hero-shell">
                <p className="wf-pricing-eyebrow">Pricing</p>
                <h1 className="wf-pricing-hero-heading">
                  Simple pricing for every stage of growth.
                </h1>
                <p className="wf-pricing-hero-body">
                  Start free. Upgrade when you need more power. Every plan
                  includes Kompi Chat, KR Codes™, K-Cards, and the full link
                  shortener.
                </p>

                {/* Billing toggle */}
                <div className="wf-billing-toggle">
                  <button
                    type="button"
                    onClick={() => setBilling("monthly")}
                    className={`wf-billing-toggle-btn${billing === "monthly" ? " wf-billing-toggle-btn-active" : ""}`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setBilling("yearly")}
                    className={`wf-billing-toggle-btn wf-billing-toggle-btn-right${billing === "yearly" ? " wf-billing-toggle-btn-active" : ""}`}
                  >
                    <span>Yearly</span>
                    <span className="wf-billing-toggle-pill">save 20%</span>
                  </button>
                </div>
              </div>

              {/* ── Plan cards ── */}
              <div className="wf-pricing-plans-grid">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`wf-plan-card${plan.highlighted ? " wf-plan-card-highlighted" : ""}`}
                  >
                    {/* Badge */}
                    {plan.badge && (
                      <div className="wf-plan-badge">{plan.badge}</div>
                    )}

                    <h2 className="wf-plan-name">{plan.name}</h2>
                    <p className="wf-plan-tagline">{plan.tagline}</p>

                    {/* Price */}
                    <div className="wf-plan-price-block">
                      <div className="wf-plan-price-row">
                        <span className="wf-plan-price">
                          {formatPrice(plan, billing)}
                        </span>
                        {plan.id !== "free" && (
                          <span className="wf-plan-price-suffix">/mo</span>
                        )}
                      </div>
                      <div className="wf-plan-price-sub">
                        {subLabel(plan, billing)}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={plan.href}
                      className={`wf-plan-cta${plan.highlighted ? " wf-plan-cta-primary" : ""}`}
                    >
                      {plan.cta}
                    </Link>

                    {/* Features */}
                    <div className="wf-plan-divider" />
                    <p className="wf-plan-features-title">
                      {plan.id === "free"
                        ? "What's included:"
                        : plan.id === "pro"
                          ? "Everything in Free, plus:"
                          : "Everything in Pro, plus:"}
                    </p>
                    <ul className="wf-plan-features">
                      {plan.features.map((f) => (
                        <li key={f} className="wf-plan-feature-row">
                          <Check className="wf-plan-check" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* ── Core products strip ── */}
              <div className="wf-products-strip">
                <p className="wf-products-strip-label">
                  Every plan includes these core products
                </p>
                <div className="wf-products-strip-grid">
                  {coreProducts.map((p) => {
                    const Icon = p.icon;
                    return (
                      <div key={p.name} className="wf-product-chip">
                        <div className="wf-product-chip-icon">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="wf-product-chip-name">{p.name}</div>
                          <div className="wf-product-chip-desc">{p.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="wf-section wf-pricing-compare">
          <div className="wf-pricing-container">
            <div className="wf-compare-shell">
              <div className="wf-compare-header">
                <div>
                  <h3 className="wf-compare-title">Compare plans in detail</h3>
                  <p className="wf-compare-body">
                    See exactly what you get at each level — broken down by
                    product.
                  </p>
                </div>
              </div>

              <div className="wf-compare-table-wrap">
                <table className="wf-compare-table">
                  <thead>
                    <tr>
                      <th className="wf-compare-th-feature">Feature</th>
                      <th className="wf-compare-th">Free</th>
                      <th className="wf-compare-th wf-compare-th-highlight">Pro</th>
                      <th className="wf-compare-th">Business</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featureSections.map((section) => (
                      <Fragment key={section.title}>
                        <tr className="wf-compare-section-row">
                          <td colSpan={4} className="wf-compare-section-cell">
                            {section.title}
                          </td>
                        </tr>
                        {section.rows.map((row) => (
                          <tr key={row.feature} className="wf-compare-row">
                            <td className="wf-compare-cell-feature">
                              {row.feature}
                            </td>
                            <td className="wf-compare-cell">{row.free}</td>
                            <td className="wf-compare-cell wf-compare-cell-highlight">
                              {row.pro}
                            </td>
                            <td className="wf-compare-cell">{row.business}</td>
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

        {/* ── FAQ ── */}
        <section className="wf-section wf-pricing-faq">
          <div className="wf-pricing-container">
            <div className="wf-faq-shell">
              <div className="wf-faq-header">
                <h3 className="wf-faq-title">Frequently asked questions</h3>
                <p className="wf-faq-subtitle">
                  Can't find what you need?{" "}
                  <Link href="/dashboard/support" className="wf-faq-link">
                    Contact support
                  </Link>
                </p>
              </div>

              <div className="wf-faq-list">
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <FooterCTA />
      </main>

      <GoProModal open={showProModal} onClose={() => setShowProModal(false)} />
    </>
  );
}