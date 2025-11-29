"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function ValueGridSection() {
  return (
    <section className="wf-section">
      <div className="wf-container">
        <motion.div
          className="flex flex-col gap-10 lg:gap-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easing }}
        >
          {/* Top: heading + value grid */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
            {/* Copy */}
            <div className="space-y-5">
              <div className="wf-intro-block">
                <p className="wf-eyebrow">Core benefits</p>
                <h2 className="wf-heading wf-section-heading">
                  Links that feel{" "}
                  <span className="wf-serif-accent">designed</span>, not bolted
                  on.
                </h2>
                <p className="wf-section-intro">
                  Kompi keeps short links, bio pages, QR codes and analytics in
                  one calm workspace, so campaigns stay clear for you, your
                  clients and your reports.
                </p>
              </div>

              <p className="wf-small text-neutral-600">
                Use Kompi as the quiet layer underneath everything you ship —
                from creator drops to full studio rollouts.
              </p>
            </div>

            {/* Feature cards */}
            <motion.div
              id="features"
              className="space-y-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <FeatureCard
                variant="primary"
                title="Smarter short links"
                body="Branded, trackable links that load fast and plug straight into your reports. Group by campaign, workspace or client — no spreadsheet cleanup."
              />
              <FeatureCard
                title="Beautiful bio pages"
                body="Opinionated link-in-bio layouts styled for real brands, not generic templates. Ship pages your clients are happy to share."
              />
              <FeatureCard
                title="Live analytics"
                body="See clicks, referrers, devices and campaigns in one place — per link and per workspace. Export when the data team needs to go deeper."
              />
            </motion.div>
          </div>

          {/* Pricing teaser */}
          <motion.div
            id="pricing"
            className="flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="space-y-1">
              <p className="wf-eyebrow">Built to pay for itself</p>
              <p className="wf-small text-neutral-600">
                Transparent, simple pricing — see full plans on the pricing
                page.
              </p>
            </div>
            <Button asChild className="wf-btn-primary wf-btn-compact">
              <Link href="/pricing">Explore plans</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  body,
  variant,
}: {
  title: string;
  body: string;
  variant?: "primary";
}) {
  const base =
    "relative overflow-hidden rounded-2xl border px-5 py-5 sm:px-6 sm:py-6";
  const primary =
    "border-neutral-900 bg-neutral-950 text-white shadow-[0_18px_45px_rgba(15,23,42,0.45)]";
  const subtle =
    "border-neutral-200 bg-white/80 backdrop-blur-sm shadow-[0_12px_30px_rgba(15,23,42,0.06)]";

  return (
    <div className={`${base} ${variant === "primary" ? primary : subtle}`}>
      {variant === "primary" && (
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,_rgba(248,250,252,0.4),_transparent_60%)]" />
        </div>
      )}

      <div className="relative space-y-2">
        <h3 className="wf-card-title text-[15px] font-semibold tracking-tight">
          {title}
        </h3>
        <p className="wf-card-body text-[13px] leading-relaxed text-neutral-600 sm:text-[14px] sm:leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
}
