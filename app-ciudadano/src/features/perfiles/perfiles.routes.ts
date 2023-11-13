import { Router } from 'express'
import { listar } from './perfiles.controller'

const router = Router()

router.get('/listar', listar)

export default router
