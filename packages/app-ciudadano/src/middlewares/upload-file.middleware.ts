import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'
import { obtenerFechaActual } from '@ciudadano/shared/helpers'

// Directorio donde se guardarán los archivos
const directorioBase = path.join('..', 'uploads')

// Configuración de multer para guardar en Disco
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fechaActual = obtenerFechaActual()
    const carpetaDestino = path.join(directorioBase, fechaActual)

    // Verificar si la carpeta de destino existe, y créala si no
    if (!fs.existsSync(carpetaDestino)) {
      fs.mkdirSync(carpetaDestino, { recursive: true })
    }

    cb(null, carpetaDestino)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  },
})

// Configuración para guardar en RAM
const memoryStorage = multer.memoryStorage()

export const uploadDisk = multer({ storage: diskStorage })

export const uploadMemory = multer({
  storage: memoryStorage,
  // limits: {
  //   fieldSize: 1024 * 1024 * 60, // Limite de 30MB
  // },
})
