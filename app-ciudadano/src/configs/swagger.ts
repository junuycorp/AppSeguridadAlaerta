import type { Request, Response, Express } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { logger } from './logger'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.2',
    info: {
      title: 'REST API - AppCiudadano',
      version: '1.0.0',
      description: 'Documentación de los endpoints de AppCiudadano',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/features/**/*.yml'],
}

const swaggerSpec = swaggerJSDoc(options)

export const swaggerDocs = (app: Express, port: number): void => {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  logger.info(`Documentación disponible en http://localhost:${port}/docs`)
}
