# Construtrack - Aplicación Backend

## Ejecutar servidor en modo desarrollo

Si se desea ejecutar el servidor, se debe realizar los siguientes pasos:

1. Primero tener instalado [Node.js](https://nodejs.org/es) >=16.10 y el gestor de paquetes [Yarn](https://yarnpkg.com/getting-started/install) >=3.0.

2. Después, crear el archivo `.env` en la raíz del proyecto en base al contenido del archivo `.env.example`. Este archivo inicializa las variables de entorno que contienen las configuraciones necesarias para iniciar la aplicación. Estas variables son las siguientes:

   - `DATABASE_URL`: Cadena de conexion de la base de datos
   - `PORT`: Puerto en el que se ejecutará el servidor

3. Seguido, se deberá instalar las dependecias del proyecto ejecutando `yarn install` en la terminal.

4. Finalmente, realizar la ejecución del proyecto usando `yarn dev`.
