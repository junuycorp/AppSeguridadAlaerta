/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { prisma, type $Enums } from '@agente/database'
import { formatDate } from '@agente/shared/helpers'
import type { Mensaje, Prisma } from '@prisma-agente/client'

export class ChatRepository {
  static crearMensaje = async (
    data: Prisma.MensajeUncheckedCreateInput,
  ): Promise<Mensaje> => {
    return await prisma.mensaje.create({ data })
  }

  static obtenerMensajePorIncidente = async (
    idIncidente: number,
    filtros: { estado?: $Enums.EstadoMensaje; tipoRemitente?: $Enums.TipoRemitente },
  ) => {
    const mensajes = await prisma.mensaje.findMany({
      where: {
        idIncidente,
        estado: { equals: filtros.estado },
        tipoRemitente: { equals: filtros.tipoRemitente },
      },
      orderBy: {
        fechaEnvio: 'desc',
      },
    })
    const formatMensajes = mensajes.map((mensaje) => ({
      ...mensaje,
      fechaEnvio: formatDate(mensaje.fechaEnvio),
    }))

    return formatMensajes
  }

  static obtenerMensajesPorDestinatario = async (
    idDestinatario: string,
    filtros: { estado?: $Enums.EstadoMensaje },
  ) => {
    const mensajes = await prisma.mensaje.findMany({
      where: {
        idDestinatario,
        estado: { equals: filtros.estado },
      },
      orderBy: {
        fechaEnvio: 'desc',
      },
    })
    const formatMensajes = mensajes.map((mensaje) => ({
      ...mensaje,
      fechaEnvio: formatDate(mensaje.fechaEnvio),
    }))

    return formatMensajes
  }
}
