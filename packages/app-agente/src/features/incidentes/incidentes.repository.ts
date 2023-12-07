import { prisma } from '@agente/database'
import type { Incidente, Prisma } from '@prisma-agente/client'

type CrearIncidente = Prisma.IncidenteUncheckedCreateInput
export type Estado = 'PENDIENTE' | 'ATENDIDO' | 'ARCHIVADO' | 'DERIVADO'
export type Tipo =
  | 'ACCIDENTE'
  | 'SUBIDA DE RIO'
  | 'VIOLENCIA FAMILIAR'
  | 'RIESGO'
  | 'ROBO'

export class IncidenteRepository {
  static listar = async (): Promise<Incidente[]> => {
    return await prisma.incidente.findMany()
  }

  static listarConFiltros = async (
    fechaInicio: Date,
    fechaFin: Date,
    tipo: Tipo | undefined,
    estado: Estado,
  ): Promise<Incidente[]> => {
    return await prisma.incidente.findMany({
      where: {
        fechaCreacion: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        tipo: {
          equals: tipo,
        },
        estado,
      },
      orderBy: {
        fechaCreacion: 'desc',
      },
    })
  }

  static crear = async (datos: CrearIncidente): Promise<Incidente> => {
    return await prisma.incidente.create({
      data: datos,
    })
  }
}
