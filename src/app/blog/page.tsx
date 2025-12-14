// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { getBlogRoutesIndex, type BlogRoutePost } from "@/lib/blog-route-index";

const DOMAIN = "https://kompi.app";
const CANONICAL = "/blog";

export const metadata: Metadata = {
  title: "Kompi Blog",
  description: "Practical articles on creator growth, hashtags, links, QR, and tracking.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: `${DOMAIN}${CANONICAL}`,
    title: "Kompi Blog",
    description: "Practical articles on creator growth, hashtags, links, QR, and tracking.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompi Blog",
    description: "Practical articles on creator growth, hashtags, links, QR, and tracking.",
  },
  robots: { index: true, follow: true },
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

export default function BlogPage() {
  const posts = getBlogRoutesIndex();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <main className="pt-0">
        <section className="border-b border-black/10 bg-gradient-to-b from-[#F7F7F4] to-white pt-24 md:pt-28 pb-10">
          <Container>
            <div className="flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700">
                <BookOpen className="h-4 w-4" />
                Kompi Blog
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-950">
                Articles for clean, measurable growth.
              </h1>

              <p className="max-w-2xl text-base md:text-lg leading-relaxed text-neutral-700">
                Short, practical reads you can apply today.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-10 md:py-14">
          <Container>
            {featured ? (
              <Link
                href={featured.href}
                className="group grid gap-6 md:grid-cols-12 items-stretch rounded-[2rem] border border-black/10 bg-white shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[340px]">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 900px"
                    priority
                  />
                </div>

                <div className="md:col-span-5 p-7 md:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-950">
                      {featured.title}
                    </h2>
                    {featured.description ? (
                      <p className="text-neutral-700 leading-relaxed">{featured.description}</p>
                    ) : null}
                  </div>

                  <div className="inline-flex items-center gap-2 font-semibold text-neutral-950">
                    Read article <ArrowUpRight className="h-4 w-4 opacity-70 group-hover:opacity-100 transition" />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="rounded-3xl border border-black/10 bg-[#F7F7F4] p-10 text-center">
                <div className="text-xl font-bold text-neutral-950">No posts found</div>
                <div className="mt-2 text-neutral-700">
                  Create route folders in{" "}
                  <code className="px-2 py-1 rounded bg-white border border-black/10">
                    src/app/blog/&lt;slug&gt;/page.tsx
                  </code>
                </div>
              </div>
            )}
          </Container>
        </section>

        {rest.length ? (
          <section className="pb-16 md:pb-24">
            <Container>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p: BlogRoutePost) => (
                  <Link
                    key={p.slug}
                    href={p.href}
                    className="group rounded-3xl border border-black/10 bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 520px"
                      />
                    </div>

                    <div className="p-6 md:p-7 space-y-3">
                      <div className="text-xl font-extrabold tracking-tight text-neutral-950">{p.title}</div>
                      {p.description ? <div className="text-neutral-700 leading-relaxed">{p.description}</div> : null}

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
