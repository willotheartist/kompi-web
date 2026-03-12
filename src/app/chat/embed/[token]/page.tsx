import { ChatEmbedClient } from "@/components/chat/chat-embed-client";

export default async function ChatEmbedPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ChatEmbedClient token={token} />;
}
