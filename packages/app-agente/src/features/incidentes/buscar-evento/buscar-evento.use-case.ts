import { IncidenteRepository } from '../incidentes.repository'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const buscarEventoUseCase = async (idIncidente: number) => {
  const incidente = await IncidenteRepository.buscarPorId(idIncidente)

  return incidente
}
