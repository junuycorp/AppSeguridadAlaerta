import { Router } from 'express'
import { autenticarUsuario } from '@/middlewares'
import servicios from './servicios/servicios.routes'
import perfiles from './perfiles/perfiles.routes'

export const appRouter = Router()

// Endpoints sin token
appRouter.use('/servicios', servicios)

// Endpoints que requiren token
appRouter.use(autenticarUsuario)
appRouter.use('/perfiles', perfiles)
