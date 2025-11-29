import mongoose from 'mongoose';

export async function conectarBD(db_url) {
  try {
    if (!db_url) {
      throw new Error('db_url parameter is required');
    }

    await mongoose.connect(db_url, {
      serverSelectionTimeoutMS: 30000, // 30 segundos para conexión
      socketTimeoutMS: 45000, // 45 segundos para operaciones
    });

    if (mongoose.connection.readyState !== 1) {
      throw new Error('Conexión a MongoDB no establecida');
    }
    
    console.log('Se conectó correctamente a la base de datos');
    return mongoose.connection; // Retorna la conexión

  } catch (error) {
    console.error(`Error al intentar conectarse a la base de datos, \nErrorMessage: ${error.message}`);
    throw error; // Propaga el error en lugar de retornar 1
  }
}