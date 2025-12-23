// src/app/(dashboard)/kr-codes/[id]/loading.tsx
export default function LoadingKrCodeAnalytics() {
  return (
    <main className="wf-dashboard-main w-full bg-(--color-bg)">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-8">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-2">
            <div className="h-7 w-56 rounded-xl bg-border/30" />
            <div className="h-4 w-80 rounded-xl bg-border/25" />
          </div>
          <div className="h-8 w-20 rounded-full bg-border/25" />
        </div>

        <div className="space-y-4">
          <div className="h-24 w-full rounded-2xl bg-border/20" />
          <div className="h-40 w-full rounded-2xl bg-border/20" />
        </div>
      </section>
    </main>
  );
}
