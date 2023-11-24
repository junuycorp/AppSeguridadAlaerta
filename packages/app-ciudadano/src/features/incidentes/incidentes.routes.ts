import { Router } from 'express'
import { registrarEvento } from './incidentes.controller'
import { upload } from '@ciudadano/middlewares'

const router = Router()

const maxFiles = 4 // TODO: Tabla configuracion
router.post('/registrar-evento', upload.array('archivos', maxFiles), registrarEvento)

export default router
