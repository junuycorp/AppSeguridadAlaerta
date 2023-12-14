import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class RegistroEventoDto {
  private constructor(
    public idDenunciante: string,
    public idTipoIncidente: number,
    public descripcion: string,
    public longitud: string,
    public latitud: string,
  ) {}

  static crear(object: Record<string, unknown>): [string?, RegistroEventoDto?] {
    const { idDenunciante, idTipoIncidente, descripcion, longitud, latitud } =
      object as Flexible<RegistroEventoDto>

    if (idDenunciante == null) return ['Falta proporcionar idDenunciante']
    if (idTipoIncidente == null) return ['Falta proporcionar tipo de incidente']
    if (descripcion == null) return ['Falta proporcionar descripcion']
    if (longitud == null) return ['Falta proporcionar longitud']
    if (latitud == null) return ['Falta proporcionar latitud']

    return [
      undefined,
      new RegistroEventoDto(
        idDenunciante,
        toNumber(idTipoIncidente, 'ID de tipo de incidente'),
        descripcion,
        longitud,
        latitud,
      ),
    ]
  }
}
