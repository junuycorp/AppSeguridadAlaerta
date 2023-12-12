import { toNumber } from '@agente/shared/helpers'
import type { Flexible } from '@agente/shared/types'

export class CrearRutasDto {
  private constructor(
    public idIncidente: number,
    public categoria: string, // Valores: INFORME, DENUNCIA
    public rutasArchivos: string[],
  ) {}

  static crear(object: Record<string, unknown>): [string?, CrearRutasDto?] {
    const { idIncidente, categoria, rutasArchivos } =
      object as Flexible<CrearRutasDto>

    if (idIncidente == null) return ['Falta proporcionar ID del incidente']
    if (categoria == null) return ['Falta proporcionar categoría']
    if (!['INFORME', 'DENUNCIA'].includes(categoria)) return ['Categoría no válida']

    if (rutasArchivos == null) return ['Falta proporcionar lista de archivos']

    return [
      undefined,
      new CrearRutasDto(
        toNumber(idIncidente, 'ID de incidente'),
        categoria,
        rutasArchivos,
      ),
    ]
  }
}
