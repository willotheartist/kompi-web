// src/lib/builder/sectionSchemas.ts

export type SectionType =
  | "NAVBAR"
  | "HERO"
  | "SOCIAL_PROOF"
  | "FEATURES"
  | "BENEFITS"
  | "HOW_IT_WORKS"
  | "USE_CASES"
  | "TESTIMONIALS"
  | "PRICING"
  | "FAQ"
  | "WAITLIST"
  | "ABOUT"
  | "CONTACT"
  | "FOOTER";

export type SectionVariant = "A" | "B" | "C";

export type SectionSchema = {
  type: SectionType;
  variant: SectionVariant;
  defaults: Record<string, unknown>;
  required: string[];
};

export const SECTION_SCHEMAS: Record<
  SectionType,
  Partial<Record<SectionVariant, SectionSchema>>
> = {
  NAVBAR: {
    A: {
      type: "NAVBAR",
      variant: "A",
      required: ["links"],
      defaults: {
        logoText: "Kompi",
        // NOTE: Public renderer will derive nav from pages; this is only a sensible draft default.
        links: [
          { label: "Home", href: "/" },
          { label: "Product", href: "/product" },
          { label: "Pricing", href: "/pricing" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
    },
  },

  HERO: {
    A: {
      type: "HERO",
      variant: "A",
      required: ["headline"],
      defaults: {
        headline: "A calm, beautiful site in minutes.",
        subheadline:
          "Kompi Builder helps founders ship a polished site without design stress.",
        cta: {
          label: "Get started",
          href: "#",
        },
      },
    },
  },

  SOCIAL_PROOF: {
    A: {
      type: "SOCIAL_PROOF",
      variant: "A",
      required: [],
      defaults: {
        headline: "Trusted by builders",
        // supported shapes in renderer: logos/items/brands
        logos: [{ name: "Acme" }, { name: "Studio" }, { name: "Labs" }],
      },
    },
  },

  FEATURES: {
    A: {
      type: "FEATURES",
      variant: "A",
      required: ["items"],
      defaults: {
        title: "Everything you need to launch",
        items: [
          { title: "Fast", description: "Optimized defaults that look great." },
          { title: "Simple", description: "Edit content, not CSS." },
          { title: "Flexible", description: "Sections that adapt to your needs." },
        ],
      },
    },
    B: {
      type: "FEATURES",
      variant: "B",
      required: ["items"],
      defaults: {
        title: "Features",
        items: [
          { title: "Feature one", description: "" },
          { title: "Feature two", description: "" },
        ],
      },
    },
  },

  BENEFITS: {
    A: {
      type: "BENEFITS",
      variant: "A",
      required: ["items"],
      defaults: {
        title: "Why Kompi",
        items: [
          { title: "Polished by default", description: "Great structure without design work." },
          { title: "Ship fast", description: "Edit copy, publish, done." },
          { title: "Stay consistent", description: "Sections follow a clean system." },
        ],
      },
    },
  },

  HOW_IT_WORKS: {
    A: {
      type: "HOW_IT_WORKS",
      variant: "A",
      required: ["steps"],
      defaults: {
        title: "How it works",
        steps: [
          { title: "Pick", description: "Choose your sections and variants." },
          { title: "Edit", description: "Tweak copy with inline editing." },
          { title: "Publish", description: "Ship to your site instantly." },
        ],
      },
    },
  },

  USE_CASES: {
    A: {
      type: "USE_CASES",
      variant: "A",
      required: ["items"],
      defaults: {
        title: "Use cases",
        items: [
          { title: "SaaS", description: "Launch a crisp marketing site." },
          { title: "Creator", description: "Simple product + link hub pages." },
          { title: "Agency", description: "Fast landing pages for clients." },
        ],
      },
    },
  },

  TESTIMONIALS: {
    A: {
      type: "TESTIMONIALS",
      variant: "A",
      required: ["items"],
      defaults: {
        title: "What customers say",
        items: [
          { quote: "We shipped in a day and it looks great.", name: "Jamie" },
          { quote: "Finally a builder that feels calm.", name: "Alex" },
        ],
      },
    },
  },

  PRICING: {
    A: {
      type: "PRICING",
      variant: "A",
      required: ["plans"],
      defaults: {
        title: "Pricing",
        plans: [
          { name: "Free", price: "$0", features: ["Basic sections", "Publish flow"] },
          { name: "Pro", price: "$19", features: ["More sections", "Advanced controls"] },
        ],
      },
    },
  },

  FAQ: {
    A: {
      type: "FAQ",
      variant: "A",
      required: ["items"],
      defaults: {
        title: "Frequently asked questions",
        items: [
          { question: "What is Kompi?", answer: "A calm site builder." },
          { question: "Can I publish for free?", answer: "Yes." },
        ],
      },
    },
  },

  WAITLIST: {
    A: {
      type: "WAITLIST",
      variant: "A",
      required: [],
      defaults: {
        title: "Join the waitlist",
        body: "Get notified when we launch.",
        cta: { label: "Join", href: "#" },
      },
    },
  },

  ABOUT: {
    A: {
      type: "ABOUT",
      variant: "A",
      required: ["body"],
      defaults: {
        title: "About",
        body: "Write something meaningful about your product or team.",
      },
    },
  },

  CONTACT: {
    A: {
      type: "CONTACT",
      variant: "A",
      required: ["email"],
      defaults: {
        title: "Contact",
        email: "hello@example.com",
      },
    },
  },

  FOOTER: {
    A: {
      type: "FOOTER",
      variant: "A",
      required: [],
      defaults: {
        copyright: "© 2025 Your Startup",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
    },
  },
};
