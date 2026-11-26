import { Suspense } from "react";
import { DashboardInstagramBioGeneratorClient } from "./InstagramBioGeneratorClient";

export default function DashboardInstagramBioGeneratorPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading Instagram bio generator…</div>}>
      <DashboardInstagramBioGeneratorClient />
    </Suspense>
  );
}
