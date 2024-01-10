import { Router } from 'express'
import { crearMultiple } from '../archivos/archivos.controller'
import { crearMensaje } from '../chat/crear-mensaje/crear-mensaje.controller'
import { buscarEvento } from '../incidentes/buscar-evento/buscar-evento.controller'
import { listarPorDenunciante } from '../incidentes/listar-eventos/listar-eventos.controller'
import { listarTipos } from '../incidentes/crud-tipos/crud-tipos.controller'
import { registroEvento } from '../incidentes/registro-evento/registro-evento.controller'
import { obtenerMensajes } from '../chat/obtener-mensajes/obtener.controller'

const router = Router()

router.post('/archivos/crear-multiple', crearMultiple)
router.post('/mensajes/crear', crearMensaje)
router.get('/mensajes/:idIncidente', obtenerMensajes)

router.get('/incidentes/buscar/:idIncidente', buscarEvento)
router.get('/incidentes/listar/:idDenunciante', listarPorDenunciante)
router.get('/incidentes/listar-tipos', listarTipos)
router.post('/incidentes/registro-evento', registroEvento)

export default router
