import { Router } from 'express'
import { asignarIncidente } from './serenos.controller'

const router = Router()

router.get('/asignar-incidente', asignarIncidente)

export default router
