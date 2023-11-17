import { Router } from 'express'
import { autenticarUsuario } from '@agente/middlewares'
import servicios from './servicios/servicios.routes'
import autenticacion from './autenticacion/autenticacion.routes'
import * as perfiles from './perfiles/perfiles.routes'
import * as usuarios from './usuarios/usuarios.routes'

export const appRouter = Router()

// Endpoints sin token
appRouter.use('/autenticacion', autenticacion)
appRouter.use('/servicios', servicios)

// Endpoints que requiren token
appRouter.use(autenticarUsuario)
appRouter.use('/mantenimientos/perfiles', perfiles.mantenimientos)
appRouter.use('/mantenimientos/usuarios', usuarios.mantenimientos)
