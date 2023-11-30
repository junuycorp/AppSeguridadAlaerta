import type { Perfil } from '../prisma-client'

export const perfilSeed: Perfil[] = [
  {
    perfilCodigo: 1,
    perfilNombre: 'administrador',
    descripcion: 'Acceso al sistama de Administración',
    icono: null,
    notificarEvento: true,
    estadoRegistro: true,
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
  },
  {
    perfilCodigo: 2,
    perfilNombre: 'sereno',
    descripcion: 'Acceso al sistama de Serenazgo',
    icono: null,
    notificarEvento: true,
    estadoRegistro: true,
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
  },
]
