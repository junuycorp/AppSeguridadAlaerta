/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Estado } from '@agente/shared/types'
import { ReporteRepository } from '../reportes.repository'

export const cronologiaEventoUseCase = async (
  estado?: Estado,
  idTipoIncidente?: number,
) => {
  return await ReporteRepository.obtenerCronologia(estado, idTipoIncidente)
}
