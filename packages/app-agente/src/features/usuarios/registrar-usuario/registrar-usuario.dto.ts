import { validators } from '@agente/configs'
import { toNumber, validarContrasenia } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class RegistrarUsuarioDto {
  private constructor(
    public nroDocumento: string,
    public contrasena: string,
    public nombres: string,
    public apellidoMaterno: string,
    public apellidoPaterno: string,
    public sexo: string,
    public perfilCodigo: number,
    public correo?: string,
    public numeroCelular?: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistrarUsuarioDto?] {
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
    } = object as Flexible<RegistrarUsuarioDto>

    if (nroDocumento == null) return ['Falta proporcionar número de documento']
    if (!validators.dni.test(nroDocumento))
      return ['Número de documento no es válido']

    if (contrasena == null) return ['Falta proporcionar contraseña']
    const [esValido, mensaje] = validarContrasenia(contrasena)
    if (!esValido) return [mensaje]

    if (nombres == null) return ['Falta proporcionar nombres']
    if (apellidoMaterno == null) return ['Falta proporcionar apellido paterno']
    if (apellidoPaterno == null) return ['Falta proporcionar apellido materno']

    if (sexo == null) return ['Falta proporcionar sexo']
    if (!['M', 'F'].includes(sexo)) return ['Sexo no es válido']

    if (perfilCodigo == null) return ['Falta proporcionar el código del perfil']

    if (correo != null && !validators.correo.test(correo))
      return ['Correo no es válido']
    if (numeroCelular != null && !validators.numeroCelular.test(numeroCelular))
      return ['Numero de celular no válido']

    return [
      undefined,
      new RegistrarUsuarioDto(
        nroDocumento,
        contrasena,
        nombres,
        apellidoMaterno,
        apellidoPaterno,
        sexo,
        toNumber(perfilCodigo, 'Código de perfil'),
        correo,
        numeroCelular,
      ),
    ]
  }
}
