import { Router } from 'express'
import { obtenerMensajes } from './obtener-mensajes/obtener.controller'

const router = Router()

router.get('/:idIncidente', obtenerMensajes)

export default router
