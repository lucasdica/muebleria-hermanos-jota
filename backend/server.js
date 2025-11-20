import express from 'express';
import 'dotenv/config'
import cors from 'cors'

//cors
import { corsOptions } from './cors/cors.js';

//rutas
import rutaProductos from './rutas/ruta.productos.js'
import rutasUsuarios from './rutas/ruta.usuario.js'

//middlewares
import { logger } from './middlewares/logger.js';
import { rutaNoEncontrada } from './middlewares/rutaNoEncontrada.js';
import { errores } from './middlewares/errores.js';

//BD
import { conectarBD } from './utils/baseDeDatos.js';

const PUERTO = 5000;

// //controladores, '*' importa todo el modulo bajo un alias
// import * as usuarioControlador from './controller/usuario.controller.js'

// //lo utilizo asi
// usuarioControlador.crearUsuario();

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

const exitoDB = conectarBD(process.env.MONGODB);

if(!exitoDB){
    console.error('Error al intentar conectar la base de datos');
    process.exit(1);
}

app.use(logger)

//rutas
app.use('/api/productos', rutaProductos);
app.use('/api/usuarios', rutasUsuarios);

//ruta desconocida
app.use(/.*/, rutaNoEncontrada);

//middleware errores
app.use(errores);

app.listen(PUERTO, (error) => {
    if(error) {
        console.log(error);
    }else{
        console.log(`Servidor escuchando en el puerto ${PUERTO}`);
        console.log(`Entorno ${process.env.ENTORNO}`);
    }
})