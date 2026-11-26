"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Loader2, Plus } from "lucide-react";
import { CREATE_OPTIONS, useCreate } from "./create-actions";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CreateMenu({ collapsed = false, align = "left" }: { collapsed?: boolean; align?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  const { create, busy } = useCreate();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={collapsed ? "Create" : undefined}
        className={cn(
          "group flex h-11 w-full items-center gap-2 rounded-full bg-[#151619] text-[14px] font-medium text-white transition-colors hover:bg-[#2B2D31]",
          collapsed ? "justify-center px-0" : "justify-between pl-4 pr-3",
        )}
      >
        <span className="flex items-center gap-2">
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25, ease: EASE }} className="grid place-items-center">
            <Plus size={18} />
          </motion.span>
          {!collapsed && "Create"}
        </span>
        {!collapsed && <ChevronDown size={16} className={cn("text-white/60 transition-transform duration-200", open && "rotate-180")} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: EASE }}
            style={{ transformOrigin: align === "left" ? "top left" : "top right" }}
            className={cn(
              "absolute top-[calc(100%+8px)] z-50 w-[272px] rounded-[14px] border border-[#E3E5E7] bg-white p-1.5",
              align === "left" ? "left-0" : "right-0",
            )}
          >
            {CREATE_OPTIONS.map((o, i) => {
              const Icon = o.icon;
              return (
                <motion.button
                  key={o.kind}
                  role="menuitem"
                  type="button"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.2, ease: EASE }}
                  disabled={busy !== null}
                  onClick={async () => {
                    await create(o.kind);
                    setOpen(false);
                  }}
                  className="group/item flex w-full items-center gap-3 rounded-[10px] px-2.5 py-2 text-left transition-colors hover:bg-[#F3F4F5] disabled:opacity-60"
                >
                  <span className="grid size-9 place-items-center rounded-[9px] text-[#151619] transition-transform duration-200 group-hover/item:scale-[1.06]" style={{ background: o.tint }}>
                    {busy === o.kind ? <Loader2 size={17} className="animate-spin" /> : <Icon size={17} strokeWidth={1.8} />}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[14px] font-medium text-[#151619]">{o.label}</span>
                    <span className="truncate text-[12px] text-[#80858C]">{o.description}</span>
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
