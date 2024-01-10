import type { Incidente } from '@agente/database'
import { IncidenteRepository } from '../incidentes.repository'
import type { EstadoIncidente } from '@agente/shared/types'

export const listarUseCase = async (
  fechaInicio: Date = new Date('2023-01-01'),
  fechaFin: Date = new Date('2100-01-01'),
  idTipoIncidente?: number,
  estado?: EstadoIncidente,
): Promise<Incidente[]> => {
  const incidentes = await IncidenteRepository.listarConFiltros(
    fechaInicio,
    fechaFin,
    idTipoIncidente,
    estado,
  )
  return incidentes
}

export const listarPorDenuncianteUseCase = async (
  idDenunciante: string,
  nroDenuncias: number = 5,
  estado: EstadoIncidente | undefined = undefined,
): Promise<Incidente[]> => {
  const incidentes = await IncidenteRepository.listarPorDenunciante(
    idDenunciante,
    nroDenuncias,
    estado,
  )
  return incidentes
}
