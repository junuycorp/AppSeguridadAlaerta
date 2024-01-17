import type { TipoComunicado } from '@ciudadano/shared/types'

export interface Comunicado {
  fechaCreacion: string | null
  idComunicado: number
  tipo: TipoComunicado
  mensaje: string
  idRemitente: string
}
