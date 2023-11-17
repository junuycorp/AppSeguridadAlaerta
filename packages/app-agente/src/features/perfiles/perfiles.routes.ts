import { Router } from 'express'
import {
  actualizar,
  buscar,
  cambiarEstado,
  crear,
  eliminar,
  listar,
} from './perfiles.controller'

export const mantenimientos = Router() // Mantenimientos

mantenimientos.get('/listar', listar)
mantenimientos.get('/buscar/:perfilCodigo', buscar)
mantenimientos.post('/crear', crear)
mantenimientos.put('/actualizar/:perfilCodigo', actualizar)
mantenimientos.delete('/eliminar/:perfilCodigo', eliminar)
mantenimientos.patch('/cambiar-estado/:perfilCodigo', cambiarEstado)
