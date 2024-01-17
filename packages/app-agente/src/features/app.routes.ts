import { Router } from 'express'
import { autenticarUsuario } from '@agente/middlewares'
import servicios from './servicios/servicios.routes'
import autenticacion from './autenticacion/autenticacion.routes'
import incidentes from './incidentes/incidentes.routes'
import serenos from './serenos/serenos.routes'
import * as perfiles from './perfiles/perfiles.routes'
import * as usuarios from './usuarios/usuarios.routes'
import conexion from './conexion/conexion.routes'
import reportes from './reportes/reportes.routes'
import mensajes from './chat/chat.routes'
import comunicados from './comunicados/comunicados.routes'

export const appRouter = Router()

// Endpoints sin token
appRouter.use('/autenticacion', autenticacion)
appRouter.use('/servicios', servicios)
appRouter.use('/conexion', conexion)

// Endpoints que requiren token
appRouter.use(autenticarUsuario)
appRouter.use('/mantenimientos/perfiles', perfiles.mantenimientos)
appRouter.use('/mantenimientos/usuarios', usuarios.mantenimientos)
appRouter.use('/procesos/incidentes', incidentes)
appRouter.use('/procesos/serenos', serenos)
appRouter.use('/procesos/mensajes', mensajes)
appRouter.use('/procesos/comunicados', comunicados)
appRouter.use('/reportes/incidentes', reportes)
