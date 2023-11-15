import { PrismaClient } from '@ciudadano/database'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  // Seeds
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
