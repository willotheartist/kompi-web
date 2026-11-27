import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

/** Issues short-lived tokens so the browser can upload product files straight to Vercel Blob. */
export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ error: "File uploads aren't set up yet. Paste a link to your file instead." }, { status: 503 });
  const body = (await req.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) throw new Error("Please sign in to continue.");
        if (!pathname.startsWith("store/")) throw new Error("Invalid upload path.");
        return { maximumSizeInBytes: 500 * 1024 * 1024, addRandomSuffix: true, tokenPayload: session.user.email };
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 400 });
  }
}
