import type { Incidente } from '@agente/database'
import {
  type Estado,
  type Tipo,
  IncidenteRepository,
} from '../incidentes.repository'

export const listarUseCase = async (
  fechaInicio: Date = new Date('2023-01-01'),
  fechaFin: Date = new Date('2100-01-01'),
  tipo: Tipo | undefined = undefined,
  estado: Estado | undefined = undefined,
): Promise<Incidente[]> => {
  const incidentes = await IncidenteRepository.listarConFiltros(
    fechaInicio,
    fechaFin,
    tipo,
    estado,
  )
  return incidentes
}
