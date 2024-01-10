/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { EstadoIncidente } from '@agente/shared/types'
import { ReporteRepository } from '../reportes.repository'

export const cronologiaEventoUseCase = async (
  estado?: EstadoIncidente,
  idTipoIncidente?: number,
) => {
  return await ReporteRepository.obtenerCronologia(estado, idTipoIncidente)
}
