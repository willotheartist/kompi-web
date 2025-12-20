// scripts/backfill-pseo-dates.mjs
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const files = [
  "src/content/pseo/datasets/qr-ideas.json",
  "src/content/pseo/datasets/qr-ideas.generated.json",
];

const DEFAULT_PUBLISHED_AT = "2025-12-19"; // set to “yesterday’s generation day” (adjust if needed)
const DEFAULT_UPDATED_AT = "2025-12-19";

function isISODate(v) {
  return typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v.trim());
}

function loadJson(p) {
  const abs = path.join(root, p);
  const raw = fs.readFileSync(abs, "utf8");
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error(`${p} is not an array`);
  return { abs, data };
}

function saveJson(abs, data) {
  fs.writeFileSync(abs, JSON.stringify(data, null, 2) + "\n", "utf8");
}

let changedTotal = 0;

for (const p of files) {
  const { abs, data } = loadJson(p);

  let changed = 0;
  const next = data.map((row) => {
    if (!row || typeof row !== "object") return row;

    const publishedAt = isISODate(row.publishedAt) ? row.publishedAt : DEFAULT_PUBLISHED_AT;
    const updatedAt = isISODate(row.updatedAt) ? row.updatedAt : (row.publishedAt ?? DEFAULT_UPDATED_AT);

    const needs =
      !isISODate(row.publishedAt) ||
      !isISODate(row.updatedAt);

    if (!needs) return row;

    changed += 1;
    return {
      ...row,
      publishedAt,
      updatedAt: isISODate(updatedAt) ? updatedAt : DEFAULT_UPDATED_AT,
    };
  });

  if (changed > 0) {
    saveJson(abs, next);
    console.log(`✅ Updated ${changed} rows in ${p}`);
    changedTotal += changed;
  } else {
    console.log(`— No changes needed for ${p}`);
  }
}

console.log(`\nDone. Total rows updated: ${changedTotal}`);
