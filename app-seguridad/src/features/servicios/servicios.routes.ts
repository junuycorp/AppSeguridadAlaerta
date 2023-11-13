import { Router } from 'express'
import { validarTokenServicio } from './servicios.middleware'
import { consultaPersona, consultaInversion } from './servicios.controller'

const router = Router()
router.use(validarTokenServicio)
router.get('/persona/:numeroDocumento', consultaPersona)
router.get('/inversion/:cui', consultaInversion)

export default router
