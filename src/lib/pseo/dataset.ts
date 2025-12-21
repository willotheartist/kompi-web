// src/lib/pseo/dataset.ts
import type { PSEOPageInput } from "./types";

import qrIdeas from "@/content/pseo/datasets/qr-ideas.json";
import qrIdeasGenerated from "@/content/pseo/datasets/qr-ideas.generated.json";

import utmChannels from "@/content/pseo/datasets/utm-channels.json";
import bioLinks from "@/content/pseo/datasets/bio-links.json";

function asPages(v: unknown): PSEOPageInput[] {
  return (v as PSEOPageInput[]).filter(Boolean);
}

/**
 * Dedupes by slug. Priority: later datasets overwrite earlier ones.
 * This prevents duplicate routes, duplicate sitemap entries, and duplicate static params.
 */
function dedupeBySlug(pages: PSEOPageInput[]): PSEOPageInput[] {
  const map = new Map<string, PSEOPageInput>();
  for (const p of pages) {
    if (!p?.slug) continue;
    map.set(p.slug, p);
  }
  return Array.from(map.values());
}

export function getAllPSEOPages(): PSEOPageInput[] {
  // Earlier first, later last so later wins on slug collisions
  const merged = [
    ...asPages(qrIdeas),
    ...asPages(qrIdeasGenerated),

    // ✅ UTM cluster
    ...asPages(utmChannels),

    // ✅ Link-in-bio cluster
    ...asPages(bioLinks),
  ];
  return dedupeBySlug(merged);
}

export function getPSEOPageBySlug(slug: string): PSEOPageInput | undefined {
  return getAllPSEOPages().find((p) => p.slug === slug);
}

export function getSiblingPages(input: PSEOPageInput): PSEOPageInput[] {
  return getAllPSEOPages().filter((p) => p.cluster === input.cluster);
}
