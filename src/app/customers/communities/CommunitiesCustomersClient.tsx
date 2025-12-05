"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Faces from "@/components/sections/faces";
import Faqs from "@/components/faqs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function CommunitiesCustomersClient() {
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
              Customers · Communities & memberships
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              One living hub for your community events, links and updates.
            </h1>
            <p className="text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
              Kompi gives communities a simple way to share what is happening next — events, updates, resources
              and member-only links — from one always-current page, QR code or K-Card.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:brightness-105">
                Start free
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-strong)]">
                See community examples
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
                src="/kompiimage4.png"
                alt="Kompi for communities"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-6 rounded-2xl bg-[color:var(--color-surface)]/90 p-5 text-xs text-[color:var(--color-text)]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                  Flyers → live event hub
                </div>
                <p className="text-[11px] leading-relaxed text-[color:var(--color-subtle)]">
                  Put one Kompi Code™ on posters, newsletters and socials so members always land on the latest info.
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
                src="/solutions/solutions20.png"
                alt="Community events and resources"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Keep everyone aligned without rewriting every announcement.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Instead of chasing old links and outdated flyers, use Kompi as your single source of truth.
                Update event details, resources and sign-up flows once and they stay synced everywhere your
                code or link appears.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">Events that update in real time</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Change dates, venues and details without replacing your QR codes or shared links.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">Resources in one place</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Host key links to forms, documents, recordings and community guidelines in a single hub.
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
                src="/kompicollage.png"
                alt="Online and offline communities using Kompi"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Flexible for meetups, memberships and online communities.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                From online memberships to local groups and organisations, Kompi helps you share what matters most —
                and measure which channels actually get people to show up and engage.
              </p>
              <div className="space-y-3">
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Meetup & event links</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Create central pages for recurring events with links to tickets, maps and livestreams.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Member-only access</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Route members to private spaces, content drops or update feeds with a single Kompi link.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Organiser & volunteer K-Cards</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Give organisers digital cards that route people to sign-up forms, info packs or contact details.
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
              Communities often ask…
            </h2>
            <dl className="mt-8 space-y-4">
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Can we use Kompi alongside our existing community platform?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Yes. Kompi sits on top of whatever you already use — Discord, WhatsApp, Slack, Circle, Facebook
                  Groups and more — giving you one consistent entry point into your ecosystem.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Do we need a designer or developer to set this up?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  No. Community leads can create and update pages, links and Kompi Codes™ directly, without touching code.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Is this only for paid memberships?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Kompi works for both free and paid communities — from grassroots groups and clubs to structured
                  membership organisations.
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
                Give your community one clear place to land.
              </h2>
              <p className="max-w-xl text-sm text-[color:var(--color-subtle)] md:text-base">
                Create a simple hub for events, resources and updates where members always know what is happening next.
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
