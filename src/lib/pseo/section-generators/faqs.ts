// src/lib/pseo/section-generators/faqs.ts
import { PSEOPageInput, PSEOSection } from "../types";

function qa(q: string, a: string) {
  // IMPORTANT:
  // quality-gate counts bullets by lines starting with "• "
  // so each FAQ must begin with "• "
  return `• Q: ${q}\n  A: ${a}`;
}

function pickEntity(input: PSEOPageInput) {
  const value = input.entity?.value?.trim();
  const type = input.entity?.type?.trim();
  return {
    value: value && value.length ? value : "your context",
    type: type && type.length ? type : "general",
  };
}

export function generateFAQs(input: PSEOPageInput): PSEOSection {
  const kw = input.primaryKeyword.toLowerCase();
  const { value: entity, type: entityType } = pickEntity(input);

  const faqs = [
    qa(
      `What are the best ${kw}?`,
      `The best ${kw} are simple, measurable, and tied to one clear action. Start with 1–3 high-intent placements, track performance, then scale what works.`
    ),
    qa(
      `Should I use a static or dynamic QR code?`,
      `If you want to update the destination later or track results per placement, use a changeable destination (dynamic/editable). If you will never change the destination and tracking doesn’t matter, a static destination can work.`
    ),
    qa(
      `How do I track QR code performance?`,
      `Use a trackable destination (short link + analytics) and separate QR codes per placement so you can compare performance accurately instead of guessing.`
    ),
    qa(
      `What’s a good scan-to-action rate?`,
      `It depends on context, but the biggest driver is “clarity of promise”. A strong CTA + easy next step can outperform a generic “scan me” by multiples. Use your baseline, then improve placement and destination first.`
    ),
    qa(
      `What’s the biggest mistake people make with ${kw}?`,
      `Sending scans to a slow, messy page with too many choices. Fix it by using one primary action, fast load, and a clear “what happens next” line.`
    ),
    qa(
      `How many QR codes should I create?`,
      `Start with 1–3. If performance matters, split by placement (table vs counter vs window). If campaigns matter, split by campaign. Don’t split everything at once.`
    ),
    qa(
      `How can Kompi help with ${kw}?`,
      `Kompi helps you create trackable links and QR codes, measure clicks/scans, and iterate quickly. You can update destinations and improve performance over time.`
    ),
  ];

  const extra =
    entityType === "industry"
      ? qa(
          `What’s a great first QR code to add in ${entity}?`,
          `Start with one code that removes friction: a menu/service list, booking/contact, or “today’s offer”. Place it where the customer already pauses (counter, table, receipt). Track it, then add the second placement.`
        )
      : entityType === "platform"
      ? qa(
          `Should my QR code go directly to ${entity} or to a landing page first?`,
          `Go direct when speed is the only goal. Use a landing page first when you need tracking consistency, context/trust, multiple actions, or lead capture before the platform click.`
        )
      : qa(
          `What should my QR code link to first?`,
          `Link to a simple landing page with one main action, then include 2–4 supporting actions. This usually converts better than sending people directly to a generic external destination.`
        );

  return {
    id: "faqs",
    title: "FAQs",
    content: [...faqs, extra].join("\n\n"),
  };
}
