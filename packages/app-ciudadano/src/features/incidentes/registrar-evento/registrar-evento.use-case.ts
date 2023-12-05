import path from 'node:path'
import type { RegistrarEventoDto } from './registrar-evento.dto'
import {
  type Incidente,
  registrarEventoService,
  crearMultiplesArchivos,
} from './registrar-evento.service'
import {
  obtenerHoraActual,
  bufferToDisk,
  obtenerFechaActual,
} from '@ciudadano/shared/helpers'

export interface DatosEvento {
  codUsuario: string
  descripcion: string
  longitud: string
  latitud: string
  tipo: string
}

type Archivos = Express.Multer.File[] | undefined

export const registrarEventoUseCase = async (
  dto: RegistrarEventoDto,
  codUsuario: string,
  archivos: Archivos,
): Promise<Incidente> => {
  const datosEvento = {
    ...dto,
    codUsuario,
  }

  // Crear evento
  const incidente = await registrarEventoService(datosEvento)

  // Obtener parametros
  const fechaActual = obtenerFechaActual()
  const horaActual = obtenerHoraActual()

  const rutaRaiz = path.join(__dirname, '..', '..', '..', '..') // Raiz del proyecto
  const rutaUploads = path.join(rutaRaiz, '..', 'uploads')
  const rutaIncidente = path.join(fechaActual, `ID-${incidente.idIncidente}`)

  // Carpeta donde será guardado los archivos
  const nombreDirectorio = path.join(rutaUploads, rutaIncidente)

  // Guardar archivos en disco
  if (archivos != null) {
    const rutasArchivos: string[] = []
    archivos.forEach((archivo, index) => {
      const extension = path.extname(archivo.originalname)
      const numeracion = index.toString().padStart(2, '0')
      const nombreArchivo = `${horaActual}-${numeracion}${extension}`
      bufferToDisk(archivo.buffer, nombreDirectorio, nombreArchivo)
      rutasArchivos.push(path.join(rutaIncidente, nombreArchivo))
    })
    // Guardar rutas en BD
    await crearMultiplesArchivos({
      idIncidente: incidente.idIncidente,
      rutasArchivos,
    })
  }

  return incidente
}
