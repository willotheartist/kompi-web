//src/app/dashboard/messages/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail } from "lucide-react";

type InboxItem = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  intentLabel: string | null;
  createdAt: string;
};

function formatStamp(iso: string) {
  const d = new Date(iso);
  const day = d.toLocaleDateString(undefined, { day: "2-digit", month: "long", year: "numeric" });
  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  return `${day} · ${time}`;
}

export default function MessagesPage() {
  const [items, setItems] = useState<InboxItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/k-cards/messages", { cache: "no-store" });
        const json = (await res.json()) as { ok?: boolean; items?: InboxItem[] };
        if (!mounted) return;
        setItems(Array.isArray(json.items) ? json.items : []);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const empty = useMemo(() => !loading && items.length === 0, [loading, items.length]);

  return (
    <div className="min-h-screen bg-[#F6F4F0]">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="mb-6">
          <p className="text-[12px] font-semibold tracking-[0.22em] text-black/40">DASHBOARD</p>
          <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.02em] text-[#050505]">Messages</h1>
        </div>

        {loading && (
          <div className="rounded-[28px] border border-black/10 bg-white p-6 text-[13px] text-black/55">
            Loading…
          </div>
        )}

        {empty && (
          <div className="rounded-[28px] border border-black/10 bg-white p-6 text-[13px] text-black/55">
            No messages yet.
          </div>
        )}

        <div className="space-y-6">
          {items.map((m) => {
            const displayName = (m.name && m.name.trim()) || "Anonymous";
            const displayEmail = m.email && m.email.trim() ? m.email.trim() : null;
            const displayMessage =
              (m.message && m.message.trim()) || (m.intentLabel ? `Intent: ${m.intentLabel}` : "(no message)");
            const stamp = formatStamp(m.createdAt);

            const replyHref = displayEmail
              ? `mailto:${encodeURIComponent(displayEmail)}?subject=${encodeURIComponent("Re: your message")}`
              : null;

            return (
              <div
                key={m.id}
                className="relative overflow-hidden rounded-[40px] border border-black/10 bg-white px-10 py-10 shadow-[0_14px_50px_rgba(0,0,0,0.06)]"
              >
                {/* top row */}
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                      <div className="text-[42px] leading-none font-semibold tracking-[-0.03em] text-[#050505]">
                        {displayName}
                      </div>

                      {displayEmail && (
                        <a
                          href={`mailto:${displayEmail}`}
                          className="truncate text-[40px] leading-none font-medium tracking-[-0.03em] text-[#9AA7FF] hover:opacity-80"
                        >
                          {displayEmail}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      disabled={!replyHref}
                      onClick={() => {
                        if (replyHref) window.location.href = replyHref;
                      }}
                      className={[
                        "inline-flex items-center gap-3 rounded-[18px] px-6 py-4 text-[22px] font-medium",
                        "transition",
                        replyHref
                          ? "bg-[#A8B3FF] text-[#050505] hover:opacity-90"
                          : "bg-black/10 text-black/30 cursor-not-allowed",
                      ].join(" ")}
                    >
                      <Mail className="h-6 w-6" />
                      Reply
                    </button>
                  </div>
                </div>

                {/* message */}
                <div className="mt-8 text-[44px] leading-[1.12] tracking-[-0.03em] text-[#050505]">
                  {displayMessage}
                </div>

                {/* footer timestamp */}
                <div className="mt-8 flex justify-end">
                  <div className="text-[18px] text-black/45">{stamp}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
