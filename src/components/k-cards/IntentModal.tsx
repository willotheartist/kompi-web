//src/components/k-cards/IntentModal.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type IntentModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  placeholder?: string;
  initialValue?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
};

function IntentModalBody({
  title,
  description,
  placeholder,
  initialValue,
  onClose,
  onConfirm,
}: {
  title: string;
  description: string;
  placeholder: string;
  initialValue: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
}) {
  const [value, setValue] = useState<string>(initialValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, []);

  const trimmed = value.trim();
  const canConfirm = trimmed.length > 0;

  return (
    <div className="fixed inset-0 z-[80]">
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      {/* panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[520px] rounded-[28px] border border-black/10 bg-white shadow-[0_22px_70px_rgba(0,0,0,0.22)]">
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] font-semibold text-[#050505]">
                  {title}
                </p>
                <p className="mt-1 text-[12px] text-black/55">{description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-black/50 hover:bg-[#f3eee7]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-[18px] border border-black/10 bg-[#f6f4f0] px-4 py-3 text-[13px] text-[#050505] outline-none focus:border-black/20 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-black/5 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-black/10 bg-[#f6f4f0] px-4 py-2 text-[12px] font-semibold text-[#050505] transition hover:bg-white hover:shadow-sm"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!canConfirm}
              onClick={() => onConfirm(trimmed)}
              className={[
                "rounded-full px-4 py-2 text-[12px] font-semibold transition",
                canConfirm
                  ? "bg-[#050505] text-white hover:opacity-90"
                  : "cursor-not-allowed bg-black/10 text-black/30",
              ].join(" ")}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IntentModal(props: IntentModalProps) {
  const {
    open,
    title = "Add an option",
    description = "What should visitors click? (e.g. “Hire me”)",
    placeholder = "Type an option…",
    initialValue = "",
    onClose,
    onConfirm,
  } = props;

  if (!open) return null;

  // Key forces a fresh mount each open, so state resets without setState-in-effect.
  return (
    <IntentModalBody
      key={`intent-${initialValue}`}
      title={title}
      description={description}
      placeholder={placeholder}
      initialValue={initialValue}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}
