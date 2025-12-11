"use client";

import { linkTextSafely } from "@/lib/seo/inline-link-engine";
import parse from "html-react-parser";
import React from "react";

export default function AutoLinkedContent({
  text,
  currentUrl,
  className = "",
  as = "p",
}: {
  text: string;
  currentUrl: string;
  className?: string;
  as?: React.ElementType;
}) {
  const linkedHtml = linkTextSafely(text, currentUrl);

  const Component = as as React.ElementType;

  return (
    <Component className={className}>
      {parse(linkedHtml)}
    </Component>
  );
}
