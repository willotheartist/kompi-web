// scripts/check-qr-indexability.ts
import fs from "node:fs";
import path from "node:path";

import { buildPSEOPage } from "../src/lib/pseo/page-builder";
import { qualityReport } from "../src/lib/pseo/quality-gate";
import type { PSEOPageInput } from "../src/lib/pseo/types";

function readJsonArray(relPath: string): any[] {
  const abs = path.join(process.cwd(), relPath);
  const raw = fs.readFileSync(abs, "utf8");
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error(`${relPath} is not an array`);
  return data;
}

function asPages(v: unknown): PSEOPageInput[] {
  return (Array.isArray(v) ? v : []).filter(Boolean) as PSEOPageInput[];
}

/**
 * Dedupes by slug. Priority: generated > manual (so pipeline output wins).
 * Matches src/lib/pseo/dataset.ts
 */
function dedupeBySlug(pages: PSEOPageInput[]): PSEOPageInput[] {
  const map = new Map<string, PSEOPageInput>();
  for (const p of pages) {
    if (!p?.slug) continue;
    map.set(p.slug, p);
  }
  return Array.from(map.values());
}

function getAllPages(): PSEOPageInput[] {
  const manual = asPages(readJsonArray("src/content/pseo/datasets/qr-ideas.json"));
  const generated = asPages(readJsonArray("src/content/pseo/datasets/qr-ideas.generated.json"));
  return dedupeBySlug([...manual, ...generated]);
}

function wordCountFromBuilt(built: { sections: { content: string }[] }): number {
  return built.sections
    .map((s) => s.content)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
}

const CLUSTER = "qr-codes";

const pages = getAllPages();
const clusterPages = pages.filter((p) => p.cluster === CLUSTER);

if (!clusterPages.length) {
  console.log(`No pages found for cluster "${CLUSTER}"`);
  process.exit(0);
}

let pass = 0;
let fail = 0;

const failures: { slug: string; reasons: string[]; internalLinks: number; wordCount: number }[] = [];

for (const input of clusterPages) {
  const siblings = clusterPages; // same cluster
  const built = buildPSEOPage(input, siblings);
  const report = qualityReport(built);

  const wc = wordCountFromBuilt(built);
  const il = (built.internalLinks || []).length;

  if (report.pass) {
    pass += 1;
  } else {
    fail += 1;
    failures.push({ slug: input.slug, reasons: report.reasons, internalLinks: il, wordCount: wc });
  }
}

console.log(`\nCluster "${CLUSTER}"`);
console.log(`Total: ${clusterPages.length}`);
console.log(`✅ Pass: ${pass}`);
console.log(`❌ Fail: ${fail}`);

if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures) {
    console.log(`- ${f.slug}`);
    console.log(`  reasons: ${JSON.stringify(f.reasons)}`);
    console.log(`  internalLinks: ${f.internalLinks}, wordCount: ${f.wordCount}`);
  }
} else {
  console.log("\nAll pages in cluster pass quality gate ✅");
}
