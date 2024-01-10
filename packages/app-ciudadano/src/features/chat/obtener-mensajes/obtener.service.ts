import axios from 'axios'
import { envs } from '@ciudadano/configs'
import type { Mensaje, OutputObtenerMensajes } from './obtener.interface'
import type { ObtenerMensajeDto } from './obtener.dto'

const apiUrl = envs.SEGURIDAD_API

export const obtenerMensajesService = async (
  idIncidente: number,
  filtros: ObtenerMensajeDto,
): Promise<Mensaje[]> => {
  const { data } = await axios<OutputObtenerMensajes>({
    method: 'get',
    params: filtros,
    baseURL: apiUrl,
    url: `/conexion/mensajes/${idIncidente}`,
    timeout: 15000,
  })

  const { datos } = data
  return datos
}
