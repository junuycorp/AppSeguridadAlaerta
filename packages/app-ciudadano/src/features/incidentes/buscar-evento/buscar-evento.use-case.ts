import { type IncidenteDetallado, buscarPorIdService } from './buscar-evento.service'

export const buscarEventoUseCase = async (
  idIncidente: number,
): Promise<IncidenteDetallado> => {
  const incidente = await buscarPorIdService(idIncidente)
  return incidente
}
