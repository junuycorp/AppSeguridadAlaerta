import type { Incidente } from '@agente/database'
import { IncidenteRepository } from '../incidentes.repository'
import type { Estado, Tipo } from '@agente/shared/types'

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

export const listarPorDenuncianteUseCase = async (
  idDenunciante: string,
  nroDenuncias: number = 5,
  estado: Estado | undefined = undefined,
): Promise<Incidente[]> => {
  const incidentes = await IncidenteRepository.listarPorDenunciante(
    idDenunciante,
    nroDenuncias,
    estado,
  )
  return incidentes
}
