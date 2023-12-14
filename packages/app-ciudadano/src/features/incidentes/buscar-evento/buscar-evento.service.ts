import axios from 'axios'
import { envs } from '@ciudadano/configs'

export interface IncidenteDetallado {
  idIncidente: number
  idDenunciante: string
  idTipoIncidente: number
  idCentroPoblado: number | null
  descripcion: string
  estado: string
  subestado: string | null
  activo: boolean
  longitud: string
  latitud: string
  fechaCreacion: string
  fechaRecepcion: null | string
  fechaFinalizacion: null | string
  archivoDigital: ArchivoDigital[]
}

export interface ArchivoDigital {
  idArchivo: number
  ruta: string
  tipo: string
  categoria: string
  miniatura: null | string
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
