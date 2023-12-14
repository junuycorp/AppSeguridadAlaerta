import { toNumber } from '@ciudadano/shared/helpers'
import type { Flexible } from '@ciudadano/shared/types'

export class RegistrarEventoDto {
  private constructor(
    public descripcion: string,
    public idTipoIncidente: number,
    public longitud: string,
    public latitud: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistrarEventoDto?] {
    const { descripcion, longitud, latitud, idTipoIncidente } =
      object as Flexible<RegistrarEventoDto>

    if (descripcion == null || descripcion === '')
      return ['Falta proporcionar descripcion']
    if (longitud == null || longitud === '') return ['Falta proporcionar longitud']
    if (latitud == null || latitud === '') return ['Falta proporcionar latitud']

    return [
      undefined,
      new RegistrarEventoDto(
        descripcion,
        toNumber(idTipoIncidente, 'ID del tipo incidente'),
        longitud,
        latitud,
      ),
    ]
  }
}
