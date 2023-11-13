// Settings for production with PM2
require('dotenv').config()

module.exports = {
  apps : [{
    name   : `alerta-ciudadano-back-${process.env.PORT}`,
    script : "yarn",
    args: "deploy"
  }]
}
