import express from 'express';
import 'dotenv/config'

//rutas
import rutaProductos from './rutas/ruta.productos.js'

//middlewares
import { logger } from './middlewares/logger.js';
import { rutaNoEncontrada } from './middlewares/rutaNoEncontrada.js';
import { errores } from './middlewares/errores.js';

//BD
import { conectarBD } from './utils/baseDeDatos.js';

const app = express();

app.use(express.json());

conectarBD(process.env.MONGODB);

const PUERTO = process.env.PORT || 5000;

app.use(logger)


//rutas
app.use('/api/productos', rutaProductos);

//ruta desconocida
app.use(/.*/, rutaNoEncontrada);

//middleware errores
app.use(errores);

app.listen(PUERTO, (error) => {
    if(error) {
        console.log(error);
    }else{
        console.log(`Servidor inicializado con exito.....http://localhost:${PUERTO}`)
    }
})