"use client";

import { HashtagGenerator } from "@/components/tools/HashtagGenerator";

export default function HashtagGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick hashtag generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Build a few go-to hashtag sets without leaving your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <HashtagGenerator variant="dashboard" />
      </div>
    </section>
  );
}
