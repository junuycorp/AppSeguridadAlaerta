import express, { type Router } from 'express'
import cors from 'cors'
import { handleError, logRequest, emptyStringsToNull } from '@ciudadano/middlewares'
import { logger } from './logger'
import { swaggerDocs } from './swagger'

export type Environment = 'development' | 'production' | 'test'

interface Options {
  port?: number
  routes: Router
  environment?: Environment
}

export class Server {
  public readonly app = express()
  private readonly port: number
  private readonly routes: Router
  private readonly environment: Environment

  constructor(options: Options) {
    const { port = 8080, routes, environment = 'development' } = options
    this.port = port
    this.routes = routes
    this.environment = environment
  }

  private middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json()) // Lectura del body
    this.app.use(express.static('public')) // Directorio publico
    this.app.use(logRequest(this.environment)) // Registrar peticiones
    this.app.use(emptyStringsToNull) // Formatear peticion
  }

  async start(): Promise<void> {
    this.middlewares()
    swaggerDocs(this.app, this.port)
    this.app.use(this.routes)
    this.app.use(handleError)
    this.app.listen(this.port, () => {
      logger.info(`Ejecución en MODO ${this.environment.toUpperCase()}`)
      logger.info(`Servidor corriendo en el puerto ${this.port}`)
    })
  }
}
