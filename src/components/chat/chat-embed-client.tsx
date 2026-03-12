"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Mail, User2, Sparkles, ShieldCheck } from "lucide-react";

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

function KompiMark({ size = 14, color = "#888" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" fill={color} />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="#fff"
        fontSize="13"
        fontWeight="800"
        fontFamily="Inter Tight, system-ui, sans-serif"
        letterSpacing="-0.5"
      >
        K
      </text>
    </svg>
  );
}

function normalizeColor(input: string | null | undefined, fallback: string) {
  const value = (input || "").trim();
  if (!value) return fallback;
  return value;
}

function withAlpha(hex: string, alpha: string) {
  if (!hex.startsWith("#")) return hex;
  const clean = hex.replace("#", "");
  if (clean.length === 6) return `#${clean}${alpha}`;
  if (clean.length === 3) {
    const expanded = clean
      .split("")
      .map((c) => c + c)
      .join("");
    return `#${expanded}${alpha}`;
  }
  return hex;
}

export function ChatEmbedClient({ token }: { token: string }) {
  const [widget, setWidget] = useState<PublicWidget | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showCapture, setShowCapture] = useState(true);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [sending, setSending] = useState(false);
  const [captureDismissed, setCaptureDismissed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

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

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [message]);

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

    if (showCapture && !captureDismissed) {
      setShowCapture(false);
      setCaptureDismissed(true);
    }

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
          content: json.reply || "Thanks — I've noted that.",
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  if (loadingConfig) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background:
            "radial-gradient(circle at top, rgba(196,200,255,0.28), transparent 30%), #F7F7F3",
          fontFamily: "'Inter Tight', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 18px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.88)",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 14px 40px rgba(0,0,0,0.06)",
            fontSize: 13,
            color: "rgba(0,0,0,0.52)",
          }}
        >
          <KompiMark size={18} color="#C4C8FF" />
          Loading chat…
        </div>
      </div>
    );
  }

  if (!widget) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#F7F7F3",
          padding: 20,
          textAlign: "center",
          fontFamily: "'Inter Tight', system-ui, sans-serif",
          color: "rgba(0,0,0,0.5)",
          fontSize: 13,
        }}
      >
        This chat widget is unavailable.
      </div>
    );
  }

  const primary = normalizeColor(widget.primaryColor, "#C4C8FF");
  const accent = normalizeColor(widget.accentColor, "#111111");
  const surface = "#FFFFFF";
  const bg = "#F7F7F3";
  const border = "rgba(0,0,0,0.08)";
  const softPrimary = withAlpha(primary, "26");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at top, rgba(196,200,255,0.22), transparent 24%), #F7F7F3",
        color: "#111111",
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          padding: 12,
          background: "rgba(247,247,243,0.84)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            borderRadius: 22,
            background: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            padding: "14px 14px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: primary,
                  color: accent,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  flexShrink: 0,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
                }}
              >
                {(widget.name || "K").charAt(0).toUpperCase()}
              </div>

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "#111111",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {widget.name}
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      borderRadius: 999,
                      padding: "4px 8px",
                      background: softPrimary,
                      color: accent,
                      fontSize: 10.5,
                      fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#2D8A52",
                      }}
                    />
                    Live
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 3,
                    fontSize: 11.5,
                    color: "rgba(0,0,0,0.46)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {widget.siteName || "Website assistant"}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "rgba(0,0,0,0.42)",
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              <ShieldCheck style={{ width: 13, height: 13 }} />
              Kompi
            </div>
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "8px 12px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {showCapture ? (
          <div
            style={{
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 22,
              boxShadow: "0 10px 28px rgba(0,0,0,0.04)",
              padding: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: softPrimary,
                  color: accent,
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                }}
              >
                <Sparkles style={{ width: 14, height: 14 }} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "#111111",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Introduce yourself
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(0,0,0,0.46)",
                    marginTop: 2,
                  }}
                >
                  Optional, but helpful for follow-up.
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ position: "relative" }}>
                <User2
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 14,
                    height: 14,
                    color: "rgba(0,0,0,0.34)",
                  }}
                />
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    height: 42,
                    borderRadius: 14,
                    border: `1px solid ${border}`,
                    background: "#FBFBF8",
                    padding: "0 12px 0 36px",
                    fontSize: 13,
                    outline: "none",
                    color: "#111111",
                  }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <Mail
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 14,
                    height: 14,
                    color: "rgba(0,0,0,0.34)",
                  }}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  style={{
                    width: "100%",
                    height: 42,
                    borderRadius: 14,
                    border: `1px solid ${border}`,
                    background: "#FBFBF8",
                    padding: "0 12px 0 36px",
                    fontSize: 13,
                    outline: "none",
                    color: "#111111",
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}

        {messages.map((item) => {
          const isUser = item.role === "user";

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "86%",
                  padding: "12px 15px",
                  borderRadius: 20,
                  borderTopLeftRadius: isUser ? 20 : 8,
                  borderTopRightRadius: isUser ? 8 : 20,
                  fontSize: 13.5,
                  lineHeight: 1.6,
                  background: isUser ? primary : surface,
                  color: isUser ? accent : "#111111",
                  border: isUser ? "none" : `1px solid ${border}`,
                  boxShadow: isUser
                    ? "0 10px 24px rgba(0,0,0,0.05)"
                    : "0 8px 22px rgba(0,0,0,0.04)",
                }}
              >
                {item.content}
              </div>
            </div>
          );
        })}

        {sending ? (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                maxWidth: "64%",
                padding: "12px 15px",
                borderRadius: 20,
                borderTopLeftRadius: 8,
                fontSize: 13,
                background: surface,
                border: `1px solid ${border}`,
                boxShadow: "0 8px 22px rgba(0,0,0,0.04)",
                color: "rgba(0,0,0,0.4)",
              }}
            >
              Typing…
            </div>
          </div>
        ) : null}
      </div>

      <div
        style={{
          padding: "10px 12px 12px",
          background: "rgba(247,247,243,0.9)",
          backdropFilter: "blur(14px)",
          borderTop: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.94)",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 24,
            boxShadow: "0 12px 28px rgba(0,0,0,0.05)",
            padding: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={widget.placeholder}
              rows={1}
              style={{
                flex: 1,
                minHeight: 44,
                maxHeight: 120,
                resize: "none",
                borderRadius: 16,
                border: `1px solid ${border}`,
                background: bg,
                padding: "12px 14px",
                fontSize: 13,
                lineHeight: 1.45,
                outline: "none",
                color: "#111111",
              }}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={disabled}
              style={{
                width: 46,
                height: 46,
                borderRadius: 999,
                border: "none",
                background: disabled ? "rgba(0,0,0,0.08)" : primary,
                color: disabled ? "rgba(0,0,0,0.28)" : accent,
                display: "grid",
                placeItems: "center",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.18s ease",
                flexShrink: 0,
                boxShadow: disabled ? "none" : "0 12px 22px rgba(0,0,0,0.08)",
              }}
            >
              <Send style={{ width: 16, height: 16 }} />
            </button>
          </div>

          <div
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              paddingTop: 2,
            }}
          >
            <KompiMark size={12} color={primary} />
            <a
              href="https://kompi.app/chat"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                color: "rgba(0,0,0,0.34)",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Powered by <span style={{ color: "rgba(0,0,0,0.52)" }}>Kompi</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
