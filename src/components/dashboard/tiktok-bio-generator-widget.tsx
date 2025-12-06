"use client";

import { TikTokBioGenerator } from "@/components/tools/TikTokBioGenerator";

export default function TikTokBioGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick TikTok bio generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Refresh your profile bio without leaving your Kompi dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <TikTokBioGenerator variant="dashboard" />
      </div>
    </section>
  );
}
