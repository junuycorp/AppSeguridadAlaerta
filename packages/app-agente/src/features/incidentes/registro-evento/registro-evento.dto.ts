import type { Flexible } from '@agente/shared/types'

export class RegistroEventoDto {
  private constructor(
    public idDenunciante: string,
    public descripcion: string,
    public longitud: string,
    public latitud: string,
    public tipo: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistroEventoDto?] {
    const { idDenunciante, descripcion, longitud, latitud, tipo } =
      object as Flexible<RegistroEventoDto>

    if (idDenunciante == null) return ['Falta proporcionar idDenunciante']
    if (descripcion == null) return ['Falta proporcionar descripcion']
    if (longitud == null) return ['Falta proporcionar longitud']
    if (latitud == null) return ['Falta proporcionar latitud']
    if (tipo == null) return ['Falta proporcionar tipo']

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
      new RegistroEventoDto(
        idDenunciante,
        descripcion,
        longitud,
        latitud,
        formatTipo,
      ),
    ]
  }
}
