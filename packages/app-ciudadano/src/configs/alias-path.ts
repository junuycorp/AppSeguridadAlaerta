// Configuracion de path-aliasing para produccion
import moduleAlias from 'module-alias'
import path from 'path'
import { envs } from './envs'

const srcPath = path.join(__dirname, '..') // proyect/src
const sharedPath = path.join(__dirname, '..', 'features', '@shared') // proyect/src/features/@shared

if (envs.NODE_ENV === 'production') {
  moduleAlias.addAlias('@ciudadano', srcPath)
  moduleAlias.addAlias('@ciudadano/shared', sharedPath)
}
