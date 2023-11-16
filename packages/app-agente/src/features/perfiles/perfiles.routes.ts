import { Router } from 'express'
import {
  actualizar,
  buscar,
  cambiarEstado,
  crear,
  eliminar,
  listar,
} from './perfiles.controller'

const routerMant = Router() // Mantenimientos

routerMant.get('/listar', listar)
routerMant.get('/buscar/:perfilCodigo', buscar)
routerMant.post('/crear', crear)
routerMant.put('/actualizar/:perfilCodigo', actualizar)
routerMant.delete('/eliminar/:perfilCodigo', eliminar)
routerMant.patch('/cambiar-estado/:perfilCodigo', cambiarEstado)

export default routerMant
