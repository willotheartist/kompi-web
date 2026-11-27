"use client";

import { Plus } from "lucide-react";
import { STICKER_PACKS, STICKERS, StickerArt, type KCardSticker } from "./kcard-stickers";

const MAX_STICKERS = 24;

// Where new stickers land: around the profile, alternating sides, so they rarely cover the name.
const SPOTS = [
  { x: -118, y: 120 },
  { x: 118, y: 170 },
  { x: -112, y: 250 },
  { x: 116, y: 300 },
  { x: 92, y: 70 },
  { x: -96, y: 340 },
];

function newSticker(s: string, count: number): KCardSticker {
  const spot = SPOTS[count % SPOTS.length];
  const jitter = () => Math.round(Math.random() * 16 - 8);
  return {
    id: Math.random().toString(36).slice(2, 10),
    s,
    x: spot.x + jitter(),
    y: spot.y + jitter() + Math.floor(count / SPOTS.length) * 24,
    size: 76,
    r: Math.round(Math.random() * 24 - 12),
  };
}

/** Sticker packs in the Card editor. Stickers are moved, sized and rotated on the phone preview. */
export function StickerPanel({ stickers, onChange }: { stickers: KCardSticker[]; onChange: (next: KCardSticker[]) => void }) {
  const full = stickers.length >= MAX_STICKERS;
  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#E3E5E7] px-4 py-3">
        <p className="text-[13px] text-[#3C4045]">
          Tap a sticker to add it, then drag it around on the preview. Use the corners to resize and <span className="whitespace-nowrap">↻ to rotate.</span>
        </p>
        {stickers.length > 0 && (
          <button type="button" onClick={() => onChange([])} className="text-[13px] font-medium text-[#80858C] transition-colors hover:text-[#151619]">
            Clear all ({stickers.length})
          </button>
        )}
      </div>

      {STICKER_PACKS.map((pack) => (
        <div key={pack.id} className="space-y-3">
          <div>
            <p className="text-[15px] font-medium text-[#151619]">{pack.name}</p>
            <p className="text-[12.5px] text-[#80858C]">{pack.description}</p>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {pack.stickers.map((key) => (
              <button
                key={key}
                type="button"
                disabled={full}
                title={full ? `Up to ${MAX_STICKERS} stickers per Card` : `Add “${STICKERS[key]?.name}”`}
                onClick={() => onChange([...stickers, newSticker(key, stickers.length)])}
                className="group relative grid aspect-square place-items-center rounded-[12px] border border-[#EDEEF0] bg-[#F7F7F8] p-2 transition-colors hover:border-[#CDD1D7] disabled:opacity-40"
              >
                <StickerArt s={key} className="h-full w-full transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110" />
                <span className="absolute bottom-1 right-1 grid size-5 place-items-center rounded-full bg-[#151619] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Plus className="h-3 w-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
