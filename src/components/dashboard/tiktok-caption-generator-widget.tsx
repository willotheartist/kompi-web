"use client";

import { TikTokCaptionGenerator } from "@/components/tools/TikTokCaptionGenerator";

export default function TikTokCaptionGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick TikTok caption generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Turn clips into post-ready captions from inside your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <TikTokCaptionGenerator variant="dashboard" />
      </div>
    </section>
  );
}
