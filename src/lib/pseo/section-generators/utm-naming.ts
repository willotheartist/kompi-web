// src/lib/pseo/section-generators/utm-naming.ts
import type { PSEOPageInput, PSEOSection } from "../types";

export function generateUTMNaming(input: PSEOPageInput): PSEOSection {
  const channel = input.entity?.type === "channel" ? input.entity.value : "your channel";

  const content = [
    `A clean naming system makes reports usable. Here’s a simple convention that works well for **${channel}** and scales as you add more campaigns.`,
    ``,
    `Use **lowercase + underscores**. Avoid spaces and emojis.`,
    ``,
    `• utm_source: the platform/referrer (keep it stable)`,
    `  • examples: instagram, tiktok, google, newsletter, qr`,
    `• utm_medium: the traffic type (keep it consistent)`,
    `  • examples: social, paid_social, cpc, email, offline, messaging`,
    `• utm_campaign: the initiative you want to measure`,
    `  • examples: launch_q1, black_friday, weekly_digest, event_signup`,
    `• utm_content: placement or creative (optional, but powerful)`,
    `  • examples: bio, story, reel, creative_a, button_primary`,
    `• utm_term: keyword targeting (mostly for search ads)`,
    ``,
    `A practical template:`,
    `• utm_source={platform}`,
    `• utm_medium={traffic_type}`,
    `• utm_campaign={initiative}_{date_or_version}`,
    `• utm_content={placement_or_creative}`,
    ``,
    `Rules that keep analytics clean:`,
    `• Pick one spelling and never change it (paid_social vs paidsocial).`,
    `• Don’t overload utm_source. Keep it to the platform; put details into campaign/content.`,
    `• If you’re testing, change one thing at a time (usually utm_content).`,
  ].join("\n");

  return {
    id: "utm-naming",
    title: "A naming convention that keeps analytics clean",
    content,
  };
}
