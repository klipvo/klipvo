import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const DEMO_PASSWORD = "password123";

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

  const [alex, marcus, priya, jake] = await Promise.all(
    [
      { email: "alex@klipvo.app", name: "Alex Rivera" },
      { email: "marcus@klipvo.app", name: "Marcus Chen" },
      { email: "priya@klipvo.app", name: "Priya Shah" },
      { email: "jake@klipvo.app", name: "Jake Wu" },
    ].map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: { ...u, passwordHash, role: "CREATOR" },
      })
    )
  );

  await prisma.user.upsert({
    where: { email: "viewer@klipvo.app" },
    update: {},
    create: { email: "viewer@klipvo.app", name: "Demo Viewer", passwordHash, role: "VIEWER" },
  });

  const [zara, myProtein, sephora, notion] = await Promise.all(
    [
      { name: "ZARA", emoji: "👗" },
      { name: "MyProtein", emoji: "💪" },
      { name: "Sephora", emoji: "✨" },
      { name: "Notion", emoji: "💻" },
    ].map((b) =>
      prisma.brand.upsert({ where: { name: b.name }, update: {}, create: b })
    )
  );

  const in2Days = new Date(Date.now() + 1000 * 60 * 60 * 38);
  const in5Days = new Date(Date.now() + 1000 * 60 * 60 * 126);
  const in12Days = new Date(Date.now() + 1000 * 60 * 60 * 288);
  const in1Day = new Date(Date.now() + 1000 * 60 * 60 * 27);

  const zaraDeal = await prisma.deal.create({
    data: {
      title: "Summer lookbook — you need these pieces fr",
      code: "ALEX25",
      discount: "25% OFF",
      category: "Fashion",
      emoji: "👗",
      gradient: "linear-gradient(135deg, #1a0533, #3d0066)",
      affiliateLink: "https://zara.com",
      expiresAt: in2Days,
      views: 142_000,
      clicks: 8_200,
      creatorId: alex.id,
      brandId: zara.id,
    },
  });

  await prisma.deal.create({
    data: {
      title: "This pre-workout changed my morning routine completely",
      code: "MARCUS40",
      discount: "40% OFF",
      category: "Fitness",
      emoji: "💪",
      gradient: "linear-gradient(135deg, #001a0d, #003322)",
      affiliateLink: "https://myprotein.com",
      expiresAt: in5Days,
      views: 89_000,
      clicks: 5_400,
      creatorId: marcus.id,
      brandId: myProtein.id,
    },
  });

  const sephoraDeal = await prisma.deal.create({
    data: {
      title: "Skincare routine that cleared my skin in 30 days",
      code: "PRIYA15",
      discount: "15% OFF",
      category: "Beauty",
      emoji: "✨",
      gradient: "linear-gradient(135deg, #1a0020, #4d003a)",
      affiliateLink: "https://sephora.com",
      expiresAt: in12Days,
      views: 210_000,
      clicks: 14_000,
      creatorId: priya.id,
      brandId: sephora.id,
    },
  });

  await prisma.deal.create({
    data: {
      title: "The productivity stack I use to run my 7-figure biz",
      code: "JAKE50",
      discount: "50% OFF",
      category: "Tech",
      emoji: "💻",
      gradient: "linear-gradient(135deg, #00071a, #001433)",
      affiliateLink: "https://notion.so",
      expiresAt: in1Day,
      views: 67_000,
      clicks: 12_000,
      creatorId: jake.id,
      brandId: notion.id,
    },
  });

  const viewer = await prisma.user.findUniqueOrThrow({ where: { email: "viewer@klipvo.app" } });
  await Promise.all(
    [zaraDeal.id, sephoraDeal.id].map((dealId) =>
      prisma.savedDeal.upsert({
        where: { userId_dealId: { userId: viewer.id, dealId } },
        update: {},
        create: { userId: viewer.id, dealId },
      })
    )
  );

  console.log("Seeded database. Demo accounts (password: %s):", DEMO_PASSWORD);
  console.log("  Creator: alex@klipvo.app / marcus@klipvo.app / priya@klipvo.app / jake@klipvo.app");
  console.log("  Viewer:  viewer@klipvo.app");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
