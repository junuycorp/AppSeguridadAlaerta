import { Router } from 'express'
import {
  asignarIncidente,
  listarIncidentePorSereno,
  registrarInforme,
} from './serenos.controller'
import { uploadMemory } from '@agente/middlewares'

const router = Router()

const maxFiles = 4 // TODO: Tabla configuracion

router.get('/listar-incidentes', listarIncidentePorSereno)
router.post(
  '/registrar-informe',
  uploadMemory.array('archivos', maxFiles),
  registrarInforme,
)
router.post('/asignar-incidente', asignarIncidente)

export default router
