// src/app/features/url-shortener/head.tsx

export default function UrlShortenerHead() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Kompi's URL Shortener?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kompi turns long, messy URLs into clean, on-brand links that plug into workspaces, Link-in-bio pages, Kompi Codes™ and analytics — all in one place.",
        },
      },
      {
        "@type": "Question",
        name: "Is Kompi free to start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Start on Free with core shortening and upgrade anytime for unlimited links, advanced analytics, custom domains, Kompi Codes™ and team features.",
        },
      },
      {
        "@type": "Question",
        name: "Can I track performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every Kompi link tracks clicks, referrers, locations, devices and UTM performance so you can see what actually works.",
        },
      },
      {
        "@type": "Question",
        name: "Can I brand my short links?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On Creator and Studio, customize slugs, remove Kompi branding and connect your own domains for a fully branded experience.",
        },
      },
      {
        "@type": "Question",
        name: "Is Kompi good for agencies & studios?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Studio is built for multi-brand teams: dedicated workspaces, roles, approvals and client-ready analytics.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
