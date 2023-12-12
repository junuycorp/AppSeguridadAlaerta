import type { IncidenteSereno } from '@agente/database'
import type { AsignarIncidenteDto } from './asignar-incidente.dto'
import { SerenoRepository } from '../serenos.repository'
import { IncidenteRepository } from '@agente/features/incidentes/incidentes.repository'
import { CustomError } from '@agente/errors'
import { UsuarioRepository } from '@agente/shared/repositories'

export const asignarIncidenteUseCase = async (
  dto: AsignarIncidenteDto,
): Promise<IncidenteSereno> => {
  try {
    const incidenteSereno = await SerenoRepository.asignarIncidente(
      dto.idSereno,
      dto.idIncidente,
    )
    return incidenteSereno
  } catch (error) {
    const incidente = await IncidenteRepository.buscarPorId(dto.idIncidente)
    if (incidente == null) throw CustomError.notFound('Incidente no encontrado')

    const usuario = await UsuarioRepository.buscarPorId(dto.idSereno)
    if (usuario == null) throw CustomError.notFound('Sereno no encontrado')

    throw error
  }
}
