import {Product} from '../modelos/modelo.product.js'
import dotenv from 'dotenv'
import { conectarBD } from '../utils/baseDeDatos.js';
import mongoose from 'mongoose'

dotenv.config();

const migrateProducts = async () => {
    try {
        // Opción 1: Si usas parámetro
        await conectarBD(process.env.MONGODB);
        
        // Opción 2: Si usas variables de entorno (recomendado)
        // await conectarBD();
        
        console.log('Ejecutando migración...');
        
        // Tu operación updateMany
        const result = await mongoose.connection.collection('Products').updateMany(
            { numeroDeVentas: { $exists: false } },
            { $set: { numeroDeVentas: 0 } },
            //{ maxTimeMS: 30000 } // Timeout específico para esta operación
        );
        
        console.log(`Migración completada: ${result.modifiedCount} productos actualizados`);
        
    } catch (error) {
        console.error('Error en migración:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('Conexión cerrada');
    }
};

migrateProducts();