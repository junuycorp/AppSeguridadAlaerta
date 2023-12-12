import { Router } from 'express'
import {
  buscarEvento,
  listarPorDenunciante,
  registrarEvento,
} from './incidentes.controller'
import { uploadMemory } from '@ciudadano/middlewares'

const router = Router()

const maxFiles = 4 // TODO: Tabla configuracion

router.get('/listar-denunciados', listarPorDenunciante)
router.get('/buscar/:idIncidente', buscarEvento)
router.post(
  '/registrar-evento',
  uploadMemory.array('archivos', maxFiles),
  registrarEvento,
)

export default router
