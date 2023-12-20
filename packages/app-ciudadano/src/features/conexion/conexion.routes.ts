import { Router } from 'express'
import {
  listar,
  actualizar,
  buscar,
  cambiarEstado,
  crear,
} from '../usuarios/crud-usuario/crud-usuario.controller'

const router = Router()

router.get('/usuarios/listar', listar)
router.get('/usuarios/buscar/:nroDocumento', buscar)
router.post('/usuarios/crear', crear)
router.put('/usuarios/actualizar', actualizar)
router.patch('/usuarios/cambiar-estado', cambiarEstado)

export default router
