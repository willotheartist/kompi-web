// src/lib/pseo/section-generators/failure-cases.ts
import { PSEOPageInput, PSEOSection } from "../types";

function pickEntity(input: PSEOPageInput) {
  const value = input.entity?.value?.trim();
  const type = input.entity?.type?.trim();
  return {
    value: value && value.length ? value : "your context",
    type: type && type.length ? type : "general",
  };
}

export function generateFailureCases(input: PSEOPageInput): PSEOSection {
  const kw = input.primaryKeyword.toLowerCase();
  const { value: entity, type: entityType } = pickEntity(input);

  const lines: string[] = [];

  lines.push(
    `Most ${kw} failures aren’t “QR codes don’t work” problems — they’re execution and context problems. These are the situations that reliably kill results, plus what to do instead.`
  );

  lines.push(`When this does NOT work (and what to do instead):`);
  lines.push(
    `• No clear promise: If the label only says “Scan me”, people don’t know why they should act. Fix: state the outcome (“See today’s menu”, “Get the discount”, “Join the waitlist”).`,
    `• The destination is slow or messy: If the page loads slowly or is painful on mobile, scans won’t convert. Fix: keep it lightweight with one primary action above the fold.`,
    `• Bad placement: If it’s where people are moving fast or can’t physically scan, it won’t get used. Fix: place it where people pause (counter, table, entrance, receipt, packaging).`,
    `• Wrong size/contrast: If the code is tiny, glossy, low-contrast, or in glare, scans fail. Fix: increase size, use high contrast, avoid reflective surfaces.`,
    `• Too many choices: If the destination has 10 options, people bounce. Fix: 1 primary action + 2–4 supporting actions max.`,
    `• No tracking: If you reuse one code everywhere, you can’t improve. Fix: create separate codes per placement so you can compare performance.`,
    `• Broken trust: If users fear scams or don’t recognize the brand, they won’t scan. Fix: use recognizable branding and a readable short link as a trust cue.`,
    `• Message mismatch: If the CTA doesn’t match the moment, it feels irrelevant. Fix: write the CTA for the situation (${entity}) and make the destination fulfill that promise immediately.`
  );

  lines.push(`Tradeoffs to be aware of:`);
  lines.push(
    `• More tracking usually means more setup — but it pays off once you run repeated campaigns or multiple placements.`,
    `• More “creative” CTAs can lift scans, but only if the destination delivers instantly (no bait-and-switch).`,
    `• Landing pages add a step, but they often increase conversion when users need context, trust, or multiple actions.`
  );

  if (entityType === "industry") {
    lines.push(`In ${entity}, the most common failure is “QR to a cluttered page.” People want one fast action: menu/service list, booking, or a clear offer.`);
  } else if (entityType === "platform") {
    lines.push(`On ${entity}, the most common failure is “QR to a platform page with unpredictable app/web behavior.” Use a landing page when tracking and consistency matter.`);
  }

  return {
    id: "failure-cases",
    title: `When ${input.primaryKeyword} does not work`,
    content: lines.join("\n\n"),
  };
}
