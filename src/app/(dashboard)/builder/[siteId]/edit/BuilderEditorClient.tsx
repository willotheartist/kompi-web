// src/app/(dashboard)/builder/[siteId]/edit/BuilderEditorClient.tsx
"use client";

import { useMemo, useState } from "react";
import { pageTypeToKey } from "@/lib/builder/types";

type Section = {
  id: string;
  type: string;
  variant: string;
  isHidden: boolean;
  order: number;
  content: any;
};

type Page = {
  id: string;
  type: string;
  title: string | null;
  path: string | null;
  order: number;
  isHidden?: boolean;
  sections: Section[];
};

type Site = {
  id: string;
  name: string;
  slug: string;
  brand: any;
  navigation: any;
  globalCta: any;
  pages: Page[];
};

type PublishValidationError = {
  pageId: string;
  pageType: string;
  sectionId: string;
  sectionType: string;
  sectionVariant: string;
  message: string;
};

function safeJsonParse(text: string) {
  try {
    return { ok: true as const, value: JSON.parse(text) };
  } catch (e: any) {
    return { ok: false as const, error: e?.message ?? "Invalid JSON" };
  }
}

function pagePreviewPath(siteSlug: string, pageType: string) {
  const key = pageTypeToKey(pageType as any);
  return key ? `/s/${siteSlug}/${key}` : `/s/${siteSlug}`;
}

function toArray(v: any): any[] {
  return Array.isArray(v) ? v : [];
}

/* -----------------------------
   Draft normalizers (match _publicRenderer tolerances)
----------------------------- */

function normalizeNavbarDraft(content: any) {
  return {
    logoText: content?.logoText ?? "Kompi",
  };
}

function normalizeHeroDraft(content: any) {
  return {
    headline: content?.headline ?? "",
    subheadline: content?.subheadline ?? "",
    cta: {
      label: content?.cta?.label ?? "",
      href: content?.cta?.href ?? "",
    },
  };
}

function normalizeSocialProofDraft(content: any) {
  const logosRaw = toArray(content?.logos) || toArray(content?.items) || toArray(content?.brands);
  const logos = (Array.isArray(logosRaw) ? logosRaw : []).map((l: any) => ({
    name: l?.name ?? l?.label ?? l?.text ?? "",
  }));

  return {
    headline: content?.headline ?? "",
    quote: content?.quote ?? "",
    logos,
  };
}

function normalizeFeaturesDraftFromContent(content: any) {
  const raw = toArray(content?.items) || toArray(content?.features);
  const items = (Array.isArray(raw) ? raw : []).map((i: any) => ({
    title: i?.title ?? i?.name ?? "",
    description: i?.description ?? "",
  }));

  return {
    title: content?.title ?? "Features",
    items,
  };
}

function normalizeBenefitsDraft(content: any) {
  const raw = toArray(content?.items) || toArray(content?.benefits);
  const items = (Array.isArray(raw) ? raw : []).map((i: any) => ({
    title: i?.title ?? i?.name ?? "",
    description: i?.description ?? "",
  }));

  return {
    title: content?.title ?? "Benefits",
    items,
  };
}

function normalizeHowItWorksDraft(content: any) {
  const raw = toArray(content?.steps) || toArray(content?.items);
  const steps = (Array.isArray(raw) ? raw : []).map((s: any) => ({
    title: s?.title ?? s?.name ?? "",
    description: s?.description ?? "",
  }));

  return {
    title: content?.title ?? "How it works",
    steps,
  };
}

function normalizeUseCasesDraft(content: any) {
  const raw = toArray(content?.items) || toArray(content?.useCases) || toArray(content?.cases);
  const items = (Array.isArray(raw) ? raw : []).map((c: any) => ({
    title: c?.title ?? c?.name ?? "",
    description: c?.description ?? "",
  }));

  return {
    title: content?.title ?? "Use cases",
    items,
  };
}

function normalizeTestimonialsDraft(content: any) {
  const raw = toArray(content?.items) || toArray(content?.testimonials) || toArray(content?.quotes);
  const items = (Array.isArray(raw) ? raw : []).map((t: any) => ({
    quote: t?.quote ?? t?.text ?? t?.body ?? "",
    name: t?.name ?? t?.author ?? "",
  }));

  return {
    title: content?.title ?? "Testimonials",
    items,
  };
}

function normalizePricingDraft(content: any) {
  const raw = toArray(content?.plans) || toArray(content?.tiers);
  const plans = (Array.isArray(raw) ? raw : []).map((p: any) => ({
    name: p?.name ?? "",
    price: p?.price ?? "",
    features: toArray(p?.features).map((f: any) => (typeof f === "string" ? f : String(f ?? ""))),
  }));

  return {
    title: content?.title ?? "Pricing",
    plans,
  };
}

