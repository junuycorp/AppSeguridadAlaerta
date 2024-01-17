import { Router } from 'express'
import { listarComunicados, notificarCiudadanos } from './comunicados.controller'

const router = Router()

router.post('/notificar-ciudadanos', notificarCiudadanos)
router.get('/listar', listarComunicados)

export default router
