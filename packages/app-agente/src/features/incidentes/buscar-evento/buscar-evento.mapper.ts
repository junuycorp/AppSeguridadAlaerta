import { formatDate } from '@agente/shared/helpers'
import type { Incidente } from '@agente/database'
import { envs } from '@agente/configs'
import path from 'node:path'

interface ArchivoDigital {
  idArchivo: number
  ruta: string
  tipo: string
  miniatura?: string | null
}

interface BuscarEventoMapper
  extends Omit<Incidente, 'fechaModificacion' | 'fechaCreacion'> {
  fechaCreacion: string
  archivoDigital: ArchivoDigital[]
}

interface IIncidente extends Incidente {
  archivoDigital: ArchivoDigital[]
}

export const buscarEventoMapper = (incidente: IIncidente): BuscarEventoMapper => {
  const { fechaModificacion, archivoDigital, ...rest } = incidente

  const archivos = archivoDigital.map((archivo) => ({
    ...archivo,
    ruta: path.join(envs.UPLOADS_PATH, archivo.ruta),
  }))

  return {
    ...rest,
    fechaCreacion: formatDate(incidente.fechaCreacion),
    archivoDigital: archivos,
  }
}
