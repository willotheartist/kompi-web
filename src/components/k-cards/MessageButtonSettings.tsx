"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, AtSign, Check, MessageSquareText, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type MessageContactIntent = { key: string; label: string; enabled: boolean };
export type MessageContact = { enabled: boolean; buttonLabel: string; emailOnly?: boolean; intents: MessageContactIntent[] };

const EASE = [0.16, 1, 0.3, 1] as const;

function slugKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || String(Date.now());
}

/** Editor panel for the Card's "Message me" button. */
export function MessageButtonSettings<T extends MessageContact>({ contact, setContact }: { contact: T; setContact: Dispatch<SetStateAction<T>> }) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const intents = contact.intents || [];
  const mode = contact.emailOnly ? "email" : "message";

  function addTopic() {
    const label = draft.trim().slice(0, 40);
    if (!label) {
      setAdding(false);
      return;
    }
    const key = slugKey(label);
    if (intents.some((i) => i.key === key)) {
      toast("That topic is already there");
    } else {
      setContact((prev) => ({ ...prev, intents: [...(prev.intents || []), { key, label, enabled: true }] }));
    }
    setDraft("");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      data-message-settings
      className="mt-5 overflow-hidden rounded-[14px] border border-[#E3E5E7] bg-white"
    >
      {/* Header */}
      <div className="flex items-start gap-3 border-b border-[#EDEEF0] px-4 py-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-[#FBE4FA] text-[#151619]">
          <MessageSquareText className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-medium tracking-[-0.015em] text-[#151619]">Message button</p>
          <p className="mt-0.5 text-[13px] leading-snug text-[#80858C]">
            Visitors can reach you straight from your Card.{" "}
            <Link href="/messages" className="inline-flex items-center gap-0.5 text-[#151619] underline-offset-4 hover:underline">
              Messages land in your inbox <ArrowUpRight className="h-3 w-3" />
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setContact((prev) => ({ ...prev, enabled: false }));
            toast("Message button removed");
          }}
          className="grid size-9 shrink-0 place-items-center rounded-[9px] text-[#80858C] transition-colors hover:bg-[#FBEFED] hover:text-[#9B3E35]"
          aria-label="Remove message button"
          title="Remove message button"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-6 px-4 py-5">
        {/* Button text */}
        <label className="block">
          <span className="text-[13px] font-medium text-[#3C4045]">Button text</span>
          <input
            value={contact.buttonLabel}
            maxLength={40}
            onChange={(e) => setContact((prev) => ({ ...prev, buttonLabel: e.target.value }))}
            placeholder="Message me"
            className="mt-2 h-11 w-full rounded-[10px] border border-[#E3E5E7] bg-white px-3.5 text-[15px] text-[#151619] outline-none transition-colors placeholder:text-[#A2A6AC] focus:border-[#80858C]"
          />
        </label>

        {/* What visitors send */}
        <div>
          <p className="text-[13px] font-medium text-[#3C4045]">What visitors send</p>
          <LayoutGroup id="kc-message-mode">
            <div className="mt-2 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="What visitors send">
              {(
                [
                  { id: "message", icon: MessageSquareText, title: "A message", body: "Topic, name, contact details and a note." },
                  { id: "email", icon: AtSign, title: "Just their email", body: "A quick “get in touch” with no message box." },
                ] as const
              ).map((o) => {
                const on = mode === o.id;
                const Icon = o.icon;
                return (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setContact((prev) => ({ ...prev, emailOnly: o.id === "email" }))}
                    className={cn(
                      "relative flex items-start gap-3 rounded-[12px] border p-3.5 text-left transition-colors",
                      on ? "border-[#151619]" : "border-[#E3E5E7] hover:border-[#CDD1D7]",
                    )}
                  >
                    <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", on ? "text-[#151619]" : "text-[#A2A6AC]")} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-medium text-[#151619]">{o.title}</span>
                      <span className="mt-0.5 block text-[12px] leading-snug text-[#80858C]">{o.body}</span>
                    </span>
                    <span className={cn("grid size-[18px] shrink-0 place-items-center rounded-full border transition-colors", on ? "border-[#151619] bg-[#151619]" : "border-[#CDD1D7]")}>
                      {on && <motion.span layoutId="kc-mode-dot" className="size-1.5 rounded-full bg-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Topics */}
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[13px] font-medium text-[#3C4045]">Topics visitors can pick</p>
            <span className="text-[12px] text-[#A2A6AC]">Optional · tap to show or hide</span>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <AnimatePresence initial={false}>
              {intents.map((opt) => (
                <motion.span
                  key={opt.key}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className={cn(
                    "group inline-flex h-9 items-center rounded-full border text-[13px] transition-colors",
                    opt.enabled ? "border-[#151619] bg-white text-[#151619]" : "border-dashed border-[#CDD1D7] bg-transparent text-[#A2A6AC]",
                  )}
                >
                  <button
                    type="button"
                    aria-pressed={opt.enabled}
                    onClick={() =>
                      setContact((prev) => ({ ...prev, intents: (prev.intents || []).map((x) => (x.key === opt.key ? { ...x, enabled: !x.enabled } : x)) }))
                    }
                    className="inline-flex h-full items-center gap-1.5 pl-3 pr-1.5 font-medium"
                    title={opt.enabled ? "Shown to visitors — tap to hide" : "Hidden — tap to show"}
                  >
                    <motion.span
                      initial={false}
                      animate={{ width: opt.enabled ? 14 : 0, opacity: opt.enabled ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="inline-flex overflow-hidden"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
                    </motion.span>
                    {opt.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => setContact((prev) => ({ ...prev, intents: (prev.intents || []).filter((x) => x.key !== opt.key) }))}
                    className="mr-1 grid size-6 place-items-center rounded-full text-[#A2A6AC] opacity-60 transition hover:bg-[#F1F2F4] hover:text-[#151619] group-hover:opacity-100"
                    aria-label={`Remove ${opt.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>

            {adding ? (
              <motion.form
                initial={{ opacity: 0, width: 80 }}
                animate={{ opacity: 1, width: 200 }}
                transition={{ duration: 0.25, ease: EASE }}
                onSubmit={(e) => {
                  e.preventDefault();
                  addTopic();
                }}
                className="inline-flex h-9 items-center rounded-full border border-[#80858C] bg-white pl-3 pr-1"
              >
                <input
                  autoFocus
                  value={draft}
                  maxLength={40}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={addTopic}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setDraft("");
                      setAdding(false);
                    }
                  }}
                  placeholder="e.g. Book a call"
                  className="min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#A2A6AC]"
                />
                <button type="submit" className="grid size-7 place-items-center rounded-full bg-[#151619] text-white" aria-label="Add topic">
                  <Check className="h-3.5 w-3.5" />
                </button>
              </motion.form>
            ) : (
              <button
                type="button"
                onClick={() => setAdding(true)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-[#CDD1D7] px-3 text-[13px] font-medium text-[#5A5E65] transition-colors hover:border-[#151619] hover:text-[#151619]"
              >
                <Plus className="h-3.5 w-3.5" /> Add topic
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
