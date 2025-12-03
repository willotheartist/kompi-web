"use client";

import type { ReactNode, CSSProperties } from "react";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import KPromo from "@/components/KPromo";
import "./kompi-marketing.css";
import KompiPerks from "@/components/KompiPerks";
import KBenefits from "@/components/KBenefits";
import Hero from "@/components/hero/page";
import KolorKards from "@/components/KolorKards";
import InfoScreenOne from "@/components/infoscreens/one";
import InfoScreentwo from "@/components/infoscreens/two";
import InfoScreenthree from "@/components/infoscreens/three";
import InfoScreenfour from "@/components/infoscreens/four";
import InfoScreenfive from "@/components/infoscreens/five";
import InfoScreensix from "@/components/infoscreens/six";
import PersonasSection from "@/components/sections/personas";
import HowItWorksSection from "@/components/sections/how-it-works";
import AnalyticsSection from "@/components/sections/analytics";
import TestimonialsSection from "@/components/sections/testimonials";
import Faces from "@/components/sections/faces";
import Faqs from "@/components/faqs";
import { ClaimHandleInline } from "@/components/claim/claim-handle-inline";


export const dynamic = "force-static";

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kompi",
    url: "https://kompi.app",
    logo: "https://kompi.app/Kompiwhite.svg",
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kompi",
    url: "https://kompi.app",
  };

  return (
    <div className="wf-page">
      <Navbar />

      <motion.main
        className="wf-main"
        style={{ paddingTop: "var(--navbar-height, 4.5rem)" }} // space for fixed navbar
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* SEO structured data for Google */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd),
          }}
        />

        {/* HeroA – Calm Product Hero */}
        <Hero />

        {/* KPromo – Clickable world carousel */}
        <KPromo />
        <InfoScreenOne />
        <KolorKards />
        <Faces />

        {/* HowItWorks – Kompi in your stack */}
        <HowItWorksSection />

        {/* KompiPerks – horizontal perks strip */}
        <KompiPerks />

        {/* Personas – Who Kompi is for */}
        <PersonasSection />


        {/* KBenefits – case-study style band */}
        <KBenefits />

        {/* Analytics focus */}
        <AnalyticsSection />

        <InfoScreentwo />
        <InfoScreenthree />
        <InfoScreenfour />
        <InfoScreenfive />
        <InfoScreensix />

      

        {/* Testimonials – new Linktree-style band */}
        <TestimonialsSection />
      </motion.main>
      <Faqs />
    <ClaimHandleInline />

      {/* CTA_Footer – handled by shared component */}
      <FooterCTA />
    </div>
  );
}

/* Layout primitives */

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
