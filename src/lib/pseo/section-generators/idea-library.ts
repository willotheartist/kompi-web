import { PSEOPageInput, PSEOSection } from "../types";

type Idea = {
  title: string;
  whatToLinkTo: string;
  cta: string;
  trackingTip: string;
};

type Category = {
  name: string;
  ideas: Idea[];
};

function asBullets(lines: string[]) {
  return lines.map((l) => `• ${l}`).join("\n");
}

function buildRestaurantsLibrary(): Category[] {
  return [
    {
      name: "Menu and ordering",
      ideas: [
        {
          title: "Today’s menu (fast + mobile-friendly)",
          whatToLinkTo: "A clean menu page or QR menu with sections and prices",
          cta: "Scan for today’s menu",
          trackingTip: "Make a separate QR for each table area so you can compare zones",
        },
        {
          title: "Lunch specials",
          whatToLinkTo: "A daily specials page that you can update without reprinting",
          cta: "Scan for lunch specials",
          trackingTip: "Track scans by placement (window vs tables) to see what drives decisions",
        },
        {
          title: "Order pickup",
          whatToLinkTo: "A pickup ordering page (with clear pickup instructions)",
          cta: "Scan to order pickup",
          trackingTip: "Use a unique QR for each flyer/packaging type",
        },
        {
          title: "Allergens and dietary options",
          whatToLinkTo: "A page that lists allergens and vegan/gluten-free options",
          cta: "Scan for allergens and dietary info",
          trackingTip: "Measure clicks to allergen section; expand what people actually look for",
        },
        {
          title: "Kids menu",
          whatToLinkTo: "A simple kids menu section with 5–10 items",
          cta: "Scan for the kids menu",
          trackingTip: "Put this near family seating and compare scans vs general tables",
        },
        {
          title: "Seasonal items",
          whatToLinkTo: "A rotating page for seasonal dishes",
          cta: "Scan for seasonal dishes",
          trackingTip: "Add a “seasonal” UTM tag so you can compare vs standard menu scans",
        },
      ],
    },
    {
      name: "Reviews and reputation",
      ideas: [
        {
          title: "One-tap review request",
          whatToLinkTo: "Your preferred review destination (Google, Yelp, etc.) or a Kompi page with buttons",
          cta: "Enjoyed it? Leave a quick review",
          trackingTip: "Use receipt-only QR so review requests don’t distract diners mid-meal",
        },
        {
          title: "Feedback first, review second",
          whatToLinkTo: "A short feedback form, then a follow-up ask for a review when sentiment is positive",
          cta: "Tell us how we did (30 seconds)",
          trackingTip: "Track completion rate; shorten questions until completion improves",
        },
        {
          title: "Photo + UGC prompt",
          whatToLinkTo: "A page that asks for a photo tag and shows your social handles",
          cta: "Share a photo and tag us",
          trackingTip: "Track taps to Instagram/TikTok links to estimate UGC intent",
        },
        {
          title: "Issue resolution form",
          whatToLinkTo: "A simple “problem with order?” form to catch issues before bad reviews",
          cta: "Something off? Tell us and we’ll fix it",
          trackingTip: "Track issue categories; fix recurring problems and watch bad-review rate drop",
        },
      ],
    },
    {
      name: "Reservations, waitlist, and in-store flow",
      ideas: [
        {
          title: "Join the waitlist",
          whatToLinkTo: "Waitlist page with phone/name field",
          cta: "Scan to join the waitlist",
          trackingTip: "Use entrance-only QR so it doesn’t compete with table content",
        },
        {
          title: "Book a table",
          whatToLinkTo: "Reservation booking page",
          cta: "Scan to reserve a table",
          trackingTip: "Make separate QRs for window, door, and social posts",
        },
        {
          title: "Pay at the table",
          whatToLinkTo: "Payment instructions page (or checkout link if you have it)",
          cta: "Scan to pay",
          trackingTip: "Track completion clicks; remove friction from steps people drop on",
        },
        {
          title: "Call your server (optional)",
          whatToLinkTo: "A simple page with one button: ‘Need help’ (or instructions)",
          cta: "Need help? Scan here",
          trackingTip: "Use it carefully—track volume so it doesn’t overwhelm staff",
        },
      ],
    },
    {
      name: "Promotions and loyalty",
      ideas: [
        {
          title: "Loyalty signup",
          whatToLinkTo: "A one-field signup page (email or phone), then a confirmation message",
          cta: "Scan to join rewards",
          trackingTip: "Compare signup rate by placement (table vs counter) and focus on winner",
        },
        {
          title: "Birthday club",
          whatToLinkTo: "Signup page collecting birthday month (optional) + email",
          cta: "Scan to join the birthday club",
          trackingTip: "Track conversions; keep the form minimal to increase completion",
        },
        {
          title: "Limited-time coupon",
          whatToLinkTo: "A coupon page with an expiry and clear redemption instructions",
          cta: "Scan for a limited-time deal",
          trackingTip: "Use unique QR per campaign so you can attribute redemptions correctly",
        },
        {
          title: "Catering lead capture",
          whatToLinkTo: "Catering inquiry form with event size/date fields",
          cta: "Scan for catering",
          trackingTip: "Track which placement generates higher-value leads (menu page vs receipt)",
        },
      ],
    },
    {
      name: "Operations and hiring",
      ideas: [
        {
          title: "We’re hiring",
          whatToLinkTo: "A hiring page with open roles + simple apply form",
          cta: "Scan to apply",
          trackingTip: "Put this on receipts/exit—not on tables—so it doesn’t interrupt dining",
        },
        {
          title: "Supplier/contact page",
          whatToLinkTo: "A contact page for vendors and partnerships",
          cta: "Scan for business inquiries",
          trackingTip: "Track business inquiries separately so they don’t pollute customer analytics",
        },
      ],
    },
  ];
}

