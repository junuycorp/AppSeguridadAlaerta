import { formatDate } from '@agente/shared/helpers'
import type { Incidente } from '@agente/database'
import { envs } from '@agente/configs'

interface ArchivoDigital {
  idArchivo: number
  ruta: string
  tipo: string
  categoria: string // 'INFORME' | 'DENUNCIA'
  miniatura?: string | null
}

interface BuscarEventoMapper
  extends Omit<
    Incidente,
    'fechaRecepcion' | 'fechaCreacion' | 'fechaFinalizacion' | 'fechaAsignacion'
  > {
  fechaCreacion: string
  fechaRecepcion: string | null
  fechaAsignacion: string | null
  fechaFinalizacion: string | null
  archivoDigital: ArchivoDigital[]
}

interface IIncidente extends Incidente {
  archivoDigital: ArchivoDigital[]
}

export const buscarEventoMapper = (incidente: IIncidente): BuscarEventoMapper => {
  const {
    archivoDigital,
    fechaCreacion,
    fechaAsignacion,
    fechaFinalizacion,
    fechaRecepcion,
    ...rest
  } = incidente

  const archivos = archivoDigital.map((archivo) => ({
    ...archivo,
    ruta: envs.UPLOADS_PATH + '/' + archivo.ruta,
  }))

  return {
    ...rest,
    fechaCreacion: formatDate(fechaCreacion)!,
    fechaRecepcion: formatDate(fechaRecepcion),
    fechaAsignacion: formatDate(fechaAsignacion),
    fechaFinalizacion: formatDate(fechaFinalizacion),
    archivoDigital: archivos,
  }
}
