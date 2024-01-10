import axios from 'axios'
import { envs } from '@ciudadano/configs'

export interface InputCrearMensaje {
  idIncidente: number
  idRemitente: string
  idDestinatario: string
  tipoRemitente: 'sereno' | 'ciudadano'
  mensaje: string
  estado: 'ENVIADO' | 'RECIBIDO' | 'LEIDO'
}

const apiUrl = envs.SEGURIDAD_API

export const crearMensajeService = async (
  datos: InputCrearMensaje,
): Promise<void> => {
  await axios({
    method: 'post',
    baseURL: apiUrl,
    url: `/conexion/mensajes/crear`,
    timeout: 15000,
    data: datos,
  })
}
