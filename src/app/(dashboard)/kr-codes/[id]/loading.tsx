// src/app/(dashboard)/kr-codes/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="wf-dashboard-main w-full">
      <div className="bg-[#EEF2F7]">
        <section className="wf-dashboard-content mx-auto w-full max-w-6xl px-3 pb-12 pt-8 md:px-6">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-10 w-72 rounded-2xl" />
            <Skeleton className="h-4 w-64 rounded-full" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-44 w-full rounded-[26px]" />
            <Skeleton className="h-44 w-full rounded-[26px]" />
            <Skeleton className="h-44 w-full rounded-[26px]" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Skeleton className="h-80 w-full rounded-[28px]" />
            <Skeleton className="h-80 w-full rounded-[28px]" />
          </div>

          <div className="mt-6">
            <Skeleton className="h-96 w-full rounded-[28px]" />
          </div>
        </section>
      </div>
    </main>
  );
}
