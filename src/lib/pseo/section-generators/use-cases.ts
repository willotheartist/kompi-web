import { PSEOPageInput, PSEOSection } from "../types";

function titleCase(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function generateUseCases(input: PSEOPageInput): PSEOSection {
  const entityLabel =
    input.entity.type === "industry"
      ? `for ${input.entity.value}`
      : input.entity.type === "platform"
        ? `on ${input.entity.value}`
        : input.entity.type === "channel"
          ? `in ${input.entity.value}`
          : `for ${input.entity.value}`;

  const base = [
    {
      h: "Make it instantly actionable",
      p: `The best ${input.primaryKeyword.toLowerCase()} are the ones people can use immediately. Give a clear next step, not a vague prompt.`,
    },
    {
      h: "Place it where decisions happen",
      p: `Put the QR code or link at the moment someone is deciding: on the table, on packaging, at the entrance, on receipts, or on signage.`,
    },
    {
      h: "Track and iterate",
      p: `Treat it like a campaign. Track scans/clicks, see what works, and update the destination without reprinting when possible.`,
    },
  ];

  const industryExtras: Record<string, { h: string; p: string }[]> = {
    restaurants: [
      { h: "Menu and ordering", p: "Link to a QR menu, ordering page, or daily specials—then rotate weekly." },
      { h: "Reviews and loyalty", p: "Drive reviews or loyalty signups right after a good experience." },
    ],
    cafes: [
      { h: "Seasonal offers", p: "Swap the destination to highlight seasonal drinks, bundles, or breakfast deals." },
      { h: "WiFi and email capture", p: "Combine WiFi access with an optional email signup for repeat visits." },
    ],
    gyms: [
      { h: "Workout plans", p: "Put QR codes on equipment linking to exercise demos or routines." },
      { h: "Class schedule", p: "One code to the live timetable—update it without replacing posters." },
    ],
    "real estate": [
      { h: "Property details", p: "Add QR codes on signs to listings, video tours, and contact forms." },
      { h: "Open house follow-up", p: "Send visitors to a page that captures interest and schedules viewings." },
    ],
  };

  const extras =
    input.entity.type === "industry"
      ? industryExtras[input.entity.value.toLowerCase()] || []
      : [];

  const items = [...base, ...extras].slice(0, 6);

  const content = items
    .map((x) => `${titleCase(x.h)}\n${x.p}`)
    .join("\n\n");

  return {
    id: "use-cases",
    title: `High-performing use cases ${entityLabel}`,
    content,
  };
}
