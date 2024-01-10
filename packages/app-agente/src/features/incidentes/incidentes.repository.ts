/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  prisma,
  type Incidente,
  type Prisma,
  type TipoIncidente,
} from '@agente/database'
import { VALUES } from '@agente/shared/constants'
import type { EstadoIncidente } from '@agente/shared/types'

type CrearIncidente = Prisma.IncidenteUncheckedCreateInput
type ActualizarIncidente = Prisma.IncidenteUncheckedUpdateInput

export class IncidenteRepository {
  static listar = async (): Promise<Incidente[]> => {
    return await prisma.incidente.findMany()
  }

  static listarPorDenunciante = async (
    idDenunciante: string,
    nroDenuncias: number,
    estado: EstadoIncidente | undefined,
  ): Promise<Incidente[]> => {
    return await prisma.incidente.findMany({
      where: { idDenunciante, estado: { equals: estado } },
      take: nroDenuncias,
      orderBy: {
        fechaCreacion: 'desc',
      },
      include: {
        tipoIncidente: {
          select: {
            idTipoIncidente: true,
            nombre: true,
            descripcion: true,
            colorMarcador: true,
          },
        },
      },
    })
  }

  static listarConFiltros = async (
    fechaInicio: Date,
    fechaFin: Date,
    idTipoIncidente: number | undefined,
    estado: EstadoIncidente | undefined,
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
      include: {
        tipoIncidente: {
          select: {
            idTipoIncidente: true,
            nombre: true,
          },
        },
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
        tipoIncidente: {
          select: {
            idTipoIncidente: true,
            nombre: true,
          },
        },
      },
    })
  }

  static crear = async (datos: CrearIncidente): Promise<Incidente> => {
    return await prisma.incidente.create({
      data: datos,
      include: {
        tipoIncidente: {
          select: {
            idTipoIncidente: true,
            nombre: true,
          },
        },
      },
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

  static listarTipos = async (): Promise<TipoIncidente[]> => {
    return await prisma.tipoIncidente.findMany()
  }

  static listarSerenosAsignadosAIncidente = async (idIncidente: number) => {
    const serenos = await prisma.incidenteSereno.findMany({
      where: { idIncidente },
      select: {
        sereno: {
          select: {
            persona: {
              select: {
                nroDocumento: true,
                razonSocial: true,
                nombres: true,
                apellidoMaterno: true,
                apellidoPaterno: true,
              },
            },
            numeroCelular: true,
            correo: true,
          },
        },
      },
    })
    const mapSerenos = serenos.map((sereno) => {
      const { nroDocumento, ...rest } = sereno.sereno.persona
      return {
        idSereno: nroDocumento,
        ...rest,
        nroCelular: sereno.sereno.numeroCelular,
        correo: sereno.sereno.correo,
      }
    })
    return mapSerenos
  }

  static listarSerenosActivos = async () => {
    const serenos = await prisma.cuentaUsuario.findMany({
      where: { perfilCodigo: VALUES.idPerfilSereno, estadoRegistro: true },
      select: {
        persona: {
          select: {
            nroDocumento: true,
            razonSocial: true,
            nombres: true,
            apellidoPaterno: true,
            apellidoMaterno: true,
          },
        },
      },
    })
    return serenos.map((sereno) => {
      const { nroDocumento, ...rest } = sereno.persona
      return {
        idSereno: nroDocumento,
        ...rest,
      }
    })
  }

  static NroTipoIncidentesPorCentroPoblado = async (
    idCentroPoblado: number,
  ): Promise<unknown> => {
    // TODO: Mejorar formato. Nota: QueryRaw previene el sql inyection
    return await prisma.$queryRaw`
    SELECT
        i.id_tipo_incidente as idTipoIncidente,
        ti.nombre AS nombreTipo,
        CAST(COUNT(i.id_tipo_incidente) AS CHAR) AS cantidad
    FROM
        incidente i
        INNER JOIN tipo_incidente ti ON ti.id_tipo_incidente = i.id_tipo_incidente
    WHERE
        (${idCentroPoblado} = 0 AND i.id_centro_poblado IS NULL)
        OR (${idCentroPoblado} = -1 OR i.id_centro_poblado = ${idCentroPoblado})
    GROUP BY
        i.id_tipo_incidente;
`
  }
}
