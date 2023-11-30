import { Router } from 'express'
import { crearMultiple } from './archivos.controller'

const router = Router()

router.post('/crear-multiple', crearMultiple)

export default router
