import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("DATABASE_URL seen by Node:");
  console.log(process.env.DATABASE_URL, "\n");

  const meta = await prisma.$queryRaw`
    select current_database() as db, current_user as user, current_schema() as schema
  `;
  console.log("DB meta (from Prisma):");
  console.log(meta, "\n");

  const krcodes = await prisma.kRCode.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  console.log("Latest 5 KRCode rows (from Prisma):");
  console.dir(krcodes, { depth: null });
}

main()
  .catch((e) => {
    console.error("Error in debug-db.mjs:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
