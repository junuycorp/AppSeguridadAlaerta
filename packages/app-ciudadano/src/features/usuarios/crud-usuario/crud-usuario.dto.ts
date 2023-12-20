import { validators } from '@ciudadano/configs'
import { toNumber } from '@ciudadano/shared/helpers'
import type { Flexible } from '@ciudadano/shared/types'

export interface EstadoUsuarioDto {
  nroDocumento: string
  estadoRegistro: boolean
}

export class CrudUsuarioDto {
  private constructor(
    public nroDocumento: string,
    public contrasena: string | undefined,
    public nombres: string,
    public apellidoPaterno: string,
    public apellidoMaterno: string,
    public sexo: string,
    public perfilCodigo: number,
    public correo: string,
    public numeroCelular: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, CrudUsuarioDto?] {
    const {
      nroDocumento,
      contrasena,
      nombres,
      apellidoMaterno,
      apellidoPaterno,
      sexo,
      perfilCodigo,
      correo,
      numeroCelular,
    } = object as Flexible<CrudUsuarioDto>

    if (nroDocumento == null) return ['Falta proporcionar número de documento']
    if (!validators.dni.test(nroDocumento))
      return ['Número de documento no es válido']

    // if (contrasena == null) return ['Falta proporcionar contraseña']
    // const [esValido, mensaje] = validarContrasenia(contrasena)
    // if (!esValido && mensaje != null) return [mensaje]

    if (nombres == null) return ['Falta proporcionar nombres']
    if (apellidoMaterno == null) return ['Falta proporcionar apellido paterno']
    if (apellidoPaterno == null) return ['Falta proporcionar apellido materno']

    if (sexo == null) return ['Falta proporcionar sexo']
    if (!['M', 'F'].includes(sexo)) return ['Sexo no es válido']

    if (perfilCodigo == null) return ['Falta proporcionar el código del perfil']

    if (correo == null) return ['Falta proporcionar correo']
    if (!validators.correo.test(correo)) return ['Correo no es válido']

    if (numeroCelular == null) return ['Falta proporcionar número de celular']
    if (!validators.numeroCelular.test(numeroCelular))
      return ['Numero de celular no válido']

    return [
      undefined,
      new CrudUsuarioDto(
        nroDocumento,
        contrasena,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        sexo,
        toNumber(perfilCodigo, 'Código de perfil'),
        correo,
        numeroCelular,
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
