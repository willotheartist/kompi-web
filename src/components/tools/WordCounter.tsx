"use client";

import * as React from "react";

type WordCounterProps = {
  /** Optional CTA handler (e.g. router.push("/signup")) */
  onJoinKompi?: () => void;
};

export function WordCounter({ onJoinKompi }: WordCounterProps) {
  const [text, setText] = React.useState("");

  const stats = React.useMemo(() => {
    const value = text || "";
    const trimmed = value.trim();

    const characters = value.length;

    const words =
      trimmed.length === 0
        ? 0
        : trimmed
            .split(/\s+/)
            .map((w) => w.trim())
            .filter(Boolean).length;

    const lines = value === "" ? 0 : value.split(/\r\n|\r|\n/).length;

    const sentences =
      trimmed.length === 0
        ? 0
        : trimmed
            .split(/[.!?]+/)
            .map((s) => s.trim())
            .filter(Boolean).length;

    const paragraphs =
      trimmed.length === 0
        ? 0
        : value
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean).length;

    // Very simple: 200 wpm, show "0min" / "1min" / "2min"...
    const minutes = Math.round(words / 200);

    return {
      words,
      characters,
      sentences,
      paragraphs,
      lines,
      readingTime: `${minutes}min`,
    };
  }, [text]);

  return (
    <div className="w-full">
      {/* Outer "canvas" */}
      <div className="w-full overflow-hidden rounded-[56px] bg-white">
        <div className="flex min-h-[520px] w-full">
          {/* Left: editor */}
          <div className="flex-1 p-10">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start writing here."
              className="h-full w-full resize-none bg-transparent text-[28px] font-medium leading-tight text-black outline-none placeholder:text-black"
              aria-label="Write text to count words"
            />
          </div>

          {/* Divider */}
          <div className="w-px bg-black/30" />

          {/* Right: stats + CTA */}
          <div className="flex w-[44%] flex-col p-10">
            <div className="mt-2 space-y-10">
              <StatRow label="Words:" value={stats.words} />
              <StatRow label="Characters:" value={stats.characters} />
              <StatRow label="Sentences:" value={stats.sentences} />
              <StatRow label="Paragraphs:" value={stats.paragraphs} />
              <StatRow label="Lines:" value={stats.lines} />
              <StatRow label="Reading Time:" value={stats.readingTime} />
            </div>

            <div className="mt-auto flex justify-center pb-4">
              <button
                type="button"
                onClick={onJoinKompi}
                className="rounded-2xl bg-[#E6FF62] px-14 py-5 text-[22px] font-medium text-black outline-none transition-transform active:scale-[0.99]"
              >
                Join Kompi. today
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[28px] font-normal text-black/25">{label}</div>
      <div className="text-[28px] font-medium text-black">{value}</div>
    </div>
  );
}

export default WordCounter;
