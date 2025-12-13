"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

type KCardMessageItem = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  intentLabel: string | null;
  createdAt: string; // API returns ISO
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  // Example: 12 December 2025 · 22:54
  const date = d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} · ${time}`;
}

export default function KCardMessagesPage() {
  const [items, setItems] = useState<KCardMessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/k-cards/messages", { method: "GET" });
      const data = (await res.json()) as { ok?: boolean; items?: KCardMessageItem[]; error?: string };

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to load messages");
      }

      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const empty = !loading && !error && items.length === 0;

  return (
    <div className="w-full">
      {/* page header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div className="text-[12px] uppercase tracking-[0.18em] text-black/40">
            Dashboard
          </div>
          <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-[#050505]">
            Messages
          </h1>
        </div>

        <button
          type="button"
          onClick={load}
          className="rounded-full border border-black/10 bg-[#f6f4f0] px-4 py-2 text-[12px] font-semibold text-[#050505] transition hover:bg-white hover:shadow-sm"
        >
          Refresh
        </button>
      </div>

      {/* list */}
      <div className="space-y-4">
        {loading && (
          <div className="rounded-[28px] border border-black/10 bg-white p-6 text-[13px] text-black/60">
            Loading…
          </div>
        )}

        {error && (
          <div className="rounded-[18px] border border-black/10 bg-white p-6">
            <div className="text-[13px] font-semibold text-[#050505]">
              Couldn’t load messages
            </div>
            <div className="mt-1 text-[12px] text-black/55">{error}</div>
            <button
              type="button"
              onClick={load}
              className="mt-4 rounded-full border border-black/10 bg-[#f6f4f0] px-4 py-2 text-[12px] font-semibold text-[#050505] transition hover:bg-white hover:shadow-sm"
            >
              Try again
            </button>
          </div>
        )}

        {empty && (
          <div className="rounded-[28px] border border-black/10 bg-white p-10 text-center">
            <div className="text-[14px] font-semibold text-[#050505]">
              No messages yet
            </div>
            <div className="mt-1 text-[12px] text-black/55">
              When someone messages you from your K-Card, it’ll show up here.
            </div>
          </div>
        )}

        {!loading &&
          !error &&
          items.map((m) => {
            const name = (m.name && m.name.trim()) || "Anonymous";
            const email = (m.email && m.email.trim()) || "";
            const message = (m.message && m.message.trim()) || "";
            const when = formatDateTime(m.createdAt);

            const mailto = email
              ? `mailto:${email}?subject=${encodeURIComponent("Re: your Kompi message")}`
              : null;

            return (
              <div
                key={m.id}
                className="rounded-[14px] border border-black/10 bg-white px-8 py-8 shadow-[0_10px_40px_rgba(0,0,0,0.00)]"
              >
                <div className="flex items-start justify-between gap-9">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                      <div className="text-[24px] font-semibold leading-none tracking-[-0.03em] text-[#050505]">
                        {name}
                      </div>

                      {email ? (
                        <a
                          className="truncate text-[24px] leading-none tracking-[-0.03em] text-[#9aa6ff] hover:opacity-80"
                          href={mailto ?? undefined}
                        >
                          {email}
                        </a>
                      ) : (
                        <div className="text-[14px] text-black/35">No email</div>
                      )}
                    </div>

                    {m.intentLabel ? (
                      <div className="mt-3 inline-flex rounded-full border border-black/10 bg-[#f6f4f0] px-3 py-1 text-[11px] font-semibold text-black/60">
                        {m.intentLabel}
                      </div>
                    ) : null}

                    <div className="mt-5 text-[34px] leading-[1.05] tracking-[-0.03em] text-[#050505]">
                      {message || "—"}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
                    <a
                      href={mailto ?? undefined}
                      className={[
                        "inline-flex items-center gap-3 rounded-[18px] px-6 py-4 text-[18px] font-medium transition",
                        mailto
                          ? "bg-[#a7b0ff] text-[#050505] hover:opacity-90"
                          : "pointer-events-none bg-black/10 text-black/30",
                      ].join(" ")}
                      aria-disabled={!mailto}
                    >
                      <Mail className="h-6 w-6" />
                      Reply
                    </a>

                    <div className="mt-2 text-[14px] text-black/35">{when}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      </div>
    );
}
