import { Router } from 'express'
import { registrarEvento } from './incidentes.controller'
import { uploadMemory } from '@ciudadano/middlewares'

const router = Router()

const maxFiles = 4 // TODO: Tabla configuracion
router.post(
  '/registrar-evento',
  uploadMemory.array('archivos', maxFiles),
  registrarEvento,
)

export default router
