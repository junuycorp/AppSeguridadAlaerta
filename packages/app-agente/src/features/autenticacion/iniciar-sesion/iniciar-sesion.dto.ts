import { validators } from '@agente/configs'
// import { validarContrasenia } from '@agente/shared/helpers'

export class IniciarSesionDto {
  private constructor(
    public numeroDocumento: string,
    public contrasenia: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, IniciarSesionDto?] {
    const { numeroDocumento, contrasenia } = object as Partial<IniciarSesionDto>

    if (numeroDocumento == null) return ['Falta proporcionar número de documento']
    if (!validators.numeroDocumento.test(numeroDocumento))
      return ['Número de documento no válido']

    if (contrasenia == null) return ['Falta proporcionar contraseña']
    // const [esValido] = validarContrasenia(contrasenia)
    // if (!esValido) return ['Contraseña no válida']

    return [undefined, new IniciarSesionDto(numeroDocumento, contrasenia)]
  }
}
