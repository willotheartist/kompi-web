"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, QrCode, Sparkles } from "lucide-react";

import Faces from "@/components/sections/faces";
import Faqs from "@/components/faqs";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 md:px-8">{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5177e1]">
      {children}
    </p>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
      {children}
    </span>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#1E2330]/20 transition hover:bg-black"
    >
      {children}
    </Link>
  );
}

function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm transition hover:bg-[#F7F7F3]"
    >
      {children}
    </Link>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-5 ring-1 ring-neutral-200">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-50 ring-1 ring-neutral-200">
          {icon}
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
            {label}
          </p>
          <p className="mt-1 text-sm font-semibold text-neutral-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-7 ring-1 ring-neutral-200">
      <div className="flex items-start gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-50 ring-1 ring-neutral-200">
          {icon}
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm leading-relaxed text-neutral-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Section({
  id,
  tone = "white",
  children,
}: {
  id?: string;
  tone?: "white" | "soft";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        tone === "soft"
          ? "bg-[#f7f7f4] border-t border-neutral-200"
          : "bg-white border-t border-neutral-200"
      }
    >
      <Container>
        <div className="py-16 md:py-20">{children}</div>
      </Container>
    </section>
  );
}

export default function EventsCustomersClient() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#050505]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f7f7f4]">
        <div className="pointer-events-none absolute inset-x-0 -top-28 -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-56 max-w-4xl bg-gradient-to-r from-[#A3CF3D] via-[#9BDFD1] to-[#4B9FFF] opacity-70" />
        </div>

        <Container>
          <div className="py-16 md:py-20">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="mx-auto max-w-3xl text-center space-y-7"
            >
              <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#D1FAE5]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1E2330] text-[10px] font-semibold text-white">
                  K
                </span>
                <span>Customers · Events & venues</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
                QR schedules, menus, and sponsor links{" "}
                <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
                  that stay up to date
                </span>
                .
              </h1>

              <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-neutral-700">
                Give guests one place to scan or tap for programs, maps, menus, Wi-Fi, feedback, and sponsor promos —
                and update it live without changing the QR code.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <PrimaryLink href="/signup">
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="#use-cases">Explore event use cases</SecondaryLink>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Pill>Live program</Pill>
                <Pill>Menus</Pill>
                <Pill>Maps</Pill>
                <Pill>Wi-Fi</Pill>
                <Pill>Sponsors</Pill>
                <Pill>Feedback</Pill>
              </div>
            </motion.div>

            {/* HERO VISUAL (no “boxed image wrapper”) */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="mx-auto mt-10 max-w-4xl"
            >
              <div className="relative overflow-hidden rounded-3xl">
                <div className="relative aspect-[16/7] w-full">
                  <Image
                    src="/kompione.png"
                    alt="Kompi for events"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/85 p-5 backdrop-blur ring-1 ring-white/40">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Programs that can change on the fly
                  </p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">
                    Update sessions, rooms, and timings live
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">
                    Guests keep scanning the same code — they just see the latest info.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Stat
                  icon={<CalendarDays className="h-5 w-5 text-[#0B0F1A]" />}
                  label="Program"
                  value="Agendas that update instantly"
                />
                <Stat
                  icon={<QrCode className="h-5 w-5 text-[#0B0F1A]" />}
                  label="Access"
                  value="One QR for everything"
                />
                <Stat
                  icon={<MapPin className="h-5 w-5 text-[#0B0F1A]" />}
                  label="On-site"
                  value="Maps, menus, Wi-Fi, forms"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 1 */}
      <Section id="use-cases" tone="white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>GUEST EXPERIENCE</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Give guests one place to tap or scan for everything.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Replace scattered PDFs and random URLs with a single Kompi hub: schedules, maps, speakers, menus,
              announcements — mobile-first and always current.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* image (no extra “box”) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/solutions/solutions22.png"
                  alt="Event schedule and menus in Kompi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <Feature
                icon={<CalendarDays className="h-5 w-5 text-[#0B0F1A]" />}
                title="Live schedules and agendas"
                desc="Adjust timings, rooms, and lineups in real time while keeping the same QR entry points."
              />
              <Feature
                icon={<Sparkles className="h-5 w-5 text-[#0B0F1A]" />}
                title="Menus and on-site experiences"
                desc="Share food, drink, and activity menus that are easy to read — and quick to update."
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryLink href="/signup">
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="/qr-code-generator">Generate a QR</SecondaryLink>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* SECTION 2 */}
      <Section tone="soft">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>SPONSORS & REPORTING</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Better experiences for conferences, festivals, and venues.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Keep guests oriented and sponsors visible — with trackable links, scannable codes, and updates that go
              live instantly.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="grid gap-4">
              <Feature
                icon={<Sparkles className="h-5 w-5 text-[#0B0F1A]" />}
                title="Sponsor and partner visibility"
                desc="Dedicate sections and links to sponsors, then show them clicks and scans from each placement."
              />
              <Feature
                icon={<ArrowRight className="h-5 w-5 text-[#0B0F1A]" />}
                title="Feedback and follow-up"
                desc="Route guests to feedback forms, mailing lists, or future event interest pages from the same hub."
              />
              <Feature
                icon={<QrCode className="h-5 w-5 text-[#0B0F1A]" />}
                title="Staff & crew K Cards"
                desc="Give staff digital cards for contacts, internal docs, and backstage tools — easy to share on-site."
              />
            </div>

            {/* image (no frame box) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/growth/analytics.png"
                  alt="Sponsor analytics and event reporting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Events and venues often ask…
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4">
            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Can Kompi handle both small venues and large conferences?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Yes. Use Kompi for a single venue hub, an annual flagship event, or a series of meetups — all from one
                account with separate hubs.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Does this replace our ticketing or registration tools?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                No. Kompi connects into whatever you already use for ticketing and registration — it’s the guest-facing
                “front door” to everything else.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                How quickly can we update information during an event?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Changes go live as soon as you save them. Session edits, menu updates, and location changes reflect
                instantly wherever your link or code is used.
              </p>
            </details>
          </div>
        </motion.div>
      </Section>

      <Faces />
      <Faqs />

      {/* CTA */}
      <section className="border-t border-neutral-200 bg-[#f7f7f4]">
        <Container>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            className="py-16 md:py-20"
          >
            <div className="rounded-3xl bg-[#1E2330] p-10 md:p-14 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Make every event feel organised, even when plans change.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
                Create a live-updating hub where guests can always find what’s happening, what’s on offer, and who’s
                involved — from one QR code.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
                >
                  Start free in 30 seconds <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/qr-code-generator"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Generate a QR
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
