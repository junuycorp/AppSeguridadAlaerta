import type { CentroPoblado } from '@agente/database'
import { CentroPobladoRepository } from '../centros-poblados.repository'

export const listarUseCase = async (): Promise<CentroPoblado[]> => {
  return await CentroPobladoRepository.listar()
}
