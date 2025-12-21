// src/app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buildPSEOPage } from "@/lib/pseo/page-builder";
import { getAllPSEOPages, getPSEOPageBySlug, getSiblingPages } from "@/lib/pseo/dataset";
import AutoLinkedContent from "@/components/seo/AutoLinkedContent";

import { buildTLDR, extractExamples, buildPlaybook, buildTOC } from "@/lib/pseo/enhancers";

import "../blog-article.css";

type ParamsPromise = Promise<{ slug: string }>;

const BASE_URL = "https://kompi.app";

export async function generateStaticParams() {
  return getAllPSEOPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: ParamsPromise }): Promise<Metadata> {
  const { slug } = await params;

  const input = getPSEOPageBySlug(slug);
  if (!input) return {};

  const siblings = getSiblingPages(input);
  const built = buildPSEOPage(input, siblings);

  const url = `${BASE_URL}/blog/${input.slug}`;

  return {
    title: built.title,
    description: built.description,

    // ✅ Absolute canonical (safer)
    alternates: { canonical: url },

    // ✅ Social metadata
    openGraph: {
      type: "article",
      url,
      title: built.title,
      description: built.description,
    },
    twitter: {
      card: "summary_large_image",
      title: built.title,
      description: built.description,
    },

    // ✅ Respect the gate
    robots: built.index ? { index: true, follow: true } : { index: false, follow: true },
  };
}

function labelFromHref(href: string) {
  const raw = href.replace("/blog/", "").replaceAll("-", " ").trim();
  return raw.length ? raw : "Related article";
}

type CTAConfig = {
  buttonHref: string;
  buttonLabel: string;
  body: string;
  footLink?: { href: string; label: string };
};

function getCTA(cluster?: string): CTAConfig {
  if (cluster === "utm") {
    return {
      buttonHref: "/tools/utm-builder",
      buttonLabel: "Open UTM builder",
      body: "Build consistent UTMs, then shorten and track clicks inside Kompi.",
      footLink: { href: "/features/url-shortener", label: "Add a short link →" },
    };
  }

  if (cluster === "bio") {
    return {
      buttonHref: "/links",
      buttonLabel: "Create a link in bio",
      body: "Make a clean bio link page and track clicks. Keep one primary CTA, then iterate based on results.",
      footLink: { href: "/features/url-shortener", label: "Track each link →" },
    };
  }

  return {
    buttonHref: "/qr-code/dynamic",
    buttonLabel: "Create a dynamic QR",
    body: "Editable destination + tracking. Use one QR per placement to learn what actually works.",
  };
}

