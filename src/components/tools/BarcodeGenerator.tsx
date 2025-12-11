"use client";

import * as React from "react";
import { useRef, useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DEFAULT_BARCODE_VALUE = "https://kmp.li/example";

type JsBarcodeFn = (
  element: SVGSVGElement,
  text: string,
  options?: {
    format?: string;
    displayValue?: boolean;
    lineColor?: string;
    width?: number;
    height?: number;
    margin?: number;
  }
) => void;

let JsBarcode: JsBarcodeFn | null = null;

export function BarcodeGenerator() {
  const [value, setValue] = useState(DEFAULT_BARCODE_VALUE);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const renderBarcode = useCallback((text: string) => {
    if (!svgRef.current || !JsBarcode) return;
    try {
      JsBarcode(svgRef.current, text, {
        format: "CODE128",
        displayValue: true,
        lineColor: "#000000",
        width: 2,
        height: 80,
        margin: 8,
      });
    } catch {
      svgRef.current.innerHTML = "";
    }
  }, []);

  useEffect(() => {
    async function load() {
      if (!JsBarcode) {
        const mod = await import("jsbarcode");
        JsBarcode = (mod.default || mod) as JsBarcodeFn;
      }
      // Use the initial value to avoid depending on state here
      renderBarcode(DEFAULT_BARCODE_VALUE);
    }
    load();
  }, [renderBarcode]);

  useEffect(() => {
    const t = setTimeout(() => renderBarcode(value), 150);
    return () => clearTimeout(t);
  }, [value, renderBarcode]);

  function downloadSVG() {
    if (!svgRef.current) return;

    const serializer = new XMLSerializer();
    const src = serializer.serializeToString(svgRef.current);

    const blob = new Blob([src], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "kompi-barcode.svg";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter text or URL"
      />

      <Button onClick={downloadSVG}>Download SVG</Button>

      <div className="border rounded-xl p-4 bg-white flex justify-center">
        <svg ref={svgRef} />
      </div>
    </div>
  );
}

export default BarcodeGenerator;
