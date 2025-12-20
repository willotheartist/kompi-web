// src/lib/pseo/section-generators/checkpoint.ts
import { PSEOPageInput, PSEOSection } from "../types";

function titleCase(s: string) {
  return s
    .trim()
    .split(/\s+/g)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function pickEntity(input: PSEOPageInput) {
  const value = input.entity?.value?.trim();
  const type = input.entity?.type?.trim();
  return {
    value: value && value.length ? value : "your audience",
    type: type && type.length ? type : "general",
  };
}

export function generateCheckpoint(input: PSEOPageInput): PSEOSection {
  const kw = input.primaryKeyword.toLowerCase();
  const { value: entity } = pickEntity(input);

  const lines: string[] = [];

  lines.push(`Checkpoint: choose your path`);
  lines.push(
    `If you only do one thing after reading this guide: make the destination match the moment. A generic “scan me” ${kw} underperforms. A promise like “See today’s specials” wins because it answers “why should I scan?” in one second.`
  );

  lines.push(`Choose your path (based on what you’re trying to achieve):`);
  lines.push(
    `• If you need to update content without reprinting, use an editable destination (menu page / link page / landing page / dynamic destination).`,
    `• If you care about performance, separate placements so you can compare scans and clicks per location (window vs counter vs table vs receipt).`,
    `• If you’re doing this for ${entity}, start with one primary action and get that working before you add supporting actions.`
  );

  lines.push(`Quick decision rule:`);
  lines.push(
    `• Low volume + one-off use → keep it simple (one code, one destination, one CTA).`,
    `• High volume + repeated use → optimize for tracking + iteration (separate placements, measure, refine).`
  );

  lines.push(`One-step upgrade (most people skip this):`);
  lines.push(
    `• Add one sentence of “what happens next” on the destination (e.g., “Show this screen to staff” / “You’ll get a confirmation email”). It reduces uncertainty and lifts conversion.`
  );

  return {
    id: "checkpoint",
    title: `${titleCase(input.primaryKeyword)}: the decision checkpoint`,
    content: lines.join("\n\n"),
  };
}
