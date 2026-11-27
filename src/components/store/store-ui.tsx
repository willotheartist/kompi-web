"use client";

import { CalendarClock, Coffee, FileDown, LockKeyhole, Magnet, X, type LucideIcon } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ProductTypeId } from "@/lib/store";

export const TYPE_ICON: Record<ProductTypeId, LucideIcon> = {
  DOWNLOAD: FileDown,
  LEAD_MAGNET: Magnet,
  BOOKING: CalendarClock,
  PAID_LINK: LockKeyhole,
  TIP: Coffee,
};

export const TYPE_TINT: Record<ProductTypeId, { bg: string; fg: string }> = {
  DOWNLOAD: { bg: "#EEF1FF", fg: "#3D5AFE" },
  LEAD_MAGNET: { bg: "#E9F8EF", fg: "#12924A" },
  BOOKING: { bg: "#FFF3E2", fg: "#C46A07" },
  PAID_LINK: { bg: "#F3EEFF", fg: "#7C3AED" },
  TIP: { bg: "#FFEEF1", fg: "#DB2756" },
};

export function ProductThumb({ type, cover, size = 44, className }: { type: ProductTypeId; cover?: string | null; size?: number; className?: string }) {
  const Icon = TYPE_ICON[type];
  const tint = TYPE_TINT[type];
  return (
    <span className={cn("grid shrink-0 place-items-center overflow-hidden rounded-[11px] border border-[#EDEEF0]", className)} style={{ width: size, height: size, background: tint.bg, color: tint.fg }}>
      {cover ? <img src={cover} alt="" className="h-full w-full object-cover" /> : <Icon size={Math.round(size * 0.45)} strokeWidth={1.8} />}
    </span>
  );
}

export function StatusPill({ status, needsSetup }: { status: string; needsSetup?: boolean }) {
  const s =
    needsSetup && status !== "PUBLISHED"
      ? { label: "Needs setup", dot: "#E8A317", text: "#8A5A00" }
      : status === "PUBLISHED"
        ? { label: "Live", dot: "#12A150", text: "#0D7A3C" }
        : { label: "Draft", dot: "#A3A7AD", text: "#5A5E65" };
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#EDEEF0] bg-white px-2.5 py-1 text-[12.5px] font-medium" style={{ color: s.text }}>
      <span className="size-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}

export function OrderStatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; dot: string; text: string }> = {
    PAID: { label: "Paid", dot: "#12A150", text: "#0D7A3C" },
    FREE: { label: "Free", dot: "#3D5AFE", text: "#2B3FB8" },
    PENDING: { label: "Awaiting payment", dot: "#E8A317", text: "#8A5A00" },
    REFUNDED: { label: "Refunded", dot: "#A3A7AD", text: "#5A5E65" },
    CANCELLED: { label: "Abandoned", dot: "#D6D9DE", text: "#80858C" },
  };
  const s = map[status] ?? map.CANCELLED;
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#EDEEF0] bg-white px-2.5 py-1 text-[12.5px] font-medium" style={{ color: s.text }}>
      <span className="size-1.5 rounded-full" style={{ background: s.dot }} />
      {s.label}
    </span>
  );
}


/** Flat, bordered dialog (no blur or drop shadow) for store screens. */
export function StoreDialog({ open, onOpenChange, title, description, children, wide }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; description?: string; children: ReactNode; wide?: boolean }) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-[#151619]/40 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[81] max-h-[90dvh] w-[calc(100%-24px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[18px] border border-[#E3E5E7] bg-white p-5 outline-none sm:p-6 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            wide ? "max-w-[720px]" : "max-w-[460px]",
          )}
        >
          <div className="mb-5 pr-10">
            <DialogPrimitive.Title className="text-[20px] font-medium tracking-[-0.03em] text-[#151619]">{title}</DialogPrimitive.Title>
            {description && <DialogPrimitive.Description className="mt-1 text-[14px] text-[#696C72]">{description}</DialogPrimitive.Description>}
          </div>
          {children}
          <DialogPrimitive.Close className="absolute right-4 top-4 grid size-9 place-items-center rounded-[9px] text-[#696C72] transition-colors hover:bg-[#F3F4F5] hover:text-[#151619]" aria-label="Close">
            <X size={18} />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
