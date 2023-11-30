import { Router } from 'express'
import { registroEvento } from './incidentes.controller'

const router = Router()

router.post('/registro-evento', registroEvento)

export default router
