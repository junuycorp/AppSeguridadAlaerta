import {
  type Incidente,
  listarEventoPorDenuncianteService,
} from './listar-eventos.service'

export const listarPorDenuncianteUseCase = async (
  idDenunciante: string,
  tamanio: number | undefined = 5,
  estado: string | undefined = undefined,
): Promise<Incidente[]> => {
  const incidentes = await listarEventoPorDenuncianteService(
    idDenunciante,
    tamanio,
    estado,
  )

  return incidentes
}
