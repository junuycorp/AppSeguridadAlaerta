import { PrismaClient } from '@prisma-agente/client'
import { listaMenuSeed, menuAccesoSeed } from './seeders'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  // MenuAccesos
  for (const acceso of menuAccesoSeed) {
    await prisma.menuAcceso.upsert({
      where: { menuCodigo: acceso.menuCodigo },
      update: {},
      create: { ...acceso },
    })
  }
  // ListaMenu
  for (const menu of listaMenuSeed) {
    await prisma.listaMenu.upsert({
      where: {
        menuCodigo_perfilCodigo: {
          menuCodigo: menu.menuCodigo,
          perfilCodigo: menu.perfilCodigo,
        },
      },
      update: {},
      create: { ...menu },
    })
  }
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
