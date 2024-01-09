import { Router } from 'express'
import { crearMensaje } from './crear-mensaje/crear-mensaje.controller'

const router = Router()

router.post('/crear', crearMensaje)

export default router
