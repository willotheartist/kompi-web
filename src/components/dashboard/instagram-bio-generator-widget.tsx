"use client";

import { InstagramBioGenerator } from "@/components/tools/InstagramBioGenerator";

export default function InstagramBioGeneratorWidget() {
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold">Quick Instagram bio generator</h2>
      <p className="text-xs text-muted-foreground mb-3">
        Generate clean, aesthetic, or playful bios from your dashboard.
      </p>

      <div className="max-w-xl">
        <InstagramBioGenerator variant="dashboard" />
      </div>
    </section>
  );
}
