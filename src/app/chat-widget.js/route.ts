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

    var existing = document.getElementById("kompi-chat-launcher");
    if (existing) return;

    var shell = document.createElement("div");
    shell.id = "kompi-chat-launcher";
    shell.style.position = "fixed";
    shell.style.right = "20px";
    shell.style.bottom = "20px";
    shell.style.zIndex = "2147483000";
    shell.style.fontFamily = "Inter Tight, system-ui, sans-serif";

    var button = document.createElement("button");
    button.type = "button";
    button.innerText = "Chat";
    button.style.border = "none";
    button.style.cursor = "pointer";
    button.style.borderRadius = "999px";
    button.style.padding = "14px 18px";
    button.style.background = "#111111";
    button.style.color = "#ffffff";
    button.style.fontSize = "14px";
    button.style.fontWeight = "600";
    button.style.boxShadow = "0 16px 40px rgba(0,0,0,0.18)";

    var panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.right = "0";
    panel.style.bottom = "64px";
    panel.style.width = "380px";
    panel.style.maxWidth = "calc(100vw - 24px)";
    panel.style.height = "600px";
    panel.style.maxHeight = "min(600px, calc(100vh - 96px))";
    panel.style.borderRadius = "24px";
    panel.style.overflow = "hidden";
    panel.style.background = "#fff";
    panel.style.boxShadow = "0 24px 70px rgba(0,0,0,0.22)";
    panel.style.border = "1px solid rgba(0,0,0,0.08)";
    panel.style.display = "none";

    var iframe = document.createElement("iframe");
    iframe.src = iframeUrl;
    iframe.title = "Kompi Chat";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "0";
    iframe.style.display = "block";
    iframe.setAttribute("loading", "lazy");

    panel.appendChild(iframe);

    var open = false;
    button.addEventListener("click", function () {
      open = !open;
      panel.style.display = open ? "block" : "none";
    });

    shell.appendChild(panel);
    shell.appendChild(button);
    document.body.appendChild(shell);
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
