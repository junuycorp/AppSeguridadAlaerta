import { Router } from 'express'
import { listar, registroEvento } from './incidentes.controller'

const router = Router()

router.get('/listar', listar)
router.post('/registro-evento', registroEvento)

export default router
