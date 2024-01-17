import { ComunicadoRepository } from '../comunicados.repository'
import { type Comunicado } from '@agente/database'

export const listarComunicadosUseCase = async (): Promise<Comunicado[]> => {
  const comuicados = await ComunicadoRepository.listar()
  return comuicados
}
