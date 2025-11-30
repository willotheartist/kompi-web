// FILE: src/components/discounts/discount-pill.tsx

"use client";

import { useMemo } from "react";
import type { DiscountCode } from "@prisma/client";

type DiscountPillProps = {
  discount: DiscountCode;
  isSubscriber?: boolean;
};

export function DiscountPill({ discount, isSubscriber }: DiscountPillProps) {
  const label = useMemo(() => {
    if (!discount.isSubscriberOnly) return discount.code;
    if (discount.isSubscriberOnly && isSubscriber) {
      return discount.code;
    }
    return "Subscribe to unlock";
  }, [discount.code, discount.isSubscriberOnly, isSubscriber]);

  const locked =
    discount.isSubscriberOnly && !isSubscriber;

  return (
    <div
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium"
      style={{
        border: "1px dashed var(--color-border)",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <span className="mr-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
      {locked ? (
        <span>{label}</span>
      ) : (
        <span>
          Code: <span className="font-mono text-[10px]">{label}</span>
        </span>
      )}
    </div>
  );
}
