import { validators } from '@agente/configs'
import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export interface EstadoUsuarioDto {
  nroDocumento: string
  estadoRegistro: boolean
}

export class CrudUsuarioDto {
  private constructor(
    public contrasena: string,
    public correo: string,
    public numeroCelular: string,
    public perfilCodigo: number,
    public preguntaSecreta?: string,
    public respuesta?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, CrudUsuarioDto?] {
    const {
      contrasena,
      correo,
      numeroCelular,
      perfilCodigo,
      preguntaSecreta,
      respuesta,
    } = object as Flexible<CrudUsuarioDto>

    if (contrasena == null) return ['Falta proporcionar contraseña']

    if (correo == null) return ['Falta proporcionar correo']
    if (!validators.correo.test(correo)) return ['Correo no es válido']

    if (numeroCelular == null) return ['Falta proporcionar numero de celular']
    if (!validators.numeroCelular.test(numeroCelular))
      return ['Número de celular no válido']

    if (perfilCodigo == null) return ['Falta proporcionar código del perfil']

    return [
      undefined,
      new CrudUsuarioDto(
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
    if (nroDocumento == null) return ['Falta proporcionar número de documento']
    if (!validators.numeroDocumento.test(nroDocumento))
      return ['Número de documento no válido']

    return [undefined, nroDocumento]
  }

  static obtenerEstado(
    object: Record<string, unknown>,
  ): [string?, EstadoUsuarioDto?] {
    const { nroDocumento, estadoRegistro } = object as Flexible<EstadoUsuarioDto>

    if (estadoRegistro == null) return ['Falta proporcionar estado']
    if (nroDocumento == null) return ['Falta proporcionar nroDocumento']
    if (!validators.numeroDocumento.test(nroDocumento))
      return ['Número de documento no válido']

    return [undefined, { nroDocumento, estadoRegistro }]
  }
}
