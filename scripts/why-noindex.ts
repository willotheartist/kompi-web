// scripts/why-noindex.ts
import fs from "node:fs";
import path from "node:path";

import { buildPSEOPage } from "../src/lib/pseo/page-builder";
import { qualityReport } from "../src/lib/pseo/quality-gate";
import type { PSEOPageInput } from "../src/lib/pseo/types";

function readJsonArray(relPath: string): unknown[] {
  const abs = path.join(process.cwd(), relPath);
  const raw = fs.readFileSync(abs, "utf8");
  const data: unknown = JSON.parse(raw);
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
  const generated = asPages(
    readJsonArray("src/content/pseo/datasets/qr-ideas.generated.json")
  );
  return dedupeBySlug([...manual, ...generated]);
}

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: pnpm tsx scripts/why-noindex.ts <slug>");
  process.exit(1);
}

const pages = getAllPages();
const input = pages.find((p) => p.slug === slug);

if (!input) {
  console.error("Not found in datasets:", slug);
  process.exit(1);
}

const siblings = pages.filter((p) => p.cluster === input.cluster);

const built = buildPSEOPage(input, siblings);
const report = qualityReport(built);

const wordCount = built.sections
  .map((s) => s.content)
  .join(" ")
  .split(/\s+/)
  .filter(Boolean).length;

console.log("slug:", slug);
console.log("index:", built.index);
console.log("reasons:", report.reasons);
console.log("wordCount:", wordCount);
console.log("sections:", built.sections.length);
console.log("internalLinks:", (built.internalLinks || []).length);
