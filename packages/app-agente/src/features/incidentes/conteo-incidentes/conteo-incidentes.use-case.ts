import { IncidenteRepository } from '../incidentes.repository'
/**
 * @param idCentroPoblado
 * @values
 * -1: Lista todos
 * 0: Lista solo que tengan null
 * 1,2,3... : Id de centro poblado
 */

export const conteoIncidentesUseCase = async (
  idCentroPoblado: number = -1,
): Promise<unknown> => {
  const respuesta =
    await IncidenteRepository.NroTipoIncidentesPorCentroPoblado(idCentroPoblado)

  // respuesta.map()
  return respuesta
}
