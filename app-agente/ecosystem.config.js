// Settings for production with PM2
require('dotenv').config()

module.exports = {
  apps: [
    {
      name: `alerta-agente-back-${process.env.PORT}`,
      script: 'yarn',
      args: 'deploy',
      interpreter: 'node@20.9.0',
    },
  ],
}
