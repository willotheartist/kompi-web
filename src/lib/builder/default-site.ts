// src/lib/builder/default-site.ts
import type { BuilderPage, BuilderPageType, BuilderSection } from "./types";

function baseNav() {
  return {
    items: [
      { label: "Home", pageType: "HOME" },
      { label: "Product", pageType: "PRODUCT" },
      { label: "Pricing", pageType: "PRICING" },
      { label: "About", pageType: "ABOUT" },
      { label: "Contact", pageType: "CONTACT" },
    ],
    showSocial: true,
  };
}

function baseBrand() {
  return {
    brandName: "Your Startup",
    logoUrl: null,
    primaryHex: "#111111",
    accentHex: "#6D28D9",
    font: "inter",
    styleVariant: "CALM_A",
  };
}

function baseCta() {
  return { label: "Get started", href: "#pricing", style: "primary" };
}

function sectionsForPage(type: BuilderPageType): BuilderSection[] {
  const commonFooter: BuilderSection = {
    type: "FOOTER",
    variant: "A",
    isHidden: false,
    order: 999,
    content: {
      copyright: "© " + new Date().getFullYear() + " Your Startup",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  };

  if (type === "HOME") {
    return [
      {
        type: "NAVBAR",
        variant: "A",
        isHidden: false,
        order: 0,
        content: { sticky: true },
      },
      {
        type: "HERO",
        variant: "A",
        isHidden: false,
        order: 1,
        content: {
          headline: "A calm, beautiful site in minutes.",
          subheadline:
            "Kompi Builder helps founders ship a polished site without design stress.",
          primaryCta: { label: "Start free", href: "#pricing" },
          secondaryCta: { label: "See product", href: "#product" },
        },
      },
      {
        type: "SOCIAL_PROOF",
        variant: "A",
        isHidden: false,
        order: 2,
        content: {
          label: "Trusted by founders",
          logos: ["Kompi", "Studio", "Acme", "Launchpad"],
        },
      },
      {
        type: "FEATURES",
        variant: "A",
        isHidden: false,
        order: 3,
        content: {
          title: "Everything you need to launch",
          items: [
            { title: "Fast", description: "Optimized defaults that look great." },
            { title: "Simple", description: "Edit content, not CSS." },
            { title: "Publish", description: "Go live instantly on kompi.page." },
          ],
        },
      },
      {
        type: "FAQ",
        variant: "A",
        isHidden: false,
        order: 4,
        content: {
          title: "FAQs",
          items: [
            {
              q: "Can I use a custom domain?",
              a: "Not in V0. Sites publish to <name>.kompi.page.",
            },
            {
              q: "Can AI redesign my site?",
              a: "AI helps edit content and swap variants, but structure stays consistent.",
            },
          ],
        },
      },
      commonFooter,
    ];
  }

  if (type === "PRODUCT") {
    return [
      {
        type: "NAVBAR",
        variant: "A",
        isHidden: false,
        order: 0,
        content: { sticky: true },
      },
      {
        type: "FEATURES",
        variant: "B",
        isHidden: false,
        order: 1,
        content: {
          title: "Product",
          items: [
            { title: "Feature one", description: "Short, specific benefit." },
            { title: "Feature two", description: "Another clear outcome." },
            { title: "Feature three", description: "Explain what changes for users." },
          ],
        },
      },
      {
        type: "HOW_IT_WORKS",
        variant: "A",
        isHidden: false,
        order: 2,
        content: {
          title: "How it works",
          steps: [
            { title: "Pick", description: "Choose your sections and variants." },
            { title: "Edit", description: "Tweak copy with inline editing." },
            { title: "Publish", description: "Ship to <name>.kompi.page instantly." },
          ],
        },
      },
      commonFooter,
    ];
  }

  if (type === "PRICING") {
    return [
      {
        type: "NAVBAR",
        variant: "A",
        isHidden: false,
        order: 0,
        content: { sticky: true },
      },
      {
        type: "PRICING",
        variant: "A",
        isHidden: false,
        order: 1,
        content: {
          title: "Pricing",
          plans: [
            {
              name: "Free",
              price: "€0",
              bullets: ["Publish on kompi.page", "Beautiful defaults"],
            },
            {
              name: "Creator",
              price: "€9",
              bullets: ["More sections", "More variants", "Priority support"],
            },
          ],
        },
      },
      commonFooter,
    ];
  }

  if (type === "WAITLIST") {
    return [
      {
        type: "NAVBAR",
        variant: "A",
        isHidden: false,
        order: 0,
        content: { sticky: true },
      },
      {
        type: "WAITLIST",
        variant: "A",
        isHidden: false,
        order: 1,
        content: {
          title: "Join the waitlist",
          subtitle: "Be the first to know when we launch.",
          formLabel: "Email",
          buttonLabel: "Join",
        },
      },
      commonFooter,
    ];
  }

  if (type === "ABOUT") {
    return [
      {
        type: "NAVBAR",
        variant: "A",
        isHidden: false,
        order: 0,
        content: { sticky: true },
      },
      {
        type: "ABOUT",
        variant: "A",
        isHidden: false,
        order: 1,
        content: {
          title: "About",
          body: "Tell the story: why you exist, what you believe, and who you serve.",
        },
      },
      commonFooter,
    ];
  }

  // CONTACT
  return [
    {
      type: "NAVBAR",
      variant: "A",
      isHidden: false,
      order: 0,
      content: { sticky: true },
    },
    {
      type: "CONTACT",
      variant: "A",
      isHidden: false,
      order: 1,
      content: {
        title: "Contact",
        subtitle: "We reply within 1–2 business days.",
        fields: ["name", "email", "message"],
        buttonLabel: "Send",
      },
    },
    commonFooter,
  ];
}

export function buildDefaultPages(includeWaitlistInsteadOfPricing: boolean): BuilderPage[] {
  const pages: BuilderPage[] = [
    { type: "HOME", title: "Home", path: "/", order: 0, sections: sectionsForPage("HOME") },
    {
      type: "PRODUCT",
      title: "Product",
      path: "/product",
      order: 1,
      sections: sectionsForPage("PRODUCT"),
    },
    includeWaitlistInsteadOfPricing
      ? {
          type: "WAITLIST",
          title: "Waitlist",
          path: "/waitlist",
          order: 2,
          sections: sectionsForPage("WAITLIST"),
        }
      : {
          type: "PRICING",
          title: "Pricing",
          path: "/pricing",
          order: 2,
          sections: sectionsForPage("PRICING"),
        },
    { type: "ABOUT", title: "About", path: "/about", order: 3, sections: sectionsForPage("ABOUT") },
    {
      type: "CONTACT",
      title: "Contact",
      path: "/contact",
      order: 4,
      sections: sectionsForPage("CONTACT"),
    },
  ];

  // normalize section ordering per page
  for (const p of pages) {
    p.sections = p.sections
      .map((s, idx) => ({ ...s, order: s.order ?? idx }))
      .sort((a, b) => a.order - b.order);
    // force continuous orders
    p.sections = p.sections.map((s, idx) => ({ ...s, order: idx }));
  }

  return pages;
}

export function buildDefaultSiteGlobals() {
  return {
    brand: baseBrand(),
    navigation: baseNav(),
    globalCta: baseCta(),
  };
}