export default async function PSEOPage({ params }: { params: ParamsPromise }) {
  const { slug } = await params;

  const input = getPSEOPageBySlug(slug);
  if (!input) return notFound();

  const siblings = getSiblingPages(input);
  const built = buildPSEOPage(input, siblings);

  const isUTM = input.cluster === "utm";
  const isBio = input.cluster === "bio";

  const cta = getCTA(input.cluster);

  const currentUrl = `/blog/${input.slug}`;
  const absoluteUrl = `${BASE_URL}${currentUrl}`;

  const tldr = buildTLDR(built.sections);
  const examples = extractExamples(built.sections, 24);
  const playbook = buildPlaybook(built.title);
  const toc = buildTOC(built.sections);

  // ⚠️ Prefer a stable date from your dataset if available:
  // const updated = input.updatedAt ?? input.publishedAt ?? "2025-12-20";
  const updated = new Date().toISOString().slice(0, 10);

  const jsonLd =
    built.index
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: built.title,
          description: built.description,
          mainEntityOfPage: absoluteUrl,
          author: { "@type": "Organization", name: "Kompi" },
          publisher: { "@type": "Organization", name: "Kompi" },
          dateModified: updated,
        }
      : null;

  return (
    <main className="k-article-wrap">
      {/* ✅ Article structured data */}
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}

      <div className="k-shell">
        <div className="k-grid">
          <article className="k-article" style={{ paddingLeft: 0, paddingRight: 0 }}>
            {!built.index && (
              <div
                style={{
                  marginBottom: 18,
                  padding: 12,
                  borderRadius: 12,
                  background: "rgba(255, 200, 0, .12)",
                  color: "rgba(0,0,0,.75)",
                  fontSize: 13,
                }}
              >
                This page is currently <strong>noindex</strong> (quality gate). It will still pass
                internal links and can be improved later.
              </div>
            )}

            <header>
              <div className="k-eyebrow">Kompi Blog</div>
              <h1 className="k-title">{built.title}</h1>
              <p className="k-subtitle">{built.description}</p>

              <div className="k-meta">
                <span className="k-avatar" aria-hidden="true" />
                <span>Kompi Editorial</span>
                <span>·</span>
                <span>Updated {updated}</span>
              </div>

              <div className="k-divider" />

              {tldr.bullets.length > 0 && (
                <div className="k-tldr">
                  <h4>Key takeaways</h4>
                  <ul>
                    {tldr.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </header>

            <section className="k-content k-dropcap">
              {built.sections.map((s, idx) => (
                <section key={s.id} id={toc[idx]?.id || s.id}>
                  <h2>{s.title}</h2>
                  <AutoLinkedContent text={s.content} currentUrl={currentUrl} className="k-prose" as="div" />
                </section>
              ))}

              {examples.length > 0 && (
                <section>
                  <h2>Examples you can copy</h2>
                  <p>
                    {isUTM
                      ? "Use these as starting points. Keep your naming consistent, measure results for a week, then iterate."
                      : isBio
                      ? "Use these as starting points. Keep one primary call-to-action, track clicks for a week, then iterate."
                      : "Use these as starting points. Keep one QR per placement, measure results for a week, then iterate."}
                  </p>

                  <div className="k-examples">
                    {examples.map((ex, i) => (
                      <div key={i} className="k-example">
                        <h5>{ex.title}</h5>
                        <dl>
                          {ex.linkTo && (
                            <div>
                              <dt>Link to</dt>
                              <dd>{ex.linkTo}</dd>
                            </div>
                          )}
                          {ex.cta && (
                            <div>
                              <dt>CTA</dt>
                              <dd>{ex.cta}</dd>
                            </div>
                          )}
                          {ex.tracking && (
                            <div>
                              <dt>Tracking</dt>
                              <dd>{ex.tracking}</dd>
                            </div>
                          )}
                        </dl>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2>A simple 3-week playbook</h2>
                <div className="k-playbook">
                  {playbook.map((w, i) => (
                    <div key={i} className="k-week">
                      <h5>{w.title}</h5>
                      <ul>
                        {w.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </section>

            <aside className="k-related">
              <h4>Related</h4>
              {built.internalLinks.map((href) => (
                <Link key={href} href={href}>
                  {labelFromHref(href)}
                </Link>
              ))}
            </aside>
          </article>

          <aside className="k-aside">
            <div className="k-sticky">
              <div className="k-panel">
                <h4>Try Kompi</h4>

                <Link className="k-btn" href={cta.buttonHref}>
                  {cta.buttonLabel}
                </Link>

                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    color: "rgba(0,0,0,.6)",
                    lineHeight: 1.5,
                  }}
                >
                  {cta.body}
                </div>

                {cta.footLink ? (
                  <div style={{ marginTop: 10, fontSize: 13 }}>
                    <Link href={cta.footLink.href}>{cta.footLink.label}</Link>
                  </div>
                ) : null}
              </div>

              <div className="k-panel">
                <h4>On this page</h4>
                <nav aria-label="On this page">
                  <div style={{ display: "grid", gap: 8, fontSize: 13, lineHeight: 1.45 }}>
                    {toc.map((t) => (
                      <a key={t.id} href={`#${t.id}`}>
                        {t.title}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>

              <div className="k-panel">
                <h4>More tools</h4>
                <div style={{ display: "grid", gap: 8, fontSize: 13 }}>
                  <Link href="/links">Link in bio</Link>
                  <Link href="/features/url-shortener">URL shortener</Link>
                  <Link href="/tools/utm-builder">UTM builder</Link>
                  <Link href="/qr-code/dynamic">Dynamic QR</Link>
                  <Link href="/qr-menus">QR menus</Link>
                  <Link href="/qr-code/with-logo">QR with logo</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
