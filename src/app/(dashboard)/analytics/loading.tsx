// src/app/(dashboard)/analytics/loading.tsx
export default function AnalyticsLoading() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-[12px] font-semibold tracking-[0.22em] text-black/40">
          DASHBOARD
        </p>
        <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[#050505]">
          Analytics
        </h1>
      </div>

      <div className="space-y-4">
        <div className="h-28 w-full animate-pulse rounded-[28px] border border-black/10 bg-white" />
        <div className="h-64 w-full animate-pulse rounded-[28px] border border-black/10 bg-white" />
        <div className="h-64 w-full animate-pulse rounded-[28px] border border-black/10 bg-white" />
      </div>
    </div>
  );
}