function buildGenericLibrary(input: PSEOPageInput): Category[] {
  const kw = input.primaryKeyword.toLowerCase();
  const entity = input.entity.value;

  return [
    {
      name: "High-impact ideas you can implement",
      ideas: [
        {
          title: "Primary action page",
          whatToLinkTo: "A landing page with one main action and 2–4 supporting actions",
          cta: `Scan for ${kw}`,
          trackingTip: "Create one QR per placement so you can compare performance",
        },
        {
          title: "Offer of the week",
          whatToLinkTo: "A page you can update weekly without reprinting",
          cta: "Scan for this week’s offer",
          trackingTip: "Track clicks over time; keep what performs and replace what doesn’t",
        },
        {
          title: "Contact or booking",
          whatToLinkTo: "A simple booking/contact form with minimal fields",
          cta: "Scan to contact us",
          trackingTip: "Measure form starts vs completes; shorten the form if completion is low",
        },
        {
          title: "Reviews or feedback",
          whatToLinkTo: "A feedback page or review destination",
          cta: "Scan to leave feedback",
          trackingTip: "Use separate QR codes for different locations/channels",
        },
        {
          title: "FAQ or help",
          whatToLinkTo: "A page answering the top 5 questions people ask in your context",
          cta: "Scan for quick answers",
          trackingTip: "Track which FAQs get clicked and expand those first",
        },
      ],
    },
    {
      name: `Examples tailored to ${entity}`,
      ideas: [
        {
          title: "Segmented destination",
          whatToLinkTo: `A landing page with a section specifically for ${entity}`,
          cta: `Scan for ${entity} info`,
          trackingTip: "Add UTMs so you can distinguish this audience",
        },
        {
          title: "Social follow",
          whatToLinkTo: "A page with social buttons + best content",
          cta: "Scan to follow",
          trackingTip: "Track which platform gets most taps and focus content there",
        },
      ],
    },
  ];
}

export function generateIdeaLibrary(input: PSEOPageInput): PSEOSection {
  const categories =
    input.entity.type === "industry" && input.entity.value.toLowerCase() === "restaurants"
      ? buildRestaurantsLibrary()
      : buildGenericLibrary(input);

  const contentParts: string[] = [];

  contentParts.push(
    `Below is a practical idea library you can copy. Each idea includes what to link to, a CTA line, and a tracking tip so you can improve results over time.`
  );

  for (const cat of categories) {
    contentParts.push(`${cat.name}`);

    const blocks = cat.ideas.map((idea) => {
      const lines = [
        `${idea.title}`,
        `What to link to: ${idea.whatToLinkTo}`,
        `CTA: ${idea.cta}`,
        `Tracking tip: ${idea.trackingTip}`,
      ];
      return asBullets(lines);
    });

    contentParts.push(blocks.join("\n\n"));
  }

  return {
    id: "idea-library",
    title: "Idea library you can copy",
    content: contentParts.join("\n\n"),
  };
}
