// src/components/k-cards/KCardSubscribeBlock.tsx
"use client";

import { SubscribeInline } from "@/components/subscribers/subscribe-inline";

type KCardSubscribeBlockProps = {
  /**
   * Either workspaceId or workspaceSlug must be provided.
   * Slug is usually safer when rendering from a public route.
   */
  workspaceId?: string;
  workspaceSlug?: string;

  /**
   * Optional: override or pin to a specific list.
   * If not provided, API will use/create "Main list".
   */
  listId?: string;
  listName?: string;

  /**
   * Used for attribution when this appears on a public K-Card.
   * e.g. sourceSlug = k-card slug, sourceType = "kcard"
   */
  sourceSlug?: string;
  sourceType?: string;

  /**
   * Compact: pill-style inline form.
   * Default: card-style form.
   */
  compact?: boolean;

  /**
   * Show phone input alongside email in full layout.
   */
  showPhoneField?: boolean;
};

/**
 * Drop-in subscribe block for K-Cards.
 *
 * Example usage (in your public K-Card page):
 *
 *   <KCardSubscribeBlock
 *     workspaceSlug={workspace.slug}
 *     sourceSlug={kcard.slug}
 *     sourceType="kcard"
 *     compact={false}
 *     showPhoneField
 *   />
 */
export function KCardSubscribeBlock(props: KCardSubscribeBlockProps) {
  const {
    workspaceId,
    workspaceSlug,
    listId,
    listName,
    sourceSlug,
    sourceType = "kcard",
    compact = false,
    showPhoneField = true,
  } = props;

  return (
    <div className="w-full">
      <SubscribeInline
        workspaceId={workspaceId}
        workspaceSlug={workspaceSlug}
        listId={listId}
        listName={listName}
        sourceSlug={sourceSlug}
        sourceType={sourceType}
        compact={compact}
        showPhoneField={showPhoneField}
      />
    </div>
  );
}
