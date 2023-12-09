import { Router } from 'express'
import { buscarEvento, listar, registroEvento } from './incidentes.controller'

const router = Router()

router.get('/listar', listar)
router.get('/buscar/:idIncidente', buscarEvento)
router.post('/registro-evento', registroEvento)

export default router
