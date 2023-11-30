import type { Incidente } from '@prisma-agente/client'
import { IncidenteRepository } from '../incidentes.repository'
import type { RegistroEventoDto } from './registro-evento.dto'

export const registroEventoUseCase = async (
  dto: RegistroEventoDto,
): Promise<Incidente> => {
  const incidente = await IncidenteRepository.crear(dto)
  return incidente
}
