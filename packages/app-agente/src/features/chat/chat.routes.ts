import { Router } from 'express'
import { crearMensaje } from './crear-mensaje/crear-mensaje.controller'

const router = Router()

router.post('/conexion/crear-mensaje', crearMensaje)

export default router
