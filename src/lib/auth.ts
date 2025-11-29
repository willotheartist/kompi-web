// src/lib/auth.ts
import { getServerSession, type NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
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

        return { id: user.id, email: user.email, name: user.name ?? undefined };
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
        name?: string | null;
        image?: string | null;
      };

      // When a user signs in, persist id + email (+ optional name/image) onto the token
      if (user) {
        if ("id" in user && typeof user.id === "string") {
          mutableToken.id = user.id;
        }
        if ("email" in user && typeof user.email === "string") {
          mutableToken.email = user.email;
        }
        if ("name" in user && typeof user.name === "string") {
          mutableToken.name = user.name;
        }
        if ("image" in user && typeof user.image === "string") {
          mutableToken.image = user.image;
        }
      }

      return mutableToken;
    },

    async session({ session, token }) {
      if (!session.user) return session;

      const typedToken = token as JWT & {
        id?: string;
        email?: string;
        name?: string | null;
        image?: string | null;
      };

      // Always try to hydrate from the database so profile changes (name etc.)
      // are reflected everywhere (e.g. dashboard topbar).
      let dbUser:
        | { id: string; email: string; name: string | null; image: string | null }
        | null = null;

      // 1) Try by id if present
      if (typedToken.id) {
        dbUser = await prisma.user.findUnique({
          where: { id: typedToken.id },
          select: { id: true, email: true, name: true, image: true },
        });
      }

      // 2) If that fails or id isn't a Prisma id (e.g. Google sub), fall back to email
      if (!dbUser && typedToken.email) {
        dbUser = await prisma.user.findUnique({
          where: { email: typedToken.email },
          select: { id: true, email: true, name: true, image: true },
        });
      }

      if (dbUser) {
        session.user = {
          ...session.user,
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name ?? session.user.name ?? undefined,
          image: dbUser.image ?? session.user.image ?? undefined,
        } as typeof session.user & {
          id?: string;
          email?: string | null;
          name?: string | null;
          image?: string | null;
        };
      } else {
        // Fallback to token-based values if for some reason we can't find the user
        session.user = {
          ...session.user,
          id: typedToken.id,
          email: typedToken.email ?? session.user.email ?? undefined,
          name: typedToken.name ?? session.user.name ?? undefined,
          image: typedToken.image ?? session.user.image ?? undefined,
        } as typeof session.user & {
          id?: string;
          email?: string | null;
          name?: string | null;
          image?: string | null;
        };
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

/**
 * Convenience helper: use this instead of calling getServerSession everywhere.
 */
export async function auth() {
  return getServerSession(authOptions);
}

export async function getSession() {
  return auth();
}

/**
 * Robust user lookup:
 * - Prefer session.user.id if present
 * - Fallback to session.user.email
 * - In development, optionally use DEV_EMAIL
 * - In production with no session, redirect to /signin
 */
export async function requireUser() {
  const session = await auth();

  // 1) No session at all -> dev fallback or redirect
  if (!session || !session.user) {
    // Dev convenience: allow DEV_EMAIL if set
    if (process.env.NODE_ENV === "development" && process.env.DEV_EMAIL) {
      const email = process.env.DEV_EMAIL;

      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({ data: { email } });
      }

      return user;
    }

    // Live (or dev without DEV_EMAIL): go to sign-in page, don't crash
    redirect("/signin");
  }

  // At this point we know session.user exists
  const { id, email: sessionEmail } = session.user as {
    id?: string | null;
    email?: string | null;
  };

  const userId = id ?? undefined;
  let email = sessionEmail ?? undefined;

  // 2) Try by id first if we have it
  if (userId) {
    const byId = await prisma.user.findUnique({ where: { id: userId } });
    if (byId) {
      return byId;
    }
    // fall through to email next
  }

  // 3) Need an email to continue; fallback to DEV_EMAIL in dev, otherwise redirect
  if (!email) {
    if (process.env.NODE_ENV === "development" && process.env.DEV_EMAIL) {
      email = process.env.DEV_EMAIL;
    } else {
      redirect("/signin");
    }
  }

  // 4) Find or create by email
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
    const byId = workspaces.find((w) => w.id == workspaceId);
    if (byId) return byId;
    const bySlug = workspaces.find((w) => w.slug === workspaceId);
    if (bySlug) return bySlug;
  }

  return workspaces[0];
}
