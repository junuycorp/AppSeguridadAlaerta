import type { Flexible } from '@ciudadano/shared/types'

export class RegistrarEventoDto {
  private constructor(
    public descripcion: string,
    public longitud: string,
    public latitud: string,
    public tipo: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistrarEventoDto?] {
    const { descripcion, longitud, latitud, tipo } =
      object as Flexible<RegistrarEventoDto>

    if (descripcion == null || descripcion === '')
      return ['Falta proporcionar descripcion']
    if (longitud == null || longitud === '') return ['Falta proporcionar longitud']
    if (latitud == null || latitud === '') return ['Falta proporcionar latitud']
    if (tipo == null || tipo === '') return ['Falta proporcionar tipo']

    const formatTipo = tipo.toUpperCase()
    const tiposValidos = [
      'ACCIDENTE',
      'SUBIDA DE RIO',
      'VIOLENCIA FAMILIAR',
      'RIESGO',
      'ROBO',
    ]
    if (!tiposValidos.includes(formatTipo)) return ['Tipo no válido']

    return [
      undefined,
      new RegistrarEventoDto(descripcion, longitud, latitud, formatTipo),
    ]
  }
}
