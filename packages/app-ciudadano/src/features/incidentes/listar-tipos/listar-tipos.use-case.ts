import { type TipoIncidente, listarTiposService } from './listar-tipos.service'

export const listarTiposUseCase = async (): Promise<TipoIncidente[]> => {
  return await listarTiposService()
}
