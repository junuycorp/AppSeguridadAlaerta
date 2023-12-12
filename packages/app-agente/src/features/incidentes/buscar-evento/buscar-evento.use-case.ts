/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CustomError } from '@agente/errors'
import { IncidenteRepository } from '../incidentes.repository'
import {
  thumbnailFromImageToDisk,
  thumbnailFromVideoToDisk,
} from '@agente/shared/helpers'
import { uploadsPath } from '@agente/configs'

interface Archivo {
  idArchivo: number
  ruta: string
  tipo: string
  categoria: 'DENUNCIA' | 'INFORME'
  miniatura: string | null
}

const obtenerMiniatura = async (archivo: Archivo): Promise<string | undefined> => {
  if (archivo.tipo === 'imagen')
    return await thumbnailFromImageToDisk(archivo.ruta, uploadsPath)
  if (archivo.tipo === 'video')
    return await thumbnailFromVideoToDisk(archivo.ruta, uploadsPath)

  // Para archivos que no tienen miniatura
  return undefined
}

export const buscarEventoUseCase = async (idIncidente: number) => {
  const incidente = await IncidenteRepository.buscarPorId(idIncidente)

  if (incidente == null) throw CustomError.notFound('Incidente no encontrado')

  const archivos = incidente.archivoDigital as Archivo[]

  await Promise.all(
    archivos.map(async (archivo) => {
      const rutaMiniatura = await obtenerMiniatura(archivo)
      if (rutaMiniatura == null) {
        archivo.miniatura = null
        return
      }
      archivo.miniatura = rutaMiniatura
    }),
  )

  return incidente
}
