// src/app/s/_publicRenderer.tsx
import { notFound } from "next/navigation";
import type { BuilderPageType } from "@/lib/builder/types";
import { pageKeyToType, pageTypeToKey } from "@/lib/builder/types";

/* -----------------------------
   Helpers
----------------------------- */

function hrefForPage(slug: string, pageType: BuilderPageType) {
  const key = pageTypeToKey(pageType);
  return key ? `/s/${slug}/${key}` : `/s/${slug}`;
}

function labelForPageType(type: BuilderPageType) {
  switch (type) {
    case "HOME":
      return "Home";
    case "PRODUCT":
      return "Product";
    case "PRICING":
      return "Pricing";
    case "WAITLIST":
      return "Waitlist";
    case "ABOUT":
      return "About";
    case "CONTACT":
      return "Contact";
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

function deriveNavItems(snapshot: any) {
  const slug: string | undefined = snapshot?.slug;
  if (!slug) return [];

  const pages: any[] = Array.isArray(snapshot?.pages) ? snapshot.pages : [];

  const visibleTypes = pages
    .filter((p) => p && !p.isHidden && typeof p.type === "string")
    .map((p) => p.type as BuilderPageType);

  const ordered: BuilderPageType[] = [];
  if (visibleTypes.includes("HOME")) ordered.push("HOME");

  const restOrder: BuilderPageType[] = [
    "PRODUCT",
    "PRICING",
    "WAITLIST",
    "ABOUT",
    "CONTACT",
  ];

  for (const t of restOrder) {
    if (visibleTypes.includes(t)) ordered.push(t);
  }

  return ordered.map((t) => ({
    label: labelForPageType(t),
    href: hrefForPage(slug, t),
    type: t,
  }));
}

function toArray(v: any): any[] {
  return Array.isArray(v) ? v : [];
}

/* -----------------------------
   Section Renderers
----------------------------- */

function Navbar({ content, snapshot }: { content: any; snapshot: any }) {
  const navItems = deriveNavItems(snapshot);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "28px 0",
      }}
    >
      <strong>{content?.logoText ?? "Kompi"}</strong>

      <div style={{ display: "flex", gap: 20 }}>
        {navItems.map((l, i) => (
          <a key={i} href={l.href} style={{ textDecoration: "none" }}>
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero({ content }: any) {
  return (
    <section style={{ padding: "120px 0", textAlign: "center" }}>
      <h1 style={{ fontSize: 48 }}>{content?.headline}</h1>
      <p style={{ fontSize: 18, opacity: 0.8 }}>{content?.subheadline}</p>
    </section>
  );
}

function SocialProof({ content }: any) {
  const logos = toArray(content?.logos ?? content?.items ?? content?.brands);
  const quote = content?.quote ?? content?.headline;
  return (
    <section style={{ padding: "60px 0" }}>
      {quote ? (
        <div style={{ fontSize: 16, opacity: 0.85, marginBottom: 16 }}>
          {quote}
        </div>
      ) : null}
      {logos.length ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, opacity: 0.8 }}>
          {logos.map((l: any, i: number) => (
            <span key={i} style={{ fontWeight: 700 }}>
              {l?.name ?? l?.label ?? l?.text ?? "Logo"}
            </span>
          ))}
        </div>
      ) : (
        <div style={{ opacity: 0.7 }}> </div>
      )}
    </section>
  );
}

function Features({ content }: any) {
  const items = toArray(content?.items ?? content?.features);
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title}</h2>
      <ul style={{ marginTop: 24 }}>
        {items.map((i: any, idx: number) => (
          <li key={idx} style={{ marginBottom: 12 }}>
            <strong>{i?.title ?? i?.name ?? "Feature"}</strong>
            {i?.description ? <> — {i.description}</> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Benefits({ content }: any) {
  const items = toArray(content?.items ?? content?.benefits);
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title ?? "Benefits"}</h2>
      <ul style={{ marginTop: 24 }}>
        {items.map((i: any, idx: number) => (
          <li key={idx} style={{ marginBottom: 12 }}>
            <strong>{i?.title ?? i?.name ?? "Benefit"}</strong>
            {i?.description ? <> — {i.description}</> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function UseCases({ content }: any) {
  const items = toArray(content?.items ?? content?.useCases ?? content?.cases);
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title ?? "Use cases"}</h2>
      <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
        {items.map((c: any, i: number) => (
          <div key={i}>
            <strong>{c?.title ?? c?.name ?? "Use case"}</strong>
            {c?.description ? <div style={{ opacity: 0.8 }}>{c.description}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials({ content }: any) {
  const items = toArray(content?.items ?? content?.testimonials ?? content?.quotes);
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title ?? "Testimonials"}</h2>
      <div style={{ marginTop: 18, display: "grid", gap: 18 }}>
        {items.map((t: any, i: number) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ opacity: 0.9 }}>{t?.quote ?? t?.text ?? t?.body ?? "“”"}</div>
            <div style={{ marginTop: 10, opacity: 0.7, fontWeight: 700 }}>
              {t?.name ?? t?.author ?? "Customer"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks({ content }: any) {
  const steps = toArray(content?.steps ?? content?.items);
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title}</h2>
      <ol style={{ marginTop: 24 }}>
        {steps.map((s: any, i: number) => (
          <li key={i} style={{ marginBottom: 16 }}>
            <strong>{s?.title ?? s?.name ?? `Step ${i + 1}`}</strong>
            {s?.description ? <div style={{ opacity: 0.8 }}>{s.description}</div> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Pricing({ content }: any) {
  const plans = toArray(content?.plans ?? content?.tiers);
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title ?? "Pricing"}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          marginTop: 18,
        }}
      >
        {plans.map((p: any, i: number) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 20,
            }}
          >
            <strong>{p?.name ?? `Plan ${i + 1}`}</strong>
            <div style={{ fontSize: 24, margin: "12px 0" }}>{p?.price}</div>
            <ul>
              {toArray(p?.features).map((f: string, idx: number) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Waitlist({ content }: any) {
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title ?? "Join the waitlist"}</h2>
      <div style={{ marginTop: 10, opacity: 0.8 }}>
        {content?.body ?? content?.description ?? "Get notified when we launch."}
      </div>

      {/* Placeholder V0 (no forms logic yet) */}
      {content?.cta?.href ? (
        <div style={{ marginTop: 18 }}>
          <a href={content.cta.href} style={{ textDecoration: "none", fontWeight: 800 }}>
            {content?.cta?.label ?? "Join"}
          </a>
        </div>
      ) : null}
    </section>
  );
}

function About({ content }: any) {
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title ?? "About"}</h2>
      <div style={{ marginTop: 12, opacity: 0.85, lineHeight: 1.6 }}>
        {content?.body ?? content?.text ?? content?.description ?? ""}
      </div>
    </section>
  );
}

function Contact({ content }: any) {
  const email = content?.email;
  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title ?? "Contact"}</h2>
      {email ? (
        <div style={{ marginTop: 10 }}>
          <a href={`mailto:${email}`} style={{ textDecoration: "none", fontWeight: 800 }}>
            {email}
          </a>
        </div>
      ) : (
        <div style={{ marginTop: 10, opacity: 0.7 }}>No contact email set.</div>
      )}
    </section>
  );
}

function FAQ({ content }: any) {
  // tolerate multiple shapes
  const items =
    toArray(content?.items) ||
    toArray(content?.faqs) ||
    toArray(content?.questions);

  const safeItems = Array.isArray(items) ? items : [];

  return (
    <section style={{ padding: "80px 0" }}>
      <h2>{content?.title ?? "FAQs"}</h2>
      <div style={{ marginTop: 24 }}>
        {safeItems.length === 0 ? (
          <div style={{ opacity: 0.7 }}>No FAQs yet.</div>
        ) : (
          safeItems.map((q: any, i: number) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <strong>{q?.question ?? q?.q ?? q?.title ?? "Question"}</strong>
              <div style={{ opacity: 0.8 }}>
                {q?.answer ?? q?.a ?? q?.body ?? ""}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

function Footer({ content }: any) {
  return (
    <footer style={{ padding: "60px 0", opacity: 0.6 }}>
      {content?.copyright}
    </footer>
  );
}

/* -----------------------------
   Main Renderer
----------------------------- */

function renderSection(section: any, snapshot: any) {
  if (section?.isHidden) return null;

  switch (section?.type) {
    case "NAVBAR":
      return <Navbar key={section.id} content={section.content} snapshot={snapshot} />;
    case "HERO":
      return <Hero key={section.id} content={section.content} />;
    case "SOCIAL_PROOF":
      return <SocialProof key={section.id} content={section.content} />;
    case "FEATURES":
      return <Features key={section.id} content={section.content} />;
    case "BENEFITS":
      return <Benefits key={section.id} content={section.content} />;
    case "USE_CASES":
      return <UseCases key={section.id} content={section.content} />;
    case "TESTIMONIALS":
      return <Testimonials key={section.id} content={section.content} />;
    case "HOW_IT_WORKS":
      return <HowItWorks key={section.id} content={section.content} />;
    case "PRICING":
      return <Pricing key={section.id} content={section.content} />;
    case "WAITLIST":
      return <Waitlist key={section.id} content={section.content} />;
    case "ABOUT":
      return <About key={section.id} content={section.content} />;
    case "CONTACT":
      return <Contact key={section.id} content={section.content} />;
    case "FAQ":
      return <FAQ key={section.id} content={section.content} />;
    case "FOOTER":
      return <Footer key={section.id} content={section.content} />;
    default:
      return null;
  }
}

export function renderPageFromSnapshot(snapshot: any, pageType: BuilderPageType) {
  const page = snapshot?.pages?.find((p: any) => p.type === pageType);
  if (!page) notFound();
  if (page?.isHidden) notFound();

  return <main>{(page.sections ?? []).map((s: any) => renderSection(s, snapshot))}</main>;
}

export function renderPageKeyFromSnapshot(snapshot: any, pageKey: string) {
  const pageType = pageKeyToType(pageKey);
  if (!pageType) notFound();
  return renderPageFromSnapshot(snapshot, pageType);
}
