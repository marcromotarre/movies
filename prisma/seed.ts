import { PrismaClient } from "@prisma/client";

import { prisma } from "../lib/prisma";

const run = async () => {};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
