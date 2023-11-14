import { Router } from 'express'
import {
  registrar,
  iniciarSesion,
  enviarCodigo,
  verificarCodigo,
} from './autenticacion.controller'

const router = Router()

router.post('/iniciar-sesion', iniciarSesion)
router.post('/registrar', registrar)
router.post('/enviar-codigo', enviarCodigo)
router.post('/verificar-codigo', verificarCodigo)

export default router
