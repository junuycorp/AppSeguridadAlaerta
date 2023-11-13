import { Router } from 'express'
import { autenticarUsuario } from '@/middlewares'
import autenticacion from './autenticacion/autenticacion.routes'
import servicios from './servicios/servicios.routes'
import entidades from './entidades/entidades.routes'
import perfiles from './perfiles/perfiles.routes'
import obras from './obras/obras.routes'
import cargos from './cargos/cargos.routes'
import presupuestos from './presupuestos/presupuestos.routes'

export const appRouter = Router()

// Endpoints sin token
appRouter.use('/autenticacion', autenticacion)
appRouter.use('/servicios', servicios)

// Endpoints que requiren token
appRouter.use(autenticarUsuario)
appRouter.use('/entidades', entidades)
appRouter.use('/perfiles', perfiles)
appRouter.use('/obras', obras)
appRouter.use('/cargos', cargos)
appRouter.use('/presupuestos', presupuestos)
