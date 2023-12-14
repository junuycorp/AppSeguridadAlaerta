import type { AsignarIncidenteDto } from './asignar-incidente.dto'
import { IncidenteRepository } from '@agente/features/incidentes/incidentes.repository'
import { CustomError } from '@agente/errors'
import {
  type IncidenteSerenoWithIncidente,
  SerenoRepository,
  UsuarioRepository,
} from '@agente/shared/repositories'
import type { Incidente } from '@agente/database'

export const asignarIncidenteUseCase = async (
  dto: AsignarIncidenteDto,
): Promise<[IncidenteSerenoWithIncidente, Incidente]> => {
  const { idIncidente, idSereno } = dto
  try {
    const incidenteSereno = await SerenoRepository.asignarIncidente(
      idSereno,
      idIncidente,
    )

    // Actualizar estado del incidente a "ASIGNADO"
    const incidente = await IncidenteRepository.actualizar(idIncidente, {
      estado: 'ASIGNADO',
    })

    return [incidenteSereno, incidente]
  } catch (error) {
    const incidenteSereno = await SerenoRepository.buscarIncidenteSerenoPorId(
      idSereno,
      idIncidente,
    )
    if (incidenteSereno != null)
      throw CustomError.conflict('Sereno ya se encuentra asignado al incidente')

    const incidente = await IncidenteRepository.buscarPorId(idIncidente)
    if (incidente == null) throw CustomError.notFound('Incidente no encontrado')

    const usuario = await UsuarioRepository.buscarPorId(idSereno)
    if (usuario == null) throw CustomError.notFound('Sereno no encontrado')

    throw error
  }
}
