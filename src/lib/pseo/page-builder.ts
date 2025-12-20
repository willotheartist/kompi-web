// src/lib/pseo/page-builder.ts
import { BuiltPSEOPage, PSEOPageInput } from "./types";
import { generateIntro } from "./section-generators/intro";
import { generateIdeaLibrary } from "./section-generators/idea-library";
import { generateCTASwipe } from "./section-generators/cta-swipe";
import { generatePlacementGuide } from "./section-generators/placement-guide";
import { generateDecisionTable } from "./section-generators/decision-table";
import { generateFailureCases } from "./section-generators/failure-cases";
import { generateCheckpoint } from "./section-generators/checkpoint";
import { generateUseCases } from "./section-generators/use-cases";
import { generateExamples } from "./section-generators/examples";
import { generateKompiAngle } from "./section-generators/kompi-angle";
import { generateFAQs } from "./section-generators/faqs";
import { generateConclusion } from "./section-generators/conclusion";
import { buildInternalLinks } from "./internal-links";
import { passesQualityGate, qualityReport } from "./quality-gate";

function cleanTitle(s: string) {
  return s.trim().replace(/\s+/g, " ");
}

export function buildPSEOPage(
  input: PSEOPageInput,
  siblings: PSEOPageInput[]
): BuiltPSEOPage {
  const sections = [
    generateIntro(input),

    generateIdeaLibrary(input),
    generateCTASwipe(input),
    generatePlacementGuide(input),

    generateDecisionTable(input),
    generateFailureCases(input),

    generateCheckpoint(input),

    generateUseCases(input),
    generateExamples(input),
    generateKompiAngle(input),
    generateFAQs(input),
    generateConclusion(),
  ];

  const internalLinks = buildInternalLinks(input, siblings);

  const page: BuiltPSEOPage = {
    slug: input.slug,
    title: cleanTitle(input.primaryKeyword),
    description: `A practical guide to ${input.primaryKeyword.toLowerCase()} with examples, use-cases, placement tips, decision rules, and copy/paste ideas.`,
    sections,
    internalLinks,
    index: input.index,
  };

  if (!passesQualityGate(page)) {
    page.index = false;

    if (process.env.NODE_ENV !== "production") {
      const report = qualityReport(page);
      console.warn(`[PSEO] noindex: /blog/${page.slug}`, report.reasons);
    }
  }

  return page;
}
