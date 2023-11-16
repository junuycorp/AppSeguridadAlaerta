import { validators } from '@ciudadano/configs'
import { validarContrasenia } from '@ciudadano/shared/helpers'

export class RegistrarDto {
  private constructor(
    public numeroDocumento: string,
    public correo: string,
    public contrasenia: string,
    public numeroCelular: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistrarDto?] {
    const { numeroDocumento, correo, contrasenia, numeroCelular } =
      object as Partial<RegistrarDto>

    if (numeroDocumento == null) return ['Falta proporcionar número de documento']
    if (!validators.numeroDocumento.test(numeroDocumento))
      return ['Número de documento no válido']

    if (correo == null) return ['Falta proporcionar correo']
    if (!validators.correo.test(correo)) return ['correo no válido']

    if (numeroCelular == null) return ['Falta proporcionar numero de celular']
    if (!validators.numeroCelular.test(numeroCelular))
      return ['Numero de celular no válido']

    // Validación contraseña
    if (contrasenia == null) return ['Falta proporcionar contraseña']
    const [esValido, mensaje] = validarContrasenia(contrasenia)
    if (!esValido) return [mensaje]

    return [
      undefined,
      new RegistrarDto(numeroDocumento, correo, contrasenia, numeroCelular),
    ]
  }
}
