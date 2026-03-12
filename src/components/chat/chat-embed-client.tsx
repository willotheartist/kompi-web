"use client";

import { useEffect, useMemo, useState } from "react";
import { Send } from "lucide-react";

type PublicWidget = {
  id: string;
  name: string;
  siteName: string | null;
  siteUrl: string | null;
  welcomeMessage: string;
  placeholder: string;
  tone: string;
  primaryColor: string;
  accentColor: string;
  allowedDomains: string[];
};

type MessageItem = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

function getVisitorToken() {
  const key = "kompi-chat-visitor-token";
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const next =
    (typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `visitor_${Math.random().toString(36).slice(2)}`) || `visitor_${Date.now()}`;

  window.localStorage.setItem(key, next);
  return next;
}

export function ChatEmbedClient({ token }: { token: string }) {
  const [widget, setWidget] = useState<PublicWidget | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoadingConfig(true);
        const res = await fetch(`/api/chat/public/${token}`, { cache: "no-store" });
        const json = (await res.json()) as { widget?: PublicWidget };

        if (!mounted) return;

        if (json.widget) {
          setWidget(json.widget);
          setMessages([
            {
              id: "welcome",
              role: "assistant",
              content: json.widget.welcomeMessage,
            },
          ]);
        }
      } finally {
        if (mounted) setLoadingConfig(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [token]);

  const disabled = useMemo(
    () => sending || !message.trim() || !widget,
    [sending, message, widget]
  );

  async function handleSend() {
    if (disabled || !widget) return;

    const content = message.trim();
    const visitorToken = getVisitorToken();

    const optimisticUser: MessageItem = {
      id: `user_${Date.now()}`,
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, optimisticUser]);
    setMessage("");
    setSending(true);

    try {
      const res = await fetch(`/api/chat/public/${token}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorToken, message: content, name, email }),
      });

      const json = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant_error_${Date.now()}`,
            role: "assistant",
            content: json.error || "Sorry — something went wrong.",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_${Date.now()}`,
          role: "assistant",
          content: json.reply || "Thanks — I’ve noted that.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_error_${Date.now()}`,
          role: "assistant",
          content: "Sorry — something went wrong.",
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  if (loadingConfig) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F3] px-4 text-sm text-black/55">
        Loading chat…
      </div>
    );
  }

  if (!widget) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F3] px-4 text-center text-sm text-black/55">
        This chat widget is unavailable.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F3] text-[#111111]">
      <header className="border-b border-black/8 bg-white px-4 py-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
          Kompi Chat
        </p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-sm font-semibold">{widget.name}</h1>
            <p className="text-[12px] text-black/45">
              {widget.siteName || "Website assistant"}
            </p>
          </div>
          <div
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{
              backgroundColor: widget.primaryColor || "#C4C8FF",
              color: widget.accentColor || "#111111",
            }}
          >
            Live
          </div>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((item) => {
          const isUser = item.role === "user";
          return (
            <div
              key={item.id}
              className={[
                "max-w-[88%] rounded-[18px] px-4 py-3 text-sm leading-6 shadow-[0_8px_20px_rgba(0,0,0,0.04)]",
                isUser ? "ml-auto rounded-tr-[8px]" : "rounded-tl-[8px]",
              ].join(" ")}
              style={{
                backgroundColor: isUser ? (widget.primaryColor || "#C4C8FF") : "#ffffff",
                color: "#111111",
                border: isUser ? "none" : "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {item.content}
            </div>
          );
        })}
      </div>

      <div className="border-t border-black/8 bg-white px-4 py-4">
        <div className="grid gap-2 pb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="h-10 rounded-xl border border-black/10 bg-[#FBFBF8] px-3 text-sm outline-none"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email (optional)"
            className="h-10 rounded-xl border border-black/10 bg-[#FBFBF8] px-3 text-sm outline-none"
          />
        </div>

        <div className="flex items-end gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={widget.placeholder}
            rows={2}
            className="min-h-[48px] flex-1 resize-none rounded-[16px] border border-black/10 bg-[#FBFBF8] px-3 py-3 text-sm outline-none"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={disabled}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-[#111111] transition disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: widget.primaryColor || "#C4C8FF" }}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
