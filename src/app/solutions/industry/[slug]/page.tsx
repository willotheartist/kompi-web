// src/app/solutions/industry/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustrySolution, industrySlugs } from "@/lib/solutions";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return industrySlugs.map((slug) => ({ slug }));
}

// params is a Promise here
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params;
  const solution = getIndustrySolution(slug);

  if (!solution) {
    return { title: "Solutions | Kompi" };
  }

  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
  };
}

// 👇 params is ALSO a Promise here
export default async function IndustrySolutionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const solution = getIndustrySolution(slug);

  if (!solution) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-12 md:px-8 lg:py-20">
      {/* HERO */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Solutions · {solution.label}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {solution.h1}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {solution.subheading}
        </p>
        <p className="mt-2 text-sm font-medium text-foreground">
          {solution.heroBenefit}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="lg">Start free</Button>
          <Button size="lg" variant="outline">
            Talk to sales
          </Button>
        </div>

        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Built for {solution.audience.join(" · ")}
        </p>
      </section>

      {/* PAINS & OUTCOMES */}
      <section className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            The problem for {solution.label.toLowerCase()} teams
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {solution.pains.map((pain) => (
              <li key={pain} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-destructive" />
                <span>{pain}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            What you get with Kompi
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {solution.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-foreground" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* USE CASES */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight">
          How {solution.label.toLowerCase()} brands use Kompi
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {solution.useCases.map((u) => (
            <article
              key={u.title}
              className="rounded-2xl border bg-background p-5"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold">{u.title}</h3>
                {u.badge && (
                  <span className="rounded-full border px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {u.badge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {u.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight">Why Kompi</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {solution.features.map((f) => (
            <article key={f.title} className="rounded-2xl border bg-muted/40 p-5">
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {f.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t pt-10">
        <h2 className="text-xl font-semibold tracking-tight">
          FAQs for {solution.label.toLowerCase()} teams
        </h2>
        <dl className="mt-6 space-y-5">
          {solution.faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-sm font-medium">{faq.question}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
