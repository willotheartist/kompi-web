import { Suspense } from "react";
import BrandColorExtractorClient from "./BrandColorExtractorClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-muted-foreground">
          Loading…
        </div>
      }
    >
      <BrandColorExtractorClient />
    </Suspense>
  );
}
