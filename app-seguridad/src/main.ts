import './configs/alias-path'
import { type Environment, Server, envs } from './configs'
import { appRouter } from './features/app.routes'
import { SqlServerDatabase } from './database'

async function main(): Promise<void> {
  await SqlServerDatabase.connect()

  const configServer = {
    port: envs.PORT,
    routes: appRouter,
    environment: envs.NODE_ENV as Environment,
  }

  void new Server(configServer).start()
}

// Iniciar
;(() => {
  void main()
})()
