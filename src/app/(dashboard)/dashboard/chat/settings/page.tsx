import Link from "next/link";
import { KompiChatAdminShell, KCard, KCardInner } from "@/components/chat/KompiChatAdminShell";
import { RefreshCw, Plus } from "lucide-react";

export default function DashboardChatSettingsPage() {
  return (
    <KompiChatAdminShell
      title="Settings"
      actions={[
        {
          label: "Refresh",
          href: "/dashboard/chat/settings",
          icon: <RefreshCw className="h-4 w-4" />,
          variant: "default",
        },
        {
          label: "Add source",
          href: "/dashboard/chat/sources",
          icon: <Plus className="h-4 w-4" />,
          variant: "accent",
        },
      ]}
    >
      <KCard>
        <KCardInner>
          <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
            Chat settings
          </div>
          <p className="mt-2 text-[13px] leading-6 text-[#666670]">
            For now, use the widget page for visual settings and the install page for embed controls.
          </p>

          <div className="mt-4 flex gap-3">
            <Link
              href="/dashboard/chat/widget"
              className="inline-flex items-center rounded-[12px] border border-[#e4e4e7] bg-white px-4 py-2 text-sm font-semibold text-[#111] transition hover:bg-[#f7f7fb]"
            >
              Open widget
            </Link>
            <Link
              href="/dashboard/chat/install"
              className="inline-flex items-center rounded-[12px] bg-[#C4C8FF] px-4 py-2 text-sm font-semibold text-[#111] transition hover:brightness-105"
            >
              Open install
            </Link>
          </div>
        </KCardInner>
      </KCard>
    </KompiChatAdminShell>
  );
}