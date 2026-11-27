"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StickerArt, type KCardSticker } from "./kcard-stickers";

type Drag = {
  id: string;
  mode: "move" | "resize" | "rotate";
  startX: number;
  startY: number;
  scale: number;
  cx: number;
  cy: number;
  orig: KCardSticker;
  startDist: number;
  startAngle: number;
};

const MIN = 36;
const MAX = 260;

/**
 * Stickers on top of the Card. Read-only on the public page; in the editor they can be
 * dragged, resized and rotated on the phone preview (Linktree-style handles).
 */
export function StickerLayer({ stickers, onChange, scale = 1 }: { stickers: KCardSticker[]; onChange?: (next: KCardSticker[]) => void; scale?: number }) {
  const editable = Boolean(onChange);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<KCardSticker | null>(null);
  const drag = useRef<Drag | null>(null);

  // Deselect when clicking anywhere that isn't a sticker; Delete removes the selected one.
  useEffect(() => {
    if (!editable || !selected) return;
    const down = (e: PointerEvent) => {
      if (!(e.target as HTMLElement | null)?.closest?.("[data-sticker]")) setSelected(null);
    };
    const key = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        onChange?.(stickers.filter((s) => s.id !== selected));
        setSelected(null);
      }
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [editable, selected, stickers, onChange]);

  if (!stickers.length) return null;

  function begin(e: React.PointerEvent, s: KCardSticker, mode: Drag["mode"]) {
    if (!editable) return;
    e.preventDefault();
    e.stopPropagation();
    setSelected(s.id);
    const layer = layerRef.current;
    const box = (e.currentTarget.closest("[data-sticker]") as HTMLElement | null)?.getBoundingClientRect();
    if (!layer || !box) return;
    // The phone preview is scaled down with a transform, so screen pixels ≠ Card pixels.
    const screenScale = layer.getBoundingClientRect().width / layer.offsetWidth || 1;
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    drag.current = {
      id: s.id,
      mode,
      startX: e.clientX,
      startY: e.clientY,
      scale: screenScale * scale,
      cx,
      cy,
      orig: s,
      startDist: Math.hypot(e.clientX - cx, e.clientY - cy) || 1,
      startAngle: Math.atan2(e.clientY - cy, e.clientX - cx),
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDraft(s);
  }

  function move(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const layer = layerRef.current;
    const halfW = (layer?.offsetWidth ?? 360) / 2 / scale;
    const maxY = (layer?.offsetHeight ?? 800) / scale;
    if (d.mode === "move") {
      const x = Math.max(-halfW, Math.min(halfW, d.orig.x + (e.clientX - d.startX) / d.scale));
      const y = Math.max(0, Math.min(maxY, d.orig.y + (e.clientY - d.startY) / d.scale));
      setDraft({ ...d.orig, x: Math.round(x), y: Math.round(y) });
    } else if (d.mode === "resize") {
      const dist = Math.hypot(e.clientX - d.cx, e.clientY - d.cy);
      setDraft({ ...d.orig, size: Math.round(Math.max(MIN, Math.min(MAX, (d.orig.size * dist) / d.startDist))) });
    } else {
      const a = Math.atan2(e.clientY - d.cy, e.clientX - d.cx);
      let r = d.orig.r + ((a - d.startAngle) * 180) / Math.PI;
      r = ((r + 540) % 360) - 180;
      // Snap to straight when close.
      if (Math.abs(r) < 4) r = 0;
      setDraft({ ...d.orig, r: Math.round(r) });
    }
  }

  function end() {
    const d = drag.current;
    drag.current = null;
    if (d && draft && (draft.x !== d.orig.x || draft.y !== d.orig.y || draft.size !== d.orig.size || draft.r !== d.orig.r)) {
      onChange?.(stickers.map((s) => (s.id === d.id ? draft : s)));
    }
    setDraft(null);
  }

  const handle = "absolute z-10 size-3.5 rounded-[3px] border-2 border-[#3D5AFE] bg-white touch-none";

  return (
    <div ref={layerRef} aria-hidden={!editable} className="pointer-events-none absolute inset-0 z-[6]">
      {stickers.map((orig) => {
        const s = draft && draft.id === orig.id ? draft : orig;
        const size = s.size * scale;
        const isSel = editable && selected === s.id;
        return (
          <div
            key={s.id}
            data-sticker
            className={cn("absolute", editable && "pointer-events-auto cursor-grab touch-none select-none active:cursor-grabbing")}
            style={{
              left: `calc(50% + ${s.x * scale}px)`,
              top: s.y * scale,
              width: size,
              height: size,
              transform: `translate(-50%, -50%) rotate(${s.r}deg)`,
              zIndex: isSel ? 20 : undefined,
            }}
            onPointerDown={(e) => begin(e, orig, "move")}
            onPointerMove={move}
            onPointerUp={end}
            onPointerCancel={end}
          >
            <StickerArt s={s.s} className="pointer-events-none h-full w-full" />
            {isSel && (
              <>
                <span className="pointer-events-none absolute -inset-1 rounded-[6px] border-[1.5px] border-[#3D5AFE]" />
                {(["-left-2 -top-2", "-right-2 -top-2", "-left-2 -bottom-2", "-right-2 -bottom-2"] as const).map((pos) => (
                  <span
                    key={pos}
                    className={cn(handle, pos, "cursor-nwse-resize")}
                    onPointerDown={(e) => begin(e, orig, "resize")}
                    onPointerMove={move}
                    onPointerUp={end}
                    onPointerCancel={end}
                  />
                ))}
                <span
                  className="absolute -top-9 left-1/2 z-10 grid size-7 -translate-x-1/2 cursor-grab touch-none place-items-center rounded-full border border-[#DCDFE3] bg-white text-[#151619]"
                  title="Rotate"
                  onPointerDown={(e) => begin(e, orig, "rotate")}
                  onPointerMove={move}
                  onPointerUp={end}
                  onPointerCancel={end}
                >
                  <RotateCw className="h-3.5 w-3.5" />
                </span>
                {!draft && (
                  <button
                    type="button"
                    title="Remove sticker"
                    className="absolute -bottom-10 left-1/2 z-10 grid size-7 place-items-center rounded-full border border-[#DCDFE3] bg-white text-[#E5484D]"
                    style={{ transform: `translateX(-50%) rotate(${-s.r}deg)` }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange?.(stickers.filter((x) => x.id !== s.id));
                      setSelected(null);
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
