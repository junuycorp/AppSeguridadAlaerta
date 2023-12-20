/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ReporteRepository } from '../reportes.repository'

export const cronologiaEventoUseCase = async (
  estado?: string,
  idTipoIncidente?: number,
) => {
  return await ReporteRepository.obtenerCronologia(estado, idTipoIncidente)
}
