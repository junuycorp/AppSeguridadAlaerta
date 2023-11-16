import { Router } from 'express'
import { iniciarSesion } from './autenticacion.controller'

const router = Router()

router.post('/iniciar-sesion', iniciarSesion)

export default router
