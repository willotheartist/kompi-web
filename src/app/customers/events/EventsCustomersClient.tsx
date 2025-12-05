"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Faces from "@/components/sections/faces";
import Faqs from "@/components/faqs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function EventsCustomersClient() {
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
              Customers · Events & venues
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              QR schedules, menus and sponsor links that stay up to date.
            </h1>
            <p className="text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
              Kompi gives events and venues a single layer for guest-facing links and Kompi Codes™ — from programs
              and menus to Wi-Fi, feedback forms and sponsor promos.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:brightness-105">
                Start free
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-strong)]">
                Explore event use cases
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
                src="/kompione.png"
                alt="Kompi for events"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-6 rounded-2xl bg-[color:var(--color-surface)]/90 p-5 text-xs text-[color:var(--color-text)]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                  Programs that can change on the fly
                </div>
                <p className="text-[11px] leading-relaxed text-[color:var(--color-subtle)]">
                  Update sessions, rooms and timings live without asking anyone to scan a new code or visit a new link.
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
                src="/solutions/solutions22.png"
                alt="Event schedule and menus in Kompi"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Give guests one place to tap or scan for everything.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Instead of sending attendees to scattered URLs and PDFs, create a Kompi hub where they can see
                schedules, maps, speakers, menus and key announcements from any device.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">Live schedules and agendas</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Adjust timings, rooms and lineups in real time while keeping the same QR entry points.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">Menus and on-site experiences</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Share food, drink and activity menus that are easy to read and quick to update.
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
                src="/growth/analytics.png"
                alt="Sponsor analytics and event reporting"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Better experiences for conferences, festivals and venues.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Whether you run a single venue, recurring event or multi-day conference, Kompi helps you keep guests
                oriented and sponsors visible — with trackable links and codes.
              </p>
              <div className="space-y-3">
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Sponsor and partner visibility</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Dedicate sections and links to sponsors, then show them how many clicks and scans they received.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Feedback and follow-up</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Route guests to feedback forms, mailing lists or future event interest pages from the same hub.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Staff & crew K-Cards</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Give staff digital cards for important contacts, internal docs or backstage tools.
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
              Events and venues often ask…
            </h2>
            <dl className="mt-8 space-y-4">
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Can Kompi handle both small venues and large conferences?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Yes. You can use Kompi for a single venue hub, an annual flagship event, or a series of meetups —
                  all from one account with separate hubs.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Does this replace our ticketing or registration tools?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  No. Kompi connects into whatever you already use for ticketing and registration, acting as the front
                  door guests use to find everything else.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  How quickly can we update information during an event?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Changes go live as soon as you save them in Kompi, so updates to sessions, menus or locations are
                  reflected instantly wherever your link or code is used.
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
                Make every event feel organised, even when plans change.
              </h2>
              <p className="max-w-xl text-sm text-[color:var(--color-subtle)] md:text-base">
                Create a live-updating hub where guests can always find what is happening, what is on offer
                and who is involved.
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
