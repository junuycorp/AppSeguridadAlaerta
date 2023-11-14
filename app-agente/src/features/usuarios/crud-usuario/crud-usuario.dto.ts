import { toNumber } from '@shared/helpers'
import type { Flexible } from '@shared/types'

export interface EstadoUsuarioDto {
  nroDocumento: string
  estadoRegistro: boolean
}

export class CrudUsuarioDto {
  private constructor(
    public nroDocumento: string,
    public contrasena: string,
    public correo: string,
    public numeroCelular: string,
    public perfilCodigo: number,
    public preguntaSecreta?: string,
    public respuesta?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, CrudUsuarioDto?] {
    const {
      nroDocumento,
      contrasena,
      correo,
      numeroCelular,
      perfilCodigo,
      preguntaSecreta,
      respuesta,
    } = object as Flexible<CrudUsuarioDto>

    if (nroDocumento == null) return ['Falta proporcionar nroDocumento']
    if (contrasena == null) return ['Falta proporcionar contraseña']
    if (correo == null) return ['Falta proporcionar correo']
    if (numeroCelular == null) return ['Falta proporcionar numero de celular']
    if (perfilCodigo == null) return ['Falta proporcionar código del perfil']

    return [
      undefined,
      new CrudUsuarioDto(
        nroDocumento,
        contrasena,
        correo,
        numeroCelular,
        toNumber(perfilCodigo, 'Perfil código'),
        preguntaSecreta,
        respuesta,
      ),
    ]
  }

  static obtenerId(object: Record<string, string | undefined>): [string?, string?] {
    const nroDocumento = object.nroDocumento
    if (nroDocumento == null) return ['Falta proporcionar ID']
    return [undefined, nroDocumento]
  }

  static obtenerEstado(
    object: Record<string, unknown>,
  ): [string?, EstadoUsuarioDto?] {
    const { nroDocumento, estadoRegistro } = object as Flexible<EstadoUsuarioDto>

    if (estadoRegistro == null) return ['Falta proporcionar estado']
    if (nroDocumento == null) return ['Falta proporcionar nroDocumento']

    return [undefined, { nroDocumento, estadoRegistro }]
  }
}
