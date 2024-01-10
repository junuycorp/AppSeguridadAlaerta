/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChatRepository } from '../chat.repository'
import type { CrearMensajeDto } from './crear-mensaje.dto'
import { IncidenteRepository } from '@agente/features/incidentes/incidentes.repository'
import { CustomError } from '@agente/errors'

export const crearMensajeUseCase = async (dto: CrearMensajeDto) => {
  try {
    const mensaje = await ChatRepository.crearMensaje(dto)
    return {
      mensaje: 'Creado correctamente',
      datos: mensaje,
    }
  } catch (error) {
    const incidente = await IncidenteRepository.buscarPorId(dto.idIncidente)
    if (incidente == null)
      throw CustomError.badRequest('idIncidente no se encuentra registrado')

    throw error
  }
}
