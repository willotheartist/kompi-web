"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, QrCode, Route, Tag } from "lucide-react";

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

export default function BrandsCustomersClient() {
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
                <span>Customers · Brands & marketing teams</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
                Smarter links and{" "}
                <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
                  Kompi Codes™
                </span>{" "}
                for campaigns that need clean reporting.
              </h1>

              <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-neutral-700">
                Control every click, scan, and route across campaigns — with branded links, scannable codes,
                and workflows designed for multi-channel teams.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <PrimaryLink href="/signup">
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="#workflows">View campaign workflows</SecondaryLink>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Pill>Branded short links</Pill>
                <Pill>Routing</Pill>
                <Pill>UTM presets</Pill>
                <Pill>QR + codes</Pill>
                <Pill>Exports</Pill>
              </div>
            </motion.div>

            {/* HERO VISUAL (no outer “box” wrapper) */}
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
                    src="/kompi-analytics.png"
                    alt="Kompi analytics for brands"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/85 p-5 backdrop-blur ring-1 ring-white/40">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Campaign links → clear reporting
                  </p>
                  <p className="mt-1 text-sm text-neutral-800">
                    Run social, OOH, and creator campaigns with consistent naming and analytics you can trust.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Stat icon={<Tag className="h-5 w-5 text-[#0B0F1A]" />} label="Naming" value="Consistent UTMs + presets" />
                <Stat icon={<Route className="h-5 w-5 text-[#0B0F1A]" />} label="Routing" value="Audience/context destinations" />
                <Stat icon={<BarChart3 className="h-5 w-5 text-[#0B0F1A]" />} label="Reporting" value="Clicks + scans + exports" />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 1 */}
      <Section id="workflows" tone="white">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.38, ease: "easeOut" }}
          className="space-y-10"
        >
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <Eyebrow>CONTROL THE LINK LAYER</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Control the link layer across every channel.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Stop shipping random short links and generic QR codes. Wrap every destination in consistent branding,
              routing, and analytics — so you can trust the numbers and protect the brand.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* image (no frame box) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/growth/analytics.png"
                  alt="Campaign analytics in Kompi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <Feature
                icon={<Tag className="h-5 w-5 text-[#0B0F1A]" />}
                title="Branded short links"
                desc="Use your own domains and naming conventions across every campaign and placement."
              />
              <Feature
                icon={<QrCode className="h-5 w-5 text-[#0B0F1A]" />}
                title="Kompi Codes™ for OOH & packaging"
                desc="On-brand QR experiences with routing, UTM presets, and scan analytics built in."
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryLink href="/links">
                  Build campaign links <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="/qr-code/with-logo">Brand a QR</SecondaryLink>
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
            <Eyebrow>BUILT FOR TEAMS</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Built for growth, brand, and performance teams.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Standardise how links and QR codes are created, approved, and measured — across launches,
              creator collabs, and always-on campaigns.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="grid gap-4">
              <Feature
                icon={<Route className="h-5 w-5 text-[#0B0F1A]" />}
                title="Routing by audience and context"
                desc="Send visitors to different destinations by region, device, creative, or partner."
              />
              <Feature
                icon={<Tag className="h-5 w-5 text-[#0B0F1A]" />}
                title="Consistent UTM & naming"
                desc="Apply reusable presets so every link ships with predictable tracking baked in."
              />
              <Feature
                icon={<BarChart3 className="h-5 w-5 text-[#0B0F1A]" />}
                title="Campaign and partner workspaces"
                desc="Separate brands, regions, and partners with clearer ownership and permissions."
              />
            </div>

            {/* image (no frame box) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/kompi-platform.png"
                  alt="Kompi platform for marketing teams"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* FAQ */}
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
              Marketing teams often ask…
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4">
            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Can Kompi replace our existing short link tools?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                In many cases, yes. Kompi gives you branded domains, routing, analytics, and QR generation in one place —
                so you can simplify your stack over time.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Does Kompi support multi-brand or multi-region setups?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Yes. Workspaces and roles are designed for multi-brand and multi-region environments, with room for agencies
                and external collaborators.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                How deep is the analytics?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Kompi focuses on the link and QR layer: clicks, scans, referrers, top destinations, devices, geography, and
                source breakdowns — all exportable for deeper analysis.
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
                Give your campaigns a better link and QR layer.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
                Standardise how your team ships links and Kompi Codes™ so every campaign is easier to measure and optimise.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
                >
                  Start free in 30 seconds <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/links"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap leading-none rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Build campaign links
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
