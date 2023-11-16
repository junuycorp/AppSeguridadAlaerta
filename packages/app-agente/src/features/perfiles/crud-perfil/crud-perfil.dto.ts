import type { Flexible } from '@agente/shared/types'
import { toNumber } from '@agente/shared/helpers'

export interface EstadoPerfilDto {
  perfilCodigo: number
  estadoRegistro: boolean
}

export class CrudPerfilDto {
  private constructor(
    public perfilNombre?: string,
    public descripcion?: string,
    public icono?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, CrudPerfilDto?] {
    const { perfilNombre, descripcion, icono } = object as Flexible<CrudPerfilDto>

    if (perfilNombre == null) return ['Falta proporcionar nombre del perfil']

    return [undefined, new CrudPerfilDto(perfilNombre, descripcion, icono)]
  }

  static obtenerId(
    object: Record<string, string | number | undefined>,
  ): [string?, number?] {
    const perfilCodigo = object.perfilCodigo

    if (perfilCodigo == null) return ['Falta proporcionar código del perfil']

    return [undefined, toNumber(perfilCodigo, 'Código del perfil')]
  }

  static obtenerEstado(
    object: Record<string, unknown>,
  ): [string?, EstadoPerfilDto?] {
    const { perfilCodigo, estadoRegistro } = object as Flexible<EstadoPerfilDto>

    if (estadoRegistro == null) return ['Falta proporcionar estado']
    if (perfilCodigo == null) return ['Falta proporcionar perfilCodigo']

    return [
      undefined,
      { perfilCodigo: toNumber(perfilCodigo, 'Código del perfil'), estadoRegistro },
    ]
  }
}
