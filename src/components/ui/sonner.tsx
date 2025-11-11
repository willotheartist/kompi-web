"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "rounded-3xl px-6 py-4 shadow-2xl bg-white/98 text-neutral-900 border border-neutral-100 flex items-center gap-3",
          title: "text-sm font-semibold",
          description: "text-xs text-neutral-500",
          actionButton:
            "rounded-full bg-neutral-900 text-white px-3 py-1 text-xs",
          cancelButton:
            "rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600",
        },
      }}
    />
  );
}
