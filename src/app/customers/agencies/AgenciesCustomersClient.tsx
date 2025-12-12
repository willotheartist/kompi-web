"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Layers, ShieldCheck, Users } from "lucide-react";

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

export default function AgenciesCustomersClient() {
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
              <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-neutral-200">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1E2330] text-[10px] font-semibold text-white">
                  K
                </span>
                <span>Customers · Studios & agencies</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
                Client-ready workspaces for links, Kompi Codes™, and{" "}
                <span className="bg-gradient-to-r from-[#A3CF3D] to-[#4B9FFF] bg-clip-text text-transparent">
                  clean reporting
                </span>
                .
              </h1>

              <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-neutral-700">
                Standardise how you create, launch, and report on links and Kompi Codes™ across multiple clients —
                without shared logins, spreadsheets, or ad-hoc tools.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <PrimaryLink href="/signup">
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="#workflows">See agency workflows</SecondaryLink>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Pill>Client workspaces</Pill>
                <Pill>Templates</Pill>
                <Pill>Roles & access</Pill>
                <Pill>Routing</Pill>
                <Pill>QR + reporting</Pill>
              </div>
            </motion.div>

            {/* HERO VISUAL (clean, no extra box wrapper) */}
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
                    src="/workspacekompi.png"
                    alt="Kompi workspaces for agencies"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/85 p-5 backdrop-blur ring-1 ring-white/40">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                    Client workspaces, not shared logins
                  </p>
                  <p className="mt-1 text-sm font-semibold text-neutral-900">
                    Keep each client’s links, QR experiences, and reports neatly separated
                  </p>
                  <p className="mt-1 text-sm text-neutral-700">
                    Manage everything from one place — with permissions that match agency reality.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Stat
                  icon={<Briefcase className="h-5 w-5 text-[#0B0F1A]" />}
                  label="Delivery"
                  value="Repeatable client setups"
                />
                <Stat
                  icon={<Users className="h-5 w-5 text-[#0B0F1A]" />}
                  label="Access"
                  value="Roles for team + client"
                />
                <Stat
                  icon={<ShieldCheck className="h-5 w-5 text-[#0B0F1A]" />}
                  label="Handover"
                  value="Clean transfers & ownership"
                />
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
            <Eyebrow>OPERATIONS</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              One platform across all your client campaigns.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Stop rebuilding link stacks for every client. Use standardised workspaces, reusable patterns,
              routing, and analytics that scale as your roster grows.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* image (no “boxed” frame) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/kompi-business.png"
                  alt="Client management in Kompi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-4">
              <Feature
                icon={<Briefcase className="h-5 w-5 text-[#0B0F1A]" />}
                title="Dedicated client workspaces"
                desc="Separate workspaces per brand with clear ownership, permissions, and billing boundaries."
              />
              <Feature
                icon={<Layers className="h-5 w-5 text-[#0B0F1A]" />}
                title="Reusable link & QR patterns"
                desc="Clone best-practice setups across clients so launches feel familiar, fast, and consistent."
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <PrimaryLink href="/signup">
                  Start free <ArrowRight className="h-4 w-4" />
                </PrimaryLink>
                <SecondaryLink href="/links">Explore Links</SecondaryLink>
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
            <Eyebrow>DELIVERY MODELS</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
              Designed for retainers, projects, and campaign sprints.
            </h2>
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
              Ship assets quickly, prove value with reporting clients understand, and hand over confidently when
              teams move in-house.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="grid gap-4">
              <Feature
                icon={<Layers className="h-5 w-5 text-[#0B0F1A]" />}
                title="Reporting clients understand"
                desc="Share high-level performance summaries with the option to drill into specific campaigns."
              />
              <Feature
                icon={<Users className="h-5 w-5 text-[#0B0F1A]" />}
                title="Roles for your team and theirs"
                desc="Invite clients with just enough access to view or approve — without breaking live assets."
              />
              <Feature
                icon={<ShieldCheck className="h-5 w-5 text-[#0B0F1A]" />}
                title="Smooth handover"
                desc="Transfer workspaces, domains, and assets cleanly when partnerships change."
              />
            </div>

            {/* image (no box) */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src="/growth/links.png"
                  alt="Campaign links for agency clients"
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
              Studios and agencies often ask…
            </h2>
          </div>

          <div className="mx-auto grid max-w-3xl gap-4">
            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Can Kompi support many clients under one account?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Yes. Workspaces are designed for multi-client setups, so you can keep accounts separated while still
                managing everything from one place.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Can we white-label links and QR codes for our clients?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                You can use client-owned domains and branding so assets look and feel native to each brand.
              </p>
            </details>

            <details className="group rounded-3xl bg-white p-6 ring-1 ring-neutral-200">
              <summary className="cursor-pointer list-none text-base font-semibold text-neutral-900 flex items-center justify-between gap-4">
                Does Kompi fit into our existing reporting stack?
                <span className="text-neutral-500 group-open:hidden">+</span>
                <span className="text-neutral-500 hidden group-open:inline">−</span>
              </summary>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                Yes. Kompi data can be exported or combined with other analytics sources, so you can keep your preferred
                dashboards and reporting formats.
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
                Standardise link and QR ops across your client base.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
                Give every client a consistent way to launch, measure, and evolve campaigns — without reinventing
                processes from scratch each time.
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
                  View Links workflows
                </Link>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
