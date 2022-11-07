import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const run = async () => {
 

}

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })