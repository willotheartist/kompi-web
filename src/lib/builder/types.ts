// src/lib/builder/types.ts
export type BuilderPageType =
  | "HOME"
  | "PRODUCT"
  | "PRICING"
  | "WAITLIST"
  | "ABOUT"
  | "CONTACT";

/**
 * URL keys for public routing:
 * /s/[slug] => HOME
 * /s/[slug]/product|pricing|waitlist|about|contact
 */
export type BuilderPageKey = "product" | "pricing" | "waitlist" | "about" | "contact";

export const pageKeyToType = (key: string): BuilderPageType | null => {
  switch (key) {
    case "product":
      return "PRODUCT";
    case "pricing":
      return "PRICING";
    case "waitlist":
      return "WAITLIST";
    case "about":
      return "ABOUT";
    case "contact":
      return "CONTACT";
    default:
      return null;
  }
};

export const pageTypeToKey = (type: BuilderPageType): BuilderPageKey | "" => {
  switch (type) {
    case "HOME":
      return "";
    case "PRODUCT":
      return "product";
    case "PRICING":
      return "pricing";
    case "WAITLIST":
      return "waitlist";
    case "ABOUT":
      return "about";
    case "CONTACT":
      return "contact";
    default: {
      // exhaustive check
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
};

export type BuilderSectionType =
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

export type BuilderSection = {
  id?: string;
  type: BuilderSectionType;
  variant: string; // "A" | "B" | "C" (string to keep flexible)
  isHidden: boolean;
  order: number;
  content: Record<string, unknown>;
};

export type BuilderPage = {
  id?: string;
  type: BuilderPageType;
  title?: string | null;
  path?: string | null;
  order: number;
  sections: BuilderSection[];
};

export type BuilderSiteState = {
  id?: string;
  workspaceId: string;
  name: string;
  slug: string;
  brand?: Record<string, unknown> | null;
  navigation?: Record<string, unknown> | null;
  globalCta?: Record<string, unknown> | null;
  isPublished?: boolean;
  publishedAt?: string | null;
  pages: BuilderPage[];
};

export const BUILDER_PAGE_ORDER: BuilderPageType[] = [
  "HOME",
  "PRODUCT",
  "PRICING",
  "WAITLIST",
  "ABOUT",
  "CONTACT",
];

export const isBuilderPageType = (v: unknown): v is BuilderPageType => {
  return (
    v === "HOME" ||
    v === "PRODUCT" ||
    v === "PRICING" ||
    v === "WAITLIST" ||
    v === "ABOUT" ||
    v === "CONTACT"
  );
};

export const isNonEmptyString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

export const normalizeSlug = (raw: string): string => {
  const s = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s.length ? s : "site";
};
