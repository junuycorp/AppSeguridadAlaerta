import { Router } from 'express'
import { asignarIncidente } from './serenos.controller'

const router = Router()

router.post('/asignar-incidente', asignarIncidente)

export default router
