/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { prisma, type IncidenteSereno } from '@agente/database'
import type { Estado } from '@agente/shared/types'

// type CrearIncidenteSereno = Prisma.IncidenteSerenoUncheckedCreateInput

export class SerenoRepository {
  static async listarIncidentesPorSereno(
    idSereno: string,
    estado: Estado | undefined,
    tamanio: number,
  ) {
    return await prisma.incidenteSereno.findMany({
      where: {
        idSereno,
        incidente: {
          estado: { equals: estado },
        },
      },
      include: { incidente: true },
      take: tamanio,
    })
  }

  static async asignarIncidente(
    idSereno: string,
    idIncidente: number,
  ): Promise<IncidenteSereno> {
    return await prisma.incidenteSereno.create({
      data: {
        idIncidente,
        idSereno,
      },
    })
  }

  static async buscarIncidenteSerenoPorId(
    idSereno: string,
    idIncidente: number,
  ): Promise<IncidenteSereno | null> {
    return await prisma.incidenteSereno.findUnique({
      where: {
        idIncidente_idSereno: {
          idIncidente,
          idSereno,
        },
      },
    })
  }
}
