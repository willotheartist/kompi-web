"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, QrCode, Sparkles, Store } from "lucide-react";

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

export default function SmallBusinessCustomersClient() {
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
                <span>Customers · Small businesses</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
                QR menus, offers, and local campaigns{" "}
                <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
                  in one branded hub
                </span>
                .
              </h1>

              <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-neutral-700">
                Connect every flyer, poster, menu, receipt, and profile to one always-current destination. Update
                once — your links, Kompi Codes™, and K Cards stay in sync everywhere.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <PrimaryLink href="/signup">
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="#examples">See small business examples</SecondaryLink>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Pill>QR menus</Pill>
                <Pill>Promos</Pill>
                <Pill>Bookings</Pill>
                <Pill>Maps & reviews</Pill>
                <Pill>Loyalty</Pill>
                <Pill>Suppliers</Pill>
              </div>
            </motion.div>

            {/* HERO VISUAL (no boxed frame) */}
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
                    src="/kompiimage3.png"
                    alt="Kompi for small businesses"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/85 p-5 backdrop-blur ring-1 ring-white/40">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Table tents → Kompi menus
                  </p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">
                    Clean, branded menus that you can update in seconds
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">
                    Keep the same QR on tables — change prices, items, and specials anytime.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Stat
                  icon={<QrCode className="h-5 w-5 text-[#0B0F1A]" />}
                  label="Access"
                  value="One QR for every touchpoint"
                />
                <Stat
                  icon={<MapPin className="h-5 w-5 text-[#0B0F1A]" />}
                  label="Discovery"
                  value="Maps, reviews, socials linked"
                />
                <Stat
                  icon={<Store className="h-5 w-5 text-[#0B0F1A]" />}
                  label="Retention"
                  value="Promos & loyalty that scan"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 1 */}
      <Section id="examples" tone="white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>CUSTOMER EXPERIENCE</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Make it easy for customers to scan, tap, and come back.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Give customers one memorable place for your menu, hours, bookings, and offers. Use Kompi across
              storefront signage, social profiles, receipts, and table tents — without juggling tools.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* image (no extra wrapper box) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/solutions/solutions21.png"
                  alt="QR menus and local offers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <Feature
                icon={<QrCode className="h-5 w-5 text-[#0B0F1A]" />}
                title="QR menus and boards"
                desc="Share always-up-to-date menus, prices, and specials — without reprinting anything."
              />
              <Feature
                icon={<MapPin className="h-5 w-5 text-[#0B0F1A]" />}
                title="Local discovery links"
                desc="Connect maps, reviews, and social profiles so new customers can find and trust you fast."
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryLink href="/signup">
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="/qr-menus">Build a QR menu</SecondaryLink>
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
            <Eyebrow>REAL-WORLD WORKFLOWS</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Tools that fit how small businesses really operate.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Whether you run a café, salon, studio, or local shop — Kompi works on receipts, posters, loyalty cards,
              packaging, and window signage.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="grid gap-4">
              <Feature
                icon={<Sparkles className="h-5 w-5 text-[#0B0F1A]" />}
                title="Promos that actually get scanned"
                desc="Create codes for limited offers, loyalty perks, and seasonal campaigns in a few clicks."
              />
              <Feature
                icon={<ArrowRight className="h-5 w-5 text-[#0B0F1A]" />}
                title="Bookings and contact in one place"
                desc="Send customers to booking tools, WhatsApp, phone, or email from one simple hub."
              />
              <Feature
                icon={<Store className="h-5 w-5 text-[#0B0F1A]" />}
                title="K Cards for partners & suppliers"
                desc="Share a digital business card with the right links when you meet vendors or collaborators."
              />
            </div>

            {/* image (no box) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/growth/menu-builder.png"
                  alt="Small business workflows in Kompi"
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
              Small businesses often ask…
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4">
            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Do I have to rebuild my menu or website in Kompi?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                No. Link to your existing menu, site, or booking tools and upgrade over time. Kompi helps you
                centralise access and keep it consistent — without rebuilding everything from scratch.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Can I update prices or links without reprinting QR codes?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Yes. Kompi Codes™ are managed — you can change the destination anytime while keeping the same printed
                code on tables, doors, flyers, and packaging.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Will this work if I only have social pages, not a full website?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Absolutely. Many small businesses use Kompi as their main hub, linking to Instagram, Facebook, Google
                Maps, and simple booking tools they already use.
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
                Give your small business a simple, modern hub.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
                Launch your first menu, promotion, or contact hub in minutes. No developer, no redesign, no credit
                card required.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
                >
                  Start free in 30 seconds <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/qr-menus"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Build a QR menu
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
