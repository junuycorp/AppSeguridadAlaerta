import { Router } from 'express'
import {
  actualizar,
  buscar,
  cambiarEstado,
  crear,
  eliminar,
  listar,
} from './perfiles.controller'

const router = Router()

router.get('/listar', listar)
router.get('/buscar/:perfilCodigo', buscar)
router.post('/crear', crear)
router.put('/actualizar/:perfilCodigo', actualizar)
router.delete('/eliminar/:perfilCodigo', eliminar)
router.patch('/cambiar-estado/:perfilCodigo', cambiarEstado)

export default router
