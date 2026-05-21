import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  { email: "rachel@remix.run", password: "racheliscool" },
  { email: "admin@blurb.se", password: "losenord1" },
];

async function upsertUser(email: string, password: string) {
  await prisma.user.delete({ where: { email } }).catch(() => {});

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  console.log(`Seeded user: ${email}`);
}

async function seed() {
  for (const user of users) {
    await upsertUser(user.email, user.password);
  }

  console.log("Database has been seeded.");
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
