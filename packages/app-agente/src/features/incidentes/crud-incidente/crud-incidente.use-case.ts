import type { Incidente } from '@agente/database'
import { IncidenteRepository } from '../incidentes.repository'

export const listarUseCase = async (): Promise<Incidente[]> => {
  const incidentes = await IncidenteRepository.listar()
  return incidentes
}
