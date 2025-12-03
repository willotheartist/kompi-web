// src/lib/solutions.ts

export type SolutionCategory = "industry" | "use-case" | "business";

export interface SolutionPageConfig {
  slug: string; // url slug, e.g. "hospitality"
  category: SolutionCategory;
  label: string; // short label for menus
  metaTitle: string;
  metaDescription: string;

  h1: string;
  subheading: string;
  heroBenefit: string;

  audience: string[]; // e.g. ["Hotels", "Restaurants"]
  pains: string[];
  outcomes: string[];

  useCases: {
    title: string;
    description: string;
    badge?: string;
  }[];

  features: {
    title: string;
    description: string;
  }[];

  faqs: {
    question: string;
    answer: string;
  }[];
}

// --- INDUSTRY SOLUTIONS ---

export const industrySolutions: SolutionPageConfig[] = [
  // HOSPITALITY
  {
    slug: "hospitality",
    category: "industry",
    label: "Hospitality",
    metaTitle: "QR menus & digital business cards for hospitality | Kompi",
    metaDescription:
      "Kompi helps hotels, restaurants, bars and cafés launch QR menus, digital business cards and trackable links in minutes — all from one dashboard.",

    h1: "QR menus & digital business cards for hospitality brands",
    subheading:
      "Turn every table, room key and staff member into a trackable growth channel.",
    heroBenefit:
      "Launch QR menus, staff K-Cards and promo links in under 10 minutes — no dev team required.",

    audience: [
      "Hotels & resorts",
      "Restaurants & cafés",
      "Bars & nightlife venues",
      "Event spaces & venues",
    ],
    pains: [
      "Menus, signage and flyers are expensive to reprint every time something changes.",
      "Guests scan your QR codes, but you don’t really know what happens after.",
      "Staff are using random link tools that aren’t connected to the rest of your marketing stack.",
    ],
    outcomes: [
      "Update menus, offers and landing pages instantly without reprinting.",
      "See which locations, tables or campaigns drive the most scans and clicks.",
      "Give every staff member a branded digital business card that you manage centrally.",
    ],
    useCases: [
      {
        title: "QR menus per location or area",
        description:
          "Generate a unique QR menu for each restaurant, bar or room type and update items in one place.",
        badge: "Menus",
      },
      {
        title: "Staff digital business cards",
        description:
          "Create K-Cards for hosts, managers and sales reps so guests can save contacts and links in one tap.",
        badge: "K-Cards",
      },
      {
        title: "Trackable promo posters & table tents",
        description:
          "Use KR-Codes to track scans from lobby promos, happy-hour offers or event packages.",
        badge: "Campaigns",
      },
      {
        title: "Feedback & review flows",
        description:
          "Send guests directly to feedback forms or review sites with smart routing per location.",
        badge: "Feedback",
      },
    ],
    features: [
      {
        title: "Central dashboard for every location",
        description:
          "Manage QR menus, staff K-Cards and promo codes for all your venues from a single Kompi workspace.",
      },
      {
        title: "Brand-safe, on-theme experiences",
        description:
          "Control colors, logos and fonts so every QR scan looks and feels like your brand — not a generic link page.",
      },
      {
        title: "Analytics that make sense for hospitality",
        description:
          "See scans, clicks and conversions by venue, campaign or team member. Find what actually drives bookings and orders.",
      },
      {
        title: "Built for teams, not just solo users",
        description:
          "Invite marketing, operations and on-site managers with the right level of access for each.",
      },
    ],
    faqs: [
      {
        question: "Can we use Kompi with QR codes we already printed?",
        answer:
          "Yes. As long as the QR code links to a Kompi link or K-Card, you can update the destination anytime without reprinting.",
      },
      {
        question: "Can each venue have its own menus and links?",
        answer:
          "You can create separate menus, K-Cards and links per location while still managing everything from one workspace.",
      },
      {
        question: "Do we need a developer to set this up?",
        answer:
          "No. Kompi is built for non-technical teams. Most hospitality customers launch their first QR menu or K-Card in minutes.",
      },
      {
        question: "Is there a free plan to test Kompi?",
        answer:
          "Yes. You can start on the Free plan and upgrade when you’re ready to roll Kompi out across more locations and staff.",
      },
    ],
  },

  // RETAIL & E-COMMERCE
  {
    slug: "retail-ecommerce",
    category: "industry",
    label: "Retail & e-commerce",
    metaTitle: "QR codes & smart links for retail and e-commerce | Kompi",
    metaDescription:
      "Turn packaging, receipts and in-store signage into trackable growth channels. Kompi gives retail and e-commerce brands QR codes, link hubs and analytics in one place.",

    h1: "QR codes & smart links for retail and e-commerce brands",
    subheading:
      "Turn every product, receipt and display into a shoppable digital experience.",
    heroBenefit:
      "Launch trackable QR codes and link hubs for campaigns and packaging in minutes — no custom dev required.",

    audience: [
      "Retail stores",
      "DTC brands",
      "Online shops",
      "Pop-up & concept stores",
    ],
    pains: [
      "You can’t easily see which in-store promos drive online sales or newsletter signups.",
      "Every packaging change or campaign requires new QR codes and long lead times.",
      "Customers buy once and disappear because there’s no smooth way to keep them engaged.",
    ],
    outcomes: [
      "Track scans and clicks from packaging, receipts and in-store campaigns.",
      "Update destinations behind QR codes without reprinting or changing SKUs.",
      "Drive repeat purchases and subscribers from every order and product touchpoint.",
    ],
    useCases: [
      {
        title: "QR codes on product packaging",
        description:
          "Add QR codes that send shoppers to product education, bundles, upsells or your loyalty program.",
        badge: "Packaging",
      },
      {
        title: "Receipts that drive repeat sales",
        description:
          "Use QR codes on receipts to promote surveys, discounts or VIP drops and see which stores convert best.",
        badge: "Receipts",
      },
      {
        title: "In-store campaign tracking",
        description:
          "Give each campaign or display its own QR code so you know which promotions actually move the needle.",
        badge: "Campaigns",
      },
    ],
    features: [
      {
        title: "One dashboard for offline & online",
        description:
          "See performance across packaging, receipts and in-store signage in a single Kompi view.",
      },
      {
        title: "Update links any time",
        description:
          "Change where QR codes send people without touching your print runs or inventory.",
      },
      {
        title: "Grow owned audiences",
        description:
          "Send customers to link hubs, product pages or email capture forms that build long-term relationships.",
      },
    ],
    faqs: [
      {
        question: "Do I need a separate QR generator for packaging and campaigns?",
        answer:
          "No. Kompi generates and manages all your QR codes and links from the same dashboard.",
      },
      {
        question: "Can I reuse a QR code across multiple campaigns?",
        answer:
          "Yes. You can update the destination behind a QR code or create new codes for each campaign — whichever fits your workflow.",
      },
      {
        question: "Does Kompi work with my existing ecommerce platform?",
        answer:
          "Kompi links and QR codes can point to any URL, so they work with Shopify, WooCommerce, custom stores and more.",
      },
    ],
  },

  // CREATORS & INFLUENCERS
  {
    slug: "creators",
    category: "industry",
    label: "Creators & influencers",
    metaTitle: "Link in bio, QR codes & digital cards for creators | Kompi",
    metaDescription:
      "Centralise your content, offers and brand deals with Kompi. Create link in bio pages, QR codes and digital business cards with analytics built-in.",

    h1: "Link hubs, QR codes & digital cards for creators and influencers",
    subheading:
      "Send followers, brands and collaborators to exactly what matters — and see what converts.",
    heroBenefit:
      "Create a branded link hub, QR codes and a digital business card in minutes, all under your own Kompi workspace.",

    audience: [
      "Creators & influencers",
      "YouTubers & streamers",
      "Podcasters",
      "Newsletter & community builders",
    ],
    pains: [
      "Your ‘link in bio’ feels basic and isn’t really built for multiple audiences.",
      "Brand partners want numbers, but you don’t have clean per-campaign tracking.",
      "You juggle multiple tools for links, QR codes, forms and landing pages.",
    ],
    outcomes: [
      "Give followers, fans and brands tailored link hubs that match your visual identity.",
      "Create unique QR codes and links for each campaign or brand partner.",
      "See clicks, scans and conversions in one place instead of screenshots.",
    ],
    useCases: [
      {
        title: "Smart link in bio",
        description:
          "Build a branded hub for content, products, sponsors and communities that you can update in seconds.",
        badge: "Link in bio",
      },
      {
        title: "Sponsor & campaign tracking",
        description:
          "Generate unique links and QR codes per brand or campaign so you can share clean performance reports.",
        badge: "Campaigns",
      },
      {
        title: "Creator digital business card",
        description:
          "Use K-Cards as a digital media kit and contact card when meeting brands or collaborators.",
        badge: "K-Cards",
      },
    ],
    features: [
      {
        title: "Visuals that match your brand",
        description:
          "Control colors, cover images and layout so your hubs look like you, not a generic template.",
      },
      {
        title: "Per-campaign analytics",
        description:
          "See which links, videos or promos drive the most clicks and conversions.",
      },
      {
        title: "One link for every platform",
        description:
          "Use the same Kompi hub across Instagram, TikTok, YouTube and more — with QR codes for offline too.",
      },
    ],
    faqs: [
      {
        question: "Can I replace my current link-in-bio tool with Kompi?",
        answer:
          "Yes. Kompi lets you build flexible link hubs, with the bonus of QR codes, K-Cards and deeper analytics.",
      },
      {
        question: "Do I need my own website to use Kompi?",
        answer:
          "No. Kompi can be your main link hub, or connect out to your site, shop, or other tools.",
      },
      {
        question: "Is this only for big creators?",
        answer:
          "No. Kompi works well for solo creators just getting started and scales as your audience and partnerships grow.",
      },
    ],
  },

  // AGENCIES & STUDIOS
  {
    slug: "agencies",
    category: "industry",
    label: "Agencies & studios",
    metaTitle: "Trackable QR campaigns & link hubs for agencies | Kompi",
    metaDescription:
      "Kompi helps agencies run and report on QR, print and offline campaigns for clients. Create trackable codes, link hubs and digital cards under one roof.",

    h1: "Trackable QR campaigns & link hubs for agencies and studios",
    subheading:
      "Give clients clear numbers on what offline and social campaigns actually deliver.",
    heroBenefit:
      "Spin up QR codes, link hubs and digital cards for each client in minutes, all managed from one agency workspace.",

    audience: [
      "Marketing agencies",
      "Creative studios",
      "Brand & design teams",
      "Performance & growth shops",
    ],
    pains: [
      "It’s hard to prove the impact of print, OOH and offline campaigns.",
      "Every client uses a different link/QR tool, making reporting painful.",
      "You waste time hacking together tracking for short-lived campaigns.",
    ],
    outcomes: [
      "Give every client consistent QR and link tracking across campaigns.",
      "Ship new campaigns faster with reusable templates and presets.",
      "Send clients clean, simple reports on scans, clicks and engagement.",
    ],
    useCases: [
      {
        title: "Client-branded QR campaigns",
        description:
          "Create QR codes and link hubs that sit on your client’s brand, not generic tooling.",
        badge: "Client work",
      },
      {
        title: "Print & OOH measurement",
        description:
          "Assign unique QR codes to billboards, flyers, mailers and more to see which channels pull weight.",
        badge: "Attribution",
      },
      {
        title: "Sales & pitch materials",
        description:
          "Use K-Cards and QR codes on decks, proposals and leave-behinds to keep leads engaged.",
        badge: "Sales",
      },
    ],
    features: [
      {
        title: "Multi-client friendly",
        description:
          "Organise campaigns and assets per client while keeping control at the agency level.",
      },
      {
        title: "Reusable templates",
        description:
          "Clone link hubs and QR setups across campaigns to launch faster.",
      },
      {
        title: "Simple analytics for stakeholders",
        description:
          "Turn scans, clicks and conversions into reports that non-technical clients can understand.",
      },
    ],
    faqs: [
      {
        question: "Can clients access their own Kompi data?",
        answer:
          "Yes. You can invite client contacts with limited access or keep everything agency-side.",
      },
      {
        question: "Can we use Kompi alongside our existing analytics stack?",
        answer:
          "Kompi plays nicely with the rest of your tools by linking into the destinations and funnels you already track.",
      },
      {
        question: "Is pricing suitable for agencies?",
        answer:
          "You can start on a standard plan and grow into higher limits as you add more clients and campaigns.",
      },
    ],
  },

  // PROFESSIONAL SERVICES
  {
    slug: "professional-services",
    category: "industry",
    label: "Professional services",
    metaTitle:
      "Digital business cards & QR codes for professional services | Kompi",
    metaDescription:
      "Kompi gives consultants, law firms, accountants and service businesses digital business cards, QR codes and link hubs that build trust and win clients.",

    h1: "Digital business cards & QR codes for professional service firms",
    subheading:
      "Help prospects contact the right person, see the right info and actually follow up.",
    heroBenefit:
      "Give every partner, consultant and associate a branded digital card and link hub in a single afternoon.",

    audience: [
      "Consultants & advisors",
      "Law & accounting firms",
      "Agencies & boutique firms",
      "B2B service providers",
    ],
    pains: [
      "Paper business cards go in drawers and never get updated.",
      "Prospects don’t know which person or service line is the right contact.",
      "It’s hard to tie events and networking back to real pipeline.",
    ],
    outcomes: [
      "Give every team member a digital business card that’s always up to date.",
      "Route leads to the right forms, calendars or team pages from one QR.",
      "Measure how events, conferences and meetings contribute to new business.",
    ],
    useCases: [
      {
        title: "Digital business cards for teams",
        description:
          "Replace paper cards with K-Cards that include contact details, bios and key links.",
        badge: "K-Cards",
      },
      {
        title: "Event & conference presence",
        description:
          "Use QR codes on stands, badges or slides to send visitors to tailored landing pages.",
        badge: "Events",
      },
      {
        title: "Service-line landing hubs",
        description:
          "Create simple hubs for each service or practice area so leads self-select the right path.",
        badge: "Service lines",
      },
    ],
    features: [
      {
        title: "Firm-wide brand consistency",
        description:
          "Control how your brand appears across K-Cards, QR pages and link hubs.",
      },
      {
        title: "Easy to roll out",
        description:
          "Create templates per role or team, then duplicate them as people join.",
      },
      {
        title: "Lead capture friendly",
        description:
          "Connect Kompi flows to your CRM forms, meeting tools or intake process.",
      },
    ],
    faqs: [
      {
        question: "Can each person manage their own card?",
        answer:
          "Yes. Admins can set standards, while individuals update their details as needed.",
      },
      {
        question: "Does Kompi replace our website?",
        answer:
          "No. Kompi complements your website by creating focused flows for networking, events and campaigns.",
      },
      {
        question: "Is Kompi secure enough for professional firms?",
        answer:
          "Kompi is built with modern security best practices and focuses on marketing & experience data, not sensitive case data.",
      },
    ],
  },

  // EVENTS & VENUES
  {
    slug: "events-venues",
    category: "industry",
    label: "Events & venues",
    metaTitle: "QR flows & smart links for events and venues | Kompi",
    metaDescription:
      "Kompi helps events and venues use QR codes for tickets, schedules, sponsors and post-event follow-up — with analytics you can actually use.",

    h1: "QR flows & smart links for events and venues",
    subheading:
      "Make it easy for attendees to find what they need — and for you to see what worked.",
    heroBenefit:
      "Set up QR journeys for tickets, schedules, sponsors and feedback in one tool, ready for your next event.",

    audience: [
      "Conferences & trade shows",
      "Meetups & community events",
      "Music & arts venues",
      "Corporate events & offsites",
    ],
    pains: [
      "Attendees get lost between tickets, schedules, maps and sponsor content.",
      "Sponsors want proof of engagement that’s hard to provide.",
      "You run events back-to-back and don’t have time to rebuild flows each time.",
    ],
    outcomes: [
      "Give attendees one place to find schedules, maps and important links.",
      "Offer sponsors trackable QR placements with clear reporting.",
      "Reuse and adapt QR flows for each new event instead of starting from zero.",
    ],
    useCases: [
      {
        title: "Event hub QR",
        description:
          "Create a single event hub with schedule, speakers, maps and updates — all behind one QR.",
        badge: "Attendee UX",
      },
      {
        title: "Sponsor activations",
        description:
          "Give sponsors QR codes that send attendees to their offers, demos or lead forms with analytics.",
        badge: "Sponsors",
      },
      {
        title: "Post-event follow-up",
        description:
          "Use QR codes for feedback forms, recordings and community spaces once the event is over.",
        badge: "Follow-up",
      },
    ],
    features: [
      {
        title: "Fast to set up",
        description:
          "Clone a previous event hub and tweak the details instead of rebuilding from scratch.",
      },
      {
        title: "Built for physical spaces",
        description:
          "Optimise QR flows for signage, lanyards, seats and screens around your venue.",
      },
      {
        title: "Sponsor-ready analytics",
        description:
          "Show sponsors scans and clicks from their placements in simple dashboards.",
      },
    ],
    faqs: [
      {
        question: "Can I use one Kompi setup across multiple events?",
        answer:
          "Yes. You can duplicate and update flows for each new event, or keep a permanent hub for recurring series.",
      },
      {
        question: "Do attendees need an app?",
        answer:
          "No. Kompi works in the browser — attendees just scan a QR code or tap a link.",
      },
      {
        question: "Can we white-label the experience?",
        answer:
          "You can brand pages with your event or venue identity so it feels fully on-brand.",
      },
    ],
  },

  // FITNESS & WELLNESS
  {
    slug: "fitness-wellness",
    category: "industry",
    label: "Fitness & wellness",
    metaTitle:
      "QR codes & digital passes for fitness and wellness | Kompi",
    metaDescription:
      "Use Kompi QR codes, digital passes and link hubs to connect members to classes, programs and offers across your fitness or wellness business.",

    h1: "QR codes, digital passes & offers for fitness and wellness brands",
    subheading:
      "Make it simple for members to find classes, trainers and offers — online and in person.",
    heroBenefit:
      "Create QR flows for classes, passes and memberships in minutes, and track what drives signups.",

    audience: [
      "Gyms & fitness studios",
      "Yoga & pilates studios",
      "PTs & coaches",
      "Wellness clinics & spas",
    ],
    pains: [
      "Timetables, offers and programs change often but signage doesn’t.",
      "Members don’t always know where to go to book, cancel or buy.",
      "You run campaigns but don’t know which posters or creatives worked.",
    ],
    outcomes: [
      "Give members a clear path from QR to booking, schedule or offer.",
      "Update links and flows without reprinting QR codes.",
      "See which campaigns, locations or coaches drive the most activity.",
    ],
    useCases: [
      {
        title: "Class & schedule QR",
        description:
          "Place QR codes in-club and online that always lead to the latest timetable for each location.",
        badge: "Schedules",
      },
      {
        title: "Trainer & coach profiles",
        description:
          "Give trainers K-Cards with bios, booking links and social profiles.",
        badge: "K-Cards",
      },
      {
        title: "Offer & challenge flows",
        description:
          "Use QR codes on posters, socials and emails to guide members into challenges, trials or upsells.",
        badge: "Campaigns",
      },
    ],
    features: [
      {
        title: "Works across locations",
        description:
          "Create separate flows per club or studio, and manage them centrally.",
      },
      {
        title: "Perfect for on-site signage",
        description:
          "Optimise QR journeys for posters, mirrors, reception desks and equipment.",
      },
      {
        title: "Easy integrations",
        description:
          "Send traffic into your existing booking, membership or CRM tools.",
      },
    ],
    faqs: [
      {
        question: "Do I have to change my booking system?",
        answer:
          "No. Kompi sits on top and routes members into whatever booking or membership tools you already use.",
      },
      {
        question: "Can trainers manage their own cards?",
        answer:
          "Yes. You can set standards for branding and let each trainer keep their details up to date.",
      },
    ],
  },

  // EDUCATION & COURSES
  {
    slug: "education",
    category: "industry",
    label: "Education & courses",
    metaTitle:
      "QR codes & smart links for education, courses and bootcamps | Kompi",
    metaDescription:
      "Use Kompi QR codes and link hubs to connect students and prospects to the right lessons, applications and resources.",

    h1: "QR codes & smart links for education, courses and bootcamps",
    subheading:
      "Guide students, parents and prospects to the right resources without sending them on a website maze.",
    heroBenefit:
      "Create clear QR journeys for applications, resources and events for each program in minutes.",

    audience: [
      "Schools & colleges",
      "Bootcamps & academies",
      "Online course creators",
      "Training providers",
    ],
    pains: [
      "Prospective students get lost between landing pages, forms and info packs.",
      "Printed brochures and posters go out of date quickly.",
      "It’s hard to tell which events, fairs or campaigns drive actual signups.",
    ],
    outcomes: [
      "Give each program a simple hub with key information and actions.",
      "Update links and docs without reprinting brochures or posters.",
      "See which channels and events drive applications and interest.",
    ],
    useCases: [
      {
        title: "Program info hubs",
        description:
          "Create QR-accessible hubs with key facts, FAQs and application links for each course or program.",
        badge: "Programs",
      },
      {
        title: "Open day & event flows",
        description:
          "Use QR codes on signage and slides to share schedules, maps and follow-up forms.",
        badge: "Events",
      },
      {
        title: "Student resource access",
        description:
          "Group essential resources into simple hubs so students can find what they need fast.",
        badge: "Resources",
      },
    ],
    features: [
      {
        title: "Easy for non-technical staff",
        description:
          "Admissions and marketing teams can build flows without developer help.",
      },
      {
        title: "Consistent experience across materials",
        description:
          "Use Kompi QR and links on posters, brochures, fairs and emails.",
      },
      {
        title: "Analytics that support reporting",
        description:
          "Understand which campaigns and events are most effective at driving interest.",
      },
    ],
    faqs: [
      {
        question: "Is Kompi only for marketing pages?",
        answer:
          "No. You can link to internal portals, resources, forms or any URLs you already use.",
      },
      {
        question: "Can we use different flows per campus or program?",
        answer:
          "Yes. You can create separate hubs and QR codes per campus, program or audience.",
      },
    ],
  },

  // REAL ESTATE
  {
    slug: "real-estate",
    category: "industry",
    label: "Real estate",
    metaTitle: "QR codes & digital cards for real estate | Kompi",
    metaDescription:
      "Use Kompi QR codes and digital business cards to connect buyers and tenants to listings, tours and agents.",

    h1: "QR codes, listing hubs & digital cards for real estate teams",
    subheading:
      "Help buyers and tenants move from ‘just looking’ to booked viewings and conversations.",
    heroBenefit:
      "Put QR codes on signs, flyers and listings that route people to the right agent, property or tour.",

    audience: [
      "Residential real estate",
      "Commercial property teams",
      "Lettings & rental agents",
      "New build & developments",
    ],
    pains: [
      "For-sale signs and flyers don’t capture intent or drive direct action.",
      "Agents share links in different ways, with no central control.",
      "It’s hard to tell which properties, areas or creatives get the most interest.",
    ],
    outcomes: [
      "Let people scan a sign and instantly see photos, details and contact options.",
      "Give every agent a digital card that always has the right links.",
      "Track which properties and marketing channels get the most scans and clicks.",
    ],
    useCases: [
      {
        title: "Property QR on signs & flyers",
        description:
          "Place a QR code on each board or flyer that leads to a rich listing hub.",
        badge: "Listings",
      },
      {
        title: "Agent digital business cards",
        description:
          "Give agents K-Cards they can share in person, by email or via QR code.",
        badge: "K-Cards",
      },
      {
        title: "Development & project hubs",
        description:
          "Create simple hubs for new developments with multiple units and contact flows.",
        badge: "Projects",
      },
    ],
    features: [
      {
        title: "Per-property tracking",
        description:
          "Assign codes per property or project and see engagement at a glance.",
      },
      {
        title: "Works with your CRM and portals",
        description:
          "Send traffic into the portals and CRMs you already rely on.",
      },
      {
        title: "Easy to keep up to date",
        description:
          "Update details, photos and contact routes without changing printed materials.",
      },
    ],
    faqs: [
      {
        question: "Do buyers need to create an account?",
        answer:
          "No. They can scan and view listings immediately, then choose how to contact you.",
      },
      {
        question: "Can we use different branding for different branches?",
        answer:
          "Yes. You can keep a shared structure while tailoring branding by area or team.",
      },
    ],
  },

  // BEAUTY & SALONS
  {
    slug: "beauty-salons",
    category: "industry",
    label: "Beauty & salons",
    metaTitle:
      "QR menus & digital cards for salons and beauty brands | Kompi",
    metaDescription:
      "Use Kompi QR codes and hubs to show services, menus and booking links for salons and beauty professionals.",

    h1: "Service menus, QR codes & digital cards for salons and beauty pros",
    subheading:
      "Let clients discover services, book appointments and follow you in a couple of taps.",
    heroBenefit:
      "Create simple QR menus and booking flows that work in your space, on social and in print.",

    audience: [
      "Hair salons & barbers",
      "Nail & beauty salons",
      "Independent beauty pros",
      "Multi-location beauty brands",
    ],
    pains: [
      "Service menus are often out of date or hard to read on mobile.",
      "Clients don’t always know the best way to book or rebook.",
      "It’s tricky to tie walk-ins and offline marketing back to results.",
    ],
    outcomes: [
      "Give each location an easy-to-scan service menu with booking links.",
      "Route clients into your preferred booking or messaging tools.",
      "See which QR placements and promos drive appointments.",
    ],
    useCases: [
      {
        title: "QR service menus",
        description:
          "Place QR codes at stations, windows and front desks that open a mobile-friendly menu and booking flow.",
        badge: "Menus",
      },
      {
        title: "Stylist & artist cards",
        description:
          "Give each stylist or artist a K-Card with portfolio links and booking options.",
        badge: "K-Cards",
      },
      {
        title: "Promo & loyalty flows",
        description:
          "Use QR codes to promote loyalty schemes, referrals and seasonal offers.",
        badge: "Promos",
      },
    ],
    features: [
      {
        title: "Quick for busy teams",
        description:
          "Update services and pricing without reprinting menus or redesigning PDFs.",
      },
      {
        title: "Built for in-salon use",
        description:
          "Design journeys that make sense on mirrors, stations and shop fronts.",
      },
      {
        title: "Works with your booking tools",
        description:
          "Send traffic into whatever booking or messaging tools you already prefer.",
      },
    ],
    faqs: [
      {
        question: "Can each stylist have their own QR code?",
        answer:
          "Yes. You can create personal K-Cards and codes for each team member.",
      },
      {
        question: "Is this only for larger salons?",
        answer:
          "No. Kompi works just as well for solo operators and small teams.",
      },
    ],
  },

  // LOCAL SERVICES
  {
    slug: "local-services",
    category: "industry",
    label: "Local services",
    metaTitle:
      "QR codes & smart links for local service businesses | Kompi",
    metaDescription:
      "Kompi helps local service businesses use QR codes and links to capture leads and reviews from signs, vehicles and print.",

    h1: "QR codes & smart links for local service businesses",
    subheading:
      "Turn signs, flyers and vehicles into always-on lead capture and review engines.",
    heroBenefit:
      "Create QR codes that send people to the right estimate, booking or review flow in seconds.",

    audience: [
      "Trades & home services",
      "Cleaning & maintenance",
      "Local repair shops",
      "Small local businesses",
    ],
    pains: [
      "Print materials get attention but don’t always turn into leads.",
      "It’s hard to direct people to the right contact method or form.",
      "You don’t have a simple way to ask for reviews after a job.",
    ],
    outcomes: [
      "Turn every flyer, vehicle and sign into a path to contact or quote.",
      "Give prospects a choice of how to reach you that suits them.",
      "Make it simple for happy customers to leave reviews in the right place.",
    ],
    useCases: [
      {
        title: "Vehicle & yard sign QR",
        description:
          "Place QR codes on vehicles and signs that route people to a simple contact or quote form.",
        badge: "Signs",
      },
      {
        title: "After-job review flows",
        description:
          "Send clients to the right review platform with a single QR code or link.",
        badge: "Reviews",
      },
      {
        title: "Local campaign tracking",
        description:
          "Use unique QR codes on different flyers or mailers to see what works.",
        badge: "Campaigns",
      },
    ],
    features: [
      {
        title: "Simple for you and for customers",
        description:
          "Keep flows short and clear so people actually complete them.",
      },
      {
        title: "No website redesign needed",
        description:
          "Send traffic to existing forms, messaging apps or pages you already use.",
      },
      {
        title: "Clear performance view",
        description:
          "See which codes get scanned and clicked, broken down by campaign.",
      },
    ],
    faqs: [
      {
        question: "Do I need a full website to use Kompi?",
        answer:
          "No. Kompi can link to basic forms, messaging apps or a simple hub page.",
      },
      {
        question: "Can I track multiple neighborhoods or regions?",
        answer:
          "Yes. Use different QR codes per area or campaign to compare performance.",
      },
    ],
  },

  // SAAS & STARTUPS
  {
    slug: "saas-startups",
    category: "industry",
    label: "SaaS & startups",
    metaTitle:
      "QR campaigns, demos & link hubs for SaaS and startups | Kompi",
    metaDescription:
      "Kompi helps SaaS teams connect offline campaigns, events and sales materials to demos, trials and signups.",

    h1: "QR campaigns, demos & link hubs for SaaS and startup teams",
    subheading:
      "Bridge the gap between events, content and signups with simple QR flows and hubs.",
    heroBenefit:
      "Create QR journeys for events, sales decks and campaigns that route people straight to demos, trials or key content.",

    audience: [
      "B2B SaaS teams",
      "Product-led startups",
      "Developer tools",
      "Marketing & growth teams",
    ],
    pains: [
      "You run events, mailers and physical campaigns that are hard to attribute.",
      "Sales teams share a mix of links with no consistent structure.",
      "You want to test new journeys fast without waiting on dev cycles.",
    ],
    outcomes: [
      "Connect offline and event efforts directly to demos, trials and content.",
      "Give each rep or team a structured hub for their links.",
      "Iterate on journeys quickly and see what actually converts.",
    ],
    useCases: [
      {
        title: "Event & booth QR",
        description:
          "Add QR codes to booth materials, swag and slides to drive people to demo or signup flows.",
        badge: "Events",
      },
      {
        title: "Sales rep hubs",
        description:
          "Give reps K-Cards and hubs with tailored content for their accounts.",
        badge: "Sales",
      },
      {
        title: "Experiment-friendly journeys",
        description:
          "Test different destinations and flows behind the same QR without changing print.",
        badge: "Growth",
      },
    ],
    features: [
      {
        title: "Fast to iterate",
        description:
          "Change destinations and content behind QR codes without waiting for releases.",
      },
      {
        title: "Works alongside your stack",
        description:
          "Send people to your existing product tours, signup forms and content.",
      },
      {
        title: "Analytics you can share",
        description:
          "Show marketing and sales which assets and events perform best.",
      },
    ],
    faqs: [
      {
        question: "Do I need engineering to set this up?",
        answer:
          "No. GTM and marketing teams can build and manage Kompi flows themselves.",
      },
      {
        question: "Can we use different flows per segment or region?",
        answer:
          "Yes. You can create segment-specific hubs and codes to keep journeys relevant.",
      },
    ],
  },
];

// --- HELPERS ---

export function getIndustrySolution(
  slug: string
): SolutionPageConfig | undefined {
  return industrySolutions.find((s) => s.slug === slug);
}

export const industrySlugs = industrySolutions.map((s) => s.slug);
