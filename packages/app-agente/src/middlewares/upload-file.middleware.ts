import multer from 'multer'

// Configuración para guardar en RAM
const memoryStorage = multer.memoryStorage()
export const uploadMemory = multer({
  storage: memoryStorage,
  limits: {
    fieldSize: 1024 * 1024 * 60, // Limite de 30MB
  },
})
