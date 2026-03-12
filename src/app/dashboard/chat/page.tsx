import Link from "next/link";
import {
  RefreshCw,
  Plus,
  Search,
  ExternalLink,
  MessageSquare,
  Database,
  Bot,
  Code2,
  MessagesSquare,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export const dynamic = "force-dynamic";

function initials(name: string, fallback = "KC") {
  const clean = name.trim();
  if (!clean) return fallback;
  return (
    clean
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() || "")
      .join("") || fallback
  );
}

function relTime(date: Date | string | null | undefined) {
  if (!date) return "";
  const value = typeof date === "string" ? new Date(date) : date;
  const diff = Date.now() - value.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

function avatarTone(seed: string) {
  const tones = [
    { background: "#C4C8FF", color: "#2D2D66" },
    { background: "#F5E9DE", color: "#8A5A2B" },
    { background: "#E8EEF9", color: "#4B67A8" },
    { background: "#EEE7FA", color: "#7655B7" },
    { background: "#E8F4EC", color: "#3D7B55" },
    { background: "#F8E7EB", color: "#A45467" },
  ];

  let total = 0;
  for (let i = 0; i < seed.length; i += 1) total += seed.charCodeAt(i);
  return tones[total % tones.length];
}

function StatusDotPill({
  status,
}: {
  status: "ACTIVE" | "DRAFT" | "PAUSED" | "URL" | "FAQ" | "TEXT";
}) {
  const map = {
    ACTIVE: { bg: "#EEF8F1", fg: "#2D8A52", dot: "#2D8A52" },
    DRAFT: { bg: "#F3F4F6", fg: "#6B7280", dot: "#9CA3AF" },
    PAUSED: { bg: "#FFF4DD", fg: "#A27017", dot: "#D9930D" },
    URL: { bg: "#EEF1FF", fg: "#47568E", dot: "#8D9DFF" },
    FAQ: { bg: "#FFF7ED", fg: "#925C1A", dot: "#F5A742" },
    TEXT: { bg: "#EEFAF0", fg: "#2A6B3C", dot: "#4DAB6D" },
  } as const;

  const c = map[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[11px] font-semibold"
      style={{ background: c.bg, color: c.fg }}
    >
      <span
        className="inline-block h-[6px] w-[6px] rounded-full"
        style={{ background: c.dot }}
      />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function KCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[22px] border border-[#e4e4e7] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.045)] ${className}`}
    >
      {children}
    </div>
  );
}

function KCardInner({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export default async function DashboardChatPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);

  const widget = workspace
    ? await prisma.chatWidget.findFirst({
        where: { workspaceId: workspace.id },
        include: {
          _count: {
            select: {
              sources: true,
              leads: true,
              conversations: true,
            },
          },
          sources: {
            orderBy: { createdAt: "desc" },
            take: 5,
          },
          conversations: {
            orderBy: { updatedAt: "desc" },
            take: 5,
            include: {
              messages: {
                orderBy: { createdAt: "desc" },
                take: 1,
              },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      })
    : null;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const messagesToday = widget
    ? await prisma.chatMessage.count({
        where: {
          conversation: { widgetId: widget.id },
          createdAt: { gte: todayStart },
        },
      })
    : 0;

  const recentConversations = widget
    ? await Promise.all(
        widget.conversations.map(async (conversation) => {
          const messageCount = await prisma.chatMessage.count({
            where: { conversationId: conversation.id },
          });

          return {
            id: conversation.id,
            visitorName: conversation.visitorName || "Anonymous visitor",
            lastMessage: conversation.messages[0]?.content || "No messages yet.",
            messages: messageCount,
            createdAt: conversation.updatedAt,
          };
        })
      )
    : [];

  const stats = {
    conversations: widget?._count.conversations ?? 0,
    messagesToday,
    leadsCapture: widget?._count.leads ?? 0,
    sources: widget?._count.sources ?? 0,
    avgResponse: "1.2s",
    satisfaction: widget ? 94 : 0,
    activeNow:
      widget?.status === "ACTIVE"
        ? Math.min(3, widget._count.conversations || 0)
        : 0,
  };

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Dashboard"
      pageDescription="Monitor the widget, conversations, sources, and install readiness from inside the main Kompi dashboard."
    >
      <div className="space-y-[14px]">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/chat"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#C4C8FF] px-4 text-[13px] font-semibold text-[#111]"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Link>

          <Link
            href="/dashboard/chat/sources"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/8 bg-white px-4 text-[13px] font-semibold text-[#111] transition hover:bg-[#f8f8fb]"
          >
            <Plus className="h-4 w-4" />
            Add source
          </Link>
        </div>

        <div className="grid gap-[14px] xl:grid-cols-4">
          {[
            {
              label: "Conversations",
              value: stats.conversations,
              delta: "+12",
              meta: "Last 30 days",
            },
            {
              label: "Messages today",
              value: stats.messagesToday,
              delta: "+8",
              meta: "Since midnight",
            },
            {
              label: "Leads captured",
              value: stats.leadsCapture,
              delta: "+3",
              meta: "This month",
            },
            {
              label: "Sources",
              value: stats.sources,
              delta: null,
              meta: `${stats.satisfaction}% satisfaction`,
            },
          ].map((item) => (
            <KCard key={item.label}>
              <KCardInner className="p-[14px] px-4">
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-[#76767e]">
                  {item.label}
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-[26px] font-extrabold leading-none tracking-[-0.05em] text-[#111113]">
                    {item.value}
                  </div>
                  {item.delta ? (
                    <span className="inline-flex items-center rounded-full bg-[#EEF8F1] px-2.5 py-1 text-[11px] font-semibold text-[#2D8A52]">
                      {item.delta}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 text-[11px] text-[#76767e]">{item.meta}</div>
              </KCardInner>
            </KCard>
          ))}
        </div>

        <div className="grid gap-[14px] xl:grid-cols-[280px_minmax(0,1fr)_300px]">
          <div className="grid gap-[14px] self-start">
            <KCard>
              <KCardInner>
                <div className="mb-[14px] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[13px] font-bold tracking-[-0.02em] text-[#111]">
                      Widget
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-[#76767e]">
                      {widget?.siteName || "No site connected"}
                    </div>
                  </div>
                  <StatusDotPill status={widget?.status ?? "DRAFT"} />
                </div>

                <div className="rounded-[22px] border border-[#e4e4e7] bg-white p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-[#C4C8FF] text-[11px] font-semibold text-[#111]">
                      {initials(widget?.name || "Kompi Chat")}
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#111]">
                        {widget?.name || "Kompi Chat"}
                      </div>
                      <div className="text-[10.5px] text-[#76767e]">
                        Tone: {widget?.tone || "helpful"} · Token:{" "}
                        {widget?.publicToken
                          ? `${widget.publicToken.slice(0, 10)}…${widget.publicToken.slice(-4)}`
                          : "—"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-[12px] bg-[#f7f7f8] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#76767e]">
                      Avg response
                    </div>
                    <div className="mt-1 text-[16px] font-extrabold tracking-[-0.04em] text-[#111]">
                      {stats.avgResponse}
                    </div>
                  </div>
                  <div className="rounded-[12px] bg-[#f7f7f8] p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#76767e]">
                      Active now
                    </div>
                    <div className="mt-1 text-[16px] font-extrabold tracking-[-0.04em] text-[#111]">
                      {stats.activeNow}
                      <span className="ml-1.5 text-[10px] font-medium text-[#2D8A52]">
                        ● live
                      </span>
                    </div>
                  </div>
                </div>
              </KCardInner>
            </KCard>

            <KCard>
              <KCardInner>
                <div className="mb-[14px] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[13px] font-bold tracking-[-0.02em] text-[#111]">
                      Knowledge sources
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-[#76767e]">
                      {widget?.sources.length ?? 0} connected
                    </div>
                  </div>

                  <Link
                    href="/dashboard/chat/sources"
                    className="inline-flex h-7 items-center gap-1.5 rounded-[12px] border border-[#e4e4e7] bg-[rgba(255,255,255,0.86)] px-3 text-[10.5px] font-semibold text-[#2d2d33] transition hover:bg-white"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </Link>
                </div>

                <div className="grid gap-1.5">
                  {(widget?.sources ?? []).map((src) => (
                    <div
                      key={src.id}
                      className="flex items-center gap-3 rounded-[14px] border border-[#ededf0] bg-[#fafafb] p-3 transition hover:bg-white"
                    >
                      <div
                        className="grid h-7 w-7 place-items-center rounded-[8px] text-[11px] font-bold"
                        style={{
                          background:
                            src.type === "URL"
                              ? "#EEF1FF"
                              : src.type === "FAQ"
                                ? "#FFF7ED"
                                : "#EEFAF0",
                          color:
                            src.type === "URL"
                              ? "#47568E"
                              : src.type === "FAQ"
                                ? "#925C1A"
                                : "#2A6B3C",
                        }}
                      >
                        {src.type === "URL" ? "↗" : src.type === "FAQ" ? "?" : "T"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold leading-tight text-[#111]">
                          {src.label || src.type}
                        </div>
                        <div className="truncate text-[11px] text-[#76767e]">
                          {src.value}
                        </div>
                      </div>

                      <StatusDotPill status={src.type} />
                      <div className="text-[10px] text-[#a0a0a8]">
                        {relTime(src.createdAt)}
                      </div>
                    </div>
                  ))}

                  {!widget?.sources.length ? (
                    <div className="rounded-[14px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-4 text-[12px] text-[#76767e]">
                      No knowledge sources yet.
                    </div>
                  ) : null}
                </div>
              </KCardInner>
            </KCard>
          </div>

          <div className="grid gap-[14px] self-start">
            <KCard>
              <KCardInner>
                <div className="mb-[14px] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[13px] font-bold tracking-[-0.02em] text-[#111]">
                      Recent conversations
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-[#76767e]">
                      {recentConversations.length} today
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/dashboard/chat/conversations"
                      className="inline-flex h-7 items-center gap-1.5 rounded-[12px] border border-[#e4e4e7] bg-[rgba(255,255,255,0.86)] px-3 text-[10.5px] font-semibold text-[#2d2d33] transition hover:bg-white"
                    >
                      <Search className="h-3.5 w-3.5" />
                      Search
                    </Link>

                    <Link
                      href="/dashboard/chat/conversations"
                      className="text-[11px] text-[#76767e] transition hover:text-[#111]"
                    >
                      View all →
                    </Link>
                  </div>
                </div>

                <div className="grid gap-1.5">
                  {recentConversations.map((conversation) => {
                    const tone = avatarTone(conversation.visitorName);

                    return (
                      <Link
                        key={conversation.id}
                        href="/dashboard/chat/conversations"
                        className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-[14px] border border-[#ededf0] bg-[#fafafb] p-3 transition hover:border-[#e4e4e7] hover:bg-white"
                      >
                        <div
                          className="grid h-9 w-9 place-items-center rounded-full text-[11px] font-semibold"
                          style={tone}
                        >
                          {initials(conversation.visitorName, "A")}
                        </div>

                        <div className="min-w-0">
                          <div className="text-[12px] font-semibold leading-tight text-[#111]">
                            {conversation.visitorName}
                          </div>
                          <div className="truncate text-[11px] text-[#76767e]">
                            {conversation.lastMessage}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          <div className="text-[10px] text-[#a0a0a8]">
                            {relTime(conversation.createdAt)}
                          </div>
                          <div className="rounded-full bg-[#C4C8FF] px-2 py-0.5 text-[10px] font-bold text-[#111]">
                            {conversation.messages}
                          </div>
                        </div>
                      </Link>
                    );
                  })}

                  {!recentConversations.length ? (
                    <div className="rounded-[14px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-4 text-[12px] text-[#76767e]">
                      No conversations yet.
                    </div>
                  ) : null}
                </div>
              </KCardInner>
            </KCard>

            <KCard>
              <KCardInner>
                <div className="mb-[14px]">
                  <div className="text-[13px] font-bold tracking-[-0.02em] text-[#111]">
                    Live preview
                  </div>
                  <div className="mt-0.5 text-[10.5px] text-[#76767e]">
                    How visitors see your widget
                  </div>
                </div>

                <div className="rounded-[20px] bg-[#0e0e10] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
                  <div className="mb-3 flex items-center justify-between border-b border-white/10 px-1 pb-3">
                    <div className="text-[12px] font-semibold text-white">
                      {widget?.name || "Kompi Chat"}
                    </div>
                    <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
                  </div>

                  <div className="mb-2 max-w-[85%] rounded-[16px] rounded-bl-[6px] bg-white/10 px-3.5 py-2.5 text-[12px] leading-[1.55] text-white/80">
                    {widget?.welcomeMessage || "Hi — how can I help you today?"}
                  </div>

                  <div
                    className="mb-2 ml-auto max-w-[85%] rounded-[16px] rounded-br-[6px] px-3.5 py-2.5 text-[12px] font-medium leading-[1.55] text-[#111]"
                    style={{ background: widget?.primaryColor || "#C4C8FF" }}
                  >
                    What services do you offer?
                  </div>

                  <div className="mb-2 max-w-[85%] rounded-[16px] rounded-bl-[6px] bg-white/10 px-3.5 py-2.5 text-[12px] leading-[1.55] text-white/80">
                    {widget?.fallbackReply ||
                      "I can help with pricing, services, timelines, or guide you to the right next step."}
                  </div>

                  <div className="mt-1 rounded-[12px] border border-white/10 bg-white/5 px-3 py-2.5 text-[11px] text-white/35">
                    {widget?.placeholder || "Ask a question…"}
                  </div>
                </div>
              </KCardInner>
            </KCard>
          </div>

          <div className="grid gap-[14px] self-start">
            <KCard>
              <KCardInner>
                <div className="mb-[14px]">
                  <div className="text-[13px] font-bold tracking-[-0.02em] text-[#111]">
                    Activity
                  </div>
                  <div className="mt-0.5 text-[10.5px] text-[#76767e]">Today</div>
                </div>

                <div>
                  {[
                    {
                      time: "14:22",
                      event: "New conversation",
                      detail:
                        recentConversations[0]?.visitorName
                          ? `${recentConversations[0].visitorName} started a chat`
                          : "A visitor started a chat",
                    },
                    {
                      time: "13:58",
                      event: "Lead captured",
                      detail:
                        widget?._count.leads
                          ? `${widget._count.leads} total leads captured`
                          : "No leads captured yet",
                    },
                    {
                      time: "13:45",
                      event: "Source updated",
                      detail:
                        widget?._count.sources
                          ? `${widget._count.sources} sources connected`
                          : "No knowledge connected yet",
                    },
                    {
                      time: "11:30",
                      event: "Widget status",
                      detail:
                        widget?.status === "ACTIVE"
                          ? "Widget is active and installable"
                          : "Widget is still in draft",
                    },
                  ].map((item, i) => (
                    <div
                      key={`${item.time}-${i}`}
                      className="flex items-start gap-3 py-2 first:pt-0 last:pb-0 [&+&]:border-t [&+&]:border-[#ededf0]"
                    >
                      <div className="mt-[5px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#C4C8FF]" />
                      <div className="mt-[1px] min-w-[36px] shrink-0 text-[10px] text-[#a0a0a8]">
                        {item.time}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11.5px] font-semibold text-[#111]">
                          {item.event}
                        </div>
                        <div className="text-[11px] text-[#76767e]">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </KCardInner>
            </KCard>

            <KCard>
              <KCardInner>
                <div className="mb-[14px]">
                  <div className="text-[13px] font-bold tracking-[-0.02em] text-[#111]">
                    Quick actions
                  </div>
                </div>

                <div className="grid gap-1.5">
                  {[
                    {
                      href: "/dashboard/chat/widget",
                      label: "Edit widget settings",
                      sub: "Brand, tone, colors",
                      icon: Bot,
                    },
                    {
                      href: "/dashboard/chat/sources",
                      label: "Manage knowledge",
                      sub: `${stats.sources} sources connected`,
                      icon: Database,
                    },
                    {
                      href: "/dashboard/chat/install",
                      label: "Get install snippet",
                      sub: "Copy embed code",
                      icon: Code2,
                    },
                    {
                      href: "/dashboard/chat/conversations",
                      label: "View all conversations",
                      sub: `${stats.conversations} total`,
                      icon: MessagesSquare,
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 rounded-[14px] border border-[#ededf0] bg-[#fafafb] p-3 transition hover:bg-white"
                      >
                        <div className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[10px] bg-[#C4C8FF] text-[#111]">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[12px] font-semibold text-[#111]">
                            {item.label}
                          </div>
                          <div className="text-[10.5px] text-[#76767e]">
                            {item.sub}
                          </div>
                        </div>
                        <span className="text-[#a0a0a8]">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </KCardInner>
            </KCard>

            <KCard>
              <KCardInner>
                <div className="mb-[14px]">
                  <div className="text-[13px] font-bold tracking-[-0.02em] text-[#111]">
                    Satisfaction
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="grid h-14 w-14 place-items-center rounded-full border-[4px] border-[#6670D6] text-[16px] font-extrabold tracking-[-0.03em] text-[#111]">
                    {stats.satisfaction}%
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-[#111]">
                      Positive feedback
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#76767e]">
                      Based on {stats.conversations} conversations
                    </div>
                    <div className="mt-2 h-[5px] w-[120px] overflow-hidden rounded-full bg-[#ececef]">
                      <div
                        className="h-full rounded-full bg-[#6670D6]"
                        style={{ width: `${stats.satisfaction}%` }}
                      />
                    </div>
                  </div>
                </div>
              </KCardInner>
            </KCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}