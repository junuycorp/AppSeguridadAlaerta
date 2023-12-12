import axios from 'axios'
import { envs } from '@ciudadano/configs'
import type { DatosEvento } from './registrar-evento.use-case'

export interface Incidente {
  idIncidente: number
  idDenunciante: string
  descripcion: string
  estado: 'PENDIENTE' | 'ATENDIDO' | 'ARCHIVADO' | 'DERIVADO'
  activo: boolean
  latitud: string
  longitud: string
  tipo: string
}

export interface CrearMultiplesArchivos {
  idIncidente: number
  categoria: 'DENUNCIA' | 'INFORME'
  rutasArchivos: string[]
}

const apiUrl = envs.SEGURIDAD_API

export const registrarEventoService = async (
  datos: DatosEvento,
): Promise<Incidente> => {
  const respuesta = await axios({
    method: 'post',
    baseURL: apiUrl,
    url: `/procesos/incidentes/registro-evento`,
    timeout: 15000,
    data: {
      idDenunciante: datos.codUsuario,
      descripcion: datos.descripcion,
      latitud: datos.latitud,
      longitud: datos.longitud,
      tipo: datos.tipo,
    },
  })

  const incidente = respuesta.data.datos as Incidente
  return incidente
}

export const crearMultiplesArchivos = async (
  datos: CrearMultiplesArchivos,
): Promise<number> => {
  const respuesta = await axios({
    method: 'post',
    baseURL: apiUrl,
    url: '/procesos/archivos/crear-multiple',
    timeout: 15000,
    data: {
      idIncidente: datos.idIncidente,
      categoria: datos.categoria,
      rutasArchivos: datos.rutasArchivos,
    },
  })
  const totalCreados = respuesta.data.totalCreados as number
  return totalCreados
}
