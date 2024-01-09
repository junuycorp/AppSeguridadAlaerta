/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  prisma,
  type IncidenteSereno,
  type Informe,
  type Incidente,
} from '@agente/database'
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
      orderBy: {
        incidente: {
          fechaCreacion: 'desc',
        },
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

  static async registrarInforme(
    idSereno: string,
    idIncidente: number,
    descripcion?: string,
  ): Promise<Informe> {
    return await prisma.informe.create({
      data: {
        descripcion,
        idSereno,
        idIncidente,
      },
    })
  }

  static async asignarSerenos(idIncidente: number, listaSerenos: string[]) {
    const datosAsignar = listaSerenos.map((idSereno) => ({
      idIncidente,
      idSereno,
    }))

    await prisma.$transaction([
      prisma.incidenteSereno.createMany({
        data: datosAsignar,
      }),
      prisma.incidente.update({
        where: { idIncidente },
        data: { estado: 'ASIGNADO', fechaAsignacion: new Date() },
      }),
    ])

    const incidenteSerenos = await prisma.incidenteSereno.findMany({
      where: { idIncidente },
      select: {
        idIncidente: true,
        sereno: {
          select: {
            persona: {
              select: {
                nroDocumento: true,
                razonSocial: true,
                apellidoPaterno: true,
                apellidoMaterno: true,
                nombres: true,
              },
            },
          },
        },
        incidente: true,
      },
    })
    return incidenteSerenos.map((incidenteSereno) => {
      const { nroDocumento, ...rest } = incidenteSereno.sereno.persona
      return {
        idIncidente: incidenteSereno.idIncidente,
        sereno: {
          idSereno: nroDocumento,
          ...rest,
        },
        incidente: incidenteSereno.incidente,
      }
    })
  }

  // TODO: Eliminar
  static async asignarIncidente(
    idSereno: string,
    idIncidente: number,
  ): Promise<IncidenteSerenoWithIncidente> {
    return await prisma.incidenteSereno.create({
      data: {
        idIncidente,
        idSereno,
      },
      include: {
        incidente: true,
        sereno: {
          select: {
            persona: {
              select: {
                nroDocumento: true,
                razonSocial: true,
                apellidoPaterno: true,
                apellidoMaterno: true,
                nombres: true,
              },
            },
          },
        },
      },
    })
  }
}

export interface IncidenteSerenoWithIncidente extends IncidenteSereno {
  incidente: Incidente
}
