// Settings for production with PM2
require('dotenv').config()

module.exports = {
  apps : [{
    name   : `construtrack-back-${process.env.PORT}`,
    script : "yarn",
    args: "deploy"
  }]
}
