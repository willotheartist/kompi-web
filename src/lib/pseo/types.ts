// src/lib/pseo/types.ts

export type PSEOIntent =
  | "learn"          // what is / why / basics
  | "informational"  // alias used by datasets (treated as "learn")
  | "compare"        // vs / best / which should I use
  | "do"             // how to / setup / examples
  | "track"          // analytics / measure / optimize
  | "fix";           // mistakes / not working / improve

export type PSEOEntity =
  | { type: "industry"; value: string }
  | { type: "platform"; value: string }
  | { type: "channel"; value: string }
  | { type: "use-case"; value: string };

export interface PSEOPageInput {
  slug: string;

  // Topical authority
  cluster: string; // e.g. "qr", "qr-restaurant", "links", "utm"
  hub: string;     // slug of the pillar page

  // Search intent (CRITICAL)
  intent: PSEOIntent;

  primaryKeyword: string;
  secondaryKeywords?: string[];

  entity: PSEOEntity;

  kompiTools: string[];

  /**
   * Desired indexing flag.
   * Final value decided by quality gate.
   */
  index: boolean;

  /**
   * Optional dates for SEO stability and sitemap accuracy.
   * Format: "YYYY-MM-DD"
   */
  publishedAt?: string;
  updatedAt?: string;
}

export interface PSEOSection {
  id: string;
  title: string;
  content: string;
}

export interface BuiltPSEOPage {
  slug: string;
  title: string;
  description: string;
  sections: PSEOSection[];
  internalLinks: string[];
  index: boolean;

  publishedAt?: string;
  updatedAt?: string;
}
