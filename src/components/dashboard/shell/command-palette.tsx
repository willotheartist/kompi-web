"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { ArrowRight, CornerDownLeft, ExternalLink, LogOut, Plus, Search, type LucideIcon } from "lucide-react";
import { ALL_NAV, SETTINGS_NAV } from "./nav";
import { CREATE_OPTIONS, useCreate } from "./create-actions";
import { PUBLIC_SITE_URL } from "@/lib/urls";
import { cn } from "@/lib/utils";

type Command = { id: string; group: string; label: string; hint?: string; icon: LucideIcon; keywords?: string; run: () => void };

const EASE = [0.16, 1, 0.3, 1] as const;

export function CommandPalette({ open, onOpenChange, signedIn }: { open: boolean; onOpenChange: (v: boolean) => void; signedIn: boolean }) {
  const router = useRouter();
  const { create } = useCreate();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo<Command[]>(() => {
    const go = (href: string) => () => {
      onOpenChange(false);
      router.push(href);
    };
    const list: Command[] = [
      ...CREATE_OPTIONS.map((o) => ({
        id: `create-${o.kind}`,
        group: "Create",
        label: `New ${o.label}`,
        hint: o.description,
        icon: o.icon,
        keywords: `create new add ${o.label}`,
        run: () => {
          onOpenChange(false);
          void create(o.kind);
        },
      })),
      ...ALL_NAV.map((item) => ({ id: item.href, group: "Go to", label: item.label, icon: item.icon, keywords: item.keywords, run: go(item.href) })),
      ...SETTINGS_NAV.map((item) => ({ id: item.href, group: "Settings", label: item.label, icon: item.icon, keywords: item.keywords, run: go(item.href) })),
      { id: "site", group: "Other", label: "Visit kompi.app", icon: ExternalLink, keywords: "website home marketing", run: () => { onOpenChange(false); window.open(PUBLIC_SITE_URL, "_blank", "noopener"); } },
    ];
    if (signedIn) list.push({ id: "signout", group: "Other", label: "Sign out", icon: LogOut, keywords: "log out logout exit", run: () => { onOpenChange(false); void signOut({ callbackUrl: "/" }); } });
    return list;
  }, [create, onOpenChange, router, signedIn]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    const words = q.split(/\s+/);
    return commands
      .map((c) => {
        const hay = `${c.label} ${c.group} ${c.keywords ?? ""}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        const score = c.label.toLowerCase().startsWith(q) ? 0 : c.label.toLowerCase().includes(q) ? 1 : 2;
        return { c, score };
      })
      .filter((x): x is { c: Command; score: number } => x !== null)
      .sort((a, b) => a.score - b.score)
      .map((x) => x.c);
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset the palette each time it opens.
    setQuery("");
    setIndex(0);
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const grouped = useMemo(() => {
    const map = new Map<string, { c: Command; i: number }[]>();
    results.forEach((c, i) => {
      const arr = map.get(c.group) ?? [];
      arr.push({ c, i });
      map.set(c.group, arr);
    });
    return Array.from(map.entries());
  }, [results]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-[80] bg-[#151619]/25"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed left-1/2 top-[12vh] z-[81] w-[min(600px,calc(100vw-24px))] -translate-x-1/2 overflow-hidden rounded-[16px] border border-[#E3E5E7] bg-white text-[#151619] outline-none"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.985 }}
                transition={{ duration: 0.22, ease: EASE }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setIndex((i) => Math.min(results.length - 1, i + 1)); }
                  if (e.key === "ArrowUp") { e.preventDefault(); setIndex((i) => Math.max(0, i - 1)); }
                  if (e.key === "Enter") { e.preventDefault(); results[index]?.run(); }
                }}
              >
                <Dialog.Title className="sr-only">Search Kompi</Dialog.Title>
                <div className="flex items-center gap-3 border-b border-[#E3E5E7] px-4">
                  <Search size={18} className="text-[#8A9099]" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
                    placeholder="Search pages, create something, jump anywhere…"
                    className="h-14 flex-1 bg-transparent text-[15px] outline-none placeholder:text-[#92969C]"
                    aria-label="Search commands"
                    role="combobox"
                    aria-expanded
                    aria-controls="kompi-command-list"
                    aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
                  />
                  <kbd className="rounded-[6px] border border-[#E3E5E7] px-1.5 py-0.5 text-[11px] text-[#696C72]">Esc</kbd>
                </div>
                <div ref={listRef} id="kompi-command-list" role="listbox" className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
                  {!results.length && (
                    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-sm text-[#696C72]">
                      <Search size={22} className="text-[#B0B4BA]" />
                      Nothing matches “{query}”.
                    </div>
                  )}
                  {grouped.map(([group, items]) => (
                    <div key={group} className="pb-1">
                      <p className="px-3 pb-1 pt-2.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#92969C]">{group}</p>
                      {items.map(({ c, i }) => {
                        const Icon = c.icon;
                        const selected = i === index;
                        return (
                          <button
                            key={c.id}
                            id={`cmd-${c.id}`}
                            data-index={i}
                            role="option"
                            aria-selected={selected}
                            onMouseMove={() => setIndex(i)}
                            onClick={() => c.run()}
                            className={cn(
                              "relative flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[14px] transition-colors",
                              selected ? "text-[#151619]" : "text-[#3C4045]",
                            )}
                          >
                            {selected && (
                              <motion.span layoutId="cmd-highlight" className="absolute inset-0 rounded-[10px] bg-[#F1F2F4]" transition={{ type: "spring", stiffness: 520, damping: 40 }} />
                            )}
                            <span className={cn("relative grid size-8 place-items-center rounded-[8px] border border-[#E3E5E7] bg-white", c.group === "Create" && "border-transparent bg-[#151619] text-white")}>
                              {c.group === "Create" ? <Plus size={15} /> : <Icon size={16} strokeWidth={1.8} />}
                            </span>
                            <span className="relative flex min-w-0 flex-1 flex-col">
                              <span className="truncate font-medium">{c.label}</span>
                              {c.hint && <span className="truncate text-[12px] text-[#8A9099]">{c.hint}</span>}
                            </span>
                            {selected ? <CornerDownLeft size={15} className="relative text-[#8A9099]" /> : <ArrowRight size={15} className="relative text-transparent" />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-[#E3E5E7] bg-[#FAFAFB] px-4 py-2.5 text-[12px] text-[#8A9099]">
                  <span className="flex items-center gap-3">
                    <span><kbd className="font-sans">↑↓</kbd> to move</span>
                    <span><kbd className="font-sans">↵</kbd> to open</span>
                  </span>
                  <span>Kompi</span>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
