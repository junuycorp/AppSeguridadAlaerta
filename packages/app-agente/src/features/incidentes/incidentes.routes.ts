import { Router } from 'express'
import { listar } from './listar-eventos/listar-eventos.controller'
import { buscarEvento } from './buscar-evento/buscar-evento.controller'
import { cambiarEstado } from './cambiar-estado/cambiar-estado.controller'
import { asignarIncidente as asignarSerenos } from './asignar-serenos/asignar-sereno.controller'
import { listarTipos } from './crud-tipos/crud-tipos.controller'
import { conteoIncidentes } from './conteo-incidentes/conteo-incidentes.controller'
import { listarCentrosPoblados } from '../centros-poblados/crud-centros/crud-centros.controller'
import { listarSerenos } from './listar-serenos/listar-serenos.controller'

const router = Router()

router.get('/listar', listar)
router.get('/listar-serenos', listarSerenos)
router.patch('/cambiar-estado/:idIncidente', cambiarEstado)
router.post('/asignar-serenos', asignarSerenos)
router.get('/centros-poblados', listarCentrosPoblados)
router.get('/cantidad-tipos-incidentes/:idCentroPoblado', conteoIncidentes)
router.get('/buscar/:idIncidente', buscarEvento)
router.get('/listar-tipos', listarTipos)

export default router
