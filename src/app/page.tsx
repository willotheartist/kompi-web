"use client";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
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
    "@id": "https://kompi.app/#organization",
    name: "Kompi",
    url: "https://kompi.app",
    logo: "https://kompi.app/Kompiwhite.svg",
    // Add your real profiles here (remove any you don’t have)
    sameAs: [
      // "https://www.instagram.com/yourhandle",
      // "https://www.linkedin.com/company/yourhandle",
      // "https://x.com/yourhandle",
      // "https://www.youtube.com/@yourhandle",
    ],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kompi.app/#website",
    name: "Kompi",
    url: "https://kompi.app",
    publisher: { "@id": "https://kompi.app/#organization" },
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteJsonLd),
          }}
        />

        {/* HeroA – Calm Product Hero */}
        <Hero />

        {/* NEW: Explicit definition block (Pillar 1: brand clarity for Google + humans) */}
        <section className="wf-section">
          <div className="wf-container">
            <p className="text-sm text-(--color-subtle) max-w-3xl">
              <strong>Kompi</strong> is a web app for smart links, QR codes, and
              share pages. Create short links, build bio pages, generate QR
              experiences, and track what works with real-time analytics — all
              from one dashboard.
            </p>
          </div>
        </section>

        {/* KPromo – Clickable world carousel */}
        <KPromo />
        <InfoScreenOne />
          {/* KBenefits – case-study style band */}
        <KBenefits />
        <KolorKards />
        <Faces />

        {/* HowItWorks – Kompi in your stack */}
        <HowItWorksSection />

        {/* KompiPerks – horizontal perks strip */}
        <KompiPerks />

        {/* Personas – Who Kompi is for */}
        <PersonasSection />

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




