"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Faces from "@/components/sections/faces";
import Faqs from "@/components/faqs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function BrandsCustomersClient() {
  return (
    <main className="min-h-screen bg-[color:var(--color-page)] text-[color:var(--color-text)]">
      {/* HERO */}
      <section className="flex min-h-screen w-full border-b border-[color:var(--color-border-soft)] bg-[color:var(--color-surface)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 md:flex-row md:items-center md:px-8 md:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="max-w-xl space-y-5"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
              Customers · Brands & marketing teams
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Smarter links and Kompi Codes™ for campaigns that need clean reporting.
            </h1>
            <p className="text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
              Kompi helps brand and growth teams control every click, scan and route across campaigns —
              with branded short links, Kompi Codes™ and workspaces designed for multi-channel marketing.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:brightness-105">
                Start free
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-strong)]">
                View campaign workflows
              </button>
            </div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            className="flex-1"
          >
            <div className="relative mx-auto h-72 max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-[#A5B0FF] to-[#D5FF3E]">
              <Image
                src="/kompi-analytics.png"
                alt="Kompi analytics for brands"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-6 rounded-2xl bg-[color:var(--color-surface)]/90 p-5 text-xs text-[color:var(--color-text)]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                  Campaign links → clear reporting
                </div>
                <p className="text-[11px] leading-relaxed text-[color:var(--color-subtle)]">
                  Run social, OOH and creator campaigns from one hub, with consistent naming and clean analytics.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO SECTION 1 */}
      <section className="flex min-h-screen w-full bg-[color:var(--color-page)]">
        <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-16 md:px-8 md:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid w-full items-center gap-10 md:grid-cols-2"
          >
            {/* Image */}
            <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-[color:var(--color-surface)] md:h-80">
              <Image
                src="/growth/analytics.png"
                alt="Campaign analytics in Kompi"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Control the link layer across every channel.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Stop shipping random short links and generic QR codes. With Kompi, every destination is wrapped in
                consistent branding, routing and analytics — so you can trust the numbers and protect the brand.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">Branded short links</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Use your own domains and naming conventions for every campaign and placement.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">Kompi Codes™ for OOH & packaging</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Design on-brand QR experiences with routing, UTM presets and scan analytics built in.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO SECTION 2 */}
      <section className="flex min-h-screen w-full border-y border-[color:var(--color-border-soft)] bg-[color:var(--color-surface-alt)]">
        <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-16 md:px-8 md:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid w-full items-center gap-10 md:grid-cols-2"
          >
            {/* Image */}
            <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-[color:var(--color-surface)] md:h-80">
              <Image
                src="/kompi-platform.png"
                alt="Kompi platform for marketing teams"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Built for growth, brand and performance teams.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Whether you are launching new products, running creator collabs or managing always-on campaigns,
                Kompi helps you standardise how links and QR codes are created, approved and measured.
              </p>
              <div className="space-y-3">
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Routing by audience and context</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Send visitors to different destinations by region, device, creative or partner.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Consistent UTM & naming</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Apply reusable presets so every link ships with predictable tracking baked in.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Campaign and partner workspaces</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Create separate workspaces for brands, regions or partners with clear permission controls.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="flex min-h-screen w-full bg-[color:var(--color-page)]">
        <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-16 md:px-8 md:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full"
          >
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Marketing teams often ask…
            </h2>
            <dl className="mt-8 space-y-4">
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Can Kompi replace our existing short link tools?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  In many cases, yes. Kompi gives you branded domains, routing, analytics and QR generation in one place,
                  so you can simplify your stack over time.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Does Kompi support multi-brand or multi-region setups?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Yes. Workspaces and roles are designed for multi-brand and multi-region environments, with room for
                  agencies and external collaborators.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  How deep is the analytics?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Kompi focuses on the link and QR layer: clicks, scans, referrers, top destinations, devices,
                  geography and source breakdowns — all exportable for deeper analysis.
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>
      <Faces />
      <Faqs />
      {/* CTA */}
      <section className="flex min-h-screen w-full border-t border-[color:var(--color-border-soft)] bg-[color:var(--color-surface-strong)]">
        <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-16 md:px-8 md:py-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center"
          >
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Give your campaigns a better link and QR layer.
              </h2>
              <p className="max-w-xl text-sm text-[color:var(--color-subtle)] md:text-base">
                Standardise how your team ships links and Kompi Codes™ so every campaign is easier to measure
                and optimise.
              </p>
            </div>
            <button className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:brightness-105">
              Start free in 30 seconds
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
