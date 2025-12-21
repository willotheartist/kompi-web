// src/content/pseo/datasets/index.ts
import type { PSEOPageInput } from "@/lib/pseo/types";

// JSON datasets (manual + generated)
import qrIdeas from "./qr-ideas.json";
import qrIdeasGenerated from "./qr-ideas.generated.json";

// Cluster datasets
import utmChannels from "./utm-channels.json";
import bioLinks from "./bio-links.json";

/**
 * Add new clusters here once, and they will be picked up everywhere:
 * - generateStaticParams()
 * - sitemap
 * - internal linking siblings
 */
export const PSEO_DATASETS: PSEOPageInput[][] = [
  qrIdeas as unknown as PSEOPageInput[],
  qrIdeasGenerated as unknown as PSEOPageInput[],
  utmChannels as unknown as PSEOPageInput[],
  bioLinks as unknown as PSEOPageInput[],
];
