import type { Mensaje } from '@agente/database'
import { ChatRepository } from '../chat.repository'
import type { CrearMensajeDto } from './crear-mensaje.dto'
import { IncidenteRepository } from '@agente/features/incidentes/incidentes.repository'
import { CustomError } from '@agente/errors'

export const crearMensajeUseCase = async (
  dto: CrearMensajeDto,
): Promise<Mensaje> => {
  try {
    return await ChatRepository.crearMensaje(dto)
  } catch (error) {
    const incidente = await IncidenteRepository.buscarPorId(dto.idIncidente)
    if (incidente == null)
      throw CustomError.badRequest('idIncidente no se encuentra registrado')

    throw error
  }
}
