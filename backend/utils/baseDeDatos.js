import mongoose from 'mongoose'

export async function conectarBD(db_url) {
  mongoose.connect(db_url)
  .then(() => console.log(`Se conecto correctamente a la base de datos`))
  .catch(err => console.error(`Error al intentar conectarse al abase de datos, errorMessage: ${err.message}`));
}