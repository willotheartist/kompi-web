// Suspend a user: blocks sign-in and disables every link they own.
// Usage: node --env-file=.env.local scripts/ban-user.mjs <email|userId> ["reason"]
//        node --env-file=.env.local scripts/ban-user.mjs --unban <email|userId>
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const args = process.argv.slice(2);
const unban = args[0] === "--unban";
if (unban) args.shift();
const [who, reason = "abuse"] = args;

if (!who) {
  console.error('Usage: scripts/ban-user.mjs [--unban] <email|userId> ["reason"]');
  process.exit(1);
}

const user = await prisma.user.findFirst({
  where: { OR: [{ id: who }, { email: who.toLowerCase() }] },
  select: { id: true, email: true, createdAt: true },
});
if (!user) {
  console.error(`No user found for ${who}`);
  process.exit(1);
}

if (unban) {
  await prisma.user.update({
    where: { id: user.id },
    data: { bannedAt: null, bannedReason: null },
  });
  console.log(`Unbanned ${user.email}. Their links stay disabled; re-enable them individually.`);
} else {
  await prisma.user.update({
    where: { id: user.id },
    data: { bannedAt: new Date(), bannedReason: reason },
  });
  const links = await prisma.link.updateMany({
    where: { workspace: { ownerId: user.id } },
    data: { isActive: false },
  });
  const sessions = await prisma.session.deleteMany({ where: { userId: user.id } });
  console.log(
    `Banned ${user.email} (${user.id}, joined ${user.createdAt.toISOString()}): ` +
      `${links.count} links disabled, ${sessions.count} sessions cleared.`,
  );
}

await prisma.$disconnect();
