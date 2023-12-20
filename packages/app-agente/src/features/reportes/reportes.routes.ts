import { Router } from 'express'
import { cronologiaEvento } from './cronologia-evento/cronologia-evento.controller'

const router = Router()

router.get('/cronologia-eventos', cronologiaEvento)

export default router
