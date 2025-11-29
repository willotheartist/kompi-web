import { Suspense } from "react";
import DashboardDomainSettingsPageInner from "./domains-client";

// Wrapper page: required so any useSearchParams in the client tree
// is wrapped in a Suspense boundary for Next.js 16.
export default function DashboardDomainSettingsPage() {
  return (
    <Suspense fallback={null}>
      <DashboardDomainSettingsPageInner />
    </Suspense>
  );
}
