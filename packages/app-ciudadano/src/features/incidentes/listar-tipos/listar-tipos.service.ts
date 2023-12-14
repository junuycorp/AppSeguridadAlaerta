import axios from 'axios'
import { envs } from '@ciudadano/configs'

export interface TipoIncidente {
  idTipoIncidente: number
  nombre: string
  descripcion: string
  colorMarcador: string
}

const apiUrl = envs.SEGURIDAD_API

export const listarTiposService = async (): Promise<TipoIncidente[]> => {
  const respuesta = await axios({
    method: 'get',
    baseURL: apiUrl,
    url: `/procesos/incidentes/listar-tipos`,
    timeout: 15000,
  })

  const incidente = respuesta.data.datos as TipoIncidente[]
  return incidente
}
