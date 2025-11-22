import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const linkId = 'cmiar6lt30004hnmrzle0y1i5'; // from your KRCode

  console.log("Using linkId:", linkId, "\n");

  try {
    const before = await prisma.clickEvent.count();
    console.log("ClickEvent count BEFORE:", before);

    const ev = await prisma.clickEvent.create({
      data: {
        linkId,
        referer: null,
        userAgent: "debug-script",
        // No utmSource/utmMedium/utmCampaign here – your schema doesn't have them
      },
    });

    console.log("\nInserted ClickEvent row:");
    console.dir(ev, { depth: null });

    const after = await prisma.clickEvent.count();
    console.log("\nClickEvent count AFTER:", after);
  } catch (err) {
    console.error("\nERROR while creating ClickEvent:");
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Unhandled error in test-click-event.mjs:", e);
  process.exit(1);
});
