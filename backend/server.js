import express from 'express';

const app = express();


//rutas
//get /api/productos: devuelve toda la lista de productos en json
//get /api/producto/:id : devuelve la info de ese producto en json

//middleware
//uno global que haga console.log() de las peticiones
//express.json() para las rutas POST

//tengo que organizar las rutas con express.Router()
//manejador de rutas no encontradas y errores centralizados