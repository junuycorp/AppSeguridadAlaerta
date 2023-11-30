import type { Flexible } from '@agente/shared/types'

export class RegistroEventoDto {
  private constructor(
    public idDenunciante: string,
    public descripcion: string,
    public longitud: string,
    public latitud: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistroEventoDto?] {
    const { idDenunciante, descripcion, longitud, latitud } =
      object as Flexible<RegistroEventoDto>

    if (idDenunciante == null) return ['Falta proporcionar idDenunciante']
    if (descripcion == null) return ['Falta proporcionar descripcion']
    if (longitud == null) return ['Falta proporcionar longitud']
    if (latitud == null) return ['Falta proporcionar latitud']

    return [
      undefined,
      new RegistroEventoDto(idDenunciante, descripcion, longitud, latitud),
    ]
  }
}
