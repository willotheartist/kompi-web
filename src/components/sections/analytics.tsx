"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing,
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easing },
  },
};

export default function AnalyticsSection() {
  return (
    <section
      className="wf-section"
      style={{ backgroundColor: "#FFEC00", color: "#022C17" }}
    >
      <div className="wf-container">
        <motion.div
          className="flex flex-col items-center gap-10 py-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* Heading / intro */}
          <motion.div
            className="space-y-4 text-center max-w-2xl"
            variants={item}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase opacity-80">
              Analytics without the headache
            </p>
            <h2 className="wf-heading wf-section-heading wf-section-heading-center text-[30px] sm:text-[34px] md:text-[38px]">
              Know what&apos;s{" "}
              <span className="wf-serif-accent italic">working</span> — without
              opening ten dashboards.
            </h2>
            <p className="wf-section-intro wf-text-center text-sm leading-relaxed opacity-90">
              Kompi gives you the click, device, location and UTM breakdown you
              actually need. Export to CSV when the data team wants to go
              deeper, ignore the rest.
            </p>
          </motion.div>

          {/* Flat white cards */}
          <motion.div
            className="grid w-full max-w-4xl gap-4 md:grid-cols-3"
            variants={item}
          >
            <AnalyticsPill
              label="Per-link insights"
              body="See performance by link, campaign or workspace in seconds."
            />
            <AnalyticsPill
              label="Real-time feel"
              body="New clicks and QR scans show up in your dashboard almost instantly."
            />
            <AnalyticsPill
              label="Client-ready"
              body="Screenshots you’re not embarrassed to paste into decks and reports."
            />
          </motion.div>

          {/* CTA */}
          <motion.div variants={item}>
            <Button
              asChild
              className="wf-btn-compact rounded-full border border-[#022C17] bg-[#022C17] px-8 py-3 text-sm font-semibold text-[#FFEC00] hover:bg-[#043321]"
            >
              <Link href="/signin">Open your first dashboard</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AnalyticsPill({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[#022C17]/10 bg-white px-5 py-4">
      <h3 className="text-sm font-semibold text-[#022C17]">{label}</h3>
      <p className="mt-2 text-xs leading-relaxed text-[#022C17]/80">{body}</p>
    </div>
  );
}
