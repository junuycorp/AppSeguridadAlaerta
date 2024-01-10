export interface OutputObtenerMensajes {
  total: number
  datos: Mensaje[]
}

export interface Mensaje {
  idMensaje: number
  idIncidente: number
  idRemitente: string
  idDestinatario: string
  tipoRemitente: TipoRemitente
  mensaje: string
  estado: Estado
  fechaEnvio: string
}

export enum Estado {
  Enviado = 'ENVIADO',
  Recibido = 'RECIBIDO',
}

export enum TipoRemitente {
  Ciudadano = 'ciudadano',
  Sereno = 'sereno',
}
