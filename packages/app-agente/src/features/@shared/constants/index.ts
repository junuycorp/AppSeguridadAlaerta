import path from 'node:path'

// Identificadores comunes
export const ID = {
  tipoDocumentoDNI: 1,
  tipoPersonaNatural: 1,
  nacionalidadPeru: 193,
} as const

export const VALUES = {
  sistemaPide: 'sistema-pide',
} as const

// Rutas de directorios
const srcPath = path.join(__dirname, '..', '..', '..')
export const PATHS = {
  uploads: path.join(srcPath, '..', '..', 'uploads'),
} as const
