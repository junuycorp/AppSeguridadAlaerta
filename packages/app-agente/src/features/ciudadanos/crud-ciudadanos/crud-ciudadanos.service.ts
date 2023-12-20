// export const listar = async (datos: DatosEvento): Promise<Incidente> => {
//   const respuesta = await axios({
//     method: 'post',
//     baseURL: apiUrl,
//     url: `/procesos/incidentes/registro-evento`,
//     timeout: 15000,
//     data: {
//       idDenunciante: datos.codUsuario,
//       idTipoIncidente: datos.idTipoIncidente,
//       descripcion: datos.descripcion,
//       latitud: datos.latitud,
//       longitud: datos.longitud,
//     },
//   })

//   const incidente = respuesta.data.datos as Incidente
//   return incidente
// }
