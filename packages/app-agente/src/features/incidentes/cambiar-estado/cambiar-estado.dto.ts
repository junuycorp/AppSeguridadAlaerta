import type { Flexible } from '@agente/shared/types'

export class CambiarEstadoDto {
  private constructor(public estado: string) {}

  static crear(object: Record<string, unknown>): [string?, CambiarEstadoDto?] {
    const { estado } = object as Flexible<CambiarEstadoDto>

    if (estado == null) return ['Falta proporcionar estado']

    const listaEstados = ['PENDIENTE', 'RECIBIDO', 'ASIGNADO', 'TERMINADO']
    if (!listaEstados.includes(estado)) return ['Estado no válido']

    return [undefined, new CambiarEstadoDto(estado)]
  }
}
