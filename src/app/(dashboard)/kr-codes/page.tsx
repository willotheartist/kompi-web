// src/app/(dashboard)/kr-codes/page.tsx
import { Suspense } from "react";
import KRCodesPage from "@/components/kr-codes/KRCodesPage";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

// Pattern: Page/KRCodes
export default function KRCodesRoutePage() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center py-10 text-sm text-muted-foreground">
          Loading Kompi Codes…
        </div>
      }
    >
      <KRCodesPage />
    </Suspense>
  );
}
