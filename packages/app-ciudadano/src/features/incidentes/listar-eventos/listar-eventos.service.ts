import axios from 'axios'
import { envs } from '@ciudadano/configs'
import type { EstadoIncidente } from '@ciudadano/shared/types'

export interface Incidente {
  idIncidente: number
  idTipoIncidente: number
  idCentroPoblado: number | null
  descripcion: string
  estado: EstadoIncidente
  subestado: null
  longitud: string
  latitud: string
  fechaRecepcion: string | null
  fechaFinalizacion: string | null
  fechaCreacion: string
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
    url: `/conexion/incidentes/listar/${idDenunciante}`,
    timeout: 15000,
    params: {
      tamanio,
      estado,
    },
  })

  const incidente = respuesta.data.datos as Incidente[]
  return incidente
}
