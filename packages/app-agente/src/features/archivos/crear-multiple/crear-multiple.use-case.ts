import { ArchivoRepository } from '../archivos.repository'
import type { CrearRutasDto } from './crear-multiple.dto'

export const crearMultipleUseCase = async (dto: CrearRutasDto): Promise<number> => {
  const { idIncidente, rutasArchivos } = dto
  const listaArchivos = rutasArchivos.map((ruta) => ({
    idIncidente,
    ruta,
  }))
  const totalCreados = await ArchivoRepository.crearMultiple(listaArchivos)
  return totalCreados
}
