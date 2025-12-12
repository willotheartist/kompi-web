import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Helper: get current user by session email
async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    // ⚠️ If your User model does not have `_phone`, remove it from this select + the update below.
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      // _phone: true,
    },
  });

  return user;
}

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.json(user);
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return new NextResponse("Invalid payload", { status: 400 });
  }

  const { name, _phone } = body as { name?: string; _phone?: string };

  const dataToUpdate: { name?: string | null; /* _phone?: string | null */ } = {};

  if (typeof name === "string") {
    dataToUpdate.name = name.trim() || null;
  }

  // ⚠️ If your User model has a `_phone` field, uncomment this block:
  /*
  if (typeof _phone === "string") {
    dataToUpdate._phone = _phone.trim() || null;
  }
  */

  if (Object.keys(dataToUpdate).length === 0) {
    return new NextResponse("Nothing to update", { status: 400 });
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: dataToUpdate,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      // _phone: true,
    },
  });

  return NextResponse.json(updated);
}
