import { validators } from '@/configs'

export class ConsultaPersonaDto {
  private constructor(public numeroDocumento: string) {}

  static crear(object: Record<string, unknown>): [string?, ConsultaPersonaDto?] {
    const numeroDocumento = object.numeroDocumento as string | undefined

    if (numeroDocumento == null) return ['Falta proporcionar número de documento']
    if (!validators.numeroDocumento.test(numeroDocumento))
      return ['Número de documento no válido']

    return [undefined, new ConsultaPersonaDto(numeroDocumento)]
  }
}
