"use client";

import * as React from "react";

function KompiMark({ size = 13, color = "#C4C8FF" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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

function SendIcon({ size = 13, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24">
      <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type KompiChatPreviewProps = {
  widgetName?: string;
  siteName?: string;
  primaryColor?: string;
  accentColor?: string;
  welcomeMessage?: string;
  fallbackReply?: string;
  placeholder?: string;
  status?: "ACTIVE" | "DRAFT" | "PAUSED";
  showDeviceFrame?: boolean;
  className?: string;
};

export function KompiChatPreview({
  widgetName = "Kompi Chat",
  siteName = "Your site",
  primaryColor = "#C4C8FF",
  accentColor = "#111111",
  welcomeMessage = "Hi — how can I help you today?",
  fallbackReply = "I can help with pricing, services, timelines, or guide you to the right next step.",
  placeholder = "Ask a question…",
  status = "ACTIVE",
  showDeviceFrame = true,
  className = "",
}: KompiChatPreviewProps) {
  const primary = primaryColor || "#C4C8FF";
  const accent = accentColor || "#111111";
  const brandInitial = (widgetName || "K").charAt(0).toUpperCase();

  const statusDotColor =
    status === "ACTIVE"
      ? "#2D8A52"
      : status === "PAUSED"
        ? "#D9930D"
        : "#9CA3AF";

  const statusLabel =
    status === "ACTIVE" ? "Live" : status === "PAUSED" ? "Paused" : "Draft";

  const widget = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#F7F7F3",
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        fontSize: 13,
        color: "#111111",
        WebkitFontSmoothing: "antialiased",
        borderRadius: showDeviceFrame ? 0 : 20,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          background: "#ffffff",
          padding: "12px 14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                background: primary,
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 800,
                color: accent,
                letterSpacing: "-0.04em",
                flexShrink: 0,
              }}
            >
              {brandInitial}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  color: "#111111",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {widgetName}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "rgba(0,0,0,0.4)",
                  marginTop: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {siteName}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              borderRadius: 999,
              padding: "4px 9px",
              background: primary,
              color: accent,
              fontSize: 10,
              fontWeight: 650,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: statusDotColor,
              }}
            />
            {statusLabel}
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 14px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 9,
        }}
      >
        <div
          style={{
            maxWidth: "88%",
            alignSelf: "flex-start",
            padding: "10px 14px",
            borderRadius: 16,
            borderTopLeftRadius: 6,
            fontSize: 12,
            lineHeight: 1.55,
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 3px 10px rgba(0,0,0,0.03)",
          }}
        >
          {welcomeMessage}
        </div>

        <div
          style={{
            maxWidth: "84%",
            alignSelf: "flex-end",
            padding: "10px 14px",
            borderRadius: 16,
            borderTopRightRadius: 6,
            fontSize: 12,
            lineHeight: 1.55,
            fontWeight: 500,
            background: primary,
            color: accent,
            boxShadow: "0 3px 10px rgba(0,0,0,0.04)",
          }}
        >
          What services do you offer?
        </div>

        <div
          style={{
            maxWidth: "90%",
            alignSelf: "flex-start",
            padding: "10px 14px",
            borderRadius: 16,
            borderTopLeftRadius: 6,
            fontSize: 12,
            lineHeight: 1.55,
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 3px 10px rgba(0,0,0,0.03)",
          }}
        >
          {fallbackReply}
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          background: "#ffffff",
          padding: "10px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div
            style={{
              flex: 1,
              height: 38,
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.1)",
              background: "#FBFBF8",
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              fontSize: 11.5,
              color: "rgba(0,0,0,0.3)",
            }}
          >
            {placeholder}
          </div>

          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: primary,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <SendIcon size={13} color={accent} />
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.04)",
          background: "#ffffff",
          padding: "7px 14px 9px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <KompiMark size={11} color={primary} />
        <span
          style={{
            fontSize: 9.5,
            fontWeight: 600,
            color: "rgba(0,0,0,0.28)",
            letterSpacing: "0.02em",
          }}
        >
          Powered by <span style={{ color: "rgba(0,0,0,0.48)" }}>Kompi</span>
        </span>
      </div>
    </div>
  );

  if (!showDeviceFrame) {
    return (
      <div
        className={className}
        style={{
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid #e4e4e7",
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
          height: 440,
        }}
      >
        {widget}
      </div>
    );
  }

  return (
    <div className={className}>
      <div
        style={{
          background: "#141416",
          borderRadius: 26,
          padding: "10px 8px 8px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          maxWidth: 320,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "0 8px 8px",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ffbd2e",
            }}
          />
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
          <div
            style={{
              flex: 1,
              height: 20,
              borderRadius: 6,
              background: "rgba(255,255,255,0.08)",
              marginLeft: 8,
              display: "flex",
              alignItems: "center",
              paddingLeft: 8,
              fontSize: 9,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "monospace",
            }}
          >
            {(siteName || "yoursite").toLowerCase().replace(/\s+/g, "")}.com
          </div>
        </div>

        <div
          style={{
            borderRadius: 18,
            overflow: "hidden",
            height: 420,
          }}
        >
          {widget}
        </div>
      </div>
    </div>
  );
}
