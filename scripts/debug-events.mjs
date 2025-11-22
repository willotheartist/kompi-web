import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("DATABASE_URL:", process.env.DATABASE_URL, "\n");

  const meta = await prisma.$queryRaw`
    select current_database() as db, current_user as user, current_schema as schema
  `;
  console.log("DB meta:", meta, "\n");

  const count = await prisma.clickEvent.count();
  console.log("ClickEvent count via Prisma:", count, "\n");

  const recent = await prisma.clickEvent.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  console.log("Recent ClickEvent rows via Prisma:");
  console.dir(recent, { depth: null });
}

main()
  .catch((e) => {
    console.error("Error in debug-events.mjs:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
