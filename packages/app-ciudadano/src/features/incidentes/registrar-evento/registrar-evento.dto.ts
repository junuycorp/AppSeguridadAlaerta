import type { Flexible } from '@ciudadano/shared/types'

export class RegistrarEventoDto {
  private constructor(
    public descripcion: string,
    public longitud: string,
    public latitud: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistrarEventoDto?] {
    const { descripcion, longitud, latitud } = object as Flexible<RegistrarEventoDto>

    if (descripcion == null) return ['Falta proporcionar descripcion']
    if (longitud == null) return ['Falta proporcionar longitud']
    if (latitud == null) return ['Falta proporcionar latitud']

    return [undefined, new RegistrarEventoDto(descripcion, longitud, latitud)]
  }
}
