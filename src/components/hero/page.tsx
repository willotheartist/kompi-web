"use client";

import type { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const luxeEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const heroContainer: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: luxeEase, // slower, more luxe curve
      staggerChildren: 0.22,
      delayChildren: 0.2,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: luxeEase,
    },
  },
};

/**
 * HeroA – Calm Product Hero
 */
export default function Hero() {
  return (
    <Section className="wf-section-hero h-screen flex items-center">
      <Container>
        <motion.div
          className="wf-hero-grid"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Hero copy */}
          <motion.div
            className="wf-hero-copy max-w-md md:max-w-lg"
            variants={heroItem}
          >
            <p className="wf-eyebrow tracking-[0.22em] text-xs">
              KOMPI WORLD
            </p>

            <Heading
              as="h1"
              className="wf-hero-heading font-normal"
            >
              Do more with your
              <br />
              <span className="wf-hero-heading-line">
                <span className="wf-serif-accent">
                  digital world
                </span>
                .
              </span>
            </Heading>

            <p className="wf-hero-body">
              Kompi brings your links, bios, QR codes and campaigns into
              one intentional place. Share what matters, see what works,
              and stay in control from a calm, modern dashboard.
            </p>

            {/* CTAs – slower, luxe stagger */}
            <motion.div
              className="wf-hero-ctas"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.45,
                duration: 0.9,
                ease: luxeEase,
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
                <Link href="/pricing">See plans &amp; pricing</Link>
              </Button>
            </motion.div>

            <motion.p
              className="wf-hero-meta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.7,
                duration: 0.85,
                ease: luxeEase,
              }}
            >
              No credit card needed. Launch promo: unlimited links.
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
