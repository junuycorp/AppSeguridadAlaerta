import { ESTADOS_INCIDENTE, SUBESTADOS_INCIDENTE } from '@agente/shared/constants'
import type { Flexible } from '@agente/shared/types'

export class CambiarEstadoDto {
  private constructor(
    public estado: string,
    public subestado?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, CambiarEstadoDto?] {
    const { estado, subestado } = object as Flexible<CambiarEstadoDto>

    if (estado == null) return ['Falta proporcionar estado']

    // const listaEstados = ['PENDIENTE', 'RECIBIDO', 'ASIGNADO', 'TERMINADO']
    if (!ESTADOS_INCIDENTE.includes(estado)) return ['Estado no válido']

    if (['PENDIENTE', 'RECIBIDO', 'ASIGNADO'].includes(estado) && subestado != null)
      return ['Subestado no válido']

    if (
      estado === 'TERMINADO' &&
      (subestado == null || !SUBESTADOS_INCIDENTE.includes(subestado))
    )
      return ['Subestado no válido']

    return [undefined, new CambiarEstadoDto(estado, subestado)]
  }
}
