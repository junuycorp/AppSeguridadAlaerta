import { IncidenteRepository } from '../incidentes.repository'

interface Sereno {
  idSereno: string
  razonSocial: string
  nombres: string | null
  apellidoPaterno: string | null
  apellidoMaterno: string | null
}

export const listarSerenosUseCase = async (): Promise<Sereno[]> => {
  const serenos = await IncidenteRepository.listarSerenosActivos()
  return serenos
}
