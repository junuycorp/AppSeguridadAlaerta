/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { ObtenerMensajeDto } from './obtener.dto'
import { obtenerMensajesService } from './obtener.service'

export const obtenerMensajesUseCase = async (
  idIncidente: number,
  filtros: ObtenerMensajeDto,
) => {
  const mensajes = await obtenerMensajesService(idIncidente, filtros)
  return {
    total: mensajes.length,
    datos: mensajes,
  }
}
