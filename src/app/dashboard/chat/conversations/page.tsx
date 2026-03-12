import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export const dynamic = "force-dynamic";

function initials(name: string, fallback = "A") {
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

export default async function DashboardChatConversationsPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);

  const widget = workspace
    ? await prisma.chatWidget.findFirst({
        where: { workspaceId: workspace.id },
        select: { id: true },
        orderBy: { createdAt: "asc" },
      })
    : null;

  const conversations = widget
    ? await prisma.chatConversation.findMany({
        where: { widgetId: widget.id },
        orderBy: { updatedAt: "desc" },
        take: 50,
        include: {
          messages: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          _count: {
            select: {
              messages: true,
            },
          },
        },
      })
    : [];

  return (
    <DashboardLayout
      pageEyebrow="Kompi Chat"
      pageTitle="Conversations"
      pageDescription="Review recent visitor conversations, message counts, and the latest activity."
    >
      <KCard>
        <KCardInner>
          <div className="mb-5">
            <div className="text-[14px] font-bold tracking-[-0.02em] text-[#111]">
              All conversations
            </div>
            <div className="text-[11px] text-[#76767e]">
              {conversations.length} conversation{conversations.length === 1 ? "" : "s"}
            </div>
          </div>

          {conversations.length === 0 ? (
            <div className="rounded-[16px] border border-dashed border-[#e4e4e7] bg-[#fafafb] p-6 text-[13px] text-[#76767e]">
              No conversations yet.
            </div>
          ) : (
            <div className="grid gap-2">
              {conversations.map((conversation) => {
                const name = conversation.visitorName || "Anonymous visitor";
                const tone = avatarTone(name);

                return (
                  <div
                    key={conversation.id}
                    className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-[16px] border border-[#ededf0] bg-[#fafafb] p-4"
                  >
                    <div
                      className="grid h-11 w-11 place-items-center rounded-full text-[12px] font-semibold"
                      style={tone}
                    >
                      {initials(name)}
                    </div>

                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold text-[#111]">{name}</div>
                      <div className="mt-0.5 text-[11px] text-[#76767e]">
                        {conversation.visitorEmail ||
                          conversation.domain ||
                          "No email captured"}
                      </div>
                      <div className="mt-2 truncate text-[12px] text-[#5f5f69]">
                        {conversation.messages[0]?.content || "No messages yet."}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <div className="text-[10px] text-[#a0a0a8]">
                        {relTime(conversation.updatedAt)}
                      </div>
                      <div className="rounded-full bg-[#C4C8FF] px-2 py-0.5 text-[10px] font-bold text-[#111]">
                        {conversation._count.messages}
                      </div>
                      <div className="rounded-full bg-[#EEF1FF] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#47568E]">
                        {conversation.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </KCardInner>
      </KCard>
    </DashboardLayout>
  );
}