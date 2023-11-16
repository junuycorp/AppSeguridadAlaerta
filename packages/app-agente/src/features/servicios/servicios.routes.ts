import { Router } from 'express'
import { validarTokenServicio } from './servicios.middleware'
import { consultaPersona } from './servicios.controller'

const router = Router()
router.use(validarTokenServicio)
router.get('/persona/:numeroDocumento', consultaPersona)

export default router
