import type { Incidente } from '@agente/database'
import { IncidenteRepository } from '../incidentes.repository'
import type { CambiarEstadoDto } from './cambiar-estado.dto'
import { CustomError } from '@agente/errors'
import type { EstadoIncidente, SubestadoIncidente } from '@agente/shared/types'

interface EstadoDto {
  estado: EstadoIncidente
  subestado: SubestadoIncidente | null
}

export const cambiarEstadoUseCase = async (
  id: number,
  dto: CambiarEstadoDto,
): Promise<Incidente> => {
  try {
    const { estado, subestado } = dto as EstadoDto

    let fechaObj

    if (estado === 'RECIBIDO') {
      fechaObj = { fechaRecepcion: new Date() }
    }
    if (estado === 'TERMINADO') {
      fechaObj = { fechaFinalizacion: new Date() }
    }

    const incidente = await IncidenteRepository.actualizar(id, {
      estado,
      subestado,
      ...fechaObj,
    })
    return incidente
  } catch (error) {
    const incidente = await IncidenteRepository.buscarPorId(id)
    if (incidente == null) throw CustomError.notFound('Incidente no encontrado')
    throw error
  }
}
