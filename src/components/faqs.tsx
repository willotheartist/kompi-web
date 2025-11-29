"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "What is Kompi?",
    answer:
      "Kompi is a modern tool for creating short links, bio pages, QR-style Kompi Codes™, and tracking performance across everything you share.",
  },
  {
    question: "Is Kompi free to use?",
    answer:
      "Yes. You can create links, pages, and track basic analytics on the free plan. Upgrading unlocks custom domains, advanced analytics, branding features, and more.",
  },
  {
    question: "Do I need my own domain?",
    answer:
      "No. Kompi gives you a default link domain instantly. You can connect your own domain anytime for added branding and trust.",
  },
  {
    question: "What analytics does Kompi track?",
    answer:
      "Kompi shows clicks, locations, devices, referrers, UTMs, and performance over time. Everything is visual, fast, and privacy-respectful.",
  },
  {
    question: "Can I create a link-in-bio page?",
    answer:
      "Absolutely. Kompi Bio lets you build a beautiful, minimal page that holds all your links — fully tracked and fully customizable.",
  },
  {
    question: "What are Kompi Codes™?",
    answer:
      "They’re modern, trackable QR-style codes automatically created for each link or page. Perfect for posters, menus, packaging, and events.",
  },
  {
    question: "Can I use Kompi for my business or team?",
    answer:
      "Yes. Kompi supports shared workspaces, team collaboration, client projects, branded domains, and exportable analytics.",
  },
  {
    question: "Is coding required?",
    answer:
      "No coding needed at all. Just create, share, and track. Kompi handles the redirects, SSL, analytics, and performance for you.",
  },
  {
    question: "Does Kompi work on all platforms?",
    answer:
      "Yes. Your links, pages, and codes work instantly across social media, email, messaging apps, websites, and printed materials.",
  },
  {
    question: "How fast are Kompi’s redirects?",
    answer:
      "Kompi uses edge-powered redirects designed for speed, reliability, and scale — even with high traffic.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Anytime. You can upgrade, downgrade, or cancel directly from your dashboard.",
  },
];

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="w-full py-24 md:py-32"
      style={{
        backgroundColor: "#e3f2ff",
        fontFamily:
          "Inter Tight, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <motion.div
        className="mx-auto flex max-w-5xl flex-col items-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: easing }}
      >
        {/* BIG heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: easing, delay: 0.1 }}
          className="text-center text-[40px] leading-[1.05] text-[#1e2330] sm:text-[48px] md:text-[56px] font-semibold mb-10 sm:mb-12"
        >
          Frequently Asked?{" "}
          <span
            className="italic"
            style={{
              fontFamily: "Instrument Serif, 'Times New Roman', serif",
            }}
          >
            Questions.
          </span>
        </motion.h2>

        {/* Big pill FAQ list */}
        <motion.div
          className="w-full space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.1,
                ease: easing,
                staggerChildren: 0.18,
                delayChildren: 0.2,
              },
            },
          }}
        >
          {FAQS.map((item, index) => (
            <FaqRow
              key={item.question}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function FaqRow({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 1.05, ease: easing, delay: index * 0.02 },
        },
      }}
      className="rounded-[32px] md:rounded-[40px] border border-[#1e2330]"
      style={{ backgroundColor: "#1e2330", color: "#e3f2ff" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left sm:px-8 sm:py-5 md:px-10 md:py-6"
      >
        <span className="text-base font-semibold sm:text-lg md:text-xl leading-snug">
          {item.question}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e3f2ff]/10 text-lg">
          {open ? "˄" : "˅"}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-0 sm:px-8 sm:pb-6 md:px-10 md:pb-7">
          <p className="text-sm leading-relaxed text-[#e3f2ff]/80 md:text-base">
            {item.answer}
          </p>
        </div>
      )}
    </motion.div>
  );
}
