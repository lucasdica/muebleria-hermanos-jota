import { Router } from "express";
import {leerInventario} from "../utils/index.js"

const rutaProductos = Router();

//get /api/productos: devuelve toda la lista de productos en json
rutaProductos.get('/', async (req, res, next) => {
    
    const catalogo = await leerInventario();

    if(!catalogo){
        const error = new Error("No se puedo leer el catalogo");
        error.status = 404;
        return next(error);
    }

    res.status(200).json(catalogo);

});

//get /api/producto/:id : devuelve la info de ese producto en json
rutaProductos.get('/:id', async (req, res, next) => {

    const id = req.params.id;

    //console.log(typeof(id)); es String

    // if(!Number.isInteger(id)){
    //     const error = new Error("Id invalido");
    //     error.status = 404;
    //     return next(error);
    // }

    const catalogo = await leerInventario();

    if(!catalogo) {
        const error = new Error("No se puedo leer el catalogo");
        error.status = 404;
        return next(error);
    }

    const producto = catalogo.find((mueble) => mueble.ID == id)

    if(!producto) {
        const error = new Error("Mueble no encontrado");
        error.status = 404;
        return next(error);
    }

    res.status(200).json(producto);
})

export default rutaProductos;