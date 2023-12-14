import type { TipoIncidente } from '@agente/database'
import { IncidenteRepository } from '../incidentes.repository'

export const listarTiposUseCase = async (): Promise<TipoIncidente[]> => {
  return await IncidenteRepository.listarTipos()
}
