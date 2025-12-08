"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Link2, QrCode, LayoutGrid, BarChart3, Rocket } from "lucide-react";

const easing: [number, number, number, number] = [0.23, 1, 0.32, 1];

export function WhyKompi() {
  return (
    <section
      className="relative flex min-h-[120vh] items-center bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8"
      aria-label="Why Kompi"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 lg:flex-row lg:items-center">
        {/* Text side */}
        <motion.div
          className="w-full max-w-xl space-y-6"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.9, ease: easing }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
            Why Kompi
          </p>
          <h2
            className="text-3xl font-semibold leading-tight tracking-tight text-[#111111] sm:text-4xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            More than a free QR code generator.
            <br />
            A whole universe for modern links.
          </h2>
          <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
            Kompi starts as a clean, free QR code generator – but it doesn’t
            stop there. It’s the place where your QR codes, short links, menus
            and contact cards all live together, with analytics and tools built
            around them. Instead of juggling disconnected generators, Kompi
            becomes the hub for how people discover you in the real world.
          </p>

          <div className="space-y-4 text-sm text-neutral-800">
            <div className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#111111] text-[10px] font-semibold text-[#F5FF7A]">
                1
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">
                  QR codes that connect to more than one thing
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-700">
                  Link your QR codes to branded short links, QR menus, landing
                  pages and contact forms you manage inside Kompi. When you
                  update a menu or link, every QR code that points to it stays
                  in sync.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#111111] text-[10px] font-semibold text-[#F5FF7A]">
                2
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">
                  Built for restaurants, creators and small teams
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-700">
                  Use the same workspace for QR menus on tables, links in your
                  bio, printed posters and checkout pages. Kompi keeps things
                  tidy so you can see how people move between your physical and
                  online touchpoints.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#111111] text-[10px] font-semibold text-[#F5FF7A]">
                3
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">
                  A suite of small tools that support the big moments
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-700">
                  Passwords, UTM links, bios, captions, PDFs and random numbers
                  – Kompi Suite wraps the little jobs around your QR codes and
                  links, so you don’t need a different website every time you
                  publish something new.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards / visual side */}
        <motion.div
          className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, delay: 0.15, ease: easing }}
        >
          <InfoCard
            icon={QrCode}
            title="QR codes that feel on-brand"
            body="Create high-resolution QR codes with your logo, colours and shapes that match your menus, packaging or signage."
          />
          <InfoCard
            icon={Link2}
            title="Short links behind every scan"
            body="Route scans through Kompi links so you can tidy URLs, add tracking and update destinations later."
          />
          <InfoCard
            icon={LayoutGrid}
            title="Menus, cards & landing pages"
            body="Build QR menus, K-Cards and lightweight pages that give people context instead of just dropping them on a raw URL."
          />
          <InfoCard
            icon={BarChart3}
            title="Analytics that make sense"
            body="See which codes, links and menus get the most attention so you can improve what you print and where you place it."
          />
          <InfoCard
            icon={Rocket}
            title="Ready for what comes next"
            body="Start with free static QR codes and grow into dynamic codes, subscribers and campaigns when you’re ready."
            wide
          />
        </motion.div>
      </div>
    </section>
  );
}

type InfoCardProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  wide?: boolean;
};

function InfoCard({ icon: Icon, title, body, wide }: InfoCardProps) {
  return (
    <motion.div
      layout
      className={`group flex flex-col rounded-[28px] border bg-card/80 px-5 py-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:bg-card hover:shadow-xl hover:backdrop-blur-lg ${
        wide ? "sm:col-span-2" : ""
      }`}
      style={{
        borderColor: "var(--color-border)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.04)",
      }}
      whileHover={{ translateY: -6 }}
      transition={{ duration: 0.4, ease: easing }}
    >
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111111] text-white transition-transform duration-200 group-hover:scale-105">
        <Icon className="h-5 w-5" strokeWidth={2.1} />
      </div>
      <h3 className="text-sm font-semibold leading-snug tracking-tight text-[#111111]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-neutral-700">
        {body}
      </p>
    </motion.div>
  );
}

export default WhyKompi;
