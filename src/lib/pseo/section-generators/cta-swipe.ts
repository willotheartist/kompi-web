import { PSEOPageInput, PSEOSection } from "../types";

function restaurantCTAs(): string[] {
  return [
    "Scan for today’s menu",
    "Scan for lunch specials",
    "Scan to order pickup",
    "Scan to reserve a table",
    "Scan to join the waitlist",
    "Scan for dessert menu",
    "Scan for drink specials",
    "Scan for happy hour",
    "Scan for allergens and dietary info",
    "Scan for the kids menu",
    "Scan to join rewards",
    "Scan for catering",
    "Scan to leave feedback (30 seconds)",
    "Enjoyed it? Leave a quick review",
    "Scan to see today’s chef’s picks",
    "Scan for seasonal dishes",
    "Scan to get a limited-time deal",
    "Scan for directions and hours",
    "Scan for our Instagram",
    "Scan for private events",
  ];
}

function genericCTAs(input: PSEOPageInput): string[] {
  const kw = input.primaryKeyword.toLowerCase();
  return [
    `Scan for ${kw}`,
    "Scan to get started",
    "Scan for a quick answer",
    "Scan to see pricing",
    "Scan to contact us",
    "Scan to book",
    "Scan for today’s offer",
    "Scan to join updates",
    "Scan for examples you can copy",
    "Scan to track results",
  ];
}

export function generateCTASwipe(input: PSEOPageInput): PSEOSection {
  const isRestaurants =
    input.entity.type === "industry" && input.entity.value.toLowerCase() === "restaurants";

  const list = (isRestaurants ? restaurantCTAs() : genericCTAs(input))
    .map((t) => `• ${t}`)
    .join("\n");

  const tips = [
    "CTA tips that increase scans:",
    "• Say what happens after scanning (menu, offer, booking, review).",
    "• Keep it short (6–10 words).",
    "• Make the destination match the promise.",
    "• Add a reason when useful (e.g., “today’s specials”, “10% off”, “skip the line”).",
  ].join("\n");

  return {
    id: "cta-swipe",
    title: "CTA swipe file (copy/paste)",
    content: `${list}\n\n${tips}`,
  };
}
