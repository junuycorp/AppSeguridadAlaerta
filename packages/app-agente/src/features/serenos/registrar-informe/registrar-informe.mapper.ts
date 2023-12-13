import type { Informe } from '@agente/database'
//
type RegistroInformeMapper = Omit<IInforme, 'fechaCreacion' | 'fechaModificacion'>

interface IArchivoDigital {
  idIncidente: number
  ruta: string
  tipo: string
  categoria: string
}

interface IInforme extends Informe {
  archivoDigital: IArchivoDigital[]
}

export const registrarInformeMapper = (informe: IInforme): RegistroInformeMapper => {
  const { fechaCreacion, fechaModificacion, ...rest } = informe
  return rest
}
