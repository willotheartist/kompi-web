// src/components/seo/AutoLinkedContent.tsx
"use client";

import { linkTextSafely } from "@/lib/seo/inline-link-engine";
import parse from "html-react-parser";
import React from "react";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isBulletLine(line: string) {
  return line.trim().startsWith("• ");
}

function isFAQBlock(block: string) {
  const t = block.trim();
  return /^Q:\s+/i.test(t) && /\nA:\s+/i.test(t);
}

function renderFAQ(block: string) {
  const lines = block.split("\n").map((l) => l.trim());
  const qLine = lines.find((l) => /^Q:\s+/i.test(l)) || "";
  const aLine = lines.find((l) => /^A:\s+/i.test(l)) || "";

  const q = escapeHtml(qLine.replace(/^Q:\s+/i, "").trim());
  const a = escapeHtml(aLine.replace(/^A:\s+/i, "").trim());

  return `<div class="k-faq"><p><strong>${q}</strong></p><p>${a}</p></div>`;
}

function textToHtml(text: string): string {
  if (!text) return "";

  const blocks = text
    .split(/\n{2,}/g)
    .map((b) => b.trim())
    .filter(Boolean);

  const out: string[] = [];

  for (const block of blocks) {
    if (isFAQBlock(block)) {
      out.push(renderFAQ(block));
      continue;
    }

    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

    const bulletLines = lines.filter(isBulletLine);
    const nonBulletLines = lines.filter((l) => !isBulletLine(l));

    // If the block is mostly bullets, render as a list
    if (bulletLines.length >= 2 && bulletLines.length >= nonBulletLines.length) {
      const items = bulletLines
        .map((l) => escapeHtml(l.replace(/^•\s+/, "").trim()))
        .map((li) => `<li>${li}</li>`)
        .join("");

      // If there is a leading non-bullet line, keep it as a paragraph above the list
      if (nonBulletLines.length > 0) {
        const lead = escapeHtml(nonBulletLines.join(" "));
        out.push(`<p>${lead}</p>`);
      }

      out.push(`<ul>${items}</ul>`);
      continue;
    }

    // Otherwise render as paragraph(s) with <br/> for single newlines
    const p = escapeHtml(lines.join("\n")).replace(/\n/g, "<br/>");
    out.push(`<p>${p}</p>`);
  }

  return out.join("");
}

export default function AutoLinkedContent({
  text,
  currentUrl,
  className = "",
  as = "div",
}: {
  text: string;
  currentUrl: string;
  className?: string;
  as?: React.ElementType;
}) {
  const html = textToHtml(text);
  const linkedHtml = linkTextSafely(html, currentUrl);

  const Component = as as React.ElementType;

  return <Component className={className}>{parse(linkedHtml)}</Component>;
}
