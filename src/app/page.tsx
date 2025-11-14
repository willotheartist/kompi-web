"use client";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-50">
      <Navbar />

      {/* Main wrapper: subtle entrance */}
      <motion.main
        className="mx-auto flex w-full max-w-5xl flex-col gap-20 px-4 pb-24 pt-52"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* HERO */}
        <section className="space-y-6 text-center">
          {/* stagger item 1 */}
          <motion.p
            className="text-[10px] uppercase tracking-[0.16em] text-zinc-500"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
          >
            Kompi Links · For studios, agencies & modern creators
          </motion.p>

          {/* stagger item 2 */}
          <motion.h1
            className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.4, ease: "easeOut" }}
          >
            Run your links, bios & campaigns
            <span className="block text-zinc-400">
              from one beautifully opinionated platform.
            </span>
          </motion.h1>

          {/* stagger item 3 */}
          <motion.p
            className="mx-auto max-w-xl text-sm text-zinc-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.35, ease: "easeOut" }}
          >
            Short links, smart bio pages, QR codes and live analytics — in a UI
            that doesn&apos;t feel like 2013. Built so you can sell, report and
            grow without duct-taping five tools.
          </motion.p>

          {/* stagger item 4 */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 text-xs"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.3, ease: "easeOut" }}
          >
            <Button
              asChild
              className="rounded-full bg-zinc-100 px-6 py-2 text-[11px] font-semibold text-black hover:bg-white"
            >
              <Link href="/signin">Start free in 30 seconds</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-zinc-700 bg-transparent px-6 py-2 text-[11px] text-zinc-200 hover:bg-zinc-900"
            >
              <Link href="/pricing">View pricing</Link>
            </Button>
          </motion.div>

          {/* stagger item 5 */}
          <motion.p
            className="text-[10px] text-zinc-500"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.25, ease: "easeOut" }}
          >
            No credit card. Unlimited links on launch promo.
          </motion.p>
        </section>

        {/* FEATURES */}
        <section
          id="features"
          className="grid gap-4 text-left text-[11px] text-zinc-400 md:grid-cols-3"
        >
          <motion.div
            className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3 className="mb-2 text-xs font-semibold text-zinc-50">
              Smarter short links
            </h3>
            <p>
              Branded, trackable links that load fast and plug straight into
              your reports.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }}
          >
            <h3 className="mb-2 text-xs font-semibold text-zinc-50">
              Beautiful bio pages
            </h3>
            <p>
              Opinionated link-in-bio layouts styled for real brands, not
              generic templates.
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
          >
            <h3 className="mb-2 text-xs font-semibold text-zinc-50">
              Live analytics
            </h3>
            <p>
              See clicks, referrers, devices and campaigns in one place — per
              link and per workspace.
            </p>
          </motion.div>
        </section>

        {/* PRICING TEASER */}
        <section id="pricing" className="space-y-3 text-center">
          <motion.h2
            className="text-sm font-semibold text-zinc-50"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Built to pay for itself
          </motion.h2>

          <motion.p
            className="text-[11px] text-zinc-400"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }}
          >
            Transparent, simple pricing — see full plans on the pricing page.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
          >
            <Button
              asChild
              size="sm"
              className="rounded-full bg-zinc-100 px-6 text-[10px] font-semibold text-black hover:bg-white"
            >
              <Link href="/pricing">Explore plans</Link>
            </Button>
          </motion.div>
        </section>
      </motion.main>

      {/* --- NEW FULL-HEIGHT SECTIONS (below the fold) --- */}

      {/* SECTION 1 — Kompi as your link layer */}
      <motion.section
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#D9FF4A] text-zinc-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-[3rem] bg-[#3A61FF]" />
          <div className="absolute right-[-3rem] bottom-10 h-48 w-48 rounded-[3rem] bg-[#111827]" />
        </div>

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 md:flex-row md:items-center">
          <div className="max-w-xl space-y-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-700">
              Kompi in your stack
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              A single link layer
              <br />
              for everything you ship.
            </h2>
            <p className="text-sm md:text-base text-zinc-800">
              Launch a campaign, post a video, drop a product — Kompi keeps
              every touchpoint behind one clean URL, with analytics that follow
              the story instead of each platform.
            </p>
            <ul className="space-y-2 text-[12px] md:text-[13px] text-zinc-800">
              <li>• Use one link across Instagram, TikTok, X, email and QR.</li>
              <li>• Swap destinations without breaking old posts.</li>
              <li>• Keep your team, clients and reports all in one workspace.</li>
            </ul>
          </div>

          <div className="flex-1">
            <div className="mx-auto max-w-md rounded-[2rem] bg-white p-5 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <div className="mb-3 flex items-center justify-between text-[11px] text-zinc-500">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-[10px] uppercase tracking-[0.16em]">
                  kompi.app/willo
                </span>
                <span>Workspace · Studio</span>
              </div>
              <div className="space-y-2 text-[12px]">
                <FakeRow label="IG bio" dest="Latest campaign page" />
                <FakeRow label="YouTube description" dest="Episode-specific link" />
                <FakeRow label="Podcast QR code" dest="Sponsor landing" />
                <FakeRow label="Paid ads" dest="Experiment A/B URLs" />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 2 — Creator / studio / team splits */}
      <motion.section
        className="flex min-h-screen items-center justify-center bg-[#2552FF] text-zinc-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
          <div className="max-w-2xl space-y-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-blue-100/80">
              Who Kompi is for
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              From solo link-in-bio
              <br />
              to full studio rollouts.
            </h2>
            <p className="text-sm md:text-base text-blue-100/90">
              Start as one creator, add clients, collaborators and team members
              as you grow. Same login, shared analytics, separate workspaces.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 text-[12px]">
            <PersonaCard
              title="Creators"
              bullet1="Turn one link into a home for your drops, streams and offers."
              bullet2="Track which channel actually moves the needle."
              badge="From the Free plan"
            />
            <PersonaCard
              title="Studios & agencies"
              bullet1="Give each client a workspace with links, bios and QR codes."
              bullet2="Roll up analytics without logging into five ad accounts."
              badge="Popular"
            />
            <PersonaCard
              title="Teams & brands"
              bullet1="Connect custom domains and keep everything on-brand."
              bullet2="Permissioned access for marketing, growth and partners."
              badge="Team plan"
            />
          </div>
        </div>
      </motion.section>

      {/* SECTION 3 — Analytics & reassurance */}
      <motion.section
        className="flex min-h-screen items-center justify-center bg-[#F5F5F7] text-zinc-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 py-20 text-center">
          <div className="space-y-4 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              Analytics without the headache
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900">
              Know what&apos;s working —
              <br />
              without opening ten dashboards.
            </h2>
            <p className="text-sm md:text-base text-zinc-600">
              Kompi gives you the click, device, location and UTM breakdown you
              actually need. Export to CSV when the data team wants to go
              deeper, ignore the rest.
            </p>
          </div>

          <div className="grid w-full max-w-3xl gap-4 md:grid-cols-3 text-left text-[12px]">
            <AnalyticsPill label="Per-link insights" body="See performance by link, campaign or workspace in seconds." />
            <AnalyticsPill label="Real-time feel" body="New clicks and QR scans show up in your dashboard almost instantly." />
            <AnalyticsPill label="Client-ready" body="Screenshots you’re not embarrassed to paste into decks and reports." />
          </div>

          <Button
            asChild
            className="mt-4 rounded-full bg-zinc-900 px-7 py-2 text-[11px] font-semibold text-zinc-50 hover:bg-black"
          >
            <Link href="/signin">Open your first dashboard</Link>
          </Button>
        </div>
      </motion.section>

      <FooterCTA />
    </div>
  );
}

/* Helper components for new sections */

function FakeRow({ label, dest }: { label: string; dest: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-zinc-100 px-3 py-2">
      <span className="text-[11px] font-medium text-zinc-800">{label}</span>
      <span className="text-[11px] text-zinc-500">{dest}</span>
    </div>
  );
}

function PersonaCard({
  title,
  bullet1,
  bullet2,
  badge,
}: {
  title: string;
  bullet1: string;
  bullet2: string;
  badge: string;
}) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-blue-900/40 p-5">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-blue-100/90">{bullet1}</p>
        <p className="text-blue-100/90">{bullet2}</p>
      </div>
      <span className="mt-4 inline-flex w-fit rounded-full bg-blue-200/90 px-3 py-1 text-[10px] font-semibold text-blue-900">
        {badge}
      </span>
    </div>
  );
}

function AnalyticsPill({
  label,
  body,
}: {
  label: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm">
      <h3 className="mb-1 text-[13px] font-semibold text-zinc-900">{label}</h3>
      <p className="text-[12px] text-zinc-600">{body}</p>
    </div>
  );
}
