import fs from 'node:fs'
import path from 'node:path'
import multer from 'multer'
import { obtenerFechaActual } from '@ciudadano/shared/helpers'

// Directorio donde se guardarán los archivos
const uploadDirectory = 'uploads/'

// Configuración de multer para gestionar la carga de archivos
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fechaActual = obtenerFechaActual()
    const carpetaDestino = path.join(uploadDirectory, fechaActual)

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

export const upload = multer({ storage: diskStorage })
