// src/lib/auth.ts
import { getServerSession, type NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 32);
}

async function createDefaultWorkspaceForUser(user: { id: string; email: string }) {
  const base = slugify(user.email.split("@")[0] ?? "") || `ws-${user.id.slice(0, 8)}`;
  const name = "My Workspace";

  // try deterministic + numbered slugs first
  for (let attempt = 0; attempt < 10; attempt++) {
    const candidate = attempt === 0 ? base : `${base}-${attempt + 1}`;
    const existing = await prisma.workspace.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing) {
      return prisma.workspace.create({
        data: {
          ownerId: user.id,
          name,
          slug: candidate,
        },
      });
    }
  }

  // final fallback: random suffix
  const slug = `${base}-${Math.random().toString(36).slice(2, 8)}`;
  return prisma.workspace.create({
    data: {
      ownerId: user.id,
      name,
      slug,
    },
  });
}

type TokenWithUser = JWT & {
  id?: string;
  email?: string;
  name?: string | null;
  image?: string | null;
};

type SessionUserUpdate = {
  name?: string | null;
  image?: string | null;
};

// This is what we *want* to exist on session.user at runtime.
// (NextAuth default types don't include `id` unless you augment them.)
type SessionUserWithId = {
  id?: string | null;
  email?: string | null;
  name?: string | null;
  image?: string | null;
};

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
    async jwt({ token, user, trigger, session }) {
      const t: TokenWithUser = token as TokenWithUser;

      // initial sign-in
      if (user) {
        // NextAuth `user` is loose, so narrow safely without `any`
        if ("id" in user && typeof user.id === "string") t.id = user.id;
        if ("email" in user && typeof user.email === "string") t.email = user.email;
        if ("name" in user && typeof user.name === "string") t.name = user.name;
        if ("image" in user && typeof user.image === "string") t.image = user.image;
      }

      // ✅ allow client-side session.update({ name, image })
      if (trigger === "update" && session?.user) {
        const su = session.user as SessionUserUpdate;
        if (typeof su.name === "string") t.name = su.name;
        if (typeof su.image === "string") t.image = su.image;
      }

      return t;
    },

    // Do NOT hit Prisma here
    async session({ session, token }) {
      if (!session.user) return session;

      const t = token as TokenWithUser;

      // Important: don't replace session.user with an object literal containing `id`
      // because NextAuth's default Session["user"] type doesn't include `id`.
      // Instead: cast once and mutate.
      const u = session.user as unknown as SessionUserWithId;

      u.id = t.id ?? u.id ?? undefined;
      u.email = (t.email ?? u.email ?? undefined) as string | undefined;
      u.name = (t.name ?? u.name ?? undefined) as string | undefined;
      u.image = (t.image ?? u.image ?? undefined) as string | undefined;

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

      // ✅ ensure default workspace even in dev fallback
      const ws = await prisma.workspace.findFirst({
        where: { ownerId: user.id },
        select: { id: true },
      });
      if (!ws) {
        await createDefaultWorkspaceForUser({ id: user.id, email: user.email });
      }

      return user;
    }

    redirect("/signin");
  }

  const { id, email: sessionEmail } = session.user as SessionUserWithId;

  const userId = id ?? undefined;
  let email = sessionEmail ?? undefined;

  if (userId) {
    const byId = await prisma.user.findUnique({ where: { id: userId } });
    if (byId) {
      // ✅ ensure default workspace exists for all users
      const ws = await prisma.workspace.findFirst({
        where: { ownerId: byId.id },
        select: { id: true },
      });
      if (!ws) {
        await createDefaultWorkspaceForUser({ id: byId.id, email: byId.email });
      }

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

  // ✅ ensure default workspace exists
  const ws = await prisma.workspace.findFirst({
    where: { ownerId: user.id },
    select: { id: true },
  });
  if (!ws) {
    await createDefaultWorkspaceForUser({ id: user.id, email: user.email });
  }

  return user;
}

export async function getUserWorkspaces(userId: string) {
  return prisma.workspace.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "asc" },
  });
}

/**
 * Active workspace resolver
 *
 * Current "single workspace mode" behavior:
 * - If a requested workspace is provided and owned by user, use it.
 * - Otherwise use the first workspace.
 * - If none exist, auto-create a default workspace.
 */
export async function getActiveWorkspace(userId: string, workspaceId?: string | null) {
  if (workspaceId) {
    const ws = await prisma.workspace.findFirst({
      where: {
        ownerId: userId,
        OR: [{ id: workspaceId }, { slug: workspaceId }],
      },
    });
    if (ws) return ws;
  }

  const existing = await prisma.workspace.findFirst({
    where: { ownerId: userId },
    orderBy: { createdAt: "asc" },
  });
  if (existing) return existing;

  // In rare cases: user exists but no workspace yet.
  // Create default workspace.
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true },
  });

  if (!user) return null;

  return createDefaultWorkspaceForUser({ id: user.id, email: user.email });
}
