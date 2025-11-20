import mongoose from 'mongoose'

export async function conectarBD(db_url) {
  
  try {
  
    mongoose.connect(db_url)
    console.log(`Se conecto correctamente a la base de datos`);

    return 0;
  
  } catch (error) {
  
    console.error(`Error al intentar conectarse al abase de datos, \nErrorMessage: ${err.message}`);
   
    return 1;
  }
}