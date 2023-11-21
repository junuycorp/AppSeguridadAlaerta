import { Router } from 'express'
import {
  actualizar,
  buscar,
  eliminar,
  listar,
  crear,
  cambiarEstado,
} from './usuarios.controller'

export const mantenimientos = Router()

mantenimientos.get('/listar', listar)
mantenimientos.get('/buscar/:nroDocumento', buscar)
mantenimientos.post('/crear', crear)
mantenimientos.put('/actualizar/:nroDocumento', actualizar)
mantenimientos.patch('/cambiar-estado/:nroDocumento', cambiarEstado)
mantenimientos.delete('/eliminar/:nroDocumento', eliminar)
