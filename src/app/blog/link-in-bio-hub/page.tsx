import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen, LayoutGrid, Link2 } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { getAllPSEOPages } from "@/lib/pseo/dataset";

const DOMAIN = "https://kompi.app";
const CANONICAL = "/blog/link-in-bio-hub";

export const metadata: Metadata = {
  title: "Link in Bio — Guides, Examples, Best Practices | Kompi",
  description: "Practical link-in-bio guides and examples, plus how to build and track a bio link page with Kompi.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: `${DOMAIN}${CANONICAL}`,
    title: "Link in Bio — Guides, Examples, Best Practices | Kompi",
    description: "Practical link-in-bio guides and examples, plus how to build and track a bio link page with Kompi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Link in Bio — Guides, Examples, Best Practices | Kompi",
    description: "Practical link-in-bio guides and examples, plus how to build and track a bio link page with Kompi.",
  },
  robots: { index: true, follow: true },
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

function pickCoverFor(p: { slug: string; primaryKeyword: string }) {
  const s = `${p.slug} ${p.primaryKeyword}`.toLowerCase();

  if (s.includes("analytics") || s.includes("track") || s.includes("click")) return "/growth/analytics.png";
  if (s.includes("example") || s.includes("ideas") || s.includes("cta")) return "/growth/k-cards.png";
  if (s.includes("linktree") || s.includes("alternative")) return "/growth/links.png";
  return "/growth/subscribers.png";
}

export default function LinkInBioHubPage() {
  const pages = getAllPSEOPages()
    .filter((p) => p.cluster === "bio")
    .sort((a, b) => a.primaryKeyword.localeCompare(b.primaryKeyword));

  const featured = pages[0];
  const rest = pages.slice(1);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <main className="pt-0">
        {/* Hero */}
        <section className="border-b border-black/10 bg-linear-to-b from-[#F7F7F4] to-white pt-24 md:pt-28 pb-10">
          <Container>
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700">
                <BookOpen className="h-4 w-4" />
                Kompi Blog
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-950">
                Link in bio that converts.
              </h1>

              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
                A growing library of link-in-bio best practices, layouts, examples, and tracking tips — built for
                creators and businesses that want measurable results.
              </p>

              {/* Quick actions */}
              <div className="mt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/links"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 font-semibold shadow-sm hover:shadow-lg transition"
                >
                  <LayoutGrid className="h-4 w-4 opacity-80 group-hover:opacity-100 transition" />
                  Create a link in bio
                  <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                </Link>

                <Link
                  href="/features/url-shortener"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 font-semibold shadow-sm hover:shadow-lg transition"
                >
                  <Link2 className="h-4 w-4 opacity-80 group-hover:opacity-100 transition" />
                  Short links + tracking
                  <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                </Link>

                <Link
                  href="/tools/utm-builder"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 font-semibold shadow-sm hover:shadow-lg transition"
                >
                  Add UTMs
                  <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Featured */}
        <section className="py-10 md:py-14">
          <Container>
            {featured ? (
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-6 md:grid-cols-12 items-stretch rounded-4xl border border-black/10 bg-white shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <div className="md:col-span-7 relative aspect-16/10 md:aspect-auto md:min-h-[340px]">
                  <Image
                    src={pickCoverFor(featured)}
                    alt={featured.primaryKeyword}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 900px"
                    priority
                  />
                </div>

                <div className="md:col-span-5 p-7 md:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-neutral-700">Featured link-in-bio guide</div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950">
                      {featured.primaryKeyword}
                    </h2>

                    <p className="text-neutral-700 leading-relaxed">
                      {featured.intent ? `Intent: ${featured.intent}.` : "Layouts, examples, and tracking guidance."}{" "}
                      {featured.secondaryKeywords?.length
                        ? `Also covers: ${featured.secondaryKeywords.slice(0, 3).join(", ")}.`
                        : ""}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 font-semibold text-neutral-950">
                    Read article{" "}
                    <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-3xl border border-black/10 bg-[#F7F7F4] p-10 text-center">
                <div className="text-xl font-bold text-neutral-950">No link-in-bio posts found</div>
                <div className="mt-2 text-neutral-700">
                  Your dataset returned no pages in the{" "}
                  <code className="px-2 py-1 rounded bg-white border border-black/10">bio</code> cluster.
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* All articles */}
        {rest.length ? (
          <section className="pb-16 md:pb-24">
            <Container>
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-neutral-950">All link-in-bio articles</h2>
                  <p className="mt-1 text-neutral-700">Browse examples, best practices, tracking, and comparisons.</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group rounded-3xl border border-black/10 bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="relative aspect-16/10 w-full">
                      <Image
                        src={pickCoverFor(p)}
                        alt={p.primaryKeyword}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 520px"
                      />
                    </div>

                    <div className="p-6 md:p-7 space-y-3">
                      <div className="text-sm font-semibold text-neutral-700">{p.intent ?? "Link in Bio"}</div>
                      <div className="text-xl font-extrabold tracking-tight text-neutral-950">{p.primaryKeyword}</div>

                      {p.secondaryKeywords?.length ? (
                        <div className="text-neutral-700 leading-relaxed">
                          Also: {p.secondaryKeywords.slice(0, 3).join(", ")}
                        </div>
                      ) : null}

                      <div className="pt-1 inline-flex items-center gap-2 font-semibold text-neutral-950">
                        Read <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>

      <FooterCTA />
    </div>
  );
}
