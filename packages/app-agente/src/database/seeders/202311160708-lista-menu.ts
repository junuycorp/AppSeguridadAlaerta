import type { ListaMenu } from '../prisma-client'

const IdAdministrador = 1
const IdSereno = 2

const accesosAdmin = [
  '010000',
  '010100',
  '010101',
  '010200',
  '010201',
  '010202',
  '010300',
  '010400',
]

const accesosSereno = ['020000', '020100', '020101', '020400']

const objAccesosAdmin = accesosAdmin.map((acceso) => ({
  menuCodigo: acceso,
  perfilCodigo: IdAdministrador,
  nivelAcceso: 6,
  fechaCreacion: new Date(),
  fechaModificacion: new Date(),
}))

const objAccesosSereno = accesosSereno.map((acceso) => ({
  menuCodigo: acceso,
  perfilCodigo: IdSereno,
  nivelAcceso: 6,
  fechaCreacion: new Date(),
  fechaModificacion: new Date(),
}))

export const listaMenuSeed: ListaMenu[] = [...objAccesosAdmin, ...objAccesosSereno]
