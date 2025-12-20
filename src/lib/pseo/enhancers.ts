export type BuiltSection = { id: string; title: string; content: string };

export type Tldr = { bullets: string[] };
export type Example = { title: string; linkTo?: string; cta?: string; tracking?: string };
export type PlaybookWeek = { title: string; bullets: string[] };

function clean(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function takeSentences(text: string, max = 6) {
  const raw = clean(text)
    .replace(/\b(eg|e\.g)\./gi, "eg")
    .replace(/\b(i\.e)\./gi, "ie");
  const parts = raw.split(/(?<=[.!?])\s+/).map((x) => x.trim()).filter(Boolean);
  return parts.slice(0, max);
}

export function buildTLDR(sections: BuiltSection[]): Tldr {
  // Pull from intro-ish content and any bullet lines.
  const bullets: string[] = [];

  for (const s of sections) {
    const lines = s.content.split("\n").map((x) => x.trim()).filter(Boolean);

    // Prefer bullet lines if present
    for (const l of lines) {
      if (l.startsWith("• ")) {
        bullets.push(clean(l.slice(2)));
        if (bullets.length >= 6) return { bullets };
      }
    }

    // Otherwise convert first 1–2 sentences into bullets
    const sentences = takeSentences(s.content, 2);
    for (const sent of sentences) {
      if (sent.length >= 40 && sent.length <= 140) bullets.push(sent);
      if (bullets.length >= 6) return { bullets };
    }

    if (bullets.length >= 4) break;
  }

  return { bullets: bullets.slice(0, 6) };
}

function parseKVP(line: string) {
  const idx = line.indexOf(":");
  if (idx === -1) return null;
  const key = clean(line.slice(0, idx));
  const val = clean(line.slice(idx + 1));
  return { key, val };
}

export function extractExamples(sections: BuiltSection[], max = 24): Example[] {
  // Heuristic:
  // - treat headings OR bold-ish lines as example titles
  // - capture subsequent "What to link to:", "CTA:", "Tracking tip:" lines
  const out: Example[] = [];
  let current: Example | null = null;

  const commit = () => {
    if (!current) return;
    const hasAny = current.linkTo || current.cta || current.tracking;
    if (current.title && hasAny) out.push(current);
    current = null;
  };

  for (const s of sections) {
    const lines = s.content.split("\n").map((x) => x.trim());

    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;

      // Detect a new example “title”
      // Examples often appear as: "Menu QR" / "Reviews" / "Wi-Fi" etc.
      const isTitleish =
        (line.length <= 52 && !line.endsWith(".") && !/^What to link to:|^CTA:|^Tracking tip:/i.test(line)) &&
        (/^[A-Z0-9]/.test(line));

      if (isTitleish && !line.startsWith("• ")) {
        // if we already have a current and we hit another titleish line, commit and start new
        if (current) commit();
        current = { title: clean(line) };
        continue;
      }

      // Also allow bullet titles like "• Menu QR ..."
      if (line.startsWith("• ")) {
        const maybe = clean(line.slice(2));
        // if it's long, treat as a bullet item, not title
        if (maybe.length <= 60 && !maybe.includes(":")) {
          if (current) commit();
          current = { title: maybe };
          continue;
        }
      }

      // Capture structured fields if present
      if (/^What to link to:/i.test(line) || /^CTA:/i.test(line) || /^Tracking tip:/i.test(line)) {
        const kv = parseKVP(line);
        if (!kv) continue;
        if (!current) current = { title: "Example" };

        if (/^What to link to$/i.test(kv.key)) current.linkTo = kv.val;
        if (/^CTA$/i.test(kv.key)) current.cta = kv.val;
        if (/^Tracking tip$/i.test(kv.key)) current.tracking = kv.val;

        // If we have 2+ fields, it's a solid example
        const fields = [current.linkTo, current.cta, current.tracking].filter(Boolean).length;
        if (fields >= 2 && out.length < max) {
          // keep accumulating until another title begins; do not commit yet
        }
        continue;
      }
    }

    if (out.length >= max) break;
  }

  commit();
  return out.slice(0, max);
}

