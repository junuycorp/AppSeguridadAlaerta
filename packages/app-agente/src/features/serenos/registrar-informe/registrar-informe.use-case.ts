import type { RegistrarInformeDto } from './registrar-informe.dto'
import { SerenoRepository } from '../serenos.repository'
import {
  bufferToDisk,
  getFileType,
  obtenerAnioMesActual,
  obtenerHoraActual,
} from '@agente/shared/helpers'
import { uploadsPath } from '@agente/configs'
import type { Incidente, Informe } from '@agente/database'
import path from 'node:path'
import {
  ArchivoRepository,
  CentroPobladoRepository,
  type CrearArchivo,
} from '@agente/shared/repositories'
import { IncidenteRepository } from '@agente/features/incidentes/incidentes.repository'
import { CustomError } from '@agente/errors'

type Archivos = Express.Multer.File[] | undefined

export const registrarInformeUseCase = async (
  dto: RegistrarInformeDto,
  idSereno: string,
  archivos: Archivos,
): Promise<[IInforme, Incidente]> => {
  const { idIncidente, idCentroPoblado, descripcion } = dto
  const informe = await SerenoRepository.registrarInforme(
    idSereno,
    idIncidente,
    descripcion,
  )

  // Cambiar estado a terminado
  let incidente: Incidente
  try {
    incidente = await IncidenteRepository.actualizar(idIncidente, {
      idCentroPoblado,
      estado: 'TERMINADO',
      fechaFinalizacion: new Date(),
    })
  } catch (error) {
    const centroPoblado = await CentroPobladoRepository.buscarPorId(idCentroPoblado)
    if (centroPoblado == null)
      throw CustomError.conflict('ID de centro poblado no existe')
    throw error
  }

  // MANIPULAR ARCHIVOS
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

  const informeRegistrado = {
    ...informe,
    archivoDigital: listaArchivos,
  }

  return [informeRegistrado, incidente]
}

interface IInforme extends Informe {
  archivoDigital: CrearArchivo[]
}
