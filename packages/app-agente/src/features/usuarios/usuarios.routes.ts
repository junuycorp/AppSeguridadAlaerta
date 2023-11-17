import { Router } from 'express'
import {
  actualizar,
  buscar,
  eliminar,
  listar,
  registrarUsuario,
} from './usuarios.controller'

export const mantenimientos = Router()

mantenimientos.get('/listar', listar)
mantenimientos.get('/buscar/:nroDocumento', buscar)
mantenimientos.put('/actualizar/:nroDocumento', actualizar)
mantenimientos.delete('/eliminar/:nroDocumento', eliminar)
mantenimientos.post('/registrar', registrarUsuario)
