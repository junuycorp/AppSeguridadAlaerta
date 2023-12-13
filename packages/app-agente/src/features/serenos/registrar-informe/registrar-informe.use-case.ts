import type { RegistrarInformeDto } from './registrar-informe.dto'
import { SerenoRepository } from '../serenos.repository'
import {
  bufferToDisk,
  getFileType,
  obtenerAnioMesActual,
  obtenerHoraActual,
} from '@agente/shared/helpers'
import { uploadsPath } from '@agente/configs'
import type { Informe } from '@agente/database'
import path from 'node:path'
import { ArchivoRepository, type CrearArchivo } from '@agente/shared/repositories'

type Archivos = Express.Multer.File[] | undefined

export const registrarInformeUseCase = async (
  dto: RegistrarInformeDto,
  idSereno: string,
  archivos: Archivos,
): Promise<IInforme> => {
  const { idIncidente, descripcion } = dto
  const informe = await SerenoRepository.registrarInforme(
    idSereno,
    idIncidente,
    descripcion,
  )

  // Obtener parametros
  const anioMesActual = obtenerAnioMesActual()
  const horaActual = obtenerHoraActual()

  const rutaInforme = path.join(anioMesActual, `ID-${informe.idIncidente}`)

  // Carpeta donde serán guardados los archivos
  const nombreDirectorio = path.join(uploadsPath, rutaInforme, 'informe')

  // Guardar archivos en disco
  const listaArchivos: CrearArchivo[] = []
  if (archivos != null) {
    archivos.forEach((archivo, index) => {
      const extension = path.extname(archivo.originalname)
      const numeracion = index.toString().padStart(2, '0')
      const nombreArchivo = `${horaActual}-${numeracion}${extension}`
      bufferToDisk(archivo.buffer, nombreDirectorio, nombreArchivo)
      listaArchivos.push({
        idIncidente,
        ruta: path.join(rutaInforme, 'informe', nombreArchivo),
        tipo: getFileType(nombreArchivo),
        categoria: 'INFORME',
      })
    })
    // Guardar rutas en BD
    await ArchivoRepository.crearMultiple(listaArchivos)
  }
  return {
    ...informe,
    archivoDigital: listaArchivos,
  }
}

interface IInforme extends Informe {
  archivoDigital: CrearArchivo[]
}
