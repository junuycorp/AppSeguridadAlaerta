import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().default('8000').asPortNumber(),
  NODE_ENV: get('NODE_ENV').default('development').asString(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_PASS: get('MAILER_PASS').required().asString(),
  SMS_API: get('SMS_API').required().asString(),
  JUNUY_API: get('JUNUY_API').required().asString(),
  JUNUY_TOKEN: get('JUNUY_TOKEN').required().asString(),
  SERVICES_TOKEN: get('SERVICES_TOKEN').required().asString(),
  UPLOADS_PATH: get('UPLOADS_PATH').required().asUrlString(),
}
