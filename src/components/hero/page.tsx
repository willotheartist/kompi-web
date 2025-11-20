"use client";

import type { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const heroContainer: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 0.61, 0.36, 1], // smoother, more premium curve
      staggerChildren: 0.16,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

/**
 * HeroA – Calm Product Hero
 */
export default function Hero() {
  return (
    <Section className="wf-section-hero">
      <Container>
        <motion.div
          className="wf-hero-grid"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Hero copy */}
          <motion.div className="wf-hero-copy" variants={heroItem}>
            <p className="wf-eyebrow">
              Kompi Links · For studios, agencies &amp; modern creators
            </p>

            <Heading as="h1" className="wf-hero-heading">
              Run your links, bios &amp; campaigns
              <span className="wf-hero-heading-line">
                from one{" "}
                <span className="wf-serif-accent">opinionated</span>{" "}
                platform.
              </span>
            </Heading>

            <p className="wf-hero-body">
              Short links, smart bio pages, QR codes and live analytics —
              in a UI that doesn&apos;t feel like 2013. Built so you can
              sell, report and grow without duct-taping five tools.
            </p>

            {/* CTAs – slightly slower + from bottom */}
            <motion.div
              className="wf-hero-ctas"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <Button asChild className="wf-btn-primary">
                <Link href="/signin">Start free in 30 seconds</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="wf-btn-secondary"
              >
                <Link href="/pricing">View pricing</Link>
              </Button>
            </motion.div>

            <motion.p
              className="wf-hero-meta"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.55,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              No credit card. Unlimited links on launch promo.
            </motion.p>
          </motion.div>

          {/* Hero visual: static image from public/herowoman.png */}
          <motion.div className="wf-hero-visual" variants={heroItem}>
            <div className="wf-hero-image-wrap">
              <Image
                src="/herowoman.png"
                alt="Creator using Kompi Links"
                width={640}
                height={640}
                priority
                className="wf-hero-image"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

/* Layout primitives (mirroring homepage ones) */

function Section({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const cls = ["wf-section", className].filter(Boolean).join(" ");
  return (
    <section className={cls} style={style}>
      {children}
    </section>
  );
}

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const cls = ["wf-container", className].filter(Boolean).join(" ");
  return <div className={cls}>{children}</div>;
}

function Heading({
  as: Tag = "h1",
  children,
  align = "left",
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const alignClass = align === "center" ? "wf-heading-center" : "";
  const cls = ["wf-heading", alignClass, className].filter(Boolean).join(" ");
  return <Tag className={cls}>{children}</Tag>;
}
