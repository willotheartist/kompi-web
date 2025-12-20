// src/lib/pseo/section-generators/decision-table.ts
import { PSEOPageInput, PSEOSection } from "../types";

function row(left: string, right: string) {
  return `• ${left} → ${right}`;
}

function pickEntity(input: PSEOPageInput) {
  const value = input.entity?.value?.trim();
  const type = input.entity?.type?.trim();
  return {
    value: value && value.length ? value : "your audience",
    type: type && type.length ? type : "general",
  };
}

export function generateDecisionTable(input: PSEOPageInput): PSEOSection {
  const { value: entity, type: entityType } = pickEntity(input);

  const lines: string[] = [];

  lines.push(
    `Use this decision table to choose the simplest setup that still produces the outcome you want.`
  );

  lines.push(`Decision table (practical rules you can follow today):`);

  lines.push(
    row(
      `You want to change content after printing`,
      `Send scans to an editable destination (link page / menu page / landing page) instead of hard-coding details`
    ),
    row(
      `You want to measure which location performs best`,
      `Use one code per placement (window vs counter vs table vs receipt) so attribution is real`
    ),
    row(
      `You want the highest conversion rate`,
      `Use one primary action per destination; supporting actions are fine, competing actions are not`
    ),
    row(
      `You’re running a short campaign`,
      `Use a dedicated campaign destination with an expiry, clear redemption steps, and a “what happens next” line`
    ),
    row(
      `You’re collecting leads or feedback`,
      `Use the shortest possible form first (1–2 fields). Add fields only after you prove completion rates`
    ),
    row(
      `You’re worried about QR trust and scams`,
      `Use a readable short link + brand cues on the destination (logo/title). Don’t hide the intent`
    ),
    row(
      `You’re placing this in low-signal environments (glare, distance, movement)`,
      `Make scanning easy: bigger code, high contrast, and place where people pause`
    ),
    row(
      `You’re doing repeat campaigns`,
      `Optimize for iteration: tracking + versioning beats “set-and-forget”`
    )
  );

  lines.push(`Common forks (choose A vs B):`);
  lines.push(
    `• Simple vs trackable: simple is faster today; trackable is easier to improve tomorrow.`,
    `• One destination vs many: one is easier to manage; many is better for attribution and learning.`,
    `• Generic CTA vs specific CTA: specific CTAs lift scans when they match the destination instantly.`,
    `• Direct-to-platform vs landing page first: direct is fewer steps; landing pages convert better when you need context + trust.`,
    `• One QR everywhere vs one per placement: one is easy; per placement is how you find what actually works.`
  );

  lines.push(`Quick decision rules (no overthinking):`);
  lines.push(
    `• If you can’t measure it, you can’t improve it → split placements when results matter.`,
    `• If your destination takes more than 1–2 seconds to feel useful, conversion drops → simplify.`,
    `• If your CTA promise isn’t fulfilled immediately, scans stop → align promise and page.`,
    `• If your audience is ${entity}, your CTA should be written for that moment (not a generic “scan me”).`
  );

  lines.push(
    `If you’re unsure: start with one placement + one destination, measure baseline performance, then split placements once you have data.`
  );

  if (entityType === "industry") {
    lines.push(
      `For ${entity} specifically: prioritize “remove friction” destinations first (menu/service list, booking/contact, or a single offer).`
    );
  } else if (entityType === "platform") {
    lines.push(
      `For ${entity}: don’t rely on app behavior alone. Use a landing page when you need consistent tracking across app/web.`
    );
  }

  return {
    id: "decision-table",
    title: `${input.primaryKeyword}: decision table`,
    content: lines.join("\n\n"),
  };
}
