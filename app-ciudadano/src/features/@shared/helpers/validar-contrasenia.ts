export const validarContrasenia = (contrasenia: string): [boolean, string?] => {
  // Verificar si la contraseña tiene al menos 8 caracteres
  if (contrasenia.length < 8)
    return [false, 'La constraseña debe tener 8 caracteres como mínimo']

  // Verificar si la contraseña contiene al menos un número y una letra
  const contieneNumero = /\d/.test(contrasenia)
  const contieneLetra = /[a-zA-Z]/.test(contrasenia)

  if (contieneNumero && contieneLetra) {
    return [true]
  } else {
    return [false, 'La contraseña debe contener números y letras']
  }
}
