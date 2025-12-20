// src/lib/pseo/section-generators/examples.ts
import { PSEOPageInput, PSEOSection } from "../types";

function item(title: string, body: string) {
  return `${title}: ${body}`;
}

function pickEntity(input: PSEOPageInput) {
  const value = input.entity?.value?.trim();
  const type = input.entity?.type?.trim();
  return {
    value: value && value.length ? value : "your audience",
    type: type && type.length ? type : "general",
  };
}

export function generateExamples(input: PSEOPageInput): PSEOSection {
  const kw = input.primaryKeyword.toLowerCase();
  const { value: entity, type: entityType } = pickEntity(input);

  const common = [
    item(
      "One destination, one primary action",
      "Make the main action obvious (button/heading). Supporting actions are fine, but don’t compete."
    ),
    item(
      "Short, readable destinations",
      "If you must show a URL (posters/packaging), use a short link that’s easy to type and builds trust."
    ),
    item(
      "One placement per code",
      "Don’t reuse the same QR for the window, the table, and the receipt—track them separately so you learn."
    ),
    item(
      "One sentence of certainty",
      "Add “what happens next” on the destination to reduce doubt and increase completion."
    ),
  ];

  const industrySpecific =
    entityType === "industry"
      ? [
          item(
            "Menu or price list",
            `A QR code that opens a clean menu or service list tailored to ${entity}. Keep it fast and scannable.`
          ),
          item(
            "Offer of the week",
            `A rotating page for limited-time offers—great for repeat visits in ${entity}. Make redemption obvious.`
          ),
          item(
            "Reviews at the right moment",
            "A QR to reviews right after purchase (receipt/packaging). Ask for one platform only—don’t scatter."
          ),
          item(
            "Contact or booking",
            "A QR to booking/contact with prefilled context (service type, location, date). Fewer fields wins."
          ),
          item(
            "Waitlist / queue",
            "A QR to join the queue with a clear status promise (“We’ll text you when ready”)."
          ),
        ]
      : entityType === "platform"
      ? [
          item(
            "Profile jump with fallback",
            `A QR that opens your ${entity} profile fast, with a fallback link if app/web differs.`
          ),
          item(
            "Campaign tracking you can trust",
            `Attach UTMs so you can see scans as “${entity} QR” in analytics, not mystery traffic.`
          ),
          item(
            "Lead capture before platform",
            "Use a landing page that captures email first when the relationship matters more than the click."
          ),
          item(
            "Offer → platform",
            "Promise a specific outcome on the QR, then deliver it immediately before sending to the platform."
          ),
        ]
      : [
          item(
            "Signup capture",
            "Send to a simple form with one field first, then ask for more later once trust is earned."
          ),
          item(
            "Segmented tracking",
            `Use UTMs to see which ${entity} placements drive results (and which are wasted).`
          ),
          item(
            "Follow-up automation",
            "Connect signups to sequences so the QR/link generates compounding value instead of one-off clicks."
          ),
          item(
            "Support deflection",
            "A QR to the one-page answer people need most (hours, returns, shipping, setup)."
          ),
        ];

  const structure = [
    "A simple structure that works:",
    "1) Hook: one-sentence value (“Get today’s specials”).",
    "2) Primary action: the #1 action you want.",
    "3) Backup actions: 2–4 secondary actions.",
    "4) Trust: proof, reviews, or “what happens next”.",
    "5) Tracking: measure scans/clicks and iterate.",
  ].join("\n");

  const list = [...industrySpecific.slice(0, 6), ...common]
    .slice(0, 10)
    .map((x) => `• ${x}`)
    .join("\n");

  return {
    id: "examples",
    title: `Practical ${kw} you can copy`,
    content: `${list}\n\n${structure}`,
  };
}
