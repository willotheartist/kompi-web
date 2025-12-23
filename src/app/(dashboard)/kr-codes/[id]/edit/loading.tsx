// src/app/(dashboard)/kr-codes/[id]/edit/loading.tsx
export default function LoadingEditKrCode() {
  return (
    <main className="wf-dashboard-main w-full bg-(--color-bg)">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-8">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-2">
            <div className="h-7 w-56 rounded-xl bg-border/30" />
            <div className="h-4 w-80 rounded-xl bg-border/25" />
          </div>
          <div className="h-8 w-24 rounded-full bg-border/25" />
        </div>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-6">
            <div className="space-y-4">
              <div className="h-4 w-24 rounded-lg bg-border/30" />
              <div className="h-10 w-full rounded-2xl bg-border/25" />
              <div className="h-10 w-full rounded-2xl bg-border/25" />
              <div className="h-10 w-full rounded-2xl bg-border/25" />
              <div className="mt-2 flex gap-2">
                <div className="h-10 w-32 rounded-full bg-border/25" />
                <div className="h-10 w-24 rounded-full bg-border/20" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-(--color-border) bg-(--color-surface) p-6">
            <div className="space-y-4">
              <div className="h-4 w-32 rounded-lg bg-border/30" />
              <div className="mx-auto h-56 w-full max-w-md rounded-3xl bg-border/20" />
              <div className="h-16 w-full rounded-2xl bg-border/20" />
              <div className="h-28 w-full rounded-2xl bg-border/20" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
