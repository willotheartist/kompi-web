"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Link2, QrCode, ShieldCheck, Users } from "lucide-react";

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
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5177e1] text-center">
      {children}
    </p>
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
      {children}
    </span>
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
      className={tone === "soft" ? "bg-[#f7f7f4] border-t border-neutral-200" : "bg-white border-t border-neutral-200"}
    >
      <Container>
        <div className="py-16 md:py-20">{children}</div>
      </Container>
    </section>
  );
}

export default function CommunitiesCustomersClient() {
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
                <span>Customers · Communities & memberships</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
                One living hub for your community{" "}
                <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
                  events, links, and updates
                </span>
                .
              </h1>

              <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-neutral-700">
                Share what’s happening next — events, resources, and member-only links — from one always-current page
                you can put behind a link or QR code.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <PrimaryLink href="/signup">
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="#examples">See community examples</SecondaryLink>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Pill>Events</Pill>
                <Pill>Resources</Pill>
                <Pill>Member access</Pill>
                <Pill>QR posters</Pill>
                <Pill>Updates</Pill>
              </div>
            </motion.div>

            {/* HERO VISUAL (no “box” wrapper) */}
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
                    src="/kompiimage4.png"
                    alt="Kompi for communities"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/85 p-5 backdrop-blur ring-1 ring-white/40">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Flyers → live event hub
                  </p>
                  <p className="mt-1 text-sm text-neutral-800">
                    Put one destination on posters, newsletters, and socials so members always land on the latest info.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Stat icon={<CalendarDays className="h-5 w-5 text-[#0B0F1A]" />} label="Events" value="Update once, sync everywhere" />
                <Stat icon={<Link2 className="h-5 w-5 text-[#0B0F1A]" />} label="Links" value="One entry point to everything" />
                <Stat icon={<QrCode className="h-5 w-5 text-[#0B0F1A]" />} label="QR" value="Offline → online conversion" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 1 */}
      <Section tone="white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>ONE SOURCE OF TRUTH</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Keep everyone aligned without rewriting every announcement.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Stop chasing outdated flyers and old links. Update event details, resources, and sign-up flows once —
              they stay synced everywhere your link or QR appears.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* image (no box) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/solutions/solutions20.png"
                  alt="Community events and resources"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <Feature
                icon={<CalendarDays className="h-5 w-5 text-[#0B0F1A]" />}
                title="Events that update in real time"
                desc="Change dates, venues, and details without replacing printed QR codes or resending new links."
              />
              <Feature
                icon={<Link2 className="h-5 w-5 text-[#0B0F1A]" />}
                title="Resources in one place"
                desc="Forms, docs, recordings, guidelines — a single hub members can rely on."
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryLink href="/k-cards">
                  Build your hub <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="/qr-code-generator">Generate a QR</SecondaryLink>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* SECTION 2 */}
      <Section id="examples" tone="soft">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>FLEXIBLE BY DESIGN</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Flexible for meetups, memberships, and online communities.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              From online memberships to local groups, Kompi helps you share what matters — and keep it measurable.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="grid gap-4">
              <Feature
                icon={<Users className="h-5 w-5 text-[#0B0F1A]" />}
                title="Meetup & event links"
                desc="Central pages for recurring events with tickets, maps, livestreams, and updates."
              />
              <Feature
                icon={<ShieldCheck className="h-5 w-5 text-[#0B0F1A]" />}
                title="Member-only access"
                desc="Route members to private spaces, content drops, or update feeds using one consistent entry point."
              />
              <Feature
                icon={<Link2 className="h-5 w-5 text-[#0B0F1A]" />}
                title="Organiser & volunteer K Cards"
                desc="Give organisers a scannable card that routes people to sign-ups, info packs, and contact details."
              />
            </div>

            {/* image (no box) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/kompicollage.png"
                  alt="Online and offline communities using Kompi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* FAQ (your inline + shared components) */}
      <Section tone="white">
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
              Communities often ask…
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4">
            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Can we use Kompi alongside our existing community platform?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Yes. Kompi sits on top of whatever you already use — Discord, WhatsApp, Slack, Circle, Facebook Groups, and more —
                giving you one consistent entry point into your ecosystem.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Do we need a designer or developer to set this up?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                No. Community leads can create and update pages, links, and Kompi destinations directly, without touching code.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Is this only for paid memberships?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Kompi works for both free and paid communities — from grassroots groups and clubs to structured membership organizations.
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
                Give your community one clear place to land.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
                Create a simple hub for events, resources, and updates — where members always know what’s happening next.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
                >
                  Start free in 30 seconds <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/k-cards"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Build a K Card
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
