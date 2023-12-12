import { prisma, type IncidenteSereno } from '@agente/database'

// type CrearIncidenteSereno = Prisma.IncidenteSerenoUncheckedCreateInput

export class SerenoRepository {
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
