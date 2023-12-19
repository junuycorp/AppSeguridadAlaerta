/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { AsignarIncidenteDto } from './asignar-incidente.dto'
import { SerenoRepository } from '@agente/shared/repositories'

export const asignarIncidenteUseCase = async (dto: AsignarIncidenteDto) => {
  const { idIncidente, listaSerenos } = dto
  const incidenteSereno = await SerenoRepository.asignarSerenos(
    idIncidente,
    listaSerenos,
  )
  return incidenteSereno
}
