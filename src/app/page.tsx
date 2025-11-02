"use client";
import Header from "@/components/site/Header";

import * as React from "react";
import { motion } from "framer-motion";

/* Motion presets */
const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};
const itemUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};
const itemFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease } },
};

/* Utilities */
function SectionHeader({
  kicker,
  lineA,
  lineB,
  sub,
}: {
  kicker: string;
  lineA: string;
  lineB?: string;
  sub?: string;
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.p
        variants={itemFade}
        className="text-xs tracking-[0.18em] uppercase text-neutral-600"
      >
        {kicker}
      </motion.p>
      <motion.div
        variants={itemFade}
        className="h-px bg-neutral-200 mt-3 mb-6 max-w-[520px]"
      />
      <motion.h2
        variants={container}
        className="text-[32px] sm:text-[40px] md:text-[48px] font-medium tracking-tight text-neutral-900"
      >
        <motion.span variants={itemUp} className="block">
          {lineA}
        </motion.span>
        {lineB && (
          <motion.span
            variants={itemUp}
            className="block font-serif italic text-neutral-900/95"
          >
            {lineB}
          </motion.span>
        )}
      </motion.h2>
      {sub && (
        <motion.p
          variants={itemFade}
          className="mt-3 max-w-[70ch] text-neutral-700"
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

function MediaFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
      <div className="relative aspect-[16/9]">
        {children}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 0.6, 1] }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease }}
          className="pointer-events-none absolute inset-0 ring-1 ring-black/10 rounded-2xl"
        />
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900">
      {children}
    </span>
  );
}

