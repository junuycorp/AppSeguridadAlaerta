/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CustomError } from '@agente/errors'
import { IncidenteRepository } from '../incidentes.repository'
import { PATHS } from '@agente/shared/constants'
import { thumbnailFromImage, thumbnailFromVideo } from '@agente/shared/helpers'
import path from 'path'

interface Archivo {
  idArchivo: number
  ruta: string
  tipo: string
  miniatura: Buffer | null
}

const rutaUploads = PATHS.uploads

const obtenerMiniatura = async (archivo: Archivo): Promise<Buffer | undefined> => {
  const rutaArchivo = path.join(rutaUploads, archivo.ruta)

  if (archivo.tipo === 'imagen') return await thumbnailFromImage(rutaArchivo)
  if (archivo.tipo === 'video') return await thumbnailFromVideo(rutaArchivo)

  // Para archivos que no tienen miniatura
  return undefined
}

export const buscarEventoUseCase = async (idIncidente: number) => {
  const incidente = await IncidenteRepository.buscarPorId(idIncidente)

  if (incidente == null) throw CustomError.notFound('Incidente no encontrado')

  const archivos = incidente.archivoDigital as Archivo[]

  await Promise.all(
    archivos.map(async (archivo) => {
      const buffer = await obtenerMiniatura(archivo)

      if (buffer == null) {
        archivo.miniatura = null
        return
      }
      archivo.miniatura = buffer
    }),
  )

  return incidente
}
