import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Dev Email",
      credentials: {
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        const raw = credentials?.email;
        const email =
          typeof raw === "string" ? raw.trim().toLowerCase() : "";
        if (!email) return null;

        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          user = await prisma.user.create({ data: { email } });
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && "id" in user) {
        token.sub = String((user as { id: string }).id);
      }
      if (user && "email" in user && user.email) {
        token.email = String(user.email);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = String(token.sub);
      }
      if (session.user && token.email && !session.user.email) {
        session.user.email = String(token.email);
      }
      return session;
    },
  },
};

export async function getSession() {
  return getServerSession(authOptions);
}

export async function requireUser() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) throw new Error("Unauthorized");

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }

  return { id: user.id, email: user.email };
}

export async function getUserWorkspaces(userId: string) {
  return prisma.workspace.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function getActiveWorkspace(
  userId: string,
  workspaceId?: string | null
) {
  const workspaces = await getUserWorkspaces(userId);
  if (!workspaces.length) return null;

  if (workspaceId) {
    const byId = workspaces.find(
      (w: any) => w.id === workspaceId
    );
    if (byId) return byId;

    const bySlug = workspaces.find(
      (w: any) => w.slug === workspaceId
    );
    if (bySlug) return bySlug;
  }

  return workspaces[0];
}
