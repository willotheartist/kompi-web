"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Faces from "@/components/sections/faces";
import Faqs from "@/components/faqs";
import { FooterCTA } from "@/components/footer-cta";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CreatorsCustomersClient() {
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
              Customers · Creators & personal brands
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Grow your creator brand with smarter links, Kompi Codes™ and
              K-Cards.
            </h1>
            <p className="text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
              Kompi helps you share links, K-Cards and Kompi Codes™ from one
              simple workspace, so your audience always lands on something that
              feels like you.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:brightness-105">
                Start free
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-strong)]">
                See creator examples
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
              <div className="absolute inset-6 rounded-2xl bg-[color:var(--color-surface)]/90 p-5 text-xs text-[color:var(--color-text)]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                  Creator preview
                </div>
                <p className="mb-1 text-sm font-medium">
                  linktr.ee/yourname → kompi.bio/you
                </p>
                <p className="text-[11px] leading-relaxed text-[color:var(--color-subtle)]">
                  Swap to a branded hub with K-Cards, Kompi Codes™ and real
                  analytics — in minutes.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO SECTION 1 — image left, text right */}
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
                src="/kompiimage19.png"
                alt="Creator links and Kompi dashboard"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                One hub for all your creator links
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Instead of juggling link-in-bio tools, random QR generators and
                half-finished pages, Kompi gives you a single, branded hub.
                Update it once and every short link, K-Card and Kompi Code™
                stays in sync across your socials, merch, podcasts and events.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">Stay on-brand everywhere</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Your colours, logo and tone across links, QR and K-Cards.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">See what actually works</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Track clicks, scans and visits by platform, country and
                    campaign.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* INFO SECTION 2 — image left, text right */}
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
                src="/kompiimage18.png"
                alt="Creators using Kompi Codes and K-Cards"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Built for real creator workflows
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Whether you&apos;re building a personal brand, selling digital
                products or managing partnerships, Kompi fits neatly into how
                you already work.
              </p>
              <div className="space-y-3">
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">
                    Link-in-bio that does more
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Send fans to drops, videos, newsletters, sponsors and more
                    from one clean page.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">
                    QR Codes for the real world
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Put Kompi Codes™ on stickers, prints and events and track
                    every scan.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">
                    K-Cards for collabs &amp; clients
                  </p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Share a digital business card that routes partners to your
                    deck, media kit or booking form.
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
              Creators often ask…
            </h2>
            <dl className="mt-8 space-y-4">
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Do I have to move all my links into Kompi?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  No. You can start with a single link-in-bio or campaign, then
                  gradually move the rest over. Kompi works alongside your
                  existing tools while you migrate.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Will Kompi break my existing QR codes?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Existing QR codes outside Kompi keep working as they do now.
                  New Kompi Codes™ are fully managed, so you can change
                  destinations later without reprinting.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Is Kompi only for big creators?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Not at all. Kompi works for solo creators just starting out,
                  full-time creators and bigger personal brands working with
                  teams and agents.
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>
      <Faces />
      <Faqs />
    

      {/* CTA STRIP */}
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
                Ready to give your creator brand a real home?
              </h2>
              <p className="max-w-xl text-sm text-[color:var(--color-subtle)] md:text-base">
                Launch your first K-Card, link-in-bio or Kompi Code™ in just a
                few minutes. No credit card required.
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
