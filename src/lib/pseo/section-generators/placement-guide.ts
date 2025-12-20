import { PSEOPageInput, PSEOSection } from "../types";

type Placement = {
  name: string;
  bestFor: string;
  linkTo: string;
  cta: string;
  measurement: string;
};

function bullets(lines: string[]) {
  return lines.map((l) => `• ${l}`).join("\n");
}

function restaurantPlacements(): Placement[] {
  return [
    {
      name: "Entrance / door",
      bestFor: "Waitlist, reservations, hours, directions",
      linkTo: "Waitlist or reservations page (or a simple landing page with buttons)",
      cta: "Scan to join the waitlist",
      measurement: "Track entrance scans separately from tables to measure intent before seating",
    },
    {
      name: "Window signage",
      bestFor: "Walk-ins, specials, first-time visitors",
      linkTo: "Today’s specials or menu highlight page",
      cta: "Scan for lunch specials",
      measurement: "Use a unique window QR to measure how much foot traffic converts",
    },
    {
      name: "Table tent / tabletop",
      bestFor: "Menu access, upsells, desserts, drinks",
      linkTo: "QR menu or menu sections (drinks, desserts, specials)",
      cta: "Scan for today’s menu",
      measurement: "Create separate QRs per section/zone to compare performance",
    },
    {
      name: "Receipt",
      bestFor: "Reviews, loyalty, repeat visits",
      linkTo: "Review destination or loyalty signup",
      cta: "Enjoyed it? Leave a quick review",
      measurement: "Receipt is best for reviews; track review-link clicks vs scans",
    },
    {
      name: "Packaging / takeout bag",
      bestFor: "Reorders, loyalty, social follow",
      linkTo: "Reorder page or loyalty signup + social links",
      cta: "Scan to reorder",
      measurement: "Track takeout packaging separately; it’s often a high-intent channel",
    },
    {
      name: "Counter / checkout",
      bestFor: "Promotions, loyalty signup, catering",
      linkTo: "Rewards signup or catering inquiry",
      cta: "Scan to join rewards",
      measurement: "Compare counter scans vs receipt scans; double down on the winner",
    },
  ];
}

function genericPlacements(input: PSEOPageInput): Placement[] {
  const kw = input.primaryKeyword.toLowerCase();
  return [
    {
      name: "Primary surface (where attention is highest)",
      bestFor: "Your #1 action",
      linkTo: "A landing page with one primary action and 2–4 backup actions",
      cta: `Scan for ${kw}`,
      measurement: "Use one QR per placement to understand performance differences",
    },
    {
      name: "Point-of-completion (after purchase/action)",
      bestFor: "Reviews, loyalty, follow-ups",
      linkTo: "Feedback/review or signup page",
      cta: "Scan to leave feedback",
      measurement: "Measure completion rate; shorten the flow if drop-off is high",
    },
    {
      name: "Outbound materials (flyers, emails, packaging)",
      bestFor: "Campaign attribution",
      linkTo: "A campaign-specific page",
      cta: "Scan to get the offer",
      measurement: "Add UTMs and keep this QR unique per campaign",
    },
  ];
}

export function generatePlacementGuide(input: PSEOPageInput): PSEOSection {
  const isRestaurants =
    input.entity.type === "industry" && input.entity.value.toLowerCase() === "restaurants";

  const placements = isRestaurants ? restaurantPlacements() : genericPlacements(input);

  const blocks = placements.map((p) =>
    [
      p.name,
      bullets([
        `Best for: ${p.bestFor}`,
        `Link to: ${p.linkTo}`,
        `CTA: ${p.cta}`,
        `Measurement: ${p.measurement}`,
      ]),
    ].join("\n")
  );

  const rule = [
    "Golden rule: one QR code per placement.",
    "If you reuse the same QR everywhere, your analytics becomes useless because you can’t tell what worked.",
  ].join("\n");

  return {
    id: "placement-guide",
    title: "Placement guide (where to put it and what to link to)",
    content: `${rule}\n\n${blocks.join("\n\n")}`,
  };
}
