/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Estado } from '@agente/shared/types'
import { SerenoRepository } from '../serenos.repository'

export const listarIncidentesPorSerenoUseCase = async (
  idSereno: string,
  estado: Estado | undefined = undefined,
  tamanio: number = 10,
) => {
  const incidentes = await SerenoRepository.listarIncidentesPorSereno(
    idSereno,
    estado,
    tamanio,
  )
  return incidentes
}
