// Identificadores comunes
export const ID = {
  tipoDocumentoDNI: 1,
  tipoPersonaNatural: 1,
  nacionalidadPeru: 193,
} as const

export const VALUES = {
  sistemaPide: 'sistema-pide',
} as const

export const ESTADOS_INCIDENTE = ['PENDIENTE', 'RECIBIDO', 'ASIGNADO', 'TERMINADO']
export const SUBESTADOS_INCIDENTE = [
  'ARCHIVADO',
  'DERIVADO',
  'DENUNCIADO',
  'ATENDIDO',
]
