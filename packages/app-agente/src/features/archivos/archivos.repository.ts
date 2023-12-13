import { prisma } from '@agente/database'
import type { Prisma } from '@prisma-agente/client'

export type CrearArchivo = Prisma.ArchivoDigitalUncheckedCreateInput

export class ArchivoRepository {
  static crearMultiple = async (datos: CrearArchivo[]): Promise<number> => {
    const { count } = await prisma.archivoDigital.createMany({
      data: datos,
    })
    return count
  }
}