function normalizeFaqDraftFromContent(content: any) {
  const itemsRaw = toArray(content?.items) || toArray(content?.faqs) || toArray(content?.questions);
  const items = (Array.isArray(itemsRaw) ? itemsRaw : []).map((q: any) => ({
    question: q?.question ?? q?.q ?? q?.title ?? "",
    answer: q?.answer ?? q?.a ?? q?.body ?? "",
  }));

  return {
    title: content?.title ?? "FAQs",
    items,
  };
}

function normalizeWaitlistDraft(content: any) {
  return {
    title: content?.title ?? "Join the waitlist",
    body: content?.body ?? content?.description ?? "",
    cta: {
      label: content?.cta?.label ?? "",
      href: content?.cta?.href ?? "",
    },
  };
}

function normalizeAboutDraft(content: any) {
  return {
    title: content?.title ?? "About",
    body: content?.body ?? content?.text ?? content?.description ?? "",
  };
}

function normalizeContactDraft(content: any) {
  return {
    title: content?.title ?? "Contact",
    email: content?.email ?? "",
  };
}

function normalizeFooterDraft(content: any) {
  const linksRaw = toArray(content?.links);
  const links = (Array.isArray(linksRaw) ? linksRaw : []).map((l: any) => ({
    label: l?.label ?? "",
    href: l?.href ?? "",
  }));

  return {
    copyright: content?.copyright ?? "",
    links,
  };
}

/* -----------------------------
   Small UI helpers
----------------------------- */

function labelStyle() {
  return { fontSize: 12, opacity: 0.75 } as const;
}

function inputStyle() {
  return {
    width: "100%",
    marginTop: 6,
    padding: 10,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
  } as const;
}

function textareaStyle(minHeight = 80) {
  return {
    width: "100%",
    marginTop: 6,
    padding: 10,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.12)",
    minHeight,
    resize: "vertical" as const,
  } as const;
}

function cardStyle() {
  return {
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 12,
    padding: 10,
    background: "white",
  } as const;
}

function smallBtnStyle() {
  return {
    border: "1px solid rgba(0,0,0,0.12)",
    background: "white",
    borderRadius: 10,
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: 12,
  } as const;
}

function formatPublishIssue(e: PublishValidationError) {
  const pageLabel = e.pageType || "PAGE";
  const sectionLabel = e.sectionType ? `${e.sectionType} · ${e.sectionVariant || ""}`.trim() : "";
  if (sectionLabel) return `${pageLabel}: ${sectionLabel} — ${e.message}`;
  return `${pageLabel}: ${e.message}`;
}

