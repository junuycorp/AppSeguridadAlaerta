export const validators = {
  correo: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  numeroDocumento: /^(\d{8}|\d{11}|\d{15,18})$/, // DNI, RUC, C. Extrangeria
  numeroCelular: /^\d{9}$/,
  dni: /^\d{8}$/,
  ruc: /^\d{11}$/,
  codUnicoInversion: /^\d{7}$/, // Codigo unico de inversores
  codUnidadEjecutora: /^\d{6}$/,
  int: /^\d+$/, // Es numero entero
} as const
