import { getServerSession, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { rateLimit } from "./rate-limit";
import { safeReturnPath } from "./urls";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID || "", clientSecret: process.env.GOOGLE_CLIENT_SECRET || "" }),
    CredentialsProvider({ name: "Email and password", credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(credentials, req) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password || "";
        if (!email || !password || password.length > 128) return null;
        const ip = String(req.headers?.["x-forwarded-for"] || "unknown").split(",")[0];
        await rateLimit("login-ip", ip, 50);
        await rateLimit("login-email", email, 10);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash || user.bannedAt || !await bcrypt.compare(password, user.passwordHash)) return null;
        if (!user.emailVerifiedAt) throw new Error("EmailNotVerified");
        return { id: user.id, email: user.email, name: user.name, image: user.image };
      }
    }),
  ],
  pages: { signIn: "/signin" },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email?.trim().toLowerCase();
      if (!email) return false;
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing?.bannedAt) return false;
      if (account?.provider === "google") {
        if (!(profile && "email_verified" in profile && profile.email_verified === true)) return false;
        await prisma.user.upsert({ where: { email }, update: { emailVerifiedAt: new Date() }, create: { email, name: user.name, image: user.image, emailVerifiedAt: new Date() } });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const record = await prisma.user.findUnique({ where: { email: user.email.trim().toLowerCase() } });
        if (record) { token.sub = record.id; token.email = record.email; token.name = record.name; token.picture = record.image; token.sessionVersion = record.sessionVersion; }
      }
      return token;
    },
    async session({ session, token }) {
      const user = token.email ? await prisma.user.findUnique({ where: { email: token.email } }) : null;
      if (!user || user.bannedAt || Number(token.sessionVersion || 0) !== user.sessionVersion) return { ...session, user: undefined };
      session.user = { name: user.name, email: user.email, image: user.image };
      Object.assign(session.user, { id: user.id });
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${safeReturnPath(url)}`;
      try { if (new URL(url).origin === new URL(baseUrl).origin) return url; } catch {}
      return `${baseUrl}/dashboard`;
    },
  },
};
export function auth() { return getServerSession(authOptions); }
export const getSession = auth;
export async function requireUser() {
  const session = await auth();
  if (!session?.user?.email) redirect("/signin");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.bannedAt) redirect("/signin?error=AccessDenied");
  return user;
}
export function getUserWorkspaces(userId: string) { return prisma.workspace.findMany({ where: { ownerId: userId }, orderBy: { createdAt: "asc" } }); }
export async function getActiveWorkspace(userId: string, workspaceId?: string | null) {
  if (workspaceId) return prisma.workspace.findFirst({ where: { ownerId: userId, OR: [{ id: workspaceId }, { slug: workspaceId }] } });
  const existing = await prisma.workspace.findFirst({ where: { ownerId: userId }, orderBy: { createdAt: "asc" } });
  if (existing) return existing;
  return prisma.workspace.upsert({ where: { slug: `ws-${userId}` }, update: {}, create: { name: "My workspace", slug: `ws-${userId}`, ownerId: userId } });
}
