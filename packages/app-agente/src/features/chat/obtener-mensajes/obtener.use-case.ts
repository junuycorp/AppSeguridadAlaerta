/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChatRepository } from '../chat.repository'
import type { ObtenerMensajeDto } from './obtener.dto'

export const obtenerMensajesUseCase = async (
  idIncidente: number,
  filtros: ObtenerMensajeDto,
) => {
  const mensajes = await ChatRepository.obtenerMensajePorIncidente(
    idIncidente,
    filtros,
  )
  return {
    total: mensajes.length,
    datos: mensajes,
  }
}
