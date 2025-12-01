// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

const HANDLE_REGEX = /^[a-z0-9\-]{3,30}$/i;

async function handleIsTaken(handle: string): Promise<boolean> {
  const slug = handle.toLowerCase();

  const [workspace, bio, kcard, menu] = await Promise.all([
    prisma.workspace.findUnique({ where: { slug } }),
    prisma.bioPage.findUnique({ where: { slug } }),
    prisma.kCard.findFirst({ where: { slug } }),
    prisma.menu.findUnique({ where: { slug } }),
  ]);

  return Boolean(workspace || bio || kcard || menu);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const emailRaw = typeof body.email === "string" ? body.email.trim() : "";
    const password: string = body.password ?? "";
    const handleRaw = typeof body.handle === "string" ? body.handle.trim() : "";
    const name =
      typeof body.name === "string" && body.name.trim().length > 0
        ? body.name.trim()
        : null;
    const marketingOptIn = Boolean(body.marketingOptIn);

    const email = emailRaw.toLowerCase();
    const handle = handleRaw.toLowerCase();

    if (!email || !password || !handle) {
      return NextResponse.json(
        { error: "Missing email, password or handle" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    if (!HANDLE_REGEX.test(handle)) {
      return NextResponse.json(
        {
          error:
            "Handle must be 3–30 characters and use letters, numbers or dashes.",
        },
        { status: 400 },
      );
    }

    if (await handleIsTaken(handle)) {
      return NextResponse.json(
        { error: "That handle is already taken" },
        { status: 409 },
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true, accounts: true },
    });

    if (existing) {
      if (existing.passwordHash) {
        return NextResponse.json(
          {
            error:
              "This email already has a Kompi password. Try signing in instead.",
          },
          { status: 409 },
        );
      }
      if (existing.accounts.length > 0) {
        return NextResponse.json(
          {
            error:
              "This email is already connected to a social sign-in. Use that to sign in.",
          },
          { status: 409 },
        );
      }
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        // NOTE: this assumes you later add `marketingOptIn Boolean @default(false)`
        // to your User model in schema.prisma. If you don't, remove this line.
        marketingOptIn,
      },
    });

    // Create their first workspace using the handle
    await prisma.workspace.create({
      data: {
        name: name ? `${name}'s Kompi` : "My Kompi",
        slug: handle,
        ownerId: user.id,
      },
    });

    // Fire welcome email (non-blocking if it fails)
    sendWelcomeEmail(email).catch((err) =>
      console.error("[register] welcome email failed", err),
    );

    return NextResponse.json(
      {
        ok: true,
        userId: user.id,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Register error", err);
    return NextResponse.json(
      { error: "Something went wrong while creating your account" },
      { status: 500 },
    );
  }
}
