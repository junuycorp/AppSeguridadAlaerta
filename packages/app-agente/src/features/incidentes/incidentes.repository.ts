import { prisma } from '@agente/database'
import type { Incidente, Prisma } from '@prisma-agente/client'

type CrearIncidente = Prisma.IncidenteUncheckedCreateInput
type ActualizarIncidente = Prisma.IncidenteUncheckedUpdateInput
export type Estado = 'PENDIENTE' | 'RECIBIDO' | 'ASIGNADO' | 'TERMINADO'
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

  static listarPorDenunciante = async (
    idDenunciante: string,
    nroDenuncias: number,
    estado: Estado | undefined,
  ): Promise<Incidente[]> => {
    return await prisma.incidente.findMany({
      where: { idDenunciante, estado: { equals: estado } },
      take: nroDenuncias,
      orderBy: {
        fechaCreacion: 'desc',
      },
    })
  }

  static listarConFiltros = async (
    fechaInicio: Date,
    fechaFin: Date,
    tipo: Tipo | undefined,
    estado: Estado | undefined,
  ): Promise<Incidente[]> => {
    return await prisma.incidente.findMany({
      where: {
        fechaCreacion: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        tipo: { equals: tipo },
        estado: { equals: estado },
      },
      orderBy: {
        fechaCreacion: 'desc',
      },
    })
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static buscarPorId = async (idIncidente: number) => {
    return await prisma.incidente.findUnique({
      where: { idIncidente },
      include: {
        archivoDigital: {
          select: {
            idArchivo: true,
            ruta: true,
            tipo: true,
          },
        },
      },
    })
  }

  static crear = async (datos: CrearIncidente): Promise<Incidente> => {
    return await prisma.incidente.create({
      data: datos,
    })
  }

  static actualizar = async (
    idIncidente: number,
    datos: ActualizarIncidente,
  ): Promise<Incidente> => {
    return await prisma.incidente.update({
      where: { idIncidente },
      data: datos,
    })
  }
}
