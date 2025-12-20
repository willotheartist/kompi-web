// src/lib/pseo/internal-links.ts
import { PSEOPageInput } from "./types";

function uniq(list: string[]) {
  return Array.from(new Set(list));
}

function safeLower(s?: string) {
  return (s || "").toLowerCase();
}

function normalizeIntent(intent?: string): "learn" | "compare" | "do" | "track" | "fix" {
  const i = safeLower(intent);
  if (i === "informational") return "learn";
  if (i === "learn" || i === "compare" || i === "do" || i === "track" || i === "fix") return i;
  // Unknown -> assume learn (safest default for internal linking)
  return "learn";
}

type LinkPick = {
  url: string;
  type: "hub" | "cluster" | "intent" | "entity" | "tool";
};

export function buildInternalLinks(input: PSEOPageInput, siblings: PSEOPageInput[]): string[] {
  const picks: LinkPick[] = [];
  const others = siblings.filter((s) => s.slug !== input.slug);

  // 1) Hub (always)
  picks.push({ url: `/blog/${input.hub}`, type: "hub" });

  // 2) Cluster depth (up to 5)
  others
    .filter((s) => s.cluster === input.cluster)
    .slice(0, 5)
    .forEach((s) => picks.push({ url: `/blog/${s.slug}`, type: "cluster" }));

  // 3) Next-question intent pack (up to 3, within same cluster when possible)
  const intent = normalizeIntent(input.intent);

  const nextIntentTargets =
    intent === "learn"
      ? ["compare", "do", "track"]
      : intent === "compare"
      ? ["do", "track", "learn"]
      : intent === "do"
      ? ["track", "fix", "learn"]
      : intent === "track"
      ? ["fix", "learn", "compare"]
      : ["learn", "compare", "do"];

  for (const target of nextIntentTargets) {
    const match = others.find(
      (s) => normalizeIntent(s.intent) === target && s.cluster === input.cluster
    );
    if (match) picks.push({ url: `/blog/${match.slug}`, type: "intent" });
  }

  // 4) Same entity links (up to 2) — only if entity exists
  const entityValue = safeLower(input.entity?.value);
  if (entityValue) {
    others
      .filter((s) => safeLower(s.entity?.value) === entityValue)
      .filter((s) => s.cluster !== input.cluster)
      .slice(0, 2)
      .forEach((s) => picks.push({ url: `/blog/${s.slug}`, type: "entity" }));
  }

  // 5) Tool links (up to 3)
  (input.kompiTools || []).slice(0, 3).forEach((tool) => picks.push({ url: tool, type: "tool" }));

  // Dedupe while keeping priority order, then cap
  const urls = uniq(picks.map((p) => p.url));
  return urls.slice(0, 12);
}
