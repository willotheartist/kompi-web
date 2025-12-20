// src/components/blog/ArticleTOC.tsx
"use client";

import React from "react";

type TOCItem = { id: string; title: string };

export default function ArticleTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id ?? "");

  React.useEffect(() => {
    if (!items.length) return;

    const ids = items.map((i) => i.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // choose the most visible / top-most intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible.length) {
          const id = (visible[0].target as HTMLElement).id;
          if (id) setActiveId(id);
        }
      },
      {
        root: null,
        // this makes “active” switch earlier while scrolling
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0.08, 0.15, 0.25],
      }
    );

    for (const el of elements) obs.observe(el);

    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="k-toc" aria-label="On this page">
      {items.map((t) => {
        const isActive = t.id === activeId;
        return (
          <a
            key={t.id}
            href={`#${t.id}`}
            className={`k-toc-link ${isActive ? "is-active" : ""}`}
          >
            <span className="k-toc-dot" aria-hidden="true" />
            <span className="k-toc-title">{t.title}</span>
          </a>
        );
      })}
    </nav>
  );
}
