export type LinkSummary = {
  id: string;
  code: string | null;
  shortUrl?: string | null;
  targetUrl: string;
  createdAt: string;
  clicks?: number | null;
};
