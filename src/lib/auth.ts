// src/lib/auth.ts
import { getServerSession, type NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        const password = credentials?.password ?? "";

        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            image: true,
            passwordHash: true,
          },
        });

        if (!user || !user.passwordHash) {
          // no such user, or Google-only account
          return null;
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        };
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

      let dbUser:
        | {
            id: string;
            email: string;
            name: string | null;
            image: string | null;
          }
        | null = null;

      if (typedToken.id) {
        dbUser = await prisma.user.findUnique({
          where: { id: typedToken.id },
          select: { id: true, email: true, name: true, image: true },
        });
      }

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

export async function auth() {
  return getServerSession(authOptions);
}

export async function getSession() {
  return auth();
}

export async function requireUser() {
  const session = await auth();

  if (!session || !session.user) {
    if (process.env.NODE_ENV === "development" && process.env.DEV_EMAIL) {
      const email = process.env.DEV_EMAIL;

      let user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({ data: { email } });
      }

      return user;
    }

    redirect("/signin");
  }

  const { id, email: sessionEmail } = session.user as {
    id?: string | null;
    email?: string | null;
  };

  const userId = id ?? undefined;
  let email = sessionEmail ?? undefined;

  if (userId) {
    const byId = await prisma.user.findUnique({ where: { id: userId } });
    if (byId) {
      return byId;
    }
  }

  if (!email) {
    if (process.env.NODE_ENV === "development" && process.env.DEV_EMAIL) {
      email = process.env.DEV_EMAIL;
    } else {
      redirect("/signin");
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
    const byId = workspaces.find((w) => w.id == workspaceId);
    if (byId) return byId;
    const bySlug = workspaces.find((w) => w.slug === workspaceId);
    if (bySlug) return bySlug;
  }

  return workspaces[0];
}
