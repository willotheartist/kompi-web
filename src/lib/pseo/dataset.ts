// src/lib/pseo/dataset.ts
import type { PSEOPageInput } from "./types";

import qrIdeas from "@/content/pseo/datasets/qr-ideas.json";
import qrIdeasGenerated from "@/content/pseo/datasets/qr-ideas.generated.json";

function asPages(v: unknown): PSEOPageInput[] {
  return (v as PSEOPageInput[]).filter(Boolean);
}

/**
 * Dedupes by slug. Priority: generated > manual (so pipeline output wins).
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
  // Put manual first, generated second so generated overwrites on slug collisions
  const merged = [...asPages(qrIdeas), ...asPages(qrIdeasGenerated)];
  return dedupeBySlug(merged);
}

export function getPSEOPageBySlug(slug: string): PSEOPageInput | undefined {
  return getAllPSEOPages().find((p) => p.slug === slug);
}

export function getSiblingPages(input: PSEOPageInput): PSEOPageInput[] {
  return getAllPSEOPages().filter((p) => p.cluster === input.cluster);
}
