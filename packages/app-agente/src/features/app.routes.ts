import { Router } from 'express'
import { autenticarUsuario } from '@agente/middlewares'
import servicios from './servicios/servicios.routes'
import autenticacion from './autenticacion/autenticacion.routes'
import incidentes from './incidentes/incidentes.routes'
import serenos from './serenos/serenos.routes'
import archivos from './archivos/archivos.routes'
import * as perfiles from './perfiles/perfiles.routes'
import * as usuarios from './usuarios/usuarios.routes'
import reportes from './reportes/reportes.routes'

export const appRouter = Router()

// Endpoints sin token
appRouter.use('/autenticacion', autenticacion)
appRouter.use('/servicios', servicios)
appRouter.use('/procesos/incidentes', incidentes)
appRouter.use('/procesos/archivos', archivos)

// Endpoints que requiren token
appRouter.use(autenticarUsuario)
appRouter.use('/mantenimientos/perfiles', perfiles.mantenimientos)
appRouter.use('/mantenimientos/usuarios', usuarios.mantenimientos)
appRouter.use('/procesos/serenos', serenos)
appRouter.use('/reportes/incidentes', reportes)