export function buildPlaybook(topicTitle: string): PlaybookWeek[] {
  const topic = topicTitle.toLowerCase();

  const week1: PlaybookWeek = {
    title: "Week 1 — Launch the first 3 placements",
    bullets: [
      "Pick 3 placements where customers already pause (counter, table, receipt/window).",
      "Create one QR per placement (don’t reuse the same code everywhere).",
      "Set each QR to a specific destination (menu / order / review / Wi-Fi / booking).",
      "Add a clear CTA next to the QR (tell people exactly what they’ll get).",
      "Verify tracking works (scan, click, and confirm analytics records).",
    ],
  };

  const week2: PlaybookWeek = {
    title: "Week 2 — Measure and iterate",
    bullets: [
      "Compare performance by placement (scans/clicks per location).",
      "Change only one variable at a time (CTA text OR destination OR placement).",
      "Swap weak destinations for a simpler one-step page (less choice, more action).",
      "Create a ‘winner’ version and roll it out to 2 more placements.",
      "Log results weekly so you build a repeatable playbook.",
    ],
  };

  const week3: PlaybookWeek = {
    title: "Week 3 — Systemize and scale",
    bullets: [
      "Turn top performers into templates (copy, destination, design).",
      "Add a second conversion path (review + signup, booking + menu, etc.) only after the primary works.",
      "Create a monthly rotation plan (seasonal offers / limited-time menus).",
      "Standardize signage so staff can deploy new QRs in minutes.",
      "Scale the same framework to other locations/channels (flyers, delivery bags, receipts).",
    ],
  };

  // Tiny topical flavor (still generic enough to scale)
  if (topic.includes("cafe") || topic.includes("coffee")) {
    week1.bullets[2] = "Set each QR to a specific destination (menu, seasonal drink, loyalty, review, Wi-Fi).";
  }
  if (topic.includes("restaurant")) {
    week1.bullets[2] = "Set each QR to a specific destination (menu, ordering, reservations, reviews, Wi-Fi).";
  }

  return [week1, week2, week3];
}

export function buildTOC(sections: BuiltSection[]) {
  const slugify = (s: string) =>
    s.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return sections.map((s) => ({ id: slugify(s.title), title: s.title }));
}

import { PSEOIntent, PSEOPageInput } from "./types";

function normalize(s: string) {
  return s.toLowerCase();
}

export function inferIntentFromKeyword(keyword: string): PSEOIntent {
  const k = normalize(keyword);

  if (
    k.includes("vs") ||
    k.includes("best") ||
    k.includes("which") ||
    k.includes("compare")
  ) {
    return "compare";
  }

  if (
    k.includes("how to") ||
    k.includes("examples") ||
    k.includes("setup") ||
    k.includes("guide")
  ) {
    return "do";
  }

  if (
    k.includes("track") ||
    k.includes("analytics") ||
    k.includes("measure") ||
    k.includes("optimize")
  ) {
    return "track";
  }

  if (
    k.includes("not working") ||
    k.includes("doesn't work") ||
    k.includes("mistake") ||
    k.includes("fix")
  ) {
    return "fix";
  }

  return "learn";
}

export function inferClusterFromKeyword(keyword: string): string {
  const k = normalize(keyword);

  if (k.includes("qr")) return "qr";
  if (k.includes("link")) return "links";
  if (k.includes("utm")) return "utm";
  if (k.includes("bio")) return "bio";
  if (k.includes("menu")) return "qr-menu";
  if (k.includes("analytics")) return "analytics";

  return "general";
}

export function enhancePSEOInput(input: PSEOPageInput): PSEOPageInput {
  return {
    ...input,
    intent: input.intent ?? inferIntentFromKeyword(input.primaryKeyword),
    cluster: input.cluster || inferClusterFromKeyword(input.primaryKeyword),
  };
}
