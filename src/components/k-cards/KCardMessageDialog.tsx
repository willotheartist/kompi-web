"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Lock, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const MAX_MESSAGE = 1000;

type Intent = { key: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  ownerName: string;
  avatar?: string | null;
  intents: Intent[];
  emailOnly?: boolean;
  /** Public Card slug. Without it (editor preview) sending is simulated. */
  slug?: string;
  /** Render inside this element (the editor's phone screen) instead of over the whole page. */
  container?: HTMLElement | null;
};

function firstName(name: string) {
  const clean = name.replace(/^@/, "").trim();
  return clean.split(/\s+/)[0] || "them";
}

/**
 * The visitor-facing "Message me" window. Rendered in a portal so it always covers the
 * whole screen; a centred dialog on desktop and a bottom sheet on phones.
 */
export function KCardMessageDialog({ open, onClose, ownerName, avatar, intents, emailOnly, slug, container }: Props) {
  const inPhone = Boolean(container);
  const [mounted, setMounted] = useState(false);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showPhone, setShowPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const firstField = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const who = firstName(ownerName);
  const preview = !slug;

  // eslint-disable-next-line react-hooks/set-state-in-effect -- portals need the DOM.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    if (!inPhone) document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstField.current?.focus({ preventScroll: true }), 250);
    return () => {
      if (!inPhone) document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose, inPhone]);

  function reset() {
    setIntent(null);
    setMessage("");
    setStatus("idle");
    setError("");
  }

  const emailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const canSend = emailOnly ? emailValid : Boolean(message.trim() || emailValid || phone.trim());

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend || status === "sending") return;
    setStatus("sending");
    setError("");
    if (preview) {
      await new Promise((r) => setTimeout(r, 650));
      setStatus("sent");
      return;
    }
    try {
      const res = await fetch("/api/k-cards/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          companyWebsite: "",
          // The API treats missing fields as empty; it rejects explicit nulls.
          intentKey: intent?.key || undefined,
          intentLabel: intent?.label || undefined,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          phone: phone.trim() || undefined,
          message: emailOnly ? undefined : message.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Your message couldn’t be sent. Please try again.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Your message couldn’t be sent. Please try again.");
    }
  }

  if (!mounted) return null;

  const field =
    "peer h-12 w-full rounded-[12px] border border-[#E3E5E7] bg-white px-3.5 pt-4 text-[15px] text-[#151619] outline-none transition-colors placeholder-transparent focus:border-[#151619]";
  const floatLabel =
    "pointer-events-none absolute left-3.5 top-1.5 text-[11px] font-medium text-[#80858C] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-[#A2A6AC] peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#80858C]";

  return createPortal(
    <AnimatePresence onExitComplete={reset}>
      {open && (
        <motion.div
          key="kc-message"
          data-kcard-contact-modal
          className={cn("inset-0 z-[1000] flex items-end justify-center", inPhone ? "pointer-events-auto absolute" : "fixed sm:items-center sm:p-6")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default bg-[#151619]/55" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className={cn(
              "relative w-full overflow-y-auto rounded-t-[24px] border border-[#E3E5E7] bg-white text-[#151619]",
              inPhone ? "max-h-[92%]" : "max-h-[92dvh] sm:max-w-[440px] sm:rounded-[24px]",
            )}
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.34, ease: EASE }}
            style={{ fontFamily: "var(--font-primary, system-ui), system-ui, sans-serif" }}
          >
            <div className={cn("mx-auto mt-2.5 h-1 w-10 rounded-full bg-[#DCDFE3]", !inPhone && "sm:hidden")} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 grid size-9 place-items-center rounded-full text-[#80858C] transition-colors hover:bg-[#F1F2F4] hover:text-[#151619]"
            >
              <X className="h-[18px] w-[18px]" />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex flex-col items-center px-7 pb-8 pt-12 text-center"
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="grid size-16 place-items-center rounded-full bg-[#EEF3ED]"
                  >
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="#357452" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, delay: 0.15, ease: EASE }} />
                    </svg>
                  </motion.span>
                  <h2 className="mt-5 text-[22px] font-medium tracking-[-0.03em]">{emailOnly ? "You’re on the list" : "Message sent"}</h2>
                  <p className="mt-2 max-w-[30ch] text-[15px] leading-relaxed text-[#696C72]">
                    {preview
                      ? "This is a preview — nothing was sent. On your live Card, messages go to your inbox."
                      : emailOnly
                        ? `${who} has your email and will be in touch.`
                        : `${who} will get back to you${email.trim() ? " by email" : ""} soon.`}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-[14px] bg-[#151619] text-[15px] font-medium text-white transition-colors hover:bg-[#2B2D31]"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={send} initial={false} exit={{ opacity: 0 }} className="px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 pr-10">
                    <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full border border-[#E3E5E7] bg-[#FBE4FA] text-[18px] font-medium">
                      {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : who.slice(0, 1).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <h2 id={titleId} className="truncate text-[19px] font-medium leading-tight tracking-[-0.03em]">
                        {emailOnly ? `Get in touch with ${who}` : `Message ${who}`}
                      </h2>
                      <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-[#80858C]">
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#357452] opacity-50 [animation-duration:2.4s]" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-[#357452]" />
                        </span>
                        Goes straight to {who}’s inbox
                      </p>
                    </div>
                  </div>

                  {/* Topics */}
                  {intents.length > 0 && (
                    <fieldset className="mt-6">
                      <legend className="text-[13px] font-medium text-[#3C4045]">What’s it about?</legend>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {intents.map((opt, i) => {
                          const on = intent?.key === opt.key;
                          return (
                            <motion.button
                              key={opt.key}
                              type="button"
                              aria-pressed={on}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, ease: EASE, delay: 0.05 + i * 0.03 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => setIntent(on ? null : opt)}
                              className={cn(
                                "inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-[14px] font-medium transition-colors",
                                on ? "border-[#151619] bg-[#151619] text-white" : "border-[#E3E5E7] bg-white text-[#3C4045] hover:border-[#80858C]",
                              )}
                            >
                              <motion.span initial={false} animate={{ width: on ? 15 : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.2, ease: EASE }} className="inline-flex overflow-hidden">
                                <Check className="h-[15px] w-[15px] shrink-0" strokeWidth={2.4} />
                              </motion.span>
                              {opt.label}
                            </motion.button>
                          );
                        })}
                      </div>
                    </fieldset>
                  )}

                  {/* Details */}
                  <div className="mt-6 space-y-2.5">
                    <div className={cn("grid gap-2.5", !inPhone && "sm:grid-cols-2")}>
                      <div className="relative">
                        <input ref={firstField} id={`${titleId}-name`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" maxLength={120} className={field} />
                        <label htmlFor={`${titleId}-name`} className={floatLabel}>Your name</label>
                      </div>
                      <div className="relative">
                        <input
                          id={`${titleId}-email`}
                          type="email"
                          inputMode="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email"
                          autoComplete="email"
                          maxLength={200}
                          required={emailOnly}
                          className={field}
                        />
                        <label htmlFor={`${titleId}-email`} className={floatLabel}>{emailOnly ? "Email" : "Email (so they can reply)"}</label>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {showPhone && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: EASE }} className="overflow-hidden">
                          <div className="relative">
                            <input id={`${titleId}-phone`} type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" autoComplete="tel" maxLength={40} className={field} autoFocus />
                            <label htmlFor={`${titleId}-phone`} className={floatLabel}>Phone</label>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!emailOnly && (
                      <div className="relative">
                        <textarea
                          id={`${titleId}-message`}
                          value={message}
                          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
                          placeholder="Message"
                          rows={4}
                          className="peer block w-full resize-none rounded-[12px] border border-[#E3E5E7] bg-white px-3.5 pb-3 pt-6 text-[15px] leading-relaxed text-[#151619] outline-none transition-colors placeholder-transparent focus:border-[#151619]"
                        />
                        <label htmlFor={`${titleId}-message`} className={floatLabel}>{intent ? `Tell ${who} about “${intent.label}”` : `What would you like to say?`}</label>
                        <span className={cn("pointer-events-none absolute bottom-2 right-3 text-[11px] tabular-nums transition-opacity", message.length > MAX_MESSAGE * 0.8 ? "text-[#C76A1C] opacity-100" : "text-[#A2A6AC] opacity-0 peer-focus:opacity-100")}>
                          {message.length}/{MAX_MESSAGE}
                        </span>
                      </div>
                    )}

                    {!showPhone && (
                      <button type="button" onClick={() => setShowPhone(true)} className="inline-flex items-center gap-1.5 pt-0.5 text-[13px] font-medium text-[#5A5E65] transition-colors hover:text-[#151619]">
                        <Phone className="h-3.5 w-3.5" /> Add a phone number
                      </button>
                    )}
                  </div>

                  <AnimatePresence>
                    {status === "error" && (
                      <motion.p role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 rounded-[10px] bg-[#FBEFED] px-3 py-2.5 text-[13px] text-[#9B3E35]">
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={!canSend || status === "sending"}
                    className="group mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#151619] text-[15px] font-medium text-white transition-[background-color,opacity] hover:bg-[#2B2D31] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        {emailOnly ? "Send my email" : "Send message"}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-enabled:group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] text-[#A2A6AC]">
                    <Lock className="h-3 w-3" />
                    {preview ? "Preview — messages send from your live Card" : `Only ${who} sees what you send`}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    container ?? document.body,
  );
}