export default function BuilderEditorClient({ site }: { site: Site }) {
  const pages = site.pages ?? [];

  const [activePageId, setActivePageId] = useState<string>(pages[0]?.id ?? "");
  const activePage = useMemo(
    () => pages.find((p) => p.id === activePageId) ?? pages[0],
    [pages, activePageId]
  );

  const [activeSectionId, setActiveSectionId] = useState<string>(activePage?.sections?.[0]?.id ?? "");

  const activeSection = useMemo(
    () => activePage?.sections?.find((s) => s.id === activeSectionId) ?? activePage?.sections?.[0],
    [activePage, activeSectionId]
  );

  const [status, setStatus] = useState<string>("");

  // NEW: publish validation issues (from API)
  const [publishIssues, setPublishIssues] = useState<PublishValidationError[]>([]);

  // Inspector layout
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const inspectorWidth = 360;

  // Advanced JSON
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [draftJson, setDraftJson] = useState<string>(
    activeSection ? JSON.stringify(activeSection.content ?? {}, null, 2) : "{}"
  );

  // Drafts for inline editors
  const [navbarDraft, setNavbarDraft] = useState(() =>
    activeSection?.type === "NAVBAR" ? normalizeNavbarDraft(activeSection.content ?? {}) : normalizeNavbarDraft({})
  );
  const [heroDraft, setHeroDraft] = useState(() =>
    activeSection?.type === "HERO" ? normalizeHeroDraft(activeSection.content ?? {}) : normalizeHeroDraft({})
  );
  const [socialProofDraft, setSocialProofDraft] = useState(() =>
    activeSection?.type === "SOCIAL_PROOF"
      ? normalizeSocialProofDraft(activeSection.content ?? {})
      : normalizeSocialProofDraft({})
  );
  const [featuresDraft, setFeaturesDraft] = useState(() =>
    activeSection?.type === "FEATURES"
      ? normalizeFeaturesDraftFromContent(activeSection.content ?? {})
      : normalizeFeaturesDraftFromContent({})
  );
  const [benefitsDraft, setBenefitsDraft] = useState(() =>
    activeSection?.type === "BENEFITS" ? normalizeBenefitsDraft(activeSection.content ?? {}) : normalizeBenefitsDraft({})
  );
  const [howItWorksDraft, setHowItWorksDraft] = useState(() =>
    activeSection?.type === "HOW_IT_WORKS"
      ? normalizeHowItWorksDraft(activeSection.content ?? {})
      : normalizeHowItWorksDraft({})
  );
  const [useCasesDraft, setUseCasesDraft] = useState(() =>
    activeSection?.type === "USE_CASES" ? normalizeUseCasesDraft(activeSection.content ?? {}) : normalizeUseCasesDraft({})
  );
  const [testimonialsDraft, setTestimonialsDraft] = useState(() =>
    activeSection?.type === "TESTIMONIALS"
      ? normalizeTestimonialsDraft(activeSection.content ?? {})
      : normalizeTestimonialsDraft({})
  );
  const [pricingDraft, setPricingDraft] = useState(() =>
    activeSection?.type === "PRICING" ? normalizePricingDraft(activeSection.content ?? {}) : normalizePricingDraft({})
  );
  const [faqDraft, setFaqDraft] = useState(() =>
    activeSection?.type === "FAQ"
      ? normalizeFaqDraftFromContent(activeSection.content ?? {})
      : normalizeFaqDraftFromContent({})
  );
  const [waitlistDraft, setWaitlistDraft] = useState(() =>
    activeSection?.type === "WAITLIST" ? normalizeWaitlistDraft(activeSection.content ?? {}) : normalizeWaitlistDraft({})
  );
  const [aboutDraft, setAboutDraft] = useState(() =>
    activeSection?.type === "ABOUT" ? normalizeAboutDraft(activeSection.content ?? {}) : normalizeAboutDraft({})
  );
  const [contactDraft, setContactDraft] = useState(() =>
    activeSection?.type === "CONTACT" ? normalizeContactDraft(activeSection.content ?? {}) : normalizeContactDraft({})
  );
  const [footerDraft, setFooterDraft] = useState(() =>
    activeSection?.type === "FOOTER" ? normalizeFooterDraft(activeSection.content ?? {}) : normalizeFooterDraft({})
  );

  // Sync drafts when section changes
  useMemo(() => {
    if (!activeSection) return;

    setDraftJson(JSON.stringify(activeSection.content ?? {}, null, 2));
    setShowAdvanced(false);

    switch (activeSection.type) {
      case "NAVBAR":
        setNavbarDraft(normalizeNavbarDraft(activeSection.content ?? {}));
        break;
      case "HERO":
        setHeroDraft(normalizeHeroDraft(activeSection.content ?? {}));
        break;
      case "SOCIAL_PROOF":
        setSocialProofDraft(normalizeSocialProofDraft(activeSection.content ?? {}));
        break;
      case "FEATURES":
        setFeaturesDraft(normalizeFeaturesDraftFromContent(activeSection.content ?? {}));
        break;
      case "BENEFITS":
        setBenefitsDraft(normalizeBenefitsDraft(activeSection.content ?? {}));
        break;
      case "HOW_IT_WORKS":
        setHowItWorksDraft(normalizeHowItWorksDraft(activeSection.content ?? {}));
        break;
      case "USE_CASES":
        setUseCasesDraft(normalizeUseCasesDraft(activeSection.content ?? {}));
        break;
      case "TESTIMONIALS":
        setTestimonialsDraft(normalizeTestimonialsDraft(activeSection.content ?? {}));
        break;
      case "PRICING":
        setPricingDraft(normalizePricingDraft(activeSection.content ?? {}));
        break;
      case "FAQ":
        setFaqDraft(normalizeFaqDraftFromContent(activeSection.content ?? {}));
        break;
      case "WAITLIST":
        setWaitlistDraft(normalizeWaitlistDraft(activeSection.content ?? {}));
        break;
      case "ABOUT":
        setAboutDraft(normalizeAboutDraft(activeSection.content ?? {}));
        break;
      case "CONTACT":
        setContactDraft(normalizeContactDraft(activeSection.content ?? {}));
        break;
      case "FOOTER":
        setFooterDraft(normalizeFooterDraft(activeSection.content ?? {}));
        break;
      default:
        break;
    }
  }, [activeSectionId]);

  async function saveContent(content: any) {
    if (!activeSection) return;

    setStatus("Saving…");

    const res = await fetch(`/api/builder/sections/${activeSection.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      setStatus(`Save failed: ${txt}`);
      return;
    }

    setStatus("Saved ✓ (draft)");
  }

  async function saveJson() {
    if (!activeSection) return;

    const parsed = safeJsonParse(draftJson);
    if (!parsed.ok) {
      setStatus(`Invalid JSON: ${parsed.error}`);
      return;
    }

    await saveContent(parsed.value);
  }

  async function toggleHidden() {
    if (!activeSection) return;

    setStatus("Saving…");

    const res = await fetch(`/api/builder/sections/${activeSection.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ isHidden: !activeSection.isHidden }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      setStatus(`Toggle failed: ${txt}`);
      return;
    }

    setStatus("Visibility updated ✓");
  }

  async function publishSite() {
    setStatus("Publishing…");
    setPublishIssues([]); // clear previous issues

    const res = await fetch(`/api/builder/sites/${site.id}/publish`, {
      method: "POST",
    });

    if (!res.ok) {
      // Prefer JSON details if available
      const text = await res.text().catch(() => "");
      const parsed = safeJsonParse(text);

      if (parsed.ok) {
        const details = Array.isArray(parsed.value?.details) ? (parsed.value.details as PublishValidationError[]) : [];
        if (details.length > 0) {
          setPublishIssues(details);
          setStatus(`Publish blocked (${details.length} issue${details.length === 1 ? "" : "s"})`);
          return;
        }

        const msg = parsed.value?.error ? String(parsed.value.error) : "Publish failed";
        setStatus(msg);
        return;
      }

      setStatus(`Publish failed: ${text || "Unknown error"}`);
      return;
    }

    setStatus("Published ✓");
    setPublishIssues([]);
  }

  const previewHref = activePage ? pagePreviewPath(site.slug, activePage.type) : `/s/${site.slug}`;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: inspectorOpen ? `260px 1fr ${inspectorWidth}px` : "260px 1fr",
        height: "100vh",
      }}
    >
      {/* LEFT RAIL */}
      <aside style={{ borderRight: "1px solid rgba(0,0,0,0.12)", padding: 14 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>Builder</div>
        <div style={{ marginTop: 6, opacity: 0.8 }}>{site.name}</div>
        <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>{site.slug}.kompi.page</div>

        <div style={{ marginTop: 16, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Pages</div>

        <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
          {pages.map((p) => {
            const active = p.id === activePageId;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActivePageId(p.id);
                  setActiveSectionId(p.sections?.[0]?.id ?? "");
                }}
                style={{
                  textAlign: "left",
                  padding: "10px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: active ? "rgba(0,0,0,0.04)" : "white",
                  cursor: "pointer",
                  fontWeight: 800,
                  opacity: p.isHidden ? 0.5 : 1,
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.7 }}>{p.type}</div>
                <div>{p.title ?? p.type}</div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 16, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Sections</div>

        <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
          {(activePage?.sections ?? []).map((s) => {
            const active = s.id === activeSectionId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSectionId(s.id)}
                style={{
                  textAlign: "left",
                  padding: "10px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: active ? "rgba(0,0,0,0.04)" : "white",
                  cursor: "pointer",
                  fontWeight: 800,
                  opacity: s.isHidden ? 0.5 : 1,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <span>{s.type}</span>
                  <span style={{ fontSize: 12, opacity: 0.7 }}>{s.variant}</span>
                </div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{s.isHidden ? "Hidden" : "Visible"}</div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 16 }}>
          <a href={`/builder/${site.id}`} style={{ fontSize: 12, opacity: 0.8 }}>
            ← Back to raw view
          </a>
        </div>
      </aside>

      {/* CENTER PREVIEW */}
      <main style={{ padding: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 14, opacity: 0.85 }}>Preview</div>
            <div style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>
              <a href={previewHref} target="_blank" rel="noreferrer">
                {previewHref}
              </a>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ fontSize: 12, opacity: 0.7 }}>{status}</div>

            <button
              onClick={() => setInspectorOpen((v) => !v)}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "white",
                cursor: "pointer",
                fontWeight: 800,
              }}
            >
              {inspectorOpen ? "Hide inspector" : "Show inspector"}
            </button>

            <button
              onClick={publishSite}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid black",
                background: "black",
                color: "white",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Publish
            </button>
          </div>
        </div>

        {/* NEW: Publish issues panel */}
        {publishIssues.length > 0 ? (
          <div
            style={{
              marginTop: 14,
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              padding: 12,
              background: "rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ fontWeight: 900, marginBottom: 8 }}>Publish issues</div>
            <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.5 }}>
              Fix these and try publishing again:
            </div>
            <ul style={{ marginTop: 10, paddingLeft: 18 }}>
              {publishIssues.map((e, idx) => (
                <li key={idx} style={{ fontSize: 12, lineHeight: 1.5 }}>
                  {formatPublishIssue(e)}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div style={{ marginTop: 14, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, overflow: "hidden" }}>
          <iframe title="builder-preview" src={previewHref} style={{ width: "100%", height: "calc(100vh - 120px)", border: "0" }} />
        </div>
      </main>

      {/* RIGHT INSPECTOR */}
      {inspectorOpen ? (
        <aside style={{ borderLeft: "1px solid rgba(0,0,0,0.12)", padding: 14, overflow: "auto" }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>Inspector</div>

          {!activeSection ? (
            <div style={{ marginTop: 12, opacity: 0.8 }}>No section selected.</div>
          ) : (
            <>
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
                {activePage?.type} / {activeSection.type} · {activeSection.variant}
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  onClick={toggleHidden}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.12)",
                    background: "white",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                >
                  {activeSection.isHidden ? "Show section" : "Hide section"}
                </button>
              </div>

              {/* NAVBAR (logoText only; public renderer derives nav) */}
              {activeSection.type === "NAVBAR" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit NAVBAR</div>
                  <div style={labelStyle()}>Logo text</div>
                  <input value={navbarDraft.logoText} onChange={(e) => setNavbarDraft({ logoText: e.target.value })} style={inputStyle()} />
                  <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65, lineHeight: 1.4 }}>
                    Links are automatically derived from visible pages.
                  </div>
                  <button
                    onClick={() => saveContent({ ...activeSection.content, logoText: navbarDraft.logoText })}
                    style={{
                      marginTop: 12,
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.12)",
                      background: "rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    Save NAVBAR
                  </button>
                </div>
              ) : null}

              {/* HERO */}
              {activeSection.type === "HERO" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit HERO</div>

                  <div style={labelStyle()}>Headline</div>
                  <input value={heroDraft.headline} onChange={(e) => setHeroDraft({ ...heroDraft, headline: e.target.value })} style={inputStyle()} />

                  <div style={{ ...labelStyle(), marginTop: 12 }}>Subheadline</div>
                  <textarea value={heroDraft.subheadline} onChange={(e) => setHeroDraft({ ...heroDraft, subheadline: e.target.value })} style={textareaStyle(90)} />

                  <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                    <div>
                      <div style={labelStyle()}>CTA label</div>
                      <input
                        value={heroDraft.cta?.label ?? ""}
                        onChange={(e) => setHeroDraft({ ...heroDraft, cta: { ...heroDraft.cta, label: e.target.value } })}
                        style={inputStyle()}
                      />
                    </div>
                    <div>
                      <div style={labelStyle()}>CTA href</div>
                      <input
                        value={heroDraft.cta?.href ?? ""}
                        onChange={(e) => setHeroDraft({ ...heroDraft, cta: { ...heroDraft.cta, href: e.target.value } })}
                        style={inputStyle()}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => saveContent(heroDraft)}
                    style={{
                      marginTop: 14,
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.12)",
                      background: "rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    Save HERO
                  </button>
                </div>
              ) : null}

              {/* SOCIAL_PROOF */}
              {activeSection.type === "SOCIAL_PROOF" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit SOCIAL PROOF</div>

                  <div style={labelStyle()}>Headline</div>
                  <input value={socialProofDraft.headline} onChange={(e) => setSocialProofDraft((d) => ({ ...d, headline: e.target.value }))} style={inputStyle()} />

                  <div style={{ ...labelStyle(), marginTop: 12 }}>Quote (optional)</div>
                  <textarea value={socialProofDraft.quote} onChange={(e) => setSocialProofDraft((d) => ({ ...d, quote: e.target.value }))} style={textareaStyle(70)} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Logos</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {socialProofDraft.logos.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No logos yet.</div>
                    ) : (
                      socialProofDraft.logos.map((l, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>Logo #{idx + 1}</div>
                            <button onClick={() => setSocialProofDraft((d) => ({ ...d, logos: d.logos.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Name</div>
                          <input
                            value={l.name}
                            onChange={(e) =>
                              setSocialProofDraft((d) => ({
                                ...d,
                                logos: d.logos.map((it, i) => (i === idx ? { ...it, name: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setSocialProofDraft((d) => ({ ...d, logos: [...d.logos, { name: "" }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add logo
                    </button>

                    <button
                      onClick={() =>
                        saveContent({
                          headline: socialProofDraft.headline,
                          quote: socialProofDraft.quote || undefined,
                          logos: socialProofDraft.logos,
                        })
                      }
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save SOCIAL PROOF
                    </button>
                  </div>
                </div>
              ) : null}

              {/* FEATURES */}
              {activeSection.type === "FEATURES" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit FEATURES</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={featuresDraft.title} onChange={(e) => setFeaturesDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Items</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {featuresDraft.items.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No items yet.</div>
                    ) : (
                      featuresDraft.items.map((item, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>Item #{idx + 1}</div>
                            <button onClick={() => setFeaturesDraft((d) => ({ ...d, items: d.items.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Title</div>
                          <input
                            value={item.title}
                            onChange={(e) =>
                              setFeaturesDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Description</div>
                          <textarea
                            value={item.description}
                            onChange={(e) =>
                              setFeaturesDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, description: e.target.value } : it)),
                              }))
                            }
                            style={textareaStyle(70)}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setFeaturesDraft((d) => ({ ...d, items: [...d.items, { title: "", description: "" }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add item
                    </button>

                    <button
                      onClick={() => saveContent({ title: featuresDraft.title, items: featuresDraft.items })}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save FEATURES
                    </button>
                  </div>
                </div>
              ) : null}

              {/* BENEFITS */}
              {activeSection.type === "BENEFITS" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit BENEFITS</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={benefitsDraft.title} onChange={(e) => setBenefitsDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Items</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {benefitsDraft.items.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No items yet.</div>
                    ) : (
                      benefitsDraft.items.map((item, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>Item #{idx + 1}</div>
                            <button onClick={() => setBenefitsDraft((d) => ({ ...d, items: d.items.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Title</div>
                          <input
                            value={item.title}
                            onChange={(e) =>
                              setBenefitsDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Description</div>
                          <textarea
                            value={item.description}
                            onChange={(e) =>
                              setBenefitsDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, description: e.target.value } : it)),
                              }))
                            }
                            style={textareaStyle(70)}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setBenefitsDraft((d) => ({ ...d, items: [...d.items, { title: "", description: "" }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add item
                    </button>

                    <button
                      onClick={() => saveContent({ title: benefitsDraft.title, items: benefitsDraft.items })}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save BENEFITS
                    </button>
                  </div>
                </div>
              ) : null}

              {/* HOW_IT_WORKS */}
              {activeSection.type === "HOW_IT_WORKS" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit HOW IT WORKS</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={howItWorksDraft.title} onChange={(e) => setHowItWorksDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Steps</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {howItWorksDraft.steps.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No steps yet.</div>
                    ) : (
                      howItWorksDraft.steps.map((step, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>Step #{idx + 1}</div>
                            <button onClick={() => setHowItWorksDraft((d) => ({ ...d, steps: d.steps.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Title</div>
                          <input
                            value={step.title}
                            onChange={(e) =>
                              setHowItWorksDraft((d) => ({
                                ...d,
                                steps: d.steps.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Description</div>
                          <textarea
                            value={step.description}
                            onChange={(e) =>
                              setHowItWorksDraft((d) => ({
                                ...d,
                                steps: d.steps.map((it, i) => (i === idx ? { ...it, description: e.target.value } : it)),
                              }))
                            }
                            style={textareaStyle(70)}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setHowItWorksDraft((d) => ({ ...d, steps: [...d.steps, { title: "", description: "" }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add step
                    </button>

                    <button
                      onClick={() => saveContent({ title: howItWorksDraft.title, steps: howItWorksDraft.steps })}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save HOW IT WORKS
                    </button>
                  </div>
                </div>
              ) : null}

              {/* USE_CASES */}
              {activeSection.type === "USE_CASES" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit USE CASES</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={useCasesDraft.title} onChange={(e) => setUseCasesDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Items</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {useCasesDraft.items.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No items yet.</div>
                    ) : (
                      useCasesDraft.items.map((item, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>Item #{idx + 1}</div>
                            <button onClick={() => setUseCasesDraft((d) => ({ ...d, items: d.items.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Title</div>
                          <input
                            value={item.title}
                            onChange={(e) =>
                              setUseCasesDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Description</div>
                          <textarea
                            value={item.description}
                            onChange={(e) =>
                              setUseCasesDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, description: e.target.value } : it)),
                              }))
                            }
                            style={textareaStyle(70)}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setUseCasesDraft((d) => ({ ...d, items: [...d.items, { title: "", description: "" }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add item
                    </button>

                    <button
                      onClick={() => saveContent({ title: useCasesDraft.title, items: useCasesDraft.items })}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save USE CASES
                    </button>
                  </div>
                </div>
              ) : null}

              {/* TESTIMONIALS */}
              {activeSection.type === "TESTIMONIALS" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit TESTIMONIALS</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={testimonialsDraft.title} onChange={(e) => setTestimonialsDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Items</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {testimonialsDraft.items.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No testimonials yet.</div>
                    ) : (
                      testimonialsDraft.items.map((t, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>Item #{idx + 1}</div>
                            <button onClick={() => setTestimonialsDraft((d) => ({ ...d, items: d.items.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Quote</div>
                          <textarea
                            value={t.quote}
                            onChange={(e) =>
                              setTestimonialsDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, quote: e.target.value } : it)),
                              }))
                            }
                            style={textareaStyle(70)}
                          />

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Name</div>
                          <input
                            value={t.name}
                            onChange={(e) =>
                              setTestimonialsDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, name: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setTestimonialsDraft((d) => ({ ...d, items: [...d.items, { quote: "", name: "" }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add item
                    </button>

                    <button
                      onClick={() => saveContent({ title: testimonialsDraft.title, items: testimonialsDraft.items })}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save TESTIMONIALS
                    </button>
                  </div>
                </div>
              ) : null}

              {/* PRICING */}
              {activeSection.type === "PRICING" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit PRICING</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={pricingDraft.title} onChange={(e) => setPricingDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Plans</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {pricingDraft.plans.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No plans yet.</div>
                    ) : (
                      pricingDraft.plans.map((p, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>Plan #{idx + 1}</div>
                            <button onClick={() => setPricingDraft((d) => ({ ...d, plans: d.plans.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Name</div>
                          <input
                            value={p.name}
                            onChange={(e) =>
                              setPricingDraft((d) => ({
                                ...d,
                                plans: d.plans.map((it, i) => (i === idx ? { ...it, name: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Price</div>
                          <input
                            value={p.price}
                            onChange={(e) =>
                              setPricingDraft((d) => ({
                                ...d,
                                plans: d.plans.map((it, i) => (i === idx ? { ...it, price: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />

                          <div style={{ marginTop: 12, fontWeight: 800, fontSize: 12, opacity: 0.85 }}>Features</div>

                          <div style={{ marginTop: 8, display: "grid", gap: 8 }}>
                            {p.features.length === 0 ? (
                              <div style={{ opacity: 0.7, fontSize: 12 }}>No features yet.</div>
                            ) : (
                              p.features.map((f, fIdx) => (
                                <div key={fIdx} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8, alignItems: "center" }}>
                                  <input
                                    value={f}
                                    onChange={(e) =>
                                      setPricingDraft((d) => ({
                                        ...d,
                                        plans: d.plans.map((it, i) =>
                                          i === idx
                                            ? {
                                                ...it,
                                                features: it.features.map((fx, j) => (j === fIdx ? e.target.value : fx)),
                                              }
                                            : it
                                        ),
                                      }))
                                    }
                                    style={{
                                      width: "100%",
                                      padding: 10,
                                      borderRadius: 12,
                                      border: "1px solid rgba(0,0,0,0.12)",
                                    }}
                                  />
                                  <button
                                    onClick={() =>
                                      setPricingDraft((d) => ({
                                        ...d,
                                        plans: d.plans.map((it, i) =>
                                          i === idx ? { ...it, features: it.features.filter((_, j) => j !== fIdx) } : it
                                        ),
                                      }))
                                    }
                                    style={smallBtnStyle()}
                                  >
                                    Remove
                                  </button>
                                </div>
                              ))
                            )}
                          </div>

                          <button
                            onClick={() =>
                              setPricingDraft((d) => ({
                                ...d,
                                plans: d.plans.map((it, i) => (i === idx ? { ...it, features: [...it.features, ""] } : it)),
                              }))
                            }
                            style={{
                              marginTop: 10,
                              width: "100%",
                              padding: "10px 12px",
                              borderRadius: 12,
                              border: "1px solid rgba(0,0,0,0.12)",
                              background: "white",
                              cursor: "pointer",
                              fontWeight: 900,
                            }}
                          >
                            + Add plan feature
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setPricingDraft((d) => ({ ...d, plans: [...d.plans, { name: "", price: "", features: [] }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add plan
                    </button>

                    <button
                      onClick={() => saveContent({ title: pricingDraft.title, plans: pricingDraft.plans })}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save PRICING
                    </button>
                  </div>
                </div>
              ) : null}

              {/* FAQ */}
              {activeSection.type === "FAQ" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit FAQ</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={faqDraft.title} onChange={(e) => setFaqDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Questions</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {faqDraft.items.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No FAQs yet.</div>
                    ) : (
                      faqDraft.items.map((item, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>FAQ #{idx + 1}</div>
                            <button onClick={() => setFaqDraft((d) => ({ ...d, items: d.items.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Question</div>
                          <input
                            value={item.question}
                            onChange={(e) =>
                              setFaqDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, question: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Answer</div>
                          <textarea
                            value={item.answer}
                            onChange={(e) =>
                              setFaqDraft((d) => ({
                                ...d,
                                items: d.items.map((it, i) => (i === idx ? { ...it, answer: e.target.value } : it)),
                              }))
                            }
                            style={textareaStyle(70)}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setFaqDraft((d) => ({ ...d, items: [...d.items, { question: "", answer: "" }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add FAQ
                    </button>

                    <button
                      onClick={() => saveContent({ title: faqDraft.title, items: faqDraft.items })}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save FAQ
                    </button>
                  </div>
                </div>
              ) : null}

              {/* WAITLIST */}
              {activeSection.type === "WAITLIST" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit WAITLIST</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={waitlistDraft.title} onChange={(e) => setWaitlistDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ ...labelStyle(), marginTop: 12 }}>Body</div>
                  <textarea value={waitlistDraft.body} onChange={(e) => setWaitlistDraft((d) => ({ ...d, body: e.target.value }))} style={textareaStyle(90)} />

                  <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                    <div>
                      <div style={labelStyle()}>CTA label</div>
                      <input value={waitlistDraft.cta.label} onChange={(e) => setWaitlistDraft((d) => ({ ...d, cta: { ...d.cta, label: e.target.value } }))} style={inputStyle()} />
                    </div>
                    <div>
                      <div style={labelStyle()}>CTA href</div>
                      <input value={waitlistDraft.cta.href} onChange={(e) => setWaitlistDraft((d) => ({ ...d, cta: { ...d.cta, href: e.target.value } }))} style={inputStyle()} />
                    </div>
                  </div>

                  <button
                    onClick={() => saveContent({ title: waitlistDraft.title, body: waitlistDraft.body, cta: waitlistDraft.cta })}
                    style={{
                      marginTop: 12,
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.12)",
                      background: "rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    Save WAITLIST
                  </button>
                </div>
              ) : null}

              {/* ABOUT */}
              {activeSection.type === "ABOUT" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit ABOUT</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={aboutDraft.title} onChange={(e) => setAboutDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ ...labelStyle(), marginTop: 12 }}>Body</div>
                  <textarea value={aboutDraft.body} onChange={(e) => setAboutDraft((d) => ({ ...d, body: e.target.value }))} style={textareaStyle(140)} />

                  <button
                    onClick={() => saveContent({ title: aboutDraft.title, body: aboutDraft.body })}
                    style={{
                      marginTop: 12,
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.12)",
                      background: "rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    Save ABOUT
                  </button>
                </div>
              ) : null}

              {/* CONTACT */}
              {activeSection.type === "CONTACT" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit CONTACT</div>

                  <div style={labelStyle()}>Title</div>
                  <input value={contactDraft.title} onChange={(e) => setContactDraft((d) => ({ ...d, title: e.target.value }))} style={inputStyle()} />

                  <div style={{ ...labelStyle(), marginTop: 12 }}>Email</div>
                  <input value={contactDraft.email} onChange={(e) => setContactDraft((d) => ({ ...d, email: e.target.value }))} style={inputStyle()} />

                  <button
                    onClick={() => saveContent({ title: contactDraft.title, email: contactDraft.email })}
                    style={{
                      marginTop: 12,
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.12)",
                      background: "rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      fontWeight: 900,
                    }}
                  >
                    Save CONTACT
                  </button>
                </div>
              ) : null}

              {/* FOOTER */}
              {activeSection.type === "FOOTER" ? (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontWeight: 900, marginBottom: 10 }}>Edit FOOTER</div>

                  <div style={labelStyle()}>Copyright</div>
                  <input value={footerDraft.copyright} onChange={(e) => setFooterDraft((d) => ({ ...d, copyright: e.target.value }))} style={inputStyle()} />

                  <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>Links</div>

                  <div style={{ marginTop: 10, display: "grid", gap: 12 }}>
                    {footerDraft.links.length === 0 ? (
                      <div style={{ opacity: 0.7, fontSize: 12 }}>No links yet.</div>
                    ) : (
                      footerDraft.links.map((l, idx) => (
                        <div key={idx} style={cardStyle()}>
                          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                            <div style={{ fontWeight: 900, fontSize: 12, opacity: 0.8 }}>Link #{idx + 1}</div>
                            <button onClick={() => setFooterDraft((d) => ({ ...d, links: d.links.filter((_, i) => i !== idx) }))} style={smallBtnStyle()}>
                              Remove
                            </button>
                          </div>

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Label</div>
                          <input
                            value={l.label}
                            onChange={(e) =>
                              setFooterDraft((d) => ({
                                ...d,
                                links: d.links.map((it, i) => (i === idx ? { ...it, label: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />

                          <div style={{ ...labelStyle(), marginTop: 10 }}>Href</div>
                          <input
                            value={l.href}
                            onChange={(e) =>
                              setFooterDraft((d) => ({
                                ...d,
                                links: d.links.map((it, i) => (i === idx ? { ...it, href: e.target.value } : it)),
                              }))
                            }
                            style={inputStyle()}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                    <button
                      onClick={() => setFooterDraft((d) => ({ ...d, links: [...d.links, { label: "", href: "" }] }))}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "white",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      + Add link
                    </button>

                    <button
                      onClick={() => saveContent({ copyright: footerDraft.copyright, links: footerDraft.links })}
                      style={{
                        flex: 1,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save FOOTER
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Advanced JSON escape hatch */}
              <div style={{ marginTop: 18 }}>
                <button
                  onClick={() => setShowAdvanced((v) => !v)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.12)",
                    background: "white",
                    cursor: "pointer",
                    fontWeight: 800,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  {showAdvanced ? "Hide Advanced" : "Show Advanced"}
                </button>

                {showAdvanced ? (
                  <>
                    <div style={{ marginTop: 12, fontWeight: 800, fontSize: 13, opacity: 0.85 }}>
                      Section content (JSON)
                    </div>

                    <textarea
                      value={draftJson}
                      onChange={(e) => setDraftJson(e.target.value)}
                      spellCheck={false}
                      style={{
                        width: "100%",
                        height: 260,
                        marginTop: 8,
                        borderRadius: 14,
                        border: "1px solid rgba(0,0,0,0.12)",
                        padding: 12,
                        fontFamily:
                          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        fontSize: 12,
                        lineHeight: 1.4,
                        resize: "vertical",
                      }}
                    />

                    <button
                      onClick={saveJson}
                      style={{
                        marginTop: 10,
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.12)",
                        background: "rgba(0,0,0,0.04)",
                        cursor: "pointer",
                        fontWeight: 900,
                      }}
                    >
                      Save JSON
                    </button>
                  </>
                ) : null}
              </div>
            </>
          )}
        </aside>
      ) : null}
    </div>
  );
}
