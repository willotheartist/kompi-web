import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const script = `
(function () {
  try {
    var currentScript =
      document.currentScript ||
      (function () {
        var scripts = document.getElementsByTagName("script");
        return scripts[scripts.length - 1];
      })();

    if (!currentScript) return;

    var token = currentScript.getAttribute("data-kompi-chat");
    if (!token) {
      console.warn("[Kompi Chat] Missing data-kompi-chat token.");
      return;
    }

    var baseUrl = new URL(currentScript.src).origin;
    var iframeUrl = baseUrl + "/chat/embed/" + encodeURIComponent(token);

    if (document.getElementById("kompi-chat-launcher")) return;

    var shell = document.createElement("div");
    shell.id = "kompi-chat-launcher";
    shell.style.position = "fixed";
    shell.style.right = "22px";
    shell.style.bottom = "22px";
    shell.style.zIndex = "2147483000";
    shell.style.fontFamily = "Inter Tight, system-ui, sans-serif";

    var panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.right = "0";
    panel.style.bottom = "76px";
    panel.style.width = "388px";
    panel.style.maxWidth = "calc(100vw - 20px)";
    panel.style.height = "680px";
    panel.style.maxHeight = "min(680px, calc(100vh - 110px))";
    panel.style.borderRadius = "28px";
    panel.style.overflow = "hidden";
    panel.style.background = "#ffffff";
    panel.style.border = "1px solid rgba(0,0,0,0.08)";
    panel.style.boxShadow = "0 28px 90px rgba(0,0,0,0.22)";
    panel.style.opacity = "0";
    panel.style.transform = "translateY(14px) scale(0.985)";
    panel.style.transformOrigin = "bottom right";
    panel.style.pointerEvents = "none";
    panel.style.transition = "opacity 180ms ease, transform 220ms ease";
    panel.style.backdropFilter = "blur(10px)";

    var iframe = document.createElement("iframe");
    iframe.src = iframeUrl;
    iframe.title = "Kompi Chat";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.setAttribute("loading", "lazy");

    panel.appendChild(iframe);

    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Open Kompi Chat");
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.padding = "0";
    button.style.background = "transparent";
    button.style.display = "block";

    var pill = document.createElement("div");
    pill.style.display = "flex";
    pill.style.alignItems = "center";
    pill.style.gap = "10px";
    pill.style.height = "56px";
    pill.style.padding = "0 16px 0 12px";
    pill.style.borderRadius = "999px";
    pill.style.background = "linear-gradient(180deg, #161616 0%, #0f0f10 100%)";
    pill.style.color = "#ffffff";
    pill.style.boxShadow = "0 18px 42px rgba(0,0,0,0.22)";
    pill.style.border = "1px solid rgba(255,255,255,0.06)";
    pill.style.transition = "transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease";

    var iconWrap = document.createElement("div");
    iconWrap.style.width = "34px";
    iconWrap.style.height = "34px";
    iconWrap.style.borderRadius = "11px";
    iconWrap.style.background = "#C4C8FF";
    iconWrap.style.color = "#111111";
    iconWrap.style.display = "grid";
    iconWrap.style.placeItems = "center";
    iconWrap.style.flexShrink = "0";
    iconWrap.style.fontSize = "14px";
    iconWrap.style.fontWeight = "800";
    iconWrap.style.letterSpacing = "-0.04em";
    iconWrap.textContent = "K";

    var textWrap = document.createElement("div");
    textWrap.style.display = "flex";
    textWrap.style.flexDirection = "column";
    textWrap.style.alignItems = "flex-start";
    textWrap.style.lineHeight = "1";

    var title = document.createElement("div");
    title.textContent = "Kompi Chat";
    title.style.fontSize = "13px";
    title.style.fontWeight = "700";
    title.style.letterSpacing = "-0.02em";
    title.style.color = "#ffffff";

    var sub = document.createElement("div");
    sub.textContent = "Ask us anything";
    sub.style.fontSize = "11px";
    sub.style.marginTop = "5px";
    sub.style.color = "rgba(255,255,255,0.62)";

    var dot = document.createElement("div");
    dot.style.width = "8px";
    dot.style.height = "8px";
    dot.style.borderRadius = "999px";
    dot.style.background = "#7CFF9A";
    dot.style.boxShadow = "0 0 0 4px rgba(124,255,154,0.14)";
    dot.style.flexShrink = "0";

    textWrap.appendChild(title);
    textWrap.appendChild(sub);

    pill.appendChild(iconWrap);
    pill.appendChild(textWrap);
    pill.appendChild(dot);

    button.appendChild(pill);

    function setOpenStyles(isOpen) {
      if (isOpen) {
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0) scale(1)";
        panel.style.pointerEvents = "auto";
        pill.style.transform = "translateY(0) scale(0.98)";
        pill.style.boxShadow = "0 14px 30px rgba(0,0,0,0.18)";
        sub.textContent = "Close";
      } else {
        panel.style.opacity = "0";
        panel.style.transform = "translateY(14px) scale(0.985)";
        panel.style.pointerEvents = "none";
        pill.style.transform = "translateY(0) scale(1)";
        pill.style.boxShadow = "0 18px 42px rgba(0,0,0,0.22)";
        sub.textContent = "Ask us anything";
      }
    }

    var open = false;

    button.addEventListener("mouseenter", function () {
      if (!open) {
        pill.style.transform = "translateY(-1px)";
        pill.style.boxShadow = "0 22px 52px rgba(0,0,0,0.26)";
      }
    });

    button.addEventListener("mouseleave", function () {
      if (!open) {
        pill.style.transform = "translateY(0)";
        pill.style.boxShadow = "0 18px 42px rgba(0,0,0,0.22)";
      }
    });

    button.addEventListener("click", function () {
      open = !open;
      setOpenStyles(open);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && open) {
        open = false;
        setOpenStyles(false);
      }
    });

    shell.appendChild(panel);
    shell.appendChild(button);
    document.body.appendChild(shell);

    function handleViewport() {
      if (window.innerWidth <= 640) {
        shell.style.right = "10px";
        shell.style.bottom = "10px";
        panel.style.width = "calc(100vw - 20px)";
        panel.style.height = "min(78vh, 680px)";
        panel.style.bottom = "72px";
      } else {
        shell.style.right = "22px";
        shell.style.bottom = "22px";
        panel.style.width = "388px";
        panel.style.height = "680px";
        panel.style.bottom = "76px";
      }
    }

    handleViewport();
    window.addEventListener("resize", handleViewport);
  } catch (err) {
    console.error("[Kompi Chat] Loader failed", err);
  }
})();
`;

export async function GET() {
  return new NextResponse(script, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
