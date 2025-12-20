import { PSEOPageInput, PSEOSection } from "../types";

export function generateKompiAngle(input: PSEOPageInput): PSEOSection {
  const kw = input.primaryKeyword.toLowerCase();

  const lines: string[] = [];

  lines.push(
    `Instead of guessing or using disconnected tools, Kompi helps you implement ${kw} properly: create, track, and improve performance in one place.`
  );

  lines.push(
    `The winning pattern is simple: one clear action, the right placement, and tracking so you can iterate.`
  );

  lines.push(
    `A good “Kompi flow” you can use:`,
    `1) Create a destination that matches the placement (menu, offer, booking, contact, review, or signup).`,
    `2) Generate a QR code or short link for that specific placement.`,
    `3) Track scans/clicks and compare placements.`,
    `4) Improve the destination or CTA based on what’s working.`
  );

  lines.push(
    `What to use in Kompi:`,
    `• QR menus: /qr-menus (great for restaurants, cafes, and venues).`,
    `• QR codes: /qr-code/dynamic (editable + trackable) or /qr-code/static (fixed destination).`,
    `• QR codes with logos: /qr-code/with-logo (branding + better recall).`,
    `• Short links and tracking: /features/url-shortener and /links (for readable, trackable destinations).`
  );

  lines.push(
    `Tip: don’t use one QR code everywhere. Create a separate QR code per placement (window, table, receipt, flyer). That way your analytics tells you what’s actually working.`
  );

  lines.push(
    `Once you have 3–5 placements running, you’ll have enough data to double down on the top performer and cut what doesn’t convert.`
  );

  return {
    id: "kompi-angle",
    title: "How to implement this with Kompi",
    content: lines.join("\n\n"),
  };
}
