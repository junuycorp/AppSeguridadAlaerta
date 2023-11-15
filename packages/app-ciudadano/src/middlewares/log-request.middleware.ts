/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { Environment } from '@ciudadano/configs'
import morgan from 'morgan'

const logValues = {
  development: 'dev',
  production: 'combined',
  test: 'tiny',
} as const

export const logRequest = (env: Environment) => {
  const logFormat = logValues[env]
  return morgan(logFormat)
}
