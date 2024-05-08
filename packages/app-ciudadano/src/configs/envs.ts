import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().default('8000').asPortNumber(),
  NODE_ENV: get('NODE_ENV').default('development').asString(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_PASS: get('MAILER_PASS').required().asString(),
  MAILER_PORT: get('MAILER_PORT').required().asPortNumber(),
  MAILER_HOST: get('MAILER_HOST').required().asString(),
  SMS_API: get('SMS_API').required().asUrlString(),
  JUNUY_API: get('JUNUY_API').required().asUrlString(),
  JUNUY_TOKEN: get('JUNUY_TOKEN').required().asString(),
  SERVICES_TOKEN: get('SERVICES_TOKEN').required().asString(),
  SEGURIDAD_API: get('SEGURIDAD_API').required().asUrlString(),
  SOCKETS_SERVER_TOKEN: get('SOCKETS_SERVER_TOKEN').required().asString(),
  EXPO_ACCESS_TOKEN: get('EXPO_ACCESS_TOKEN').required().asString(),
}
