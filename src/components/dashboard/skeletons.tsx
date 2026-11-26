// Server-safe loading skeletons that mirror each page's real layout, so navigation feels instant.
import { cn } from "@/lib/utils";

export function Bone({ className }: { className?: string }) {
  return <div className={cn("kompi-skeleton", className)} />;
}

function Card({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("rounded-[16px] border border-[#E3E5E7] bg-white", className)}>{children}</div>;
}

export function HeaderSkeleton({ actions = 1 }: { actions?: number }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4" aria-hidden>
      <div className="space-y-3">
        <Bone className="h-3 w-28" />
        <Bone className="h-9 w-72 max-w-[70vw]" />
        <Bone className="h-4 w-96 max-w-[80vw]" />
      </div>
      <div className="flex gap-2">
        {Array.from({ length: actions }, (_, i) => (
          <Bone key={i} className="h-11 w-32 rounded-[10px]" />
        ))}
      </div>
    </div>
  );
}

export function OverviewSkeleton() {
  return (
    <div role="status" aria-label="Loading overview">
      <HeaderSkeleton actions={2} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className="space-y-4 p-5">
            <Bone className="h-5 w-28" />
            <Bone className="h-9 w-20" />
            <Bone className="h-9 w-full" />
          </Card>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="h-[380px] p-6">
          <Bone className="h-5 w-24" />
          <Bone className="mt-8 h-[260px] w-full" />
        </Card>
        <Card className="space-y-6 p-6">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex gap-3">
              <Bone className="size-10 rounded-[11px]" />
              <div className="flex-1 space-y-2">
                <Bone className="h-4 w-1/2" />
                <Bone className="h-3 w-3/4" />
                <Bone className="h-1.5 w-full" />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

export function ListSkeleton({ rows = 6, label = "Loading" }: { rows?: number; label?: string }) {
  return (
    <div role="status" aria-label={label}>
      <HeaderSkeleton />
      <Card className="mb-5 flex items-center gap-4 p-4">
        <Bone className="h-10 flex-1" />
        <Bone className="h-10 w-56" />
      </Card>
      <div className="space-y-2">
        {Array.from({ length: rows }, (_, i) => (
          <Card key={i} className="flex items-center gap-4 px-4 py-3.5" >
            <Bone className="size-10 rounded-[10px]" />
            <div className="flex-1 space-y-2">
              <Bone className="h-4 w-1/3" />
              <Bone className="h-3 w-1/2" />
            </div>
            <Bone className="hidden h-4 w-16 sm:block" />
            <Bone className="h-8 w-24" />
          </Card>
        ))}
      </div>
    </div>
  );
}

export function GridSkeleton({ items = 6, label = "Loading" }: { items?: number; label?: string }) {
  return (
    <div role="status" aria-label={label}>
      <HeaderSkeleton />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: items }, (_, i) => (
          <Card key={i} className="overflow-hidden">
            <Bone className="h-44 rounded-none" />
            <div className="space-y-3 p-5">
              <Bone className="h-4 w-1/2" />
              <Bone className="h-3 w-2/3" />
              <Bone className="h-10 w-full rounded-[10px]" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsSkeleton() {
  return (
    <div role="status" aria-label="Loading analytics">
      <HeaderSkeleton actions={2} />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className="space-y-4 p-5">
            <Bone className="h-4 w-24" />
            <Bone className="h-9 w-24" />
          </Card>
        ))}
      </div>
      <Card className="mt-6 h-[400px] p-6">
        <Bone className="h-5 w-32" />
        <Bone className="mt-8 h-[300px] w-full" />
      </Card>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="h-72 p-6"><Bone className="h-full w-full" /></Card>
        <Card className="h-72 p-6"><Bone className="h-full w-full" /></Card>
      </div>
    </div>
  );
}

export function InboxSkeleton() {
  return (
    <div role="status" aria-label="Loading messages">
      <HeaderSkeleton actions={0} />
      <div className="grid gap-5 lg:grid-cols-[380px_minmax(0,1fr)]">
        <Card className="space-y-1 p-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex gap-3 p-3">
              <Bone className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Bone className="h-4 w-1/2" />
                <Bone className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </Card>
        <Card className="hidden h-[480px] p-8 lg:block">
          <Bone className="h-6 w-1/3" />
          <Bone className="mt-4 h-4 w-1/4" />
          <Bone className="mt-10 h-32 w-full" />
        </Card>
      </div>
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div role="status" aria-label="Loading settings">
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Card key={i} className="space-y-4 p-6">
            <Bone className="size-10 rounded-[11px]" />
            <Bone className="h-5 w-40" />
            <Bone className="h-4 w-3/4" />
          </Card>
        ))}
      </div>
    </div>
  );
}
