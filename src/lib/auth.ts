import { getServerSession, type NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Dev Email",
      credentials: { email: { label: "Email", type: "email" } },
      async authorize(credentials) {
        const raw = credentials?.email;
        const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";
        if (!email) return null;

        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) user = await prisma.user.create({ data: { email } });

        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      const mutableToken = token as JWT & {
        id?: string;
        email?: string;
      };

      if (user) {
        if ("id" in user && typeof user.id === "string") {
          mutableToken.id = user.id;
        }
        if ("email" in user && typeof user.email === "string") {
          mutableToken.email = user.email;
        }
      }

      return mutableToken;
    },
    async session({ session, token }) {
      if (session.user) {
        const typedToken = token as JWT & {
          id?: string;
          email?: string;
        };

        session.user = {
          ...session.user,
          id: typedToken.id,
          email:
            typedToken.email ??
            session.user.email ??
            undefined,
        } as typeof session.user & { id?: string; email?: string | null };
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/dashboard`;
    },
  },
};

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireUser() {
  const session = await getServerSession(authOptions);
  let email = session?.user?.email as string | undefined;

  if (!email) {
    if (process.env.NODE_ENV === "development" && process.env.DEV_EMAIL) {
      email = process.env.DEV_EMAIL as string;
    } else {
      throw new Error("Unauthorized");
    }
  }

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }
  return user;
}

export async function getUserWorkspaces(userId: string) {
  return prisma.workspace.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function getActiveWorkspace(
  userId: string,
  workspaceId?: string | null,
) {
  const workspaces = await getUserWorkspaces(userId);
  if (!workspaces.length) return null;

  if (workspaceId) {
    const byId = workspaces.find((w) => w.id === workspaceId);
    if (byId) return byId;
    const bySlug = workspaces.find((w) => w.slug === workspaceId);
    if (bySlug) return bySlug;
  }

  return workspaces[0];
}
