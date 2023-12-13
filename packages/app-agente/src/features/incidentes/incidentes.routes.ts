import { Router } from 'express'
import {
  asignarIncidente,
  buscarEvento,
  cambiarEstado,
  listar,
  listarPorDenunciante,
  registroEvento,
} from './incidentes.controller'

const router = Router()

router.get('/listar', listar)
router.get('/listar/:idDenunciante', listarPorDenunciante)
router.get('/buscar/:idIncidente', buscarEvento)
router.post('/registro-evento', registroEvento)
router.patch('/cambiar-estado/:idIncidente', cambiarEstado)
router.post('/asignar-sereno', asignarIncidente)

export default router
