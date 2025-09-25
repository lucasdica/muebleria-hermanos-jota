import express from 'express';

//rutas
import rutaProductos from './rutas/ruta.productos.js'
import { rutaNoEncontrada } from './middlewares/rutaNoEncontrada.js';

//middlewares
import { logger } from './middlewares/logger.js';


const app = express();

const PUERTO = process.env.PORT || 5000;

//***********MIDDLEWARE***********//
//express.json() para las rutas POST
app.use(express.json());
//uno global que haga console.log() de las peticiones
app.use(logger)
//errores

//rutas
app.use('/api/productos', rutaProductos);
//ruta desconocida
app.use(/.*/, rutaNoEncontrada); //app.all('*', rutaNoEncontrada);

//mejorar
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const mensaje = err.message || "Error interno del servidor";

    console.error({
        statusCode,
        mensaje,
        stack: err.stack
    });

    res.status(statusCode).json({error: mensaje});
})

app.listen(PUERTO, (error) => {
    if(error) {
        console.log(error);
    }else{
        console.log(`Servidor inicializado con exito.....http://localhost:${PUERTO}`)
    }
})