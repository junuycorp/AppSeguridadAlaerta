import { Router } from 'express'
import { uploadMemory } from '@agente/middlewares'

import { buscarEvento } from '../incidentes/buscar-evento/buscar-evento.controller'
import { listarTipos } from '../incidentes/crud-tipos/crud-tipos.controller'

import { listarIncidentePorSereno } from './listar-incidentes/listar-incidentes.controller'
import { registrarInforme } from './registrar-informe/registrar-informe.controller'

const router = Router()

const maxFiles = 4 // TODO: Tabla configuracion

router.get('/listar-incidentes', listarIncidentePorSereno)
router.get('/tipos-incidentes', listarTipos)
router.post(
  '/registrar-informe',
  uploadMemory.array('archivos', maxFiles),
  registrarInforme,
)
router.get('/buscar/:idIncidente', buscarEvento)

export default router
