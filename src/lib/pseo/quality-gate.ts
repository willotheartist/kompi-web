// src/lib/pseo/quality-gate.ts
import { BuiltPSEOPage } from "./types";

function countWords(text: string): number {
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

function countBullets(text: string): number {
  // Your content uses "• " consistently — keep it simple and deterministic
  const m = text.match(/(^|\n)•\s+/g);
  return m ? m.length : 0;
}

function hasDecisionLanguage(text: string): boolean {
  return /if you|if you're|when to|choose|decision|tradeoff|instead|fix:/i.test(text);
}

function hasFailureLanguage(text: string): boolean {
  return /does not work|doesn't work|fails|failure|common mistakes|what to do instead|fix:/i.test(text);
}

function sectionById(page: BuiltPSEOPage, id: string) {
  return page.sections.find((s) => s.id === id);
}

function estimateConceptUnits(page: BuiltPSEOPage): number {
  const ids = new Set(page.sections.map((s) => s.id));

  let units = 0;

  const conceptSections = [
    "idea-library",
    "cta-swipe",
    "placement-guide",
    "use-cases",
    "examples",
    "kompi-angle",
    "faqs",
    "decision-table",
    "failure-cases",
    "checkpoint",

    // ✅ UTM-specific sections
    "utm-presets",
    "utm-naming",
  ];

  for (const id of conceptSections) {
    if (ids.has(id)) units += 1;
  }

  const combined = page.sections.map((s) => s.content).join("\n");
  const bullets = countBullets(combined);
  units += Math.floor(bullets / 14); // was /12 (slightly less strict)

  if (hasDecisionLanguage(combined)) units += 1;
  if (hasFailureLanguage(combined)) units += 1;

  return units;
}

export function qualityReport(page: BuiltPSEOPage): { pass: boolean; reasons: string[] } {
  const reasons: string[] = [];

  const wordCount = page.sections.map((s) => countWords(s.content)).reduce((a, b) => a + b, 0);

  // ✅ Slightly less strict for launch
  if (wordCount < 1050) reasons.push("wordCount<1050");

  // You generate 12 sections currently, so this shouldn't fail unless a generator returns empty.
  if (page.sections.length < 9) reasons.push("sections<9");

  if (!page.sections.some((s) => s.id === "kompi-angle")) reasons.push("missing-kompi-angle");

  // Information gain — keep mandatory
  if (!page.sections.some((s) => s.id === "failure-cases")) reasons.push("missing-failure-cases");
  if (!page.sections.some((s) => s.id === "decision-table")) reasons.push("missing-decision-table");
  if (!page.sections.some((s) => s.id === "checkpoint")) reasons.push("missing-checkpoint");

  // ✅ Make internal linking threshold realistic for early clusters
  if ((page.internalLinks || []).length < 6) reasons.push("internalLinks<6");

  // Bullets: slightly less strict (still forces structured, useful content)
  const faqs = sectionById(page, "faqs");
  if (!faqs || countBullets(faqs.content) < 4) reasons.push("faqs<4-bullets");

  const failure = sectionById(page, "failure-cases");
  if (!failure || countBullets(failure.content) < 4) reasons.push("failure<4-bullets");

  const decision = sectionById(page, "decision-table");
  if (!decision || countBullets(decision.content) < 5) reasons.push("decision<5-bullets");

  const examples = sectionById(page, "examples");
  if (!examples || countBullets(examples.content) < 5) reasons.push("examples<5-bullets");

  const conceptUnits = estimateConceptUnits(page);
  if (conceptUnits < 7) reasons.push("conceptUnits<7");

  return { pass: reasons.length === 0, reasons };
}

export function passesQualityGate(page: BuiltPSEOPage): boolean {
  return qualityReport(page).pass;
}