/* Hero */
function HeroV2({
  bg = "/kompi-hero.jpg",
  kicker = "Kompi",
  lineA = "Run your business",
  lineB = "from one modern platform",
  blurb = "All the tools a small business needs—AI website builder, CRM, tasks, invoicing, campaigns—beautifully integrated for £49/mo.",
}: {
  bg?: string;
  kicker?: string;
  lineA?: string;
  lineB?: string;
  blurb?: string;
}) {
  return (
    <section className="relative overflow-hidden min-h-[100vh]">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(55%_70%_at_50%_30%,#f6f6f6,white_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent mix-blend-multiply" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-12 blur-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
        >
          <div className="absolute inset-x-1/3 -top-12 h-40 rounded-full bg-neutral-300/30" />
          <div className="absolute inset-x-1/2 bottom-0 h-48 rounded-full bg-purple-200/30" />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 pb-12 sm:pb-20 md:pb-28">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[780px] text-white"
          >
            <motion.p
              variants={itemFade}
              className="text-xs tracking-[0.18em] uppercase text-white/80"
            >
              {kicker}
            </motion.p>
            <motion.h1
              variants={container}
              className="mt-3 text-[40px] leading-[1.05] sm:text-[52px] md:text-[62px] lg:text-[56px] font-medium tracking-tight"
            >
              <motion.span variants={itemUp} className="block">
                {lineA}
              </motion.span>
              <motion.span
                variants={itemUp}
                className="block font-serif italic text-white/95"
              >
                {lineB}
              </motion.span>
            </motion.h1>
            <motion.p
              variants={itemFade}
              className="mt-5 text-lg text-white/85 max-w-[60ch]"
            >
              {blurb}
            </motion.p>
            <motion.div
              variants={container}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <motion.a
                variants={itemUp}
                href="#waitlist"
                className="rounded-2xl bg-white text-neutral-900 h-11 px-6 inline-flex items-center font-medium hover:opacity-90 active:opacity-80"
              >
                Join the waitlist
              </motion.a>
              <motion.a
                variants={itemUp}
                href="#product"
                className="rounded-2xl border border-white/60 text-white h-11 px-6 inline-flex items-center hover:bg-white/10"
              >
                See the product
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Sections */
function ValueStrip() {
  const items = [
    { t: "One Platform", s: "Replace 6+ tools" },
    { t: "AI-Native", s: "Do more with less" },
    { t: "Fair Pricing", s: "£49/mo, all-in" },
    { t: "Calm UX", s: "No chaos, just clarity" },
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((x, i) => (
            <div
              key={i}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"
            >
              <p className="text-sm text-neutral-700">{x.s}</p>
              <p className="text-lg font-medium text-neutral-900">{x.t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const cards = [
    {
      k: "Build",
      hA: "Launch a site",
      hB: "in minutes with AI",
      pts: [
        "AI website & landing pages",
        "Online store & bookings",
        "Forms, SEO, and hosting",
      ],
    },
    {
      k: "Run",
      hA: "Operate your day",
      hB: "from one workspace",
      pts: [
        "CRM & pipelines",
        "Tasks, docs, calendar",
        "Team spaces & permissions",
      ],
    },
    {
      k: "Grow",
      hA: "Attract customers",
      hB: "with built-in tools",
      pts: [
        "Email campaigns",
        "Social content & blog",
        "Funnels & lead capture",
      ],
    },
    {
      k: "Finance",
      hA: "Get paid",
      hB: "without friction",
      pts: ["Invoices & quotes", "Expenses & overviews", "Stripe integration"],
    },
  ];
  return (
    <section id="product" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16">
      <SectionHeader
        kicker="The suite"
        lineA="Everything SMEs need"
        lineB="without the SaaS sprawl"
        sub="Kompi replaces the stack: site builder, CRM, tasks, notes, email marketing, and invoicing in a single, coherent product."
      />
      <div className="mt-10 grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-neutral-200 bg-white p-6"
          >
            <p className="text-xs tracking-[0.18em] uppercase text-neutral-600">
              {c.k}
            </p>
            <h3 className="mt-2 text-[24px] font-medium tracking-tight text-neutral-900">
              <span className="block">{c.hA}</span>
              <span className="block font-serif italic">{c.hB}</span>
            </h3>
            <ul className="mt-4 space-y-2 text-neutral-700">
              {c.pts.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-neutral-900" />
                  {p}
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0.6, 1] }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.2, ease }}
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function AIShowcase() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16">
      <SectionHeader
        kicker="Hero feature"
        lineA="AI website builder"
        lineB="that understands your business"
        sub="Describe your company and goals—Kompi drafts structure, copy, images, and pages you can tweak in an intuitive canvas."
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center">
          <div className="space-y-3">
            <Badge>Drafts copy and sections</Badge>
            <Badge>One-click theme & layout swaps</Badge>
            <Badge>SEO-smart out of the box</Badge>
          </div>
          <p className="mt-6 text-neutral-700 max-w-[65ch]">
            Start with a prompt like:{" "}
            <em>
              “A boutique fitness studio in Manchester offering pilates and PT.”
            </em>{" "}
            Kompi proposes pages, writes accessible copy, and builds a polished
            site you can publish instantly.
          </p>
        </div>
        <MediaFrame>
          <div className="absolute inset-0 grid grid-rows-6 grid-cols-12">
            <div className="col-span-3 row-span-6 bg-neutral-100" />
            <div className="col-span-9 row-span-6 bg-white" />
            <div className="absolute left-3 top-3 h-4 w-4 rounded-full bg-neutral-300" />
            <div className="absolute left-8 top-3 h-4 w-4 rounded-full bg-neutral-300" />
            <div className="absolute left-13 top-3 h-4 w-4 rounded-full bg-neutral-300" />
            <div className="absolute inset-x-0 top-10 h-px bg-neutral-200" />
          </div>
          <motion.div
            aria-hidden
            initial={{ x: "-30%" }}
            whileInView={{ x: "130%" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            style={{ mixBlendMode: "overlay" }}
          />
        </MediaFrame>
      </div>
    </section>
  );
}

function Comparison() {
  const rows = [
    {
      feature: "Website builder",
      kompi: "Built-in AI builder",
      others: "Separate subscription",
    },
    {
      feature: "CRM & pipeline",
      kompi: "Included",
      others: "Add-on or missing",
    },
    { feature: "Tasks & docs", kompi: "Included", others: "Separate apps" },
    { feature: "Email campaigns", kompi: "Included", others: "Extra cost" },
    {
      feature: "Invoices & payments",
      kompi: "Included (Stripe)",
      others: "Third-party hookup",
    },
    { feature: "Monthly cost", kompi: "£49 all-in", others: "£150–£400+" },
  ];
  return (
    <section className="relative border-y border-neutral-200 bg-neutral-50 py-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeader
          kicker="Why Kompi"
          lineA="Reduce your stack"
          lineB="and keep your focus"
        />
        <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full text-left">
            <thead className="text-sm text-neutral-600">
              <tr className="border-b border-neutral-200">
                <th className="px-5 py-3">Feature</th>
                <th className="px-5 py-3">Kompi</th>
                <th className="px-5 py-3">Typical stack</th>
              </tr>
            </thead>
            <tbody className="text-neutral-800">
              {rows.map((r) => (
                <tr
                  key={r.feature}
                  className="border-b last:border-0 border-neutral-200"
                >
                  <td className="px-5 py-4 text-neutral-700">{r.feature}</td>
                  <td className="px-5 py-4 font-medium">{r.kompi}</td>
                  <td className="px-5 py-4 text-neutral-700">{r.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16">
      <SectionHeader
        kicker="Simple pricing"
        lineA="One plan. Everything included."
        lineB="No upsells, no stress"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="relative rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm text-neutral-600">Monthly</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-neutral-900">£49</span>
            <span className="text-neutral-600">/month</span>
          </div>
          <ul className="mt-5 space-y-2 text-neutral-700">
            <li>AI site builder, CRM, tasks, docs</li>
            <li>Email marketing & blog</li>
            <li>Invoices & Stripe integration</li>
            <li>Unlimited pages & contacts</li>
          </ul>
          <a
            href="#waitlist"
            className="mt-6 inline-flex h-11 items-center rounded-2xl bg-neutral-900 px-6 text-white hover:opacity-90"
          >
            Start free trial
          </a>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0.6, 1] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease }}
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10"
          />
        </div>
        <div className="relative rounded-2xl border border-neutral-200 bg-white p-6">
          <p className="text-sm text-neutral-600">Yearly</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-4xl font-semibold text-neutral-900">
              £499
            </span>
            <span className="text-neutral-600">/year</span>
          </div>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-900">
            Save £89
          </p>
          <ul className="mt-5 space-y-2 text-neutral-700">
            <li>Everything in Monthly</li>
            <li>Priority support</li>
            <li>Founders Club perks</li>
          </ul>
          <a
            href="#waitlist"
            className="mt-6 inline-flex h-11 items-center rounded-2xl border border-neutral-300 px-6 text-neutral-900 hover:bg-neutral-100"
          >
            Go yearly
          </a>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 0.6, 1] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease }}
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/10"
          />
        </div>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 sm:px-8 py-12">
      <div className="flex flex-wrap items-center justify-center gap-6 opacity-70">
        {["Arc", "Linear", "Vercel", "Stripe", "OpenAI", "Supabase"].map(
          (n) => (
            <div
              key={n}
              className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm"
            >
              {n}
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section
      id="waitlist"
      className="mx-auto max-w-[1200px] px-5 sm:px-8 pb-24 pt-8"
    >
      <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-xs tracking-[0.18em] uppercase text-neutral-600">
            Get early access
          </p>
          <h3 className="mt-2 text-[28px] sm:text-[36px] font-medium tracking-tight">
            Start here. Run everything here.
          </h3>
          <p className="mt-3 text-neutral-700">
            Join the waitlist for Kompi and be first to try the AI website
            builder, CRM, tasks, email, and invoicing—together for £49/mo.
          </p>
          <form className="mx-auto mt-6 flex max-w-[520px] gap-3 sm:flex-row flex-col">
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              className="h-11 flex-1 rounded-2xl border border-neutral-300 bg-white px-4 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-neutral-900/10"
            />
            <button className="h-11 rounded-2xl bg-neutral-900 px-6 text-white hover:opacity-90">
              Join waitlist
            </button>
          </form>
        </div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-12 blur-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
        >
          <div className="absolute inset-x-1/3 -top-12 h-40 rounded-full bg-neutral-300/30" />
          <div className="absolute inset-x-1/2 bottom-0 h-48 rounded-full bg-purple-200/30" />
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative w-full bg-neutral-100 pt-16 pb-10 flex flex-col items-center overflow-hidden">
      <div className="mx-auto w-[95%] max-w-[1200px] rounded-2xl border border-neutral-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm tracking-[0.18em] uppercase text-neutral-600">
              Kompi
            </p>
            <h4 className="text-xl font-medium tracking-tight">
              The modern operating system for small business
            </h4>
          </div>
          <div className="flex gap-3">
            <a
              href="#product"
              className="h-10 rounded-2xl border border-neutral-300 px-4 text-neutral-900 hover:bg-neutral-100"
            >
              Product
            </a>
            <a
              href="#pricing"
              className="h-10 rounded-2xl border border-neutral-300 px-4 text-neutral-900 hover:bg-neutral-100"
            >
              Pricing
            </a>
            <a
              href="#waitlist"
              className="h-10 rounded-2xl bg-neutral-900 px-4 text-white hover:opacity-90"
            >
              Join
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-[1200px] px-5 sm:px-8 w-full text-neutral-600 text-sm">
        © {new Date().getFullYear()} Kompi Ltd. All rights reserved.
      </div>
    </footer>
  );
}

export default function KompiLandingPage() {
  return (
    <main className="bg-white text-neutral-900 overflow-hidden">
      <Header />
      <HeroV2 />
      <ValueStrip />
      <Logos />
      <Pillars />
      <AIShowcase />
      <Comparison />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
