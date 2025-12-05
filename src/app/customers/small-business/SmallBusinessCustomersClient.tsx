"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Faces from "@/components/sections/faces";
import Faqs from "@/components/faqs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function SmallBusinessCustomersClient() {
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
              Customers · Small businesses
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              QR menus, offers and local campaigns in one branded hub.
            </h1>
            <p className="text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
              Kompi helps small businesses connect every flyer, poster, menu and profile back to a simple,
              on-brand workspace. Update once, and your links, Kompi Codes™ and K-Cards stay in sync everywhere.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:brightness-105">
                Start free
              </button>
              <button className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-border)] px-6 py-3 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[color:var(--color-surface-strong)]">
                See small business examples
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
                src="/kompiimage3.png"
                alt="Kompi for small businesses"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-6 rounded-2xl bg-[color:var(--color-surface)]/90 p-5 text-xs text-[color:var(--color-text)]">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
                  Table tents → Kompi menus
                </div>
                <p className="text-[11px] leading-relaxed text-[color:var(--color-subtle)]">
                  Swap printed URLs and messy QR codes for clean, branded Kompi menus that you can update in seconds.
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
                src="/solutions/solutions21.png"
                alt="QR menus and local offers"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Make it easy for customers to scan, tap and come back.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Give customers a simple way to see your menu, hours, bookings and offers from a single, memorable
                place. Use Kompi across your storefront, social profiles, receipts and in-store signage without
                juggling tools.
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">QR menus and boards</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Share always-up-to-date menus, prices and specials without reprinting anything.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-surface)] p-4">
                  <p className="text-sm font-medium">Local discovery links</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Connect maps, reviews and social profiles so new customers can find and trust you fast.
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
                src="/growth/menu-builder.png"
                alt="Small business workflows in Kompi"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Tools that fit how small businesses really operate.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-subtle)] md:text-base">
                Whether you run a café, salon, studio or local shop, Kompi gives you flexible links and Kompi Codes™
                that work in the real world — on receipts, posters, loyalty cards and more.
              </p>
              <div className="space-y-3">
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Promos that actually get scanned</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Create codes for limited offers, loyalty perks and seasonal campaigns in a few clicks.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">Bookings and contact in one place</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Send customers to your booking tools, WhatsApp, phone or email from one simple hub.
                  </p>
                </div>
                <div className="rounded-2xl bg-[color:var(--color-page)] p-4">
                  <p className="text-sm font-medium">K-Cards for partners & suppliers</p>
                  <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                    Share a digital business card with all the right links when you meet vendors or collaborators.
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
              Small businesses often ask…
            </h2>
            <dl className="mt-8 space-y-4">
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Do I have to rebuild my menu or website in Kompi?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  No. You can link to your existing menu, site or booking tools and upgrade over time. Kompi helps you
                  centralise and track access, not rebuild everything from scratch.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Can I update prices or links without reprinting QR codes?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Yes. Kompi Codes™ are fully managed, so you can change the destination any time while keeping the
                  same printed code on your tables, doors or flyers.
                </dd>
              </div>
              <div className="rounded-2xl bg-[color:var(--color-surface)] p-5">
                <dt className="text-sm font-medium">
                  Will this work if I only have social pages, not a full website?
                </dt>
                <dd className="mt-2 text-xs text-[color:var(--color-subtle)]">
                  Absolutely. Many small businesses start with Kompi as their main online hub, linking out to Instagram,
                  Facebook, Google Maps and any simple booking tools they already use.
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
                Give your small business a simple, modern hub.
              </h2>
              <p className="max-w-xl text-sm text-[color:var(--color-subtle)] md:text-base">
                Launch your first menu, promotion or contact hub with Kompi in just a few minutes. No developer,
                no redesign, no credit card required.
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
