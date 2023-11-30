import { prisma } from '@agente/database'
import type { Incidente, Prisma } from '@prisma-agente/client'

type CrearIncidente = Prisma.IncidenteUncheckedCreateInput

export class IncidenteRepository {
  static listar = async (): Promise<Incidente[]> => {
    return await prisma.incidente.findMany()
  }

  static crear = async (datos: CrearIncidente): Promise<Incidente> => {
    return await prisma.incidente.create({
      data: datos,
    })
  }
}
