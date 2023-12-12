import axios from 'axios'
import { envs } from '@ciudadano/configs'
import type { EstadoIncidente } from '@ciudadano/shared/types'

export interface Incidente {
  idIncidente: number
  idDenunciante: string
  descripcion: string
  estado: EstadoIncidente
  activo: boolean
  latitud: string
  longitud: string
  tipo: string
}

const apiUrl = envs.SEGURIDAD_API

export const listarEventoPorDenuncianteService = async (
  idDenunciante: string,
  tamanio: number | undefined,
  estado: string | undefined,
): Promise<Incidente[]> => {
  const respuesta = await axios({
    method: 'get',
    baseURL: apiUrl,
    url: `/procesos/incidentes/listar/${idDenunciante}`,
    timeout: 15000,
    params: {
      tamanio,
      estado,
    },
  })

  const incidente = respuesta.data.datos as Incidente[]
  return incidente
}
