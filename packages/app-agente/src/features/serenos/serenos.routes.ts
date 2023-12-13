import { Router } from 'express'
import { asignarIncidente, listarIncidentePorSereno } from './serenos.controller'

const router = Router()

router.get('/listar-incidentes', listarIncidentePorSereno)
router.post('/asignar-incidente', asignarIncidente)

export default router
