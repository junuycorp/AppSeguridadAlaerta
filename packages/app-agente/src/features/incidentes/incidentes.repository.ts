import { prisma, type Incidente, type Prisma } from '@agente/database'
import type { Estado } from '@agente/shared/types'

type CrearIncidente = Prisma.IncidenteUncheckedCreateInput
type ActualizarIncidente = Prisma.IncidenteUncheckedUpdateInput

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
    idTipoIncidente: number | undefined,
    estado: Estado | undefined,
  ): Promise<Incidente[]> => {
    return await prisma.incidente.findMany({
      where: {
        fechaCreacion: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        idTipoIncidente: { equals: idTipoIncidente },
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
            categoria: true,
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
