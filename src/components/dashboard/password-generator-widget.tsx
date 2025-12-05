"use client";

import * as React from "react";
import PasswordGenerator from "@/components/tools/PasswordGenerator";

export default function PasswordGeneratorWidget() {
  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold tracking-tight">
            Quick password generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Create a strong password without leaving your dashboard.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <PasswordGenerator variant="dashboard" />
      </div>
    </section>
  );
}
