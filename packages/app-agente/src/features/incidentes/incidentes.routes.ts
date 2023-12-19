import { Router } from 'express'
import {
  listar,
  listarPorDenunciante,
} from './listar-eventos/listar-eventos.controller'
import { buscarEvento } from './buscar-evento/buscar-evento.controller'
import { registroEvento } from './registro-evento/registro-evento.controller'
import { cambiarEstado } from './cambiar-estado/cambiar-estado.controller'
import { asignarIncidente } from './asignar-sereno/asignar-sereno.controller'
import { listarTipos } from './crud-tipos/crud-tipos.controller'
import { conteoIncidentes } from './conteo-incidentes/conteo-incidentes.controller'

const router = Router()

router.get('/listar', listar)
router.get('/listar/:idDenunciante', listarPorDenunciante)
router.get('/listar-tipos', listarTipos)
router.get('/buscar/:idIncidente', buscarEvento)
router.post('/registro-evento', registroEvento)
router.patch('/cambiar-estado/:idIncidente', cambiarEstado)
router.post('/asignar-sereno', asignarIncidente)
router.post('/asignar-sereno', asignarIncidente)
router.get('/cantidad-tipos-incidentes/:idCentroPoblado', conteoIncidentes)

export default router
