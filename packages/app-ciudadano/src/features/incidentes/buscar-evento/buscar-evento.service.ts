import axios from 'axios'
import { envs } from '@ciudadano/configs'

export interface IncidenteDetallado {
  idIncidente: number
  idDenunciante: string
  descripcion: string
  estado: string
  activo: boolean
  longitud: string
  latitud: string
  tipo: string
  fechaCreacion: string
  archivoDigital: ArchivoDigital[]
}

export interface ArchivoDigital {
  idArchivo: number
  ruta: string
  tipo: string
  miniatura: string | null
}

const apiUrl = envs.SEGURIDAD_API

export const buscarPorIdService = async (
  idIncidente: number,
): Promise<IncidenteDetallado> => {
  const respuesta = await axios({
    method: 'get',
    baseURL: apiUrl,
    url: `/procesos/incidentes/buscar/${idIncidente}`,
    timeout: 15000,
  })

  const incidente = respuesta.data as IncidenteDetallado
  return incidente
}
