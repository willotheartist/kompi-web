// src/app/head.tsx

export default function Head() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kompi",
    url: "https://kompi.app",
    logo: "https://kompi.app/Kompiwhite.svg",
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kompi",
    url: "https://kompi.app",
  };

  const homepageFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Kompi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kompi is a modern platform for short links, QR menus, bio pages and analytics, built for creators, studios and in-house teams.",
        },
      },
      {
        "@type": "Question",
        name: "Who is Kompi for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kompi is designed for creators, small brands, studios and teams that need on-brand links, Kompi Codes™ and clear analytics in one calm workspace.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a free plan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Kompi offers a Free plan to get started with core link shortening, with Creator and Studio plans for advanced analytics, custom branding and team features.",
        },
      },
      {
        "@type": "Question",
        name: "What can I do with Kompi Codes™?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kompi Codes™ are branded QR-style codes that connect directly to Kompi links, menus and K-Cards, giving you trackable offline and on-screen experiences.",
        },
      },
      {
        "@type": "Question",
        name: "Does Kompi include analytics?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kompi tracks clicks, referrers, devices, locations and UTM performance so you can see what works across campaigns and channels.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteJsonLd),
        }}
      />
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageFaqJsonLd),
        }}
      />
    </>
  );
}
