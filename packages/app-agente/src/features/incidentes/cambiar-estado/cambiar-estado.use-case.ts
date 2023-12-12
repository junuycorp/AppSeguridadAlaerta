import type { Incidente } from '@agente/database'
import { IncidenteRepository } from '../incidentes.repository'
import type { CambiarEstadoDto } from './cambiar-estado.dto'
import { CustomError } from '@agente/errors'

export const cambiarEstadoUseCase = async (
  id: number,
  dto: CambiarEstadoDto,
): Promise<Incidente> => {
  try {
    const incidente = await IncidenteRepository.actualizar(id, dto)
    return incidente
  } catch (error) {
    const incidente = await IncidenteRepository.buscarPorId(id)
    if (incidente == null) throw CustomError.notFound('Incidente no encontrado')
    throw error
  }
}
