import { Router } from 'express'
import {
  asignarIncidente,
  listarIncidentePorSereno,
  registrarInforme,
} from './serenos.controller'
import { uploadMemory } from '@agente/middlewares'
import { buscarEvento } from '../incidentes/incidentes.controller'

const router = Router()

const maxFiles = 4 // TODO: Tabla configuracion

router.get('/listar-incidentes', listarIncidentePorSereno)
router.post(
  '/registrar-informe',
  uploadMemory.array('archivos', maxFiles),
  registrarInforme,
)
router.get('/buscar/:idIncidente', buscarEvento)
router.post('/asignar-incidente', asignarIncidente)

export default router
