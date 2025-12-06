"use client";

import { InstagramCaptionGenerator } from "@/components/tools/InstagramCaptionGenerator";

export default function InstagramCaptionGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick Instagram caption generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Draft hooks, CTAs, and hashtags from inside your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <InstagramCaptionGenerator variant="dashboard" />
      </div>
    </section>
  );
}
